import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface NewsItem {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(private supabase: SupabaseService) {}

  async list(): Promise<NewsItem[]> {
    const { data, error } = await this.supabase.client
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data ?? []) as NewsItem[];
  }

  async create(item: Omit<NewsItem, 'id'>): Promise<NewsItem> {
    const { data, error } = await this.supabase.client
      .from('news')
      .insert(item)
      .select()
      .single();
    if (error) throw error;
    return data as NewsItem;
  }

  async update(id: string, item: Partial<NewsItem>): Promise<NewsItem> {
    const { data, error } = await this.supabase.client
      .from('news')
      .update(item)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as NewsItem;
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabase.client.from('news').delete().eq('id', id);
    if (error) throw error;
  }

  async uploadImage(file: File): Promise<string> {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await this.supabase.client.storage
      .from('news-images')
      .upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type });
    if (error) {
      console.error('[NewsService.uploadImage] Supabase storage error:', error);
      throw error;
    }
    const { data } = this.supabase.client.storage.from('news-images').getPublicUrl(path);
    return data.publicUrl;
  }
}
