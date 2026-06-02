import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="page-banner">
      <div class="container">
        <h1>من نحن</h1>
        <nav class="crumbs"><a routerLink="/">الرئيسية</a> <span>›</span> من نحن</nav>
      </div>
    </section>

    <section class="section">
      <div class="container two-col">
        <div>
          <h2>نبذة عن الجمعية</h2>
          <p>
            نسعى لأن نقدم خدماتنا الخيرية لتساهم في رفع المستوى المعيشي والتعليمي
            للأسر المتعففة من خلال منظومة متطورة تناسب الجميع.
          </p>
          <p>
            تعمل جمعية باربار الخيرية كمؤسسة مرخصة في مملكة البحرين، تعنى بدعم الأسر
            والأفراد المحتاجين من خلال مشاريع اجتماعية وإنسانية متنوعة تسهم في تحسين
            جودة الحياة وتعزيز الاستقرار الأسري في إطار الشراكة المجتمعية.
          </p>
        </div>
        <div class="vision">
          <div class="card v-card">
            <div class="ic">🎯</div>
            <h3>الرؤية</h3>
            <p>
              أن نكون جمعية متميزة رائدة على مستوى مملكة البحرين، في جودة وتطوير
              العمل الخيري والإنساني وتنمية المجتمع.
            </p>
          </div>
          <div class="card v-card">
            <div class="ic">🤝</div>
            <h3>الرسالة</h3>
            <p>
              تقديم المستحقات الخيرية لأهلها وفق معايير وأسس عادلة وشفافة وشرعية
              في إطار الشراكة المجتمعية.
            </p>
          </div>
          <div class="card v-card">
            <div class="ic">⚖</div>
            <h3>القيم الأساسية</h3>
            <p>الثقة، المبادرة، والالتزام.</p>
          </div>
        </div>
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
    .two-col { display: grid; grid-template-columns: 1.1fr 1fr; gap: 48px; align-items: center; }
    h2 { color: var(--color-primary-dark); font-size: 30px; margin: 0 0 16px; }
    p { color: var(--color-text-muted); margin-bottom: 14px; line-height: 1.9; }
    .vision { display: flex; flex-direction: column; gap: 16px; }
    .v-card { padding: 22px; display: flex; gap: 14px; align-items: flex-start; }
    .v-card .ic {
      width: 48px; height: 48px;
      flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      background: var(--color-primary-light);
      border-radius: 50%;
      font-size: 24px;
    }
    .v-card h3 { color: var(--color-primary-dark); font-size: 17px; margin-bottom: 4px; }
    .v-card p { font-size: 14px; margin: 0; }

    @media (max-width: 800px) { .two-col { grid-template-columns: 1fr; } }
  `],
})
export class AboutComponent {}
