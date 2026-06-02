import { Injectable } from '@nestjs/common';

export interface Project {
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  image: string;
  raised: number;
  goal: number;
  beneficiaries: number;
}

@Injectable()
export class ProjectsService {
  private readonly projects: Project[] = [
    {
      slug: 'marriage-support',
      title: 'مشروع تيسير الزواج',
      titleEn: 'Marriage Support',
      description: 'مساعدة الشباب على تكوين أسر مستقرة من خلال تجهيز نفقات الزواج وتقديم الدعم الأسري.',
      descriptionEn: 'Help young people start stable families by covering wedding expenses and providing family support.',
      icon: 'heart',
      image: '/assets/projects/marriage.svg',
      raised: 84500,
      goal: 150000,
      beneficiaries: 142,
    },
    {
      slug: 'home-repair',
      title: 'مشروع ترميم وبناء البيوت',
      titleEn: 'Home Repair & Construction',
      description: 'إصلاح وتأهيل مساكن الأسر المتعففة لتوفير حياة كريمة آمنة.',
      descriptionEn: 'Repair and rebuild homes of underprivileged families to provide a safe, dignified life.',
      icon: 'home',
      image: '/assets/projects/home.svg',
      raised: 121300,
      goal: 200000,
      beneficiaries: 87,
    },
    {
      slug: 'mosque-cemetery',
      title: 'مشروع المساجد والمقابر',
      titleEn: 'Mosques & Cemeteries',
      description: 'صيانة وتطوير المساجد ودور العبادة والاهتمام بالمقابر.',
      descriptionEn: 'Maintenance and development of mosques, places of worship, and cemetery care.',
      icon: 'mosque',
      image: '/assets/projects/mosque.svg',
      raised: 56800,
      goal: 100000,
      beneficiaries: 24,
    },
    {
      slug: 'medical-aid',
      title: 'مشروع العلاج والعمليات',
      titleEn: 'Medical Aid & Surgery',
      description: 'تغطية تكاليف العلاج والعمليات الجراحية للحالات المحتاجة.',
      descriptionEn: 'Cover treatment and surgery costs for those in need of medical assistance.',
      icon: 'medical',
      image: '/assets/projects/medical.svg',
      raised: 198400,
      goal: 250000,
      beneficiaries: 211,
    },
  ];

  findAll(): Project[] {
    return this.projects;
  }

  findOne(slug: string): Project | undefined {
    return this.projects.find((p) => p.slug === slug);
  }
}
