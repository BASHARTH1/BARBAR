import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="page-banner">
      <div class="container">
        <h1>تواصل معنا</h1>
        <nav class="crumbs"><a routerLink="/">الرئيسية</a> <span>›</span> تواصل معنا</nav>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="info">
          <h2>نسعد بسماعك</h2>
          <p>تواصل معنا عبر القنوات التالية وسيقوم فريقنا بالرد عليك في أقرب وقت.</p>

          <ul class="info-list">
            <li>
              <span class="ic">📍</span>
              <div>
                <strong>المقر الرئيسي</strong>
                <a [href]="mapsUrl" target="_blank" rel="noopener">قرية باربار، مملكة البحرين</a>
              </div>
            </li>
            <li>
              <span class="ic">📞</span>
              <div>
                <strong>اتصل بنا</strong>
                <a href="tel:+97317692555">17692555</a>
                <span class="sep">•</span>
                <a href="tel:+97339630122">39630122</a>
              </div>
            </li>
            <li>
              <span class="ic">✉️</span>
              <div>
                <strong>البريد الإلكتروني</strong>
                <a href="mailto:info@barbarcharity.org">info&#64;barbarcharity.org</a>
              </div>
            </li>
            <li>
              <span class="ic">💬</span>
              <div>
                <strong>واتساب</strong>
                <a href="https://api.whatsapp.com/send?phone=39630122" target="_blank" rel="noopener">تواصل عبر الواتساب</a>
              </div>
            </li>
          </ul>

          <div class="social">
            <strong>تابعنا</strong>
            <div class="social-links">
              <a href="https://www.facebook.com/barbarcharity" target="_blank" rel="noopener" aria-label="فيسبوك">f</a>
              <a href="https://x.com/barbar_charity" target="_blank" rel="noopener" aria-label="X">𝕏</a>
              <a href="https://www.instagram.com/barbar_charity" target="_blank" rel="noopener" aria-label="انستقرام">◎</a>
              <a href="https://www.youtube.com/channel/UCmszLIvi61EGjnDE7c0zAkQ" target="_blank" rel="noopener" aria-label="يوتيوب">▶</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section soft map-section">
      <div class="container">
        <div class="map-wrap">
          <iframe
            [src]="mapEmbedUrl"
            width="100%"
            height="420"
            style="border:0; display:block;"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="موقع جمعية باربار الخيرية على الخريطة"
            allowfullscreen></iframe>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-banner { background: linear-gradient(135deg, #154d77, #2A87C9); color: #fff; padding: 64px 0; text-align: center; h1 { font-size: 36px; color: #fff; } }
    .crumbs { font-size: 14px; opacity: 0.9; } .crumbs a { color: var(--color-accent); } .crumbs span { padding: 0 6px; }
    .info { max-width: 720px; margin: 0 auto; }
    .info h2 { color: var(--color-primary-dark); font-size: 28px; margin-bottom: 8px; text-align: center; }
    .info p { color: var(--color-text-muted); margin-bottom: 24px; text-align: center; }
    .info-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; }
    .info-list li {
      display: flex; gap: 14px; align-items: center;
      padding: 16px;
      background: var(--color-bg-soft);
      border-radius: var(--radius-md);
    }
    .info-list .ic {
      width: 44px; height: 44px;
      display: flex; align-items: center; justify-content: center;
      background: var(--color-primary-light);
      border-radius: 50%;
      font-size: 22px;
      flex-shrink: 0;
    }
    .info-list strong { display: block; color: var(--color-primary-dark); margin-bottom: 2px; }
    .info-list a { color: var(--color-text); transition: color 0.2s; }
    .info-list a:hover { color: var(--color-primary); }
    .info-list .sep { color: var(--color-text-muted); margin: 0 6px; }

    .social { margin-top: 28px; }
    .social strong { display: block; color: var(--color-primary-dark); margin-bottom: 10px; font-size: 14px; }
    .social-links { display: flex; gap: 10px; }
    .social-links a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--color-primary);
      color: #fff;
      font-weight: 900;
      font-size: 18px;
      transition: background 0.2s, transform 0.2s;
    }
    .social-links a:hover { background: var(--color-primary-darker); transform: translateY(-2px); }

    .map-section { padding-top: 0; }
    .map-wrap {
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--color-border);
    }

  `],
})
export class ContactComponent {
  private sanitizer = inject(DomSanitizer);

  readonly mapsUrl = 'https://www.google.com/maps/place/%D8%AC%D9%85%D8%B9%D9%8A%D8%A9+%D8%A8%D8%A7%D8%B1%D8%A8%D8%A7%D8%B1+%D8%A7%D9%84%D8%AE%D9%8A%D8%B1%D9%8A%D8%A9%E2%80%AD/@26.2305445,50.4793624,17z';
  readonly mapEmbedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://maps.google.com/maps?q=26.2305445,50.4793624&z=17&hl=ar&output=embed',
  );
}
