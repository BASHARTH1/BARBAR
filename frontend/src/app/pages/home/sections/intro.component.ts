import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="section intro">
      <div class="container intro-grid">
        <div class="intro-image">
          <div class="img-frame">
            <span class="frame-title">معاً نصنع الفرق</span>
            <div class="circle circle-small">
              <img src="/assets/intro-2.jpg" alt="" loading="lazy" />
            </div>
            <div class="circle circle-large">
              <img src="/assets/intro-1.jpg" alt="" loading="lazy" />
            </div>
            <svg class="frame-curve" viewBox="0 0 400 60" aria-hidden="true">
              <path d="M40 50 Q200 0 360 50" stroke="#154d77" stroke-width="3" fill="none"/>
            </svg>
          </div>
          <div class="badge-card">
            <span class="num">15+</span>
            <span class="lbl">سنة من العطاء</span>
          </div>
        </div>
        <div class="intro-text">
          <span class="eyebrow">من نحن</span>
          <h2>جمعية خيرية مرخصة في خدمة الإنسان</h2>
          <p>
            تأسست جمعية باربار الخيرية لتكون عوناً للأسر والأفراد المتعففين وامتداداً
            لأعمال البر في المجتمع. نعمل على تنفيذ مشاريع ذات أثر مستدام في مجالات
            الإسكان، الصحة، التعليم، والكفالات الاجتماعية.
          </p>
          <ul class="check-list">
            <li><span class="ck">✓</span> رخصة رسمية للعمل الخيري</li>
            <li><span class="ck">✓</span> شفافية كاملة في صرف التبرعات</li>
            <li><span class="ck">✓</span> تقارير دورية للمتبرعين</li>
            <li><span class="ck">✓</span> فريق متطوعين مؤهل</li>
          </ul>
          <div class="actions">
            <a routerLink="/about" class="btn btn-primary">المزيد عنا</a>
            <a routerLink="/projects" class="btn btn-outline">مشاريعنا</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .intro-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 56px;
      align-items: center;
    }
    .intro-image { position: relative; }
    .img-frame {
      position: relative;
      border-radius: var(--radius-lg);
      background: #e8f3fb;
      box-shadow: var(--shadow-md);
      aspect-ratio: 400 / 320;
      overflow: hidden;
    }
    .frame-title {
      position: absolute;
      top: 28px;
      inset-inline-start: 50%;
      transform: translateX(-50%);
      color: #154d77;
      font-size: clamp(16px, 1.6vw, 20px);
      font-weight: 800;
      font-family: var(--font-display);
      z-index: 2;
      white-space: nowrap;
    }
    .circle {
      position: absolute;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 12px 28px rgba(21, 77, 119, 0.25);
    }
    .circle img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .circle-large {
      width: 62%;
      aspect-ratio: 1;
      top: 18%;
      inset-inline-start: 42%;
      z-index: 1;
    }
    .circle-small {
      width: 50%;
      aspect-ratio: 1;
      top: 22%;
      inset-inline-start: 6%;
      z-index: 2;
    }
    .frame-curve {
      position: absolute;
      bottom: 18px;
      left: 0;
      width: 100%;
      height: 60px;
      pointer-events: none;
    }
    .badge-card {
      position: absolute;
      bottom: -24px;
      inset-inline-start: -24px;
      background: var(--color-accent);
      color: #fff;
      padding: 18px 24px;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      text-align: center;
      .num { display: block; font-size: 32px; font-weight: 900; }
      .lbl { font-size: 13px; }
    }
    .eyebrow {
      color: var(--color-accent-dark);
      font-weight: 700;
      letter-spacing: 1px;
      font-size: 14px;
      display: inline-block;
      margin-bottom: 8px;
    }
    .intro-text h2 {
      font-size: clamp(24px, 3vw, 34px);
      color: var(--color-primary-dark);
      margin-bottom: 14px;
    }
    .intro-text p { color: var(--color-text-muted); font-size: 16px; margin-bottom: 22px; }
    .check-list { list-style: none; padding: 0; margin: 0 0 28px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .check-list li { display: flex; align-items: center; gap: 8px; font-weight: 600; }
    .ck {
      width: 24px; height: 24px;
      display: inline-flex; align-items: center; justify-content: center;
      border-radius: 50%;
      background: var(--color-primary-light);
      color: var(--color-primary);
      font-weight: 800;
      font-size: 13px;
    }
    .actions { display: flex; gap: 12px; flex-wrap: wrap; }

    @media (max-width: 900px) {
      .intro-grid { grid-template-columns: 1fr; gap: 40px; }
      .check-list { grid-template-columns: 1fr; }
    }
  `],
})
export class IntroComponent {}
