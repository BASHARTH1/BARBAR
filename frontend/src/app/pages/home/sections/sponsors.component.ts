import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Partner {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section tight band sponsors">
      <div class="container">
        <div class="section-head">
          <h2>المؤسسات والشركات الداعمة</h2>
          <p class="thanks">❤️ شكـراً لكـم ❤️</p>
        </div>
        <div class="logos">
          @for (p of partners; track p.name) {
            <div class="logo" [attr.title]="p.name">
              <img [src]="p.logo" [alt]="p.name" loading="lazy" />
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .sponsors .section-head { text-align: center; margin-bottom: 36px; }
    .sponsors .section-head h2 { text-align: center; }
    .sponsors .section-head p.thanks {
      display: block;
      text-align: center;
      font-size: 22px;
      font-weight: 800;
      color: var(--color-primary-darker);
      margin: 12px auto 0;
      max-width: none;
      letter-spacing: 1px;
      direction: ltr;
      unicode-bidi: isolate;
    }
    .logos {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 24px;
      align-items: center;
    }
    .logo {
      background: #fff;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 18px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    }
    .logo:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-sm);
      border-color: var(--color-primary);
    }
    .logo img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      filter: grayscale(0.2);
      transition: filter 0.2s;
    }
    .logo:hover img { filter: grayscale(0); }
    @media (max-width: 980px) { .logos { grid-template-columns: repeat(4, 1fr); } }
    @media (max-width: 720px) { .logos { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 480px) { .logos { grid-template-columns: repeat(2, 1fr); } }
  `],
})
export class SponsorsComponent {
  partners: Partner[] = [
    { name: 'الأوقاف الجعفرية', logo: '/assets/partners/jaafari-awqaf.png' },
    { name: 'سهيلات Bahrain Credit', logo: '/assets/partners/bahrain-credit.png' },
    { name: 'الجامعة الخليجية', logo: '/assets/partners/gulf-university.png' },
    { name: 'MIBS', logo: '/assets/partners/mibs.png' },
    { name: 'الجواد - Al Hawaj', logo: '/assets/partners/al-hawaj.png' },
    { name: 'الناصر لتأجير معدات البناء', logo: '/assets/partners/al-nasser.png' },
    { name: 'مقاولات المحيط', logo: '/assets/partners/al-moheet.png' },
    { name: 'اليوسف القابضة', logo: '/assets/partners/alyusuf-holding.png' },
    { name: 'خليك العزيز', logo: '/assets/partners/khaleek-azeez.png' },
    { name: 'RTC', logo: '/assets/partners/rtc.png' },
  ];
}
