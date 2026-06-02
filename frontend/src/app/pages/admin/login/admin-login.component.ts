import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="page-banner">
      <div class="container">
        <h1>تسجيل دخول الإدارة</h1>
        <nav class="crumbs"><a routerLink="/">الرئيسية</a> <span>›</span> <a routerLink="/events">الفعاليات</a> <span>›</span> تسجيل الدخول</nav>
      </div>
    </section>

    <section class="section">
      <div class="container narrow">
        <form class="login-card" (ngSubmit)="onSubmit()" #f="ngForm">
          <h2>دخول لوحة التحكم</h2>
          <p class="hint">قم بتسجيل الدخول للوصول إلى إدارة الفعاليات.</p>

          <label>
            <span>البريد الإلكتروني</span>
            <input type="email" name="email" [(ngModel)]="email" required autocomplete="email" />
          </label>

          <label>
            <span>كلمة المرور</span>
            <input type="password" name="password" [(ngModel)]="password" required autocomplete="current-password" />
          </label>

          @if (error()) {
            <div class="alert err">{{ error() }}</div>
          }

          <button class="btn btn-primary btn-block" type="submit" [disabled]="loading() || !f.valid">
            {{ loading() ? 'جارٍ الدخول...' : 'تسجيل الدخول' }}
          </button>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .page-banner {
      background: linear-gradient(135deg, #154d77, #2A87C9);
      color: #fff;
      padding: 64px 0;
      text-align: center;
      h1 { font-size: 36px; margin-bottom: 8px; }
    }
    .crumbs { font-size: 14px; opacity: 0.9; }
    .crumbs a { color: var(--color-accent); }
    .crumbs span { padding: 0 6px; }

    .narrow { max-width: 460px; }

    .login-card {
      background: #fff;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-shadow: var(--shadow-sm);
    }
    .login-card h2 { color: var(--color-primary-darker); font-size: 22px; font-weight: 900; margin: 0; }
    .hint { color: var(--color-text-muted); font-size: 14px; margin: 0 0 8px; }

    label { display: flex; flex-direction: column; gap: 6px; font-size: 14px; font-weight: 700; color: var(--color-text); }
    input {
      padding: 12px 14px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: 15px;
      font-family: inherit;
    }
    input:focus { outline: none; border-color: var(--color-primary); }

    .alert.err {
      background: #fdecea;
      color: #b71c1c;
      padding: 10px 14px;
      border-radius: var(--radius-md);
      font-size: 14px;
    }
  `],
})
export class AdminLoginComponent {
  email = '';
  password = '';
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private auth: AuthService, private router: Router) {}

  async onSubmit() {
    this.error.set(null);
    this.loading.set(true);
    try {
      const { error } = await this.auth.signIn(this.email.trim(), this.password);
      if (error) {
        this.error.set('بيانات الدخول غير صحيحة.');
        return;
      }
      this.router.navigateByUrl('/admin/events');
    } catch (e) {
      this.error.set('حدث خطأ غير متوقع. حاول مرة أخرى.');
    } finally {
      this.loading.set(false);
    }
  }
}
