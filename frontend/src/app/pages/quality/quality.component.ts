import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quality',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="page-banner">
      <div class="container">
        <h1>سياسة الجودة</h1>
        <nav class="crumbs"><a routerLink="/">الرئيسية</a> <span>›</span> <a routerLink="/about">من نحن</a> <span>›</span> سياسة الجودة</nav>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="intro">
          <p>
            تلتزم جمعية باربار الخيرية الاجتماعية بتطبيق سياسة الجودة في جميع أعمالها
            وخدماتها، بما يحقق أفضل خدمة للمستفيدين ويعزز ثقة شركائها من أهل الخير
            والجهات الرسمية والإعلامية، وذلك من خلال منظومة متكاملة تقوم على المرتكزات
            التالية.
          </p>
        </div>

        <div class="grid cols-4">
          <div class="card q-card">
            <div class="ic">🔍</div>
            <h3>الشفافية</h3>
            <p>الوضوح والمصداقية في صرف التبرعات وتقديم الخدمات وإعداد التقارير الدورية للمتبرعين والجهات.</p>
          </div>
          <div class="card q-card">
            <div class="ic">🏆</div>
            <h3>التميّز المؤسسي</h3>
            <p>تطبيق أفضل الممارسات الإدارية والالتزام بالمعايير المهنية في العمل الخيري والإنساني.</p>
          </div>
          <div class="card q-card">
            <div class="ic">📈</div>
            <h3>التطوير المستمر</h3>
            <p>تحسين الخدمات والعمليات باستمرار بما يواكب احتياجات المستفيدين وتطلعات المجتمع.</p>
          </div>
          <div class="card q-card">
            <div class="ic">🌐</div>
            <h3>تيسير الوصول للخدمات</h3>
            <p>تسهيل وصول المستفيدين إلى خدماتنا عبر القنوات الرقمية والمباشرة بكل يسر وسهولة.</p>
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

    .intro {
      max-width: 780px;
      margin: 0 auto 48px;
      text-align: center;
    }
    .intro p { color: var(--color-text-muted); font-size: 17px; line-height: 2; margin: 0; }

    .q-card { padding: 30px 22px; text-align: center; height: 100%; }
    .q-card .ic {
      width: 64px; height: 64px;
      margin: 0 auto 16px;
      display: flex; align-items: center; justify-content: center;
      background: var(--color-primary-light);
      border-radius: 50%;
      font-size: 30px;
    }
    .q-card h3 { color: var(--color-primary-dark); font-size: 18px; margin-bottom: 8px; }
    .q-card p { color: var(--color-text-muted); font-size: 14px; margin: 0; line-height: 1.85; }
  `],
})
export class QualityComponent {}
