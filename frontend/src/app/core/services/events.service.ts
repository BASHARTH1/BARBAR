import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface CharityEvent {
  id?: string;
  slug: string;
  title: string;
  description: string;
  day: string;
  month: string;
  year: string;
  time: string;
  location: string;
  tag: string;
  image: string;
  sort_order?: number;
}

@Injectable({ providedIn: 'root' })
export class EventsService {
  constructor(private supabase: SupabaseService) {}

  async list(): Promise<CharityEvent[]> {
    const { data, error } = await this.supabase.client
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data ?? []) as CharityEvent[];
  }

  async create(event: Omit<CharityEvent, 'id'>): Promise<CharityEvent> {
    const { data, error } = await this.supabase.client
      .from('events')
      .insert(event)
      .select()
      .single();
    if (error) throw error;
    return data as CharityEvent;
  }

  async update(id: string, event: Partial<CharityEvent>): Promise<CharityEvent> {
    const { data, error } = await this.supabase.client
      .from('events')
      .update(event)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as CharityEvent;
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabase.client.from('events').delete().eq('id', id);
    if (error) throw error;
  }

  async uploadImage(file: File): Promise<string> {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await this.supabase.client.storage
      .from('event-images')
      .upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type });
    if (error) {
      console.error('[uploadImage] Supabase storage error:', error);
      throw error;
    }
    const { data } = this.supabase.client.storage.from('event-images').getPublicUrl(path);
    return data.publicUrl;
  }
}
