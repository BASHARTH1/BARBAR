import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent), title: 'جمعية باربار الخيرية' },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent), title: 'من نحن' },
  { path: 'team', loadComponent: () => import('./pages/team/team.component').then((m) => m.TeamComponent), title: 'مجلس الإدارة' },
  { path: 'projects', loadComponent: () => import('./pages/projects/projects.component').then((m) => m.ProjectsComponent), title: 'مشاريعنا' },
  { path: 'news', loadComponent: () => import('./pages/news/news.component').then((m) => m.NewsComponent), title: 'الأخبار' },
  { path: 'events', loadComponent: () => import('./pages/events/events.component').then((m) => m.EventsComponent), title: 'الفعاليات' },
  { path: 'donate', loadComponent: () => import('./pages/donate/donate.component').then((m) => m.DonateComponent), title: 'تبرع' },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent), title: 'تواصل معنا' },
  { path: 'admin/login', loadComponent: () => import('./pages/admin/login/admin-login.component').then((m) => m.AdminLoginComponent), title: 'تسجيل الدخول' },
  { path: 'admin/events', loadComponent: () => import('./pages/admin/events/admin-events.component').then((m) => m.AdminEventsComponent), canActivate: [adminGuard], title: 'إدارة الفعاليات' },
  { path: 'admin/news', loadComponent: () => import('./pages/admin/news/admin-news.component').then((m) => m.AdminNewsComponent), canActivate: [adminGuard], title: 'إدارة الأخبار' },
  { path: 'admin/team', loadComponent: () => import('./pages/admin/team/admin-team.component').then((m) => m.AdminTeamComponent), canActivate: [adminGuard], title: 'إدارة مجلس الإدارة' },
  { path: '**', redirectTo: '' },
];
