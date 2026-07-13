import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="hero">
      <div class="hero-bg" aria-hidden="true"></div>
      <div class="hero-overlay" aria-hidden="true"></div>

      <div class="container hero-grid">
        <div class="hero-text">
          <span class="eyebrow">وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ.</span>
          <h1 class="title">من أيقن بالخلف جاد بالعطية</h1>
          <p class="lede">
            جمعية خيرية مسجلة في وزارة العمل والتنمية الاجتماعية برقم الترخيص 70/ج/خ
            وتعنى بمساعدة ودعم الأفراد والأسر، وتقديم الدعم الاجتماعي والإنساني،
            بما يساهم في تحسين جودة الحياة والاستقرار والاستدامة للمجتمع
          </p>
          <div class="cta">
            <a href="https://e.barbarcharity.org/OnlineServices/don_online_payment.php?NewTransaction=1&donParam=NQ==" class="btn btn-accent btn-lg">تبرع الآن</a>
            <a href="https://e.barbarcharity.org/OnlineServices/don_online_payment.php?NewTransaction=1" target="_blank" rel="noopener" class="btn btn-ghost btn-lg">تعرف على مشاريعنا</a>
          </div>
        </div>

        <aside class="urgent-card">
          <header class="uc-head">
            <span class="uc-title">حملة تبرع لعلاج مريض</span>
            <span class="uc-badge">حالة عاجلة</span>
          </header>

          <div class="uc-cost">
            <span class="uc-cost-label">تكلفة العلاج</span>
            <span class="uc-cost-amount">40,000</span>
            <span class="uc-cost-currency">دينار بحريني</span>
          </div>

          <div class="uc-progress"><div class="uc-bar" [style.width.%]="campaign.percent"></div></div>
          <div class="uc-meta">
            <span>{{ campaign.donors }} المتبرعون</span>
            <span class="uc-pct">{{ campaign.percent }}%</span>
          </div>

          <p class="uc-desc">{{ campaign.description }}</p>

          <a href="https://e.barbarcharity.org/OnlineServices/don_online_payment.php?NewTransaction=1&donParam=NQ==" class="uc-cta">تبرع الآن</a>

          <div class="uc-quick-list">
            <a routerLink="/donate" class="uc-quick-item">صدقة الجمعة عبر BenefitPay</a>
            <a routerLink="/donate" class="uc-quick-item">صدقة الدفن عبر BenefitPay</a>
          </div>
        </aside>
      </div>
    </section>
  `,
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  campaign = {
    percent: 85,
    donors: 450,
    description: 'حملة جمع تبرعات لعلاج الشاب بشير عون المصاب بفشل كلوي',
  };
}
