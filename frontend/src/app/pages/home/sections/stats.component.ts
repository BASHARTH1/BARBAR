import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { Stat } from '../../../core/models/models';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="stats-band">
      <div class="container">
        <div class="grid cols-4">
          @for (s of stats(); track s.key) {
            <div class="stat">
              <div class="circle">
                <span class="emoji">{{ emoji(s.icon) }}</span>
              </div>
              <div class="value">
                <strong>{{ s.value | number }}</strong>
                @if (s.suffix) { <span class="suf">{{ s.suffix }}</span> }
                <span class="plus">+</span>
              </div>
              <div class="label">{{ s.label }}</div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .stats-band {
      background: linear-gradient(135deg, #154d77 0%, #2A87C9 100%);
      color: #fff;
      padding: 64px 0;
      position: relative;
      overflow: hidden;
    }
    .stats-band::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px);
      background-size: 28px 28px;
      pointer-events: none;
      opacity: 0.5;
    }
    .stat { text-align: center; position: relative; z-index: 1; }
    .circle {
      width: 80px; height: 80px;
      margin: 0 auto 14px;
      border-radius: 50%;
      background: rgba(255,255,255,0.12);
      border: 2px solid rgba(255,255,255,0.45);
      display: flex; align-items: center; justify-content: center;
      font-size: 32px;
    }
    .value {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 4px;
      strong { font-size: 40px; font-weight: 900; color: #fff; }
      .suf, .plus { font-size: 22px; font-weight: 800; color: #fff; }
    }
    .label { font-size: 15px; opacity: 0.92; margin-top: 6px; }
  `],
})
export class StatsComponent implements OnInit {
  private api = inject(ApiService);
  stats = signal<Stat[]>([]);

  ngOnInit() {
    this.api.getStats().subscribe({
      next: (s) => this.stats.set(s),
      error: () => this.stats.set([
        { key: 'families', label: 'أسرة مستفيدة', value: 12480, icon: 'family' },
        { key: 'projects', label: 'مشروع منفذ', value: 64, icon: 'briefcase' },
        { key: 'donors', label: 'متبرع كريم', value: 8730, icon: 'users' },
        { key: 'aid', label: 'إجمالي المساعدات', value: 2450000, suffix: 'د.ب', icon: 'coin' },
      ]),
    });
  }

  emoji(icon: string): string {
    const map: Record<string, string> = {
      family: '👨‍👩‍👧',
      briefcase: '💼',
      users: '🤝',
      coin: '💰',
    };
    return map[icon] || '★';
  }
}
