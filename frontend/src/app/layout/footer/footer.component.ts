import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  year = new Date().getFullYear();

  // Web3Forms access key — get yours free at https://web3forms.com (tied to your email)
  private readonly web3formsKey = '7e1d9fd9-3c37-409a-ad4a-479b5d6fb57c';

  leadName = '';
  leadEmail = '';
  leadPhone = '';
  rating = signal(0);
  hoverRating = signal(0);
  readonly stars = [1, 2, 3, 4, 5];

  sending = signal(false);
  sent = signal(false);
  error = signal('');

  setRating(value: number) {
    this.rating.set(value);
  }

  private validEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  async submitLead() {
    this.error.set('');
    if (this.leadName.trim().length < 2 || this.leadPhone.trim().length < 6) {
      this.error.set('يرجى إدخال الاسم ورقم الهاتف بشكل صحيح.');
      return;
    }
    if (this.leadEmail.trim() && !this.validEmail(this.leadEmail)) {
      this.error.set('يرجى إدخال بريد إلكتروني صحيح.');
      return;
    }
    this.sending.set(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: this.web3formsKey,
          subject: 'طلب تصميم موقع جديد - من موقع باربار',
          from_name: 'موقع جمعية باربار',
          الاسم: this.leadName.trim(),
          البريد_الإلكتروني: this.leadEmail.trim() || 'غير مُدخل',
          رقم_الهاتف: this.leadPhone.trim(),
          التقييم: this.rating() ? `${this.rating()} / 5` : 'بدون تقييم',
        }),
      });
      const data = await res.json();
      if (data.success) {
        this.sent.set(true);
        this.leadName = '';
        this.leadEmail = '';
        this.leadPhone = '';
        this.rating.set(0);
      } else {
        this.error.set('تعذّر الإرسال، حاول مرة أخرى لاحقًا.');
      }
    } catch {
      this.error.set('تعذّر الإرسال، تحقق من الاتصال وحاول مجددًا.');
    } finally {
      this.sending.set(false);
    }
  }
}
