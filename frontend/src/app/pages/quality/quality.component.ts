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
        <article class="policy">
          <p>
            في جمعية باربار الخيرية الاجتماعية، نلتزم بتحسين جودة حياة الأسر والأفراد
            المحتاجين من خلال تقديم المساعدة الخيرية، والدعم التعليمي، وبرامج الرعاية
            الاجتماعية، وغيرها من الخدمات الأساسية التي تُسهم في التنمية المجتمعية
            المستدامة. رسالتنا هي الارتقاء بالمحتاجين من خلال نهجٍ شفافٍ وفعّالٍ يركّز
            على المستفيدين.
          </p>
          <p>
            ندرك أن رضا المستفيدين ورفاهيتهم هما جوهر أنشطتنا. لذلك، نلتزم بفهم وتلبية
            احتياجات وتوقعات المستفيدين والمانحين والموظفين والمتطوعين والشركاء والجهات
            المعنية الأخرى من خلال التطبيق الفعّال لنظام إدارة الجودة لدينا.
          </p>

          <h2>لتحقيق هذا الالتزام، سنقوم بما يلي:</h2>
          <ul class="commit-list">
            <li>تقديم الخدمات الخيرية بطريقة عادلة وشفافة ومهنية.</li>
            <li>الحفاظ على ثقافة النزاهة والمساءلة والمسؤولية الاجتماعية في جميع عملياتنا وتفاعلاتنا.</li>
            <li>وضع أهداف جودة قابلة للقياس، ومراقبتها، ومراجعتها، بما يدعم توجهنا الاستراتيجي ويعزّز التحسين المستمر.</li>
            <li>تحسين فعالية وكفاءة عملياتنا من خلال التقييم الدوري، والتفكير القائم على تقييم المخاطر، وتحديد فرص التحسين.</li>
            <li>الامتثال لجميع المتطلبات القانونية والتنظيمية والتشريعية السارية ذات الصلة بأنشطتنا.</li>
            <li>التعاون مع الجهات الحكومية، والجهات المانحة، ومنظمات المجتمع المدني، والجهات المعنية الأخرى لتعظيم الأثر الإيجابي لخدماتنا.</li>
            <li>ضمان كفاءة الموظفين والمتطوعين، وانخراطهم، وتمكينهم من المساهمة في تحقيق أهداف الجودة لدينا.</li>
            <li>مراجعة سياسة الجودة هذه دوريًا لضمان استمرار ملاءمتها وفعاليتها، وإبلاغها لجميع الموظفين والجهات المعنية.</li>
          </ul>

          <p class="closing">
            من خلال هذه الالتزامات، تسعى جمعية باربار الخيرية الاجتماعية إلى إحداث
            تغييرٍ ملموسٍ ودائمٍ في حياة من نخدمهم.
          </p>

          <div class="approval">
            <span class="lbl">تم الاعتماد من قبل:</span>
            <span class="role">الرئيس</span>
          </div>

          <div class="doc-ref">BCS-QP-001 &nbsp;|&nbsp; REV: 00 &nbsp;|&nbsp; ED 01.06.2026</div>
        </article>
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

    .policy {
      max-width: 860px;
      margin: 0 auto;
      background: #fff;
      border: 1px solid var(--color-border);
      border-top: 4px solid var(--color-primary);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      padding: 44px 48px;
    }
    .policy > p {
      color: var(--color-text);
      font-size: 17px;
      line-height: 2;
      margin: 0 0 18px;
    }
    .policy h2 {
      color: var(--color-primary-dark);
      font-size: 22px;
      margin: 30px 0 18px;
    }
    .commit-list {
      list-style: none;
      padding: 0;
      margin: 0 0 26px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .commit-list li {
      position: relative;
      padding-inline-start: 34px;
      color: var(--color-text);
      font-size: 16px;
      line-height: 1.9;
    }
    .commit-list li::before {
      content: '✓';
      position: absolute;
      inset-inline-start: 0;
      top: 2px;
      width: 22px;
      height: 22px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--color-primary-light);
      color: var(--color-primary);
      border-radius: 50%;
      font-size: 12px;
      font-weight: 900;
    }
    .closing {
      font-weight: 700;
      color: var(--color-primary-darker) !important;
    }
    .approval {
      margin-top: 30px;
      padding-top: 22px;
      border-top: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .approval .lbl { color: var(--color-text-muted); font-size: 15px; }
    .approval .role {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 18px;
      color: var(--color-primary-darker);
    }
    .doc-ref {
      margin-top: 22px;
      color: var(--color-text-muted);
      font-size: 12px;
      letter-spacing: 0.5px;
      opacity: 0.8;
    }

    @media (max-width: 640px) {
      .policy { padding: 30px 22px; }
      .policy > p { font-size: 16px; }
    }
  `],
})
export class QualityComponent {}
