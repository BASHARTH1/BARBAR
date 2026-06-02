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

export interface Campaign {
  id: number;
  title: string;
  subtitle: string;
  amount: number;
  recurring: boolean;
  featured: boolean;
  badge?: string;
}

export interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  image: string;
}

export interface Stat {
  key: string;
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

export interface DonationPayload {
  donorName: string;
  email: string;
  phone?: string;
  campaignSlug: string;
  amount: number;
  recurring?: boolean;
  message?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
