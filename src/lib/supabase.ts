import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at?: string;
}

export interface CheckoutOrder {
  id?: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  items: string; // JSON stringified array
  total_amount: number;
  created_at?: string;
  status?: string;
}

export interface ServiceEntry {
  id?: string;
  title: string;
  description: string;
  category: string;
  created_at?: string;
}

export interface KnowledgeHubArticle {
  id?: string;
  title: string;
  content: string;
  category: string;
  created_at?: string;
  updated_at?: string;
}

// Supabase operations
export async function submitContactForm(data: ContactSubmission) {
  try {
    const { data: result, error } = await supabase
      .from('contacts')
      .insert([data])
      .select();
    
    if (error) throw error;
    return { success: true, data: result };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error };
  }
}

export async function submitCheckoutOrder(data: CheckoutOrder) {
  try {
    const { data: result, error } = await supabase
      .from('orders')
      .insert([data])
      .select();
    
    if (error) throw error;
    return { success: true, data: result };
  } catch (error) {
    console.error('Error submitting checkout order:', error);
    return { success: false, error };
  }
}

export async function getServices() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching services:', error);
    return { success: false, error };
  }
}

export async function addService(service: ServiceEntry) {
  try {
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error adding service:', error);
    return { success: false, error };
  }
}

export async function updateService(id: string, service: Partial<ServiceEntry>) {
  try {
    const { data, error } = await supabase
      .from('services')
      .update(service)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating service:', error);
    return { success: false, error };
  }
}

export async function deleteService(id: string) {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting service:', error);
    return { success: false, error };
  }
}

export async function getKnowledgeHub() {
  try {
    const { data, error } = await supabase
      .from('knowledge_hub')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching knowledge hub articles:', error);
    return { success: false, error };
  }
}

export async function addKnowledgeArticle(article: KnowledgeHubArticle) {
  try {
    const { data, error } = await supabase
      .from('knowledge_hub')
      .insert([article])
      .select();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error adding knowledge article:', error);
    return { success: false, error };
  }
}

export async function getOrders() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { success: false, error };
  }
}

export async function getContacts() {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return { success: false, error };
  }
}
