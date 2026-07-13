import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-president-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section president">
      <div class="container">
        <div class="msg-card">
          <img class="president-photo" src="assets/members/member-6.jpg" alt="علي سبت — رئيس جمعية باربار الخيرية الاجتماعية" loading="lazy" />
          <span class="eyebrow">كلمة رئيس الجمعية</span>
          <span class="quote-mark" aria-hidden="true">”</span>
          <div class="msg-body">
            <p class="basmala">بسم الله الرحمن الرحيم</p>
            <p>
              يسرنا أن ندشن اليوم الموقع الإلكتروني لجمعية باربار الخيرية الاجتماعية،
              ليكون نافذةً للتواصل، ومنصةً لخدمة المستفيدين، وجسرًا يربط الجمعية بأهل
              الخير والجهات الرسمية والإعلامية.
            </p>
            <p>
              ويأتي هذا المشروع امتدادًا لالتزام الجمعية بسياسة الجودة، القائمة على
              الشفافية، والتميز المؤسسي، والتطوير المستمر، وتيسير الوصول إلى خدماتنا
              بما يحقق أفضل خدمة للمستفيدين ويعزز ثقة شركائنا.
            </p>
            <p>
              نسأل الله أن يبارك في هذا العمل، وأن يجعله خالصًا لوجهه الكريم، وسببًا
              في خدمة الأسر المتعففة والمحتاجة.
            </p>
            <p>والسلام عليكم ورحمة الله وبركاته.</p>
          </div>
          <div class="signature">
            <span class="sig-name">علي سبت</span>
            <span class="sig-title">رئيس جمعية باربار الخيرية الاجتماعية</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .president { background: var(--color-primary-light); }
    .msg-card {
      position: relative;
      max-width: 860px;
      margin: 0 auto;
      background: #fff;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      border-top: 4px solid var(--color-primary);
      padding: 44px 48px 40px;
      overflow: hidden;
    }
    .president-photo {
      float: left;
      width: 148px;
      height: 148px;
      object-fit: cover;
      object-position: center top;
      border-radius: 50%;
      border: 4px solid #fff;
      box-shadow: var(--shadow-md), 0 0 0 2px var(--color-primary-light);
      margin-right: 28px;
      margin-bottom: 14px;
      position: relative;
      z-index: 1;
    }
    .eyebrow {
      display: inline-block;
      color: var(--color-accent-dark);
      font-weight: 700;
      letter-spacing: 1px;
      font-size: 14px;
      margin-bottom: 18px;
    }
    .quote-mark {
      position: absolute;
      top: 8px;
      inset-inline-end: 32px;
      font-size: 120px;
      line-height: 1;
      color: var(--color-primary-light);
      font-family: var(--font-display);
      pointer-events: none;
      z-index: 0;
    }
    .msg-body { position: relative; z-index: 1; }
    .msg-body p {
      color: var(--color-text);
      font-size: 17px;
      line-height: 2;
      margin: 0 0 16px;
    }
    .basmala {
      font-family: var(--font-display);
      font-weight: 800;
      color: var(--color-primary-dark);
      font-size: 19px !important;
    }
    .signature {
      margin-top: 26px;
      padding-top: 22px;
      border-top: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .sig-name {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 20px;
      color: var(--color-primary-darker);
    }
    .sig-title { color: var(--color-text-muted); font-size: 15px; font-weight: 600; }

    @media (max-width: 640px) {
      .msg-card { padding: 32px 22px 28px; }
      .msg-body p { font-size: 16px; }
      .quote-mark { font-size: 84px; inset-inline-end: 16px; }
      .president-photo {
        width: 104px;
        height: 104px;
        margin-right: 18px;
        margin-bottom: 10px;
      }
    }
  `],
})
export class PresidentMessageComponent {}
