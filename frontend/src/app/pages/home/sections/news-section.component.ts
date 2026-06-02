import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NewsService, NewsItem } from '../../../core/services/news.service';

@Component({
  selector: 'app-news-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="section news">
      <div class="container">
        <div class="section-head">
          <h2>آخر الأخبار والفعاليات</h2>
        </div>

        @if (loading()) {
          <p class="state">جارٍ التحميل...</p>
        } @else if (items().length === 0) {
          <p class="state">لا توجد أخبار حالياً.</p>
        } @else {
          <div class="grid cols-3">
            @for (n of items(); track n.id) {
              <article class="card news-card">
                <div class="thumb">
                  <img [src]="n.image" [alt]="n.title" loading="lazy" />
                  <span class="cat">{{ n.category }}</span>
                </div>
                <div class="body">
                  <time>{{ formatDate(n.date) }}</time>
                  <h3>{{ n.title }}</h3>
                  <p>{{ n.excerpt }}</p>
                  <a [routerLink]="['/news']" class="readmore">اقرأ المزيد ←</a>
                </div>
              </article>
            }
          </div>
        }

        <div class="all-news">
          <a routerLink="/news" class="btn btn-outline">جميع الأخبار</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .state { text-align: center; color: var(--color-text-muted); padding: 30px 0; }

    .news-card { display: flex; flex-direction: column; }
    .thumb {
      position: relative;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      background: var(--color-bg-muted, #eef2f6);
    }
    .thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .cat {
      position: absolute;
      top: 14px;
      inset-inline-start: 14px;
      background: var(--color-primary);
      color: #fff;
      padding: 4px 12px;
      border-radius: var(--radius-pill);
      font-size: 12px;
      font-weight: 700;
    }
    .body { padding: 20px; flex: 1; display: flex; flex-direction: column; }
    time { font-size: 13px; color: var(--color-text-muted); margin-bottom: 8px; }
    .body h3 { color: var(--color-primary-dark); font-size: 17px; margin-bottom: 8px; line-height: 1.5; }
    .body p { color: var(--color-text-muted); font-size: 14px; flex: 1; margin-bottom: 12px; }
    .readmore {
      color: var(--color-primary);
      font-weight: 700;
      font-size: 14px;
      align-self: flex-start;
      transition: color 0.2s, padding 0.2s;
      &:hover { color: var(--color-accent-dark); padding-inline-end: 6px; }
    }
    .all-news { text-align: center; margin-top: 40px; }
  `],
})
export class NewsSectionComponent implements OnInit {
  items = signal<NewsItem[]>([]);
  loading = signal(true);

  constructor(private newsService: NewsService) {}

  async ngOnInit() {
    try {
      const all = await this.newsService.list();
      this.items.set(all.slice(0, 3));
    } catch {
      this.items.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return iso;
    }
  }
}
