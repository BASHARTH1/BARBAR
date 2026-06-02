import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  image: string;
  sort_order?: number;
}

@Injectable({ providedIn: 'root' })
export class TeamService {
  constructor(private supabase: SupabaseService) {}

  async list(): Promise<TeamMember[]> {
    const { data, error } = await this.supabase.client
      .from('team_members')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });
    if (error) throw error;
    return (data ?? []) as TeamMember[];
  }

  async create(member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
    const { data, error } = await this.supabase.client
      .from('team_members')
      .insert(member)
      .select()
      .single();
    if (error) throw error;
    return data as TeamMember;
  }

  async update(id: string, member: Partial<TeamMember>): Promise<TeamMember> {
    const { data, error } = await this.supabase.client
      .from('team_members')
      .update(member)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as TeamMember;
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabase.client.from('team_members').delete().eq('id', id);
    if (error) throw error;
  }

  async uploadImage(file: File): Promise<string> {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await this.supabase.client.storage
      .from('team-images')
      .upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type });
    if (error) {
      console.error('[TeamService.uploadImage] Supabase storage error:', error);
      throw error;
    }
    const { data } = this.supabase.client.storage.from('team-images').getPublicUrl(path);
    return data.publicUrl;
  }
}
