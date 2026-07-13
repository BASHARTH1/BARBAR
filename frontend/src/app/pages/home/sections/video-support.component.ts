import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-support',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section video-support">
      <span class="bg-blob blob-1" aria-hidden="true"></span>
      <span class="bg-blob blob-2" aria-hidden="true"></span>

      <div class="container">
        <div class="section-head">
          <h2>فيديو معــاً لدعم الخير</h2>
        </div>

        <div class="vs-card">
          <div class="vs-grid">
            <div class="vs-info">
              <span class="vs-tag">
                <span class="dot"></span>
                نشاطات الجمعية
              </span>
              <h3>كل دقيقة تشاهدها قد تتحوّل إلى أمل لأسرة محتاجة</h3>
              <p>
                نوثّق رحلتنا في خدمة الأسر المتعففة وتنفيذ المشاريع الخيرية.
              </p>

              <ul class="features">
                <li>
                  <span class="ico">◆</span>
                  مشاريع موثّقة بالصوت والصورة
                </li>
                <li>
                  <span class="ico">◆</span>
                  شهادات مباشرة من المستفيدين
                </li>
                <li>
                  <span class="ico">◆</span>
                  تقارير دورية للمتبرعين
                </li>
              </ul>
            </div>

            <div class="vs-video">
              <div class="video-frame">
                <iframe
                  src="https://www.youtube.com/embed/o00sOPEEXFY"
                  title="جمعية باربار الخيرية"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .video-support {
      position: relative;
      overflow: hidden;
      background:
        linear-gradient(180deg, #f3f9fd 0%, #e8f3fb 100%);
    }

    .bg-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(60px);
      opacity: 0.55;
      pointer-events: none;
      z-index: 0;
    }
    .blob-1 {
      width: 380px; height: 380px;
      background: radial-gradient(circle, rgba(42,135,201,0.35), transparent 70%);
      top: -120px;
      inset-inline-end: -100px;
    }
    .blob-2 {
      width: 320px; height: 320px;
      background: radial-gradient(circle, rgba(21,77,119,0.25), transparent 70%);
      bottom: -120px;
      inset-inline-start: -80px;
    }

    .container { position: relative; z-index: 1; }

    .section-head { margin-bottom: 48px; }

    .vs-card {
      background: #fff;
      border-radius: 28px;
      box-shadow: 0 30px 80px rgba(21, 77, 119, 0.14);
      border: 1px solid rgba(42, 135, 201, 0.12);
      overflow: hidden;
      position: relative;
    }
    .vs-card::before {
      content: '';
      position: absolute;
      inset-inline-start: 0;
      top: 0;
      width: 6px;
      height: 100%;
      background: linear-gradient(180deg, var(--color-primary), var(--color-primary-darker));
    }

    .vs-grid {
      display: grid;
      grid-template-columns: 1fr 1.15fr;
      gap: 56px;
      align-items: center;
      padding: 56px;
    }

    /* ===== Info side ===== */
    .vs-info { padding-inline-end: 8px; }

    .vs-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--color-primary-light);
      color: var(--color-primary-darker);
      font-weight: 700;
      font-size: 13px;
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      margin-bottom: 18px;
    }
    .vs-tag .dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--color-primary);
      box-shadow: 0 0 0 4px rgba(42, 135, 201, 0.18);
      animation: pulse 1.8s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 4px rgba(42, 135, 201, 0.18); }
      50% { box-shadow: 0 0 0 8px rgba(42, 135, 201, 0.05); }
    }

    .vs-info h3 {
      font-size: clamp(20px, 2vw, 26px);
      color: var(--color-primary-darker);
      line-height: 1.45;
      margin: 0 0 14px;
      font-weight: 800;
    }
    .vs-info > p {
      color: var(--color-text-muted);
      font-size: 16px;
      margin: 0 0 22px;
      line-height: 1.85;
    }

    .features {
      list-style: none;
      padding: 0;
      margin: 0 0 28px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .features li {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
      color: var(--color-text);
      font-size: 15px;
    }
    .features .ico {
      width: 32px; height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      background: var(--color-primary-light);
      color: var(--color-primary);
      font-size: 12px;
      flex-shrink: 0;
    }


    /* ===== Video side ===== */
    .vs-video { position: relative; }
    .vs-video::before {
      content: '';
      position: absolute;
      inset: -14px;
      border-radius: 24px;
      background: linear-gradient(135deg, rgba(42,135,201,0.18), rgba(21,77,119,0.08));
      z-index: 0;
    }
    .video-frame {
      position: relative;
      aspect-ratio: 16 / 9;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 24px 60px rgba(21, 77, 119, 0.22);
      background: #000;
      z-index: 1;
    }
    .video-frame iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }

    @media (max-width: 980px) {
      .vs-grid {
        grid-template-columns: 1fr;
        gap: 40px;
        padding: 36px 28px;
      }
      .vs-video { order: -1; }
    }
    @media (max-width: 600px) {
      .vs-card { border-radius: 20px; }
      .vs-grid { padding: 28px 20px; }
    }
  `],
})
export class VideoSupportComponent {}
