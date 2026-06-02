import { Injectable } from '@nestjs/common';

export interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  image: string;
}

@Injectable()
export class NewsService {
  private readonly items: NewsItem[] = [
    {
      slug: 'ramadan-iftar-2026',
      title: 'حملة إفطار صائم تصل إلى 12,000 وجبة',
      excerpt: 'أعلنت الجمعية عن نتائج حملتها السنوية لإفطار الصائمين خلال شهر رمضان المبارك.',
      body: 'تفاصيل الحملة وأبرز إنجازاتها خلال الموسم الماضي وأثرها على الأسر المستفيدة.',
      category: 'حملات',
      date: '2026-04-15',
      image: '/assets/news/iftar.svg',
    },
    {
      slug: 'home-repair-milestone',
      title: 'افتتاح 18 منزلًا تم ترميمها لأسر متعففة',
      excerpt: 'ضمن مشروع ترميم البيوت، تم تسليم 18 منزلًا جاهزًا للسكن خلال الربع الأول.',
      body: 'تفاصيل عن المشروع، الأسر المستفيدة، والشركاء الذين أسهموا في تحقيق هذا الإنجاز.',
      category: 'مشاريع',
      date: '2026-03-22',
      image: '/assets/news/home.svg',
    },
    {
      slug: 'volunteers-day',
      title: 'يوم المتطوعين: شكراً لـ 240 متطوعًا',
      excerpt: 'احتفلت الجمعية بمتطوعيها بفعالية تكريمية لإبراز جهودهم خلال العام.',
      body: 'تغطية كاملة لفعاليات يوم المتطوعين والبرامج التدريبية المقدمة لهم.',
      category: 'أخبار',
      date: '2026-02-10',
      image: '/assets/news/volunteers.svg',
    },
  ];

  findAll() {
    return this.items;
  }

  findOne(slug: string) {
    return this.items.find((n) => n.slug === slug);
  }
}
