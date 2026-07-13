import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Program {
  id: string;
  title: string;
  description: string;
  icon: 'medical' | 'mosque' | 'home' | 'heart';
  tone: 'lavender' | 'mint' | 'peach' | 'sky';
  link?: string;
}

@Component({
  selector: 'app-donation-hub',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="section soft donation-hub">
      <div class="container">
        <div class="section-head">
          <h2>أبواب الخير لديك متعددة</h2>
        </div>

        <div class="grid cols-4">
          @for (p of programs; track p.id) {
            <article class="program-card" [attr.data-tone]="p.tone">
              <div class="icon">
                @switch (p.icon) {
                  @case ('medical') {
                    <svg viewBox="0 0 48 48" fill="none">
                      <path d="M30 8l10 10-18 18-10 2 2-10L30 8z" stroke="#154d77" stroke-width="2.5" stroke-linejoin="round"/>
                      <path d="M26 12l10 10" stroke="#154d77" stroke-width="2.5"/>
                    </svg>
                  }
                  @case ('mosque') {
                    <svg viewBox="0 0 48 48" fill="none">
                      <path d="M8 40V24c0-6 7-10 16-10s16 4 16 10v16" stroke="#154d77" stroke-width="2.5" stroke-linejoin="round"/>
                      <circle cx="24" cy="10" r="2" fill="#154d77"/>
                      <path d="M24 6v6M14 40v-8a4 4 0 014-4M34 40v-8a4 4 0 00-4-4M22 40v-6a2 2 0 014 0v6" stroke="#154d77" stroke-width="2.5" stroke-linecap="round"/>
                    </svg>
                  }
                  @case ('home') {
                    <svg viewBox="0 0 48 48" fill="none">
                      <path d="M8 22L24 8l16 14v18a2 2 0 01-2 2H10a2 2 0 01-2-2V22z" stroke="#154d77" stroke-width="2.5" stroke-linejoin="round"/>
                      <path d="M20 42V28h8v14" stroke="#154d77" stroke-width="2.5"/>
                    </svg>
                  }
                  @case ('heart') {
                    <svg viewBox="0 0 48 48" fill="none">
                      <path d="M24 40C10 30 4 22 4 14c0-5 4-9 9-9 4 0 8 2 11 6 3-4 7-6 11-6 5 0 9 4 9 9 0 8-6 16-20 26z" stroke="#154d77" stroke-width="2.5" stroke-linejoin="round"/>
                    </svg>
                  }
                }
              </div>
              <h3>{{ p.title }}</h3>
              <p class="desc">{{ p.description }}</p>
              @if (p.link) {
                <a [href]="p.link" target="_blank" rel="noopener" class="donate-link">تبـرع الآن ←</a>
              } @else {
                <a routerLink="/donate" [queryParams]="{program: p.id}" class="donate-link">تبـرع الآن ←</a>
              }
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .donation-hub { position: relative; }
    .program-card {
      padding: 36px 26px 28px;
      border-radius: var(--radius-lg);
      text-align: center;
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: transform 0.25s, box-shadow 0.25s;
      &:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); }

      .icon {
        width: 72px;
        height: 72px;
        margin: 0 auto 18px;
        background: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 16px rgba(21, 77, 119, 0.10);
      }
      .icon svg { width: 36px; height: 36px; }

      h3 {
        color: var(--color-primary-darker);
        font-size: 20px;
        font-weight: 900;
        margin: 0 0 12px;
      }
      .desc {
        color: var(--color-text);
        font-size: 14px;
        line-height: 1.85;
        margin: 0 0 18px;
      }
      .donate-link {
        display: inline-block;
        margin-top: auto;
        color: var(--color-primary);
        font-weight: 800;
        font-size: 14px;
        padding: 6px 4px;
        transition: color 0.2s, transform 0.2s;
        &:hover { color: var(--color-primary-darker); transform: translateX(4px); }
      }
    }

    .program-card[data-tone="lavender"] { background: #e9e8ff; }
    .program-card[data-tone="mint"]     { background: #d8f0e6; }
    .program-card[data-tone="peach"]    { background: #fce8d4; }
    .program-card[data-tone="sky"]      { background: #dbe7f5; }

  `],
})
export class DonationHubComponent {
  programs: Program[] = [
    {
      id: 'medical',
      title: 'الجراحة والعلاج',
      icon: 'medical',
      tone: 'lavender',
      description: 'نسعى لتخفيف معاناة المرضى من ذوي الدخل المحدود عبر دعمهم بتكاليف العمليات الجراحية والعلاجات الضرورية، لنمنحهم فرصة حقيقية لاستعادة صحتهم ومتابعة حياتهم بكرامة وأمل',
      link: 'https://e.barbarcharity.org/u/elaj',
    },
    {
      id: 'mosques',
      title: 'صيانة المساجد والمقابر',
      icon: 'mosque',
      tone: 'mint',
      description: 'نوفّر الدعم اللازم لصيانة المساجد والمقابر، من خلال أعمال الترميم والتجهيز وتوفير المستلزمات الأساسية، للحفاظ على قدسية المكان وخدمة المجتمع وتعزيز قيم التكافل',
      link: 'https://e.barbarcharity.org/u/maqbara',
    },
    {
      id: 'housing',
      title: 'الترميم والبناء',
      icon: 'home',
      tone: 'peach',
      description: 'نعمل على إعادة ترميم البيوت المتضررة وبناء مساكن آمنة للأسر المحتاجة، لنضمن لهم بيئة مستقرة تحفظ كرامتهم وتوفر لهم حياة أكثر راحة وأمانًا',
      link: 'https://e.barbarcharity.org/u/benaamptrmem',
    },
    {
      id: 'marriage',
      title: 'الزواج',
      icon: 'heart',
      tone: 'sky',
      description: 'نقدّم المساندة للشباب المقبلين على الزواج ممّن يواجهون صعوبات مادية، عبر المساهمة في تكاليف تجهيزهم، لنساعدهم في بناء حياة كريمة وبداية مستقرة',
      link: 'https://e.barbarcharity.org/u/sadaqat',
    },
  ];
}
