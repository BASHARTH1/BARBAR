import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { DonationsService } from '../../core/services/donations.service';
import { Campaign, DonationPayload } from '../../core/models/models';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="page-banner">
      <div class="container">
        <h1>تبرع الآن</h1>
        <nav class="crumbs"><a routerLink="/">الرئيسية</a> <span>›</span> تبرع</nav>
      </div>
    </section>

    <section class="section">
      <div class="container donate-grid">
        <aside class="card side">
          <h3>اختر باقة الخير</h3>
          <ul class="campaign-list">
            @for (c of campaigns(); track c.id) {
              <li
                [class.active]="payload.campaignSlug === ('campaign-' + c.id)"
                (click)="pickCampaign(c)">
                <span>{{ c.title }}</span>
                <strong>{{ c.amount }} د.ب</strong>
              </li>
            }
          </ul>
        </aside>

        <form #f="ngForm" class="card form-card" (ngSubmit)="submit(f)">
          <h2>بيانات التبرع</h2>

          <div class="amount-picker">
            @for (a of [5,10,25,50,100,200]; track a) {
              <button type="button" class="pill" [class.active]="payload.amount === a" (click)="payload.amount = a">{{ a }} د.ب</button>
            }
            <input type="number" min="1" name="amountInput" [(ngModel)]="payload.amount" placeholder="مبلغ آخر" class="custom-input"/>
          </div>

          <div class="form-row">
            <label>الاسم الكامل</label>
            <input name="donorName" [(ngModel)]="payload.donorName" required minlength="2"/>
          </div>
          <div class="form-row two">
            <div>
              <label>البريد الإلكتروني</label>
              <input type="email" name="email" [(ngModel)]="payload.email" required/>
            </div>
            <div>
              <label>رقم الهاتف</label>
              <input name="phone" [(ngModel)]="payload.phone"/>
            </div>
          </div>
          <div class="form-row">
            <label>رسالة (اختياري)</label>
            <textarea name="message" [(ngModel)]="payload.message" placeholder="نية التبرع، تعليق، أو تخصيص..."></textarea>
          </div>
          <label class="checkbox">
            <input type="checkbox" name="recurring" [(ngModel)]="payload.recurring"/>
            <span>اجعل هذا التبرع شهريًا متكررًا</span>
          </label>

          <button class="btn btn-accent btn-block" [disabled]="loading()">
            {{ loading() ? 'جارٍ المعالجة...' : 'تأكيد التبرع' }}
          </button>

          @if (success()) {
            <div class="alert ok">شكرًا لك! تم استلام تبرعك بنجاح. جزاك الله خيرًا.</div>
          }
          @if (error()) {
            <div class="alert err">{{ error() }}</div>
          }
        </form>
      </div>
    </section>
  `,
  styles: [`
    .page-banner { background: linear-gradient(135deg, #154d77, #2A87C9); color: #fff; padding: 64px 0; text-align: center; h1 { font-size: 36px; } }
    .crumbs { font-size: 14px; opacity: 0.9; } .crumbs a { color: var(--color-accent); } .crumbs span { padding: 0 6px; }
    .donate-grid { display: grid; grid-template-columns: 320px 1fr; gap: 28px; align-items: flex-start; }
    .side { padding: 22px; position: sticky; top: 110px; }
    .side h3 { color: var(--color-primary-dark); font-size: 18px; margin-bottom: 12px; }
    .campaign-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
    .campaign-list li {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 14px;
      background: var(--color-bg-soft);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      &:hover { background: var(--color-primary-light); }
      &.active { background: var(--color-primary); color: #fff; }
      &.active strong { color: #fff; }
      strong { color: var(--color-primary); }
    }
    .form-card { padding: 28px; }
    .form-card h2 { color: var(--color-primary-dark); margin-bottom: 18px; font-size: 22px; }
    .amount-picker { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 22px; }
    .pill {
      padding: 10px 18px;
      background: var(--color-bg-soft);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-pill);
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      &.active, &:hover { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
    }
    .custom-input {
      flex: 1;
      min-width: 120px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-pill);
      padding: 10px 18px;
      font-family: inherit;
    }
    .form-row.two { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .checkbox { display: flex; align-items: center; gap: 10px; margin: 14px 0 22px; cursor: pointer; user-select: none; }
    .alert { margin-top: 16px; padding: 12px 16px; border-radius: var(--radius-md); font-weight: 600; }
    .alert.ok { background: #e8f3fb; color: #154d77; }
    .alert.err { background: #fde8e6; color: #c0392b; }
    @media (max-width: 900px) {
      .donate-grid { grid-template-columns: 1fr; }
      .side { position: static; }
      .form-row.two { grid-template-columns: 1fr; }
    }
  `],
})
export class DonateComponent implements OnInit {
  private api = inject(ApiService);
  private donations = inject(DonationsService);
  campaigns = signal<Campaign[]>([]);
  loading = signal(false);
  success = signal(false);
  error = signal<string | null>(null);

  payload: DonationPayload = {
    donorName: '',
    email: '',
    phone: '',
    campaignSlug: 'general',
    amount: 25,
    recurring: false,
    message: '',
  };

  ngOnInit() {
    this.api.getCampaigns().subscribe({
      next: (list) => this.campaigns.set(list),
      error: () => {},
    });
  }

  pickCampaign(c: Campaign) {
    this.payload.campaignSlug = `campaign-${c.id}`;
    this.payload.amount = c.amount;
  }

  async submit(f: NgForm) {
    if (f.invalid || !this.payload.amount) return;
    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);
    try {
      await this.donations.create(this.payload);
      this.success.set(true);
      f.resetForm({ amount: 25, campaignSlug: 'general', recurring: false });
    } catch {
      this.error.set('حدث خطأ، يرجى المحاولة لاحقًا.');
    } finally {
      this.loading.set(false);
    }
  }
}
