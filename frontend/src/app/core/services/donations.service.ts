import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { DonationPayload } from '../models/models';

@Injectable({ providedIn: 'root' })
export class DonationsService {
  constructor(private supabase: SupabaseService) {}

  // Public visitors may insert but not read back (see RLS in supabase-setup.sql),
  // so we deliberately do not chain .select() after the insert.
  async create(payload: DonationPayload): Promise<void> {
    const { error } = await this.supabase.client.from('donations').insert({
      donor_name: payload.donorName,
      email: payload.email,
      phone: payload.phone || null,
      campaign_slug: payload.campaignSlug,
      amount: payload.amount,
      recurring: payload.recurring ?? false,
      message: payload.message || null,
    });
    if (error) throw error;
  }
}
