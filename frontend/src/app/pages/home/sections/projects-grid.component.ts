import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventsService, CharityEvent } from '../../../core/services/events.service';

@Component({
  selector: 'app-projects-grid',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="section events">
      <div class="container">
        <div class="section-head">
          <h2>الفعاليات القادمة</h2>
        </div>

        @if (loading()) {
          <p class="state">جارٍ التحميل...</p>
        } @else if (events().length === 0) {
          <p class="state">لا توجد فعاليات حالياً.</p>
        } @else {
          <div class="grid cols-3">
            @for (e of events(); track e.id) {
              <article class="event-card">
                <div class="event-image">
                  <img [src]="e.image" [alt]="e.title" loading="lazy" />
                  <div class="event-head">
                    <div class="date-block">
                      <span class="day">{{ e.day }}</span>
                      <span class="month">{{ e.month }}</span>
                    </div>
                    <span class="tag">{{ e.tag }}</span>
                  </div>
                </div>
                <div class="event-body">
                  <h3>{{ e.title }}</h3>
                  <p>{{ e.description }}</p>
                  <ul class="event-meta">
                    <li><span class="ico">⏰</span> {{ e.time }}</li>
                    <li><span class="ico">📍</span> {{ e.location }}</li>
                  </ul>
                  <a routerLink="/events" class="btn btn-outline btn-block">عرض التفاصيل</a>
                </div>
              </article>
            }
          </div>
        }

        <div class="all-events">
          <a routerLink="/events" class="btn btn-outline">جميع الفعاليات</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .state { text-align: center; color: var(--color-text-muted); padding: 30px 0; }

    .event-card {
      background: #fff;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
    }
    .event-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-md);
      border-color: var(--color-primary);
    }

    .event-image {
      position: relative;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      background: var(--color-bg-muted, #eef2f6);
    }
    .event-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }
    .event-card:hover .event-image img { transform: scale(1.05); }

    .event-head {
      position: absolute;
      inset: 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 18px 20px;
      background: linear-gradient(180deg, rgba(21, 77, 119, 0.55) 0%, rgba(21, 77, 119, 0.15) 50%, rgba(21, 77, 119, 0.75) 100%);
      color: #fff;
    }
    .date-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(255, 255, 255, 0.18);
      backdrop-filter: blur(8px);
      padding: 10px 18px;
      border-radius: var(--radius-md);
      line-height: 1;
    }
    .day { font-size: 28px; font-weight: 900; font-family: var(--font-display); }
    .month { font-size: 13px; font-weight: 700; margin-top: 4px; opacity: 0.9; }

    .tag {
      background: rgba(255, 255, 255, 0.20);
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      letter-spacing: 0.5px;
    }

    .event-body {
      padding: 22px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .event-body h3 {
      color: var(--color-primary-darker);
      font-size: 19px;
      font-weight: 900;
      margin: 0 0 10px;
    }
    .event-body > p {
      color: var(--color-text-muted);
      font-size: 14px;
      line-height: 1.85;
      margin: 0 0 16px;
    }

    .event-meta {
      list-style: none;
      padding: 0;
      margin: 0 0 18px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 14px;
      color: var(--color-text);
    }
    .event-meta li { display: flex; align-items: center; gap: 8px; }
    .ico { font-size: 16px; }

    .event-body .btn { margin-top: auto; }

    .all-events { text-align: center; margin-top: 40px; }
  `],
})
export class ProjectsGridComponent implements OnInit {
  events = signal<CharityEvent[]>([]);
  loading = signal(true);

  constructor(private eventsService: EventsService) {}

  async ngOnInit() {
    try {
      const all = await this.eventsService.list();
      this.events.set(all.slice(0, 3));
    } catch {
      this.events.set([]);
    } finally {
      this.loading.set(false);
    }
  }
}
