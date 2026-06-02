import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TeamService, TeamMember } from '../../../core/services/team.service';

type TeamForm = Omit<TeamMember, 'id'>;

@Component({
  selector: 'app-admin-team',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="page-banner">
      <div class="container">
        <h1>إدارة مجلس الإدارة</h1>
        <nav class="crumbs">
          <a routerLink="/">الرئيسية</a> <span>›</span>
          <a routerLink="/team">مجلس الإدارة</a> <span>›</span>
          إدارة
        </nav>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="toolbar">
          <div>
            <h2>قائمة الأعضاء</h2>
            <p class="hint">يمكنك إضافة، تعديل، أو حذف أعضاء مجلس الإدارة. صاحب أقل ترتيب يظهر كرئيس في الأعلى.</p>
          </div>
          <div class="toolbar-actions">
            <button class="btn btn-primary" (click)="openNew()">+ إضافة عضو</button>
            <button class="btn btn-ghost" (click)="signOut()">تسجيل الخروج</button>
          </div>
        </div>

        @if (loading()) {
          <p class="state">جارٍ التحميل...</p>
        } @else if (error()) {
          <div class="alert err">{{ error() }}</div>
        } @else if (members().length === 0) {
          <p class="state">لا يوجد أعضاء بعد. ابدأ بإضافة عضو.</p>
        } @else {
          <div class="grid cols-2">
            @for (m of members(); track m.id) {
              <article class="row-card">
                <div class="thumb"><img [src]="m.image" [alt]="m.name" loading="lazy" /></div>
                <div class="info">
                  <span class="tag">ترتيب: {{ m.sort_order }}</span>
                  <h3>{{ m.name }}</h3>
                  <p class="meta">{{ m.role }}</p>
                  <div class="row-actions">
                    <button class="btn btn-outline btn-sm" (click)="openEdit(m)">تعديل</button>
                    <button class="btn btn-danger btn-sm" (click)="onDelete(m)">حذف</button>
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
            <h3>{{ editingId() ? 'تعديل عضو' : 'إضافة عضو' }}</h3>
            <button class="x" (click)="closeForm()" aria-label="إغلاق">✕</button>
          </header>

          <form class="modal-body" (ngSubmit)="onSave()" #f="ngForm">
            <label>
              <span>الاسم</span>
              <input name="name" [(ngModel)]="form.name" required />
            </label>

            <div class="grid-2">
              <label>
                <span>المنصب</span>
                <input name="role" [(ngModel)]="form.role" placeholder="رئيس مجلس الإدارة، أمين السر..." required />
              </label>
              <label>
                <span>الترتيب <small>(الأصغر يظهر أولاً)</small></span>
                <input name="sort_order" type="number" [(ngModel)]="form.sort_order" required />
              </label>
            </div>

            <div class="image-field">
              <span class="lbl">صورة العضو</span>
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
      h1 { font-size: 36px; margin-bottom: 8px; }
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
    .thumb { flex: 0 0 120px; }
    .thumb img { width: 120px; height: 100%; object-fit: cover; display: block; }
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
      max-width: 240px;
      aspect-ratio: 3 / 4;
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
      .grid-2 { grid-template-columns: 1fr; }
      .row-card { flex-direction: column; }
      .thumb { flex: none; }
      .thumb img { width: 100%; height: 200px; }
    }
  `],
})
export class AdminTeamComponent implements OnInit {
  members = signal<TeamMember[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  showForm = signal(false);
  editingId = signal<string | null>(null);
  saving = signal(false);
  uploading = signal(false);
  formError = signal<string | null>(null);
  imagePreview = signal<string | null>(null);
  pendingFile: File | null = null;

  form: TeamForm = this.emptyForm();

  constructor(
    private teamService: TeamService,
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
      this.members.set(await this.teamService.list());
    } catch (e: any) {
      this.error.set(e?.message ?? 'تعذّر تحميل الأعضاء.');
    } finally {
      this.loading.set(false);
    }
  }

  openNew() {
    this.editingId.set(null);
    this.form = this.emptyForm();
    this.pendingFile = null;
    this.imagePreview.set(null);
    this.formError.set(null);
    this.showForm.set(true);
  }

  openEdit(m: TeamMember) {
    this.editingId.set(m.id!);
    this.form = {
      name: m.name,
      role: m.role,
      image: m.image,
      sort_order: m.sort_order ?? 0,
    };
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
      this.formError.set('الرجاء اختيار صورة للعضو.');
      return;
    }

    this.saving.set(true);
    this.formError.set(null);
    try {
      if (this.pendingFile) {
        this.uploading.set(true);
        this.form.image = await this.teamService.uploadImage(this.pendingFile);
        this.uploading.set(false);
      }

      const id = this.editingId();
      if (id) {
        await this.teamService.update(id, this.form);
      } else {
        await this.teamService.create(this.form);
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

  async onDelete(m: TeamMember) {
    if (!confirm(`هل أنت متأكد من حذف "${m.name}"؟`)) return;
    try {
      await this.teamService.remove(m.id!);
      await this.reload();
    } catch (err: any) {
      this.error.set(err?.message ?? 'تعذّر الحذف.');
    }
  }

  async signOut() {
    await this.auth.signOut();
    this.router.navigateByUrl('/admin/login');
  }

  private emptyForm(): TeamForm {
    return {
      name: '',
      role: '',
      image: '',
      sort_order: 0,
    };
  }
}
