import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
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
            <a href="https://e.barbarcharity.org/OnlineServices/don_online_payment.php?NewTransaction=1&donParam=NQ==" class="btn btn-accent btn-lg">التبرع المباشر</a>
            <a href="https://e.barbarcharity.org/OnlineServices/don_online_payment.php?NewTransaction=1" target="_blank" rel="noopener" class="btn btn-ghost btn-lg">التبرع لمشاريعنا</a>
          </div>
        </div>

        <aside class="urgent-card">
          <header class="uc-head">
            <span class="uc-title">حملة تبرع</span>
            <span class="uc-badge">حالة عاجلة</span>
          </header>

          <div class="uc-cost">
            <span class="uc-cost-label">تكلفة العلاج</span>
            <span class="uc-cost-amount">-</span>
            <span class="uc-cost-currency">دينار بحريني</span>
          </div>

          <div class="uc-progress"><div class="uc-bar" [style.width.%]="campaign.percent"></div></div>
          <div class="uc-meta">
            <span>{{ campaign.donors }} المتبرعون</span>
            <span class="uc-pct">{{ campaign.percent }}%</span>
          </div>

          <button type="button" class="uc-cta" (click)="openNoCampaign()">تبرع الآن</button>

          <div class="uc-quick-list">
            <a href="https://e.barbarcharity.org/u/sadaqat" target="_blank" rel="noopener" class="uc-quick-item">صدقة الجمعة</a>
            <a href="https://e.barbarcharity.org/u/sadaqat" target="_blank" rel="noopener" class="uc-quick-item">صدقة الدفن</a>
          </div>
        </aside>
      </div>
    </section>

    @if (noCampaignOpen()) {
      <div class="nc-overlay" (click)="closeNoCampaign()">
        <div class="nc-modal" role="dialog" aria-modal="true" (click)="$event.stopPropagation()">
          <button type="button" class="nc-close" (click)="closeNoCampaign()" aria-label="إغلاق">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div class="nc-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          </div>
          <p class="nc-msg">عذرًا، لا توجد حملات تبرع عاجلة حاليًا</p>
          <button type="button" class="btn btn-primary" (click)="closeNoCampaign()">حسنًا</button>
        </div>
      </div>
    }
  `,
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  campaign = {
    percent: 85,
    donors: 450,
  };

  noCampaignOpen = signal(false);

  openNoCampaign() {
    this.noCampaignOpen.set(true);
  }

  closeNoCampaign() {
    this.noCampaignOpen.set(false);
  }
}
