import { Injectable } from '@nestjs/common';

export interface Stat {
  key: string;
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

@Injectable()
export class StatsService {
  findAll(): Stat[] {
    return [
      { key: 'families', label: 'أسرة مستفيدة', value: 12480, icon: 'family' },
      { key: 'projects', label: 'مشروع منفذ', value: 64, icon: 'briefcase' },
      { key: 'donors', label: 'متبرع كريم', value: 8730, icon: 'users' },
      { key: 'aid', label: 'إجمالي المساعدات', value: 2450000, suffix: 'د.ب', icon: 'coin' },
    ];
  }
}
