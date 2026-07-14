import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  scrolled = signal(false);
  mobileOpen = signal(false);
  openMenu = signal<string | null>(null);
  ibanCopied = signal(false);

  readonly iban = 'BH25BIBB00100000217748';

  links: NavLink[] = [
    { label: 'الرئيسية', path: '/' },
    {
      label: 'من نحن',
      path: '/about',
      children: [
        { label: 'نبذة عن الجمعية', path: '/about' },
        { label: 'مجلس الإدارة', path: '/team' },
        { label: 'سياسة الجودة', path: '/quality' },
      ],
    },
    {
      label: 'الخدمات الرقمية',
      path: '/projects',
      children: [
        { label: 'تسجيل وتجديد العضوية', path: 'https://docs.google.com/forms/d/e/1FAIpQLSdUx_xMMNzjGqXo9O7vkzssZj1UIUaSozn47c5qDNOdcetOFg/viewform' },
        { label: 'طلب مساعدة إجتماعية', path: 'https://e.barbarcharity.org/OnlineServices/aid_soc.php' },
        { label: 'مشروع كنوز العطاء', path: 'https://docs.google.com/forms/d/e/1FAIpQLSftIxJWNzpzFe-UXMc5-cPEy_W8FaIUdNr6LHj7TPO01cTWEg/viewform' },
      ],
    },
    { label: 'الفعاليات', path: '/events' },
    { label: 'الأخبار', path: '/news' },
    { label: 'تواصل معنا', path: '/contact' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 8);
  }

  toggleMobile() {
    this.mobileOpen.update((v) => !v);
  }

  toggleSubmenu(label: string) {
    this.openMenu.update((v) => (v === label ? null : label));
  }

  closeAll() {
    this.mobileOpen.set(false);
    this.openMenu.set(null);
  }

  isExternal(path: string): boolean {
    return /^https?:\/\//.test(path);
  }

  async copyIban() {
    try {
      await navigator.clipboard.writeText(this.iban);
    } catch {
      const el = document.createElement('textarea');
      el.value = this.iban;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    this.ibanCopied.set(true);
    setTimeout(() => this.ibanCopied.set(false), 2000);
  }
}
