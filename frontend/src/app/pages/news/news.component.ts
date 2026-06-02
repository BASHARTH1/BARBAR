import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NewsService, NewsItem } from '../../core/services/news.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="page-banner">
      <div class="container">
        <h1>الأخبار والفعاليات</h1>
        <nav class="crumbs"><a routerLink="/">الرئيسية</a> <span>›</span> الأخبار</nav>
      </div>
    </section>

    <section class="section">
      <div class="container">
        @if (auth.isLoggedIn()) {
          <div class="admin-bar">
            <a routerLink="/admin/news" class="btn btn-primary btn-sm">لوحة إدارة الأخبار</a>
          </div>
        }

        @if (loading()) {
          <p class="state">جارٍ التحميل...</p>
        } @else if (error()) {
          <div class="alert err">{{ error() }}</div>
        } @else if (items().length === 0) {
          <p class="state">لا توجد أخبار حالياً.</p>
        } @else {
          <div class="grid cols-3">
            @for (n of items(); track n.id) {
              <article class="card news">
                <div class="thumb">
                  <img [src]="n.image" [alt]="n.title" loading="lazy" />
                  <span class="cat">{{ n.category }}</span>
                </div>
                <div class="body">
                  <time>{{ formatDate(n.date) }}</time>
                  <h3>{{ n.title }}</h3>
                  <p>{{ n.excerpt }}</p>
                </div>
              </article>
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .page-banner { background: linear-gradient(135deg, #154d77, #2A87C9); color: #fff; padding: 64px 0; text-align: center; h1 { font-size: 36px; color: #fff; } }
    .crumbs { font-size: 14px; opacity: 0.9; } .crumbs a { color: var(--color-accent); } .crumbs span { padding: 0 6px; }

    .admin-bar { display: flex; justify-content: flex-end; margin-bottom: 20px; }
    .btn-sm { padding: 8px 16px; font-size: 13px; }
    .state { text-align: center; color: var(--color-text-muted); padding: 40px 0; }
    .alert.err { background: #fdecea; color: #b71c1c; padding: 12px 16px; border-radius: var(--radius-md); }

    .news .thumb {
      position: relative;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      background: var(--color-bg-muted, #eef2f6);
    }
    .news .thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .cat { position: absolute; top: 14px; inset-inline-start: 14px; background: var(--color-primary); color: #fff; padding: 4px 12px; border-radius: var(--radius-pill); font-size: 12px; font-weight: 700; }
    .body { padding: 20px; }
    time { font-size: 13px; color: var(--color-text-muted); }
    .body h3 { color: var(--color-primary-dark); font-size: 17px; margin: 8px 0; }
    .body p { color: var(--color-text-muted); font-size: 14px; }
  `],
})
export class NewsComponent implements OnInit {
  items = signal<NewsItem[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(public auth: AuthService, private newsService: NewsService) {}

  async ngOnInit() {
    try {
      this.items.set(await this.newsService.list());
    } catch (e: any) {
      this.error.set(e?.message ?? 'تعذّر تحميل الأخبار.');
    } finally {
      this.loading.set(false);
    }
  }

  formatDate(iso: string) {
    try { return new Date(iso).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }); }
    catch { return iso; }
  }
}
