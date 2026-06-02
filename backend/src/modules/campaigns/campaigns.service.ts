import { Injectable } from '@nestjs/common';

export interface Campaign {
  id: number;
  title: string;
  subtitle: string;
  amount: number;
  recurring: boolean;
  featured: boolean;
  badge?: string;
}

@Injectable()
export class CampaignsService {
  private readonly campaigns: Campaign[] = [
    { id: 1, title: 'صدقة الجمعة', subtitle: 'تبرع أسبوعي مبارك', amount: 5, recurring: true, featured: true, badge: 'أسبوعي' },
    { id: 2, title: 'كفالة دفن', subtitle: 'إعانة مصاريف الدفن للأسر المتعففة', amount: 50, recurring: false, featured: true },
    { id: 3, title: 'إفطار صائم', subtitle: 'وجبة إفطار لأسرة محتاجة', amount: 10, recurring: false, featured: true },
    { id: 4, title: 'كسوة العيد', subtitle: 'فرحة عيد لطفل يتيم', amount: 25, recurring: false, featured: true },
    { id: 5, title: 'صدقة جارية', subtitle: 'تبرع شهري مستمر', amount: 20, recurring: true, featured: false, badge: 'شهري' },
  ];

  findAll() {
    return this.campaigns;
  }

  findFeatured() {
    return this.campaigns.filter((c) => c.featured);
  }
}
