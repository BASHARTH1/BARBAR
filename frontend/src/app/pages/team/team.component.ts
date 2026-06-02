import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TeamService, TeamMember } from '../../core/services/team.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="page-banner">
      <div class="container">
        <h1>مجلس الإدارة</h1>
        <nav class="crumbs">
          <a routerLink="/">الرئيسية</a> <span>›</span>
          <a routerLink="/about">من نحن</a> <span>›</span>
          مجلس الإدارة
        </nav>
      </div>
    </section>

    <section class="section">
      <div class="container">
        @if (auth.isLoggedIn()) {
          <div class="admin-bar">
            <a routerLink="/admin/team" class="btn btn-primary btn-sm">لوحة إدارة مجلس الإدارة</a>
          </div>
        }

        @if (loading()) {
          <p class="state">جارٍ التحميل...</p>
        } @else if (error()) {
          <div class="alert err">{{ error() }}</div>
        } @else if (members().length === 0) {
          <p class="state">لا يوجد أعضاء حالياً.</p>
        } @else {
          @if (chair(); as c) {
            <div class="chair-row">
              <article class="card member chair">
                <div class="photo">
                  <img [src]="c.image" [alt]="c.name" loading="lazy" />
                </div>
                <div class="info">
                  <h3>{{ c.name }}</h3>
                  <span class="role">{{ c.role }}</span>
                </div>
              </article>
            </div>
          }

          <div class="grid cols-4 rest">
            @for (m of others(); track m.id) {
              <article class="card member">
                <div class="photo">
                  <img [src]="m.image" [alt]="m.name" loading="lazy" />
                </div>
                <div class="info">
                  <h3>{{ m.name }}</h3>
                  <span class="role">{{ m.role }}</span>
                </div>
              </article>
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .page-banner {
      background: linear-gradient(135deg, #154d77, #2A87C9);
      color: #fff;
      padding: 64px 0;
      text-align: center;
      h1 { font-size: 36px; margin-bottom: 6px; }
    }
    .crumbs { font-size: 14px; opacity: 0.9; }
    .crumbs a { color: var(--color-accent); }
    .crumbs span { padding: 0 6px; }

    .admin-bar { display: flex; justify-content: flex-end; margin-bottom: 20px; }
    .btn-sm { padding: 8px 16px; font-size: 13px; }
    .state { text-align: center; color: var(--color-text-muted); padding: 40px 0; }
    .alert.err { background: #fdecea; color: #b71c1c; padding: 12px 16px; border-radius: var(--radius-md); }

    .chair-row {
      display: flex;
      justify-content: center;
      margin-bottom: 36px;
    }
    .chair-row .chair {
      width: 100%;
      max-width: 260px;
    }
    .rest { margin-top: 0; }

    .member {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
    }
    .member:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-md);
      border-color: var(--color-primary);
    }

    .photo {
      aspect-ratio: 3 / 4;
      overflow: hidden;
      background: var(--color-bg-muted, #eef2f6);
    }
    .photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }
    .member:hover .photo img { transform: scale(1.04); }

    .info {
      padding: 18px 16px;
      text-align: center;
    }
    .info h3 {
      color: var(--color-primary-darker);
      font-size: 16px;
      font-weight: 900;
      margin: 0 0 6px;
      line-height: 1.5;
    }
    .role {
      display: block;
      color: var(--color-text-muted);
      font-size: 13px;
      line-height: 1.6;
    }
  `],
})
export class TeamComponent implements OnInit {
  members = signal<TeamMember[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  // Lowest sort_order (first in the list) is featured as the chairman.
  chair = computed<TeamMember | null>(() => this.members()[0] ?? null);
  others = computed<TeamMember[]>(() => this.members().slice(1));

  constructor(public auth: AuthService, private teamService: TeamService) {}

  async ngOnInit() {
    try {
      this.members.set(await this.teamService.list());
    } catch (e: any) {
      this.error.set(e?.message ?? 'تعذّر تحميل أعضاء مجلس الإدارة.');
    } finally {
      this.loading.set(false);
    }
  }
}
