import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { EventsService, CharityEvent } from '../../../core/services/events.service';

type EventForm = Omit<CharityEvent, 'id'>;

const ARABIC_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

function pad2(n: number | string): string {
  return String(n).padStart(2, '0');
}

function dateFieldsToValue(day: string, month: string, year: string): string {
  const mi = ARABIC_MONTHS.indexOf(month);
  if (mi < 0 || !day || !year) return '';
  return `${year}-${pad2(mi + 1)}-${pad2(day)}`;
}

function valueToDateFields(value: string): { day: string; month: string; year: string } {
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return { day: '', month: '', year: '' };
  return { year: m[1], month: ARABIC_MONTHS[Number(m[2]) - 1] ?? '', day: m[3] };
}

function to12(h24: number): number {
  const h = h24 % 12;
  return h === 0 ? 12 : h;
}

function periodOf(h24: number): 'صباحاً' | 'مساءً' {
  return h24 < 12 ? 'صباحاً' : 'مساءً';
}

function formatTimeRange(start: string, end?: string): string {
  if (!start) return '';
  const [sh, sm] = start.split(':').map(Number);
  const sDisp = `${to12(sh)}:${pad2(sm)}`;
  const sPeriod = periodOf(sh);
  if (!end) return `${sDisp} ${sPeriod}`;
  const [eh, em] = end.split(':').map(Number);
  const eDisp = `${to12(eh)}:${pad2(em)}`;
  const ePeriod = periodOf(eh);
  if (sPeriod === ePeriod) return `${sDisp} - ${eDisp} ${sPeriod}`;
  return `${sDisp} ${sPeriod} - ${eDisp} ${ePeriod}`;
}

function parseTimeRange(text: string): { start: string; end: string } {
  if (!text) return { start: '', end: '' };
  const m = text.match(/(\d{1,2}):(\d{2})(?:\s*-\s*(\d{1,2}):(\d{2}))?/);
  if (!m) return { start: '', end: '' };
  const pm = /مساء/.test(text);
  const adj = (h: number) => {
    if (pm && h < 12) return h + 12;
    if (!pm && h === 12) return 0;
    return h;
  };
  const start = `${pad2(adj(Number(m[1])))}:${pad2(m[2])}`;
  if (!m[3]) return { start, end: '' };
  const end = `${pad2(adj(Number(m[3])))}:${pad2(m[4])}`;
  return { start, end };
}

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="page-banner">
      <div class="container">
        <h1>إدارة الفعاليات</h1>
        <nav class="crumbs">
          <a routerLink="/">الرئيسية</a> <span>›</span>
          <a routerLink="/events">الفعاليات</a> <span>›</span>
          إدارة
        </nav>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="toolbar">
          <div>
            <h2>قائمة الفعاليات</h2>
            <p class="hint">يمكنك إضافة، تعديل، أو حذف الفعاليات الظاهرة في صفحة الفعاليات.</p>
          </div>
          <div class="toolbar-actions">
            <button class="btn btn-primary" (click)="openNew()">+ إضافة فعالية</button>
            <button class="btn btn-ghost" (click)="signOut()">تسجيل الخروج</button>
          </div>
        </div>

        @if (loading()) {
          <p class="state">جارٍ التحميل...</p>
        } @else if (error()) {
          <div class="alert err">{{ error() }}</div>
        } @else if (events().length === 0) {
          <p class="state">لا توجد فعاليات بعد. ابدأ بإضافة فعالية.</p>
        } @else {
          <div class="grid cols-2">
            @for (e of events(); track e.id) {
              <article class="row-card">
                <div class="thumb"><img [src]="e.image" [alt]="e.title" loading="lazy" /></div>
                <div class="info">
                  <span class="tag">{{ e.tag }}</span>
                  <h3>{{ e.title }}</h3>
                  <p class="meta">{{ e.day }} {{ e.month }} {{ e.year }} • {{ e.time }}</p>
                  <p class="meta">{{ e.location }}</p>
                  <div class="row-actions">
                    <button class="btn btn-outline btn-sm" (click)="openEdit(e)">تعديل</button>
                    <button class="btn btn-danger btn-sm" (click)="onDelete(e)">حذف</button>
                  </div>
                </div>
              </article>
            }
          </div>
        }
      </div>
    </section>

    @if (showForm()) {
      <div class="modal-backdrop" (click)="closeForm()">
        <div class="modal" (click)="$event.stopPropagation()">
          <header class="modal-head">
            <h3>{{ editingId() ? 'تعديل فعالية' : 'إضافة فعالية' }}</h3>
            <button class="x" (click)="closeForm()" aria-label="إغلاق">✕</button>
          </header>

          <form class="modal-body" (ngSubmit)="onSave()" #f="ngForm">
            <label>
              <span>العنوان</span>
              <input name="title" [(ngModel)]="form.title" required />
            </label>

            <label>
              <span>الوصف</span>
              <textarea name="description" [(ngModel)]="form.description" rows="3" required></textarea>
            </label>

            <div class="grid-2">
              <label>
                <span>التاريخ</span>
                <input name="dateValue" type="date" [(ngModel)]="dateValue" required />
              </label>
              <label>
                <span>المكان</span>
                <input name="location" [(ngModel)]="form.location" required />
              </label>
            </div>

            <div class="grid-2">
              <label>
                <span>من الساعة</span>
                <input name="startTime" type="time" [(ngModel)]="startTime" required />
              </label>
              <label>
                <span>إلى الساعة <small>(اختياري)</small></span>
                <input name="endTime" type="time" [(ngModel)]="endTime" />
              </label>
            </div>

            <label>
              <span>التصنيف</span>
              <input name="tag" [(ngModel)]="form.tag" required />
            </label>

            <div class="image-field">
              <span class="lbl">صورة الفعالية</span>
              @if (imagePreview() || form.image) {
                <div class="image-preview">
                  <img [src]="imagePreview() || form.image" alt="معاينة" />
                </div>
              }
              <label class="file-btn">
                <input type="file" accept="image/*" (change)="onPickImage($event)" hidden />
                <span class="btn btn-outline btn-sm">{{ (imagePreview() || form.image) ? 'تغيير الصورة' : 'اختيار صورة' }}</span>
              </label>
              @if (uploading()) {
                <span class="upload-state">جارٍ الرفع...</span>
              }
            </div>

            @if (formError()) {
              <div class="alert err">{{ formError() }}</div>
            }

            <div class="modal-actions">
              <button type="button" class="btn btn-ghost" (click)="closeForm()">إلغاء</button>
              <button type="submit" class="btn btn-primary" [disabled]="saving() || !f.valid">
                {{ saving() ? 'جارٍ الحفظ...' : 'حفظ' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
  styles: [`
    .page-banner {
      background: linear-gradient(135deg, #154d77, #2A87C9);
      color: #fff;
      padding: 64px 0;
      text-align: center;
      h1 { font-size: 36px; margin-bottom: 8px; color: #fff; }
    }
    .crumbs { font-size: 14px; opacity: 0.9; }
    .crumbs a { color: var(--color-accent); }
    .crumbs span { padding: 0 6px; }

    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 16px;
      margin-bottom: 28px;
      flex-wrap: wrap;
    }
    .toolbar h2 { margin: 0 0 6px; color: var(--color-primary-darker); font-size: 22px; font-weight: 900; }
    .hint { color: var(--color-text-muted); font-size: 14px; margin: 0; }
    .toolbar-actions { display: flex; gap: 10px; }

    .state { text-align: center; color: var(--color-text-muted); padding: 40px 0; }

    .row-card {
      display: flex;
      gap: 16px;
      background: #fff;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
    }
    .thumb { flex: 0 0 140px; }
    .thumb img { width: 140px; height: 100%; object-fit: cover; display: block; }
    .info { flex: 1; padding: 16px 18px; display: flex; flex-direction: column; gap: 6px; }
    .info h3 { margin: 0; color: var(--color-primary-darker); font-size: 17px; font-weight: 900; }
    .info .tag {
      align-self: flex-start;
      background: var(--color-primary);
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: var(--radius-pill);
    }
    .meta { margin: 0; color: var(--color-text-muted); font-size: 13px; }
    .row-actions { margin-top: 8px; display: flex; gap: 8px; }

    .btn-sm { padding: 6px 14px; font-size: 13px; }
    .btn-danger {
      background: #d32f2f;
      color: #fff;
      border: 1px solid #d32f2f;
    }
    .btn-danger:hover { background: #b71c1c; border-color: #b71c1c; }

    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
    }
    .modal {
      background: #fff;
      width: 100%;
      max-width: 640px;
      max-height: 90vh;
      overflow: auto;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
    }
    .modal-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 22px;
      border-bottom: 1px solid var(--color-border);
    }
    .modal-head h3 { margin: 0; color: var(--color-primary-darker); font-size: 19px; font-weight: 900; }
    .x { background: none; border: none; font-size: 18px; cursor: pointer; color: var(--color-text-muted); }

    .modal-body { padding: 22px; display: flex; flex-direction: column; gap: 14px; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
    label { display: flex; flex-direction: column; gap: 6px; font-size: 13px; font-weight: 700; color: var(--color-text); }
    input, textarea {
      padding: 10px 12px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: 14px;
      font-family: inherit;
      resize: vertical;
    }
    input:focus, textarea:focus { outline: none; border-color: var(--color-primary); }

    .alert.err { background: #fdecea; color: #b71c1c; padding: 10px 14px; border-radius: var(--radius-md); font-size: 14px; }

    .image-field { display: flex; flex-direction: column; gap: 10px; }
    .image-field .lbl { font-size: 13px; font-weight: 700; color: var(--color-text); }
    .image-preview {
      width: 100%;
      max-width: 320px;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);
      background: var(--color-bg-muted, #eef2f6);
    }
    .image-preview img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .file-btn { display: inline-block; cursor: pointer; }
    .file-btn .btn { display: inline-block; }
    .upload-state { font-size: 13px; color: var(--color-text-muted); }

    .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 6px; }

    @media (max-width: 600px) {
      .grid-2, .grid-3 { grid-template-columns: 1fr; }
      .row-card { flex-direction: column; }
      .thumb { flex: none; }
      .thumb img { width: 100%; height: 180px; }
    }
  `],
})
export class AdminEventsComponent implements OnInit {
  events = signal<CharityEvent[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  showForm = signal(false);
  editingId = signal<string | null>(null);
  saving = signal(false);
  uploading = signal(false);
  formError = signal<string | null>(null);
  imagePreview = signal<string | null>(null);
  pendingFile: File | null = null;

  form: EventForm = this.emptyForm();
  dateValue = '';
  startTime = '';
  endTime = '';

  constructor(
    private eventsService: EventsService,
    private auth: AuthService,
    private router: Router,
  ) {}

  async ngOnInit() {
    await this.reload();
  }

  async reload() {
    this.loading.set(true);
    this.error.set(null);
    try {
      this.events.set(await this.eventsService.list());
    } catch (e: any) {
      this.error.set(e?.message ?? 'تعذّر تحميل الفعاليات.');
    } finally {
      this.loading.set(false);
    }
  }

  openNew() {
    this.editingId.set(null);
    this.form = this.emptyForm();
    this.dateValue = '';
    this.startTime = '';
    this.endTime = '';
    this.pendingFile = null;
    this.imagePreview.set(null);
    this.formError.set(null);
    this.showForm.set(true);
  }

  openEdit(e: CharityEvent) {
    this.editingId.set(e.id!);
    this.form = {
      slug: e.slug,
      title: e.title,
      description: e.description,
      day: e.day,
      month: e.month,
      year: e.year,
      time: e.time,
      location: e.location,
      tag: e.tag,
      image: e.image,
      sort_order: e.sort_order,
    };
    this.dateValue = dateFieldsToValue(e.day, e.month, e.year);
    const t = parseTimeRange(e.time);
    this.startTime = t.start;
    this.endTime = t.end;
    this.pendingFile = null;
    this.imagePreview.set(null);
    this.formError.set(null);
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
  }

  onPickImage(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.pendingFile = file;
    const reader = new FileReader();
    reader.onload = () => this.imagePreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  async onSave() {
    if (!this.form.image && !this.pendingFile) {
      this.formError.set('الرجاء اختيار صورة للفعالية.');
      return;
    }
    if (!this.dateValue) {
      this.formError.set('الرجاء اختيار التاريخ.');
      return;
    }
    if (!this.startTime) {
      this.formError.set('الرجاء اختيار وقت البداية.');
      return;
    }

    const dateFields = valueToDateFields(this.dateValue);
    this.form.day = dateFields.day;
    this.form.month = dateFields.month;
    this.form.year = dateFields.year;
    this.form.time = formatTimeRange(this.startTime, this.endTime || undefined);

    if (!this.editingId() && !this.form.slug) {
      this.form.slug = `event-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    }

    this.saving.set(true);
    this.formError.set(null);
    try {
      if (this.pendingFile) {
        this.uploading.set(true);
        this.form.image = await this.eventsService.uploadImage(this.pendingFile);
        this.uploading.set(false);
      }

      const id = this.editingId();
      if (id) {
        await this.eventsService.update(id, this.form);
      } else {
        await this.eventsService.create(this.form);
      }
      this.showForm.set(false);
      await this.reload();
    } catch (e: any) {
      this.formError.set(e?.message ?? 'تعذّر الحفظ.');
    } finally {
      this.saving.set(false);
      this.uploading.set(false);
    }
  }

  async onDelete(e: CharityEvent) {
    if (!confirm(`هل أنت متأكد من حذف "${e.title}"؟`)) return;
    try {
      await this.eventsService.remove(e.id!);
      await this.reload();
    } catch (err: any) {
      this.error.set(err?.message ?? 'تعذّر الحذف.');
    }
  }

  async signOut() {
    await this.auth.signOut();
    this.router.navigateByUrl('/admin/login');
  }

  private emptyForm(): EventForm {
    return {
      slug: '',
      title: '',
      description: '',
      day: '',
      month: '',
      year: '',
      time: '',
      location: '',
      tag: '',
      image: '',
      sort_order: 0,
    };
  }
}
