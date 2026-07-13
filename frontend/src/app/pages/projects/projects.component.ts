import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Project } from '../../core/models/models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="page-banner">
      <div class="container">
        <h1>مشاريعنا</h1>
        <nav class="crumbs"><a routerLink="/">الرئيسية</a> <span>›</span> مشاريعنا</nav>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid cols-3">
          @for (p of projects(); track p.slug) {
            <article class="card project">
              <div class="thumb">
                <svg viewBox="0 0 300 180">
                  <rect width="300" height="180" fill="#e8f3fb"/>
                  <text x="150" y="100" text-anchor="middle" font-size="64">{{ emoji(p.icon) }}</text>
                </svg>
              </div>
              <div class="body">
                <h3>{{ p.title }}</h3>
                <p>{{ p.description }}</p>
                <div class="progress"><div class="bar" [style.width.%]="percent(p)"></div></div>
                <div class="meta">
                  <span><strong>{{ p.beneficiaries }}</strong> أسرة مستفيدة</span>
                  <span class="pct">{{ percent(p) }}%</span>
                </div>
                <a routerLink="/donate" [queryParams]="{project: p.slug}" class="btn btn-primary btn-block">تبرع للمشروع</a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-banner { background: linear-gradient(135deg, #154d77, #2A87C9); color: #fff; padding: 64px 0; text-align: center; h1 { font-size: 36px; color: #fff; } }
    .crumbs { font-size: 14px; opacity: 0.9; } .crumbs a { color: var(--color-accent); } .crumbs span { padding: 0 6px; }
    .project .thumb svg { width: 100%; display: block; }
    .body { padding: 22px; }
    .body h3 { color: var(--color-primary-dark); font-size: 18px; margin-bottom: 8px; }
    .body p { color: var(--color-text-muted); font-size: 14px; min-height: 60px; margin-bottom: 14px; }
    .progress { height: 8px; background: var(--color-bg-soft); border-radius: var(--radius-pill); overflow: hidden; margin-bottom: 8px; }
    .bar { height: 100%; background: linear-gradient(90deg, var(--color-primary), var(--color-accent)); border-radius: var(--radius-pill); }
    .meta { display: flex; justify-content: space-between; margin-bottom: 14px; font-size: 14px; }
    .meta strong { color: var(--color-primary); font-size: 18px; }
    .pct { color: var(--color-accent-dark); font-weight: 700; }
  `],
})
export class ProjectsComponent implements OnInit {
  private api = inject(ApiService);
  projects = signal<Project[]>([]);

  ngOnInit() {
    this.api.getProjects().subscribe({
      next: (list) => this.projects.set(list),
      error: () => this.projects.set([]),
    });
  }

  percent(p: Project) { return Math.min(100, Math.round((p.raised / p.goal) * 100)); }
  emoji(icon: string): string {
    const map: Record<string, string> = { heart: '💍', home: '🏠', mosque: '🕌', medical: '⚕' };
    return map[icon] || '★';
  }
}
