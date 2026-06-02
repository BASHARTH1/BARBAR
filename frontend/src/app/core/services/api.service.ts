import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Campaign,
  ContactPayload,
  DonationPayload,
  NewsItem,
  Project,
  Stat,
} from '../models/models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.base}/projects`);
  }
  getProject(slug: string): Observable<Project> {
    return this.http.get<Project>(`${this.base}/projects/${slug}`);
  }
  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${this.base}/campaigns`);
  }
  getFeaturedCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${this.base}/campaigns/featured`);
  }
  getNews(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(`${this.base}/news`);
  }
  getStats(): Observable<Stat[]> {
    return this.http.get<Stat[]>(`${this.base}/stats`);
  }
  donate(payload: DonationPayload) {
    return this.http.post(`${this.base}/donations`, payload);
  }
  sendContact(payload: ContactPayload) {
    return this.http.post(`${this.base}/contact`, payload);
  }
}
