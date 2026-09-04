import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env['VITE_SUPABASE_URL'] || '';
const supabaseAnonKey = import.meta.env['VITE_SUPABASE_ANON_KEY'] || '';

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

export interface ServiceEntry {
  id?: string;
  pillar_slug: string;
  pillar_title: string;
  pillar_intro: string;
  service_name: string;
  service_copy: string;
  sort_order: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function getServices() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("pillar_slug", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getServices error:", error);
    return {
      success: false,
      data: [],
      error,
    };
  }

  return {
    success: true,
    data: data as ServiceEntry[],
    error: null,
  };
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

export interface KnowledgeHubArticle {
  id?: string;
  title: string;
  content: string;
  category: string;
  excerpt?: string | null;
  read_time?: string | null;
  created_at?: string;
  updated_at?: string;
}

export async function getKnowledgeHub() {
  const { data, error } = await supabase
    .from("knowledge_hub")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getKnowledgeHub error:", error);

    return {
      success: false,
      data: [],
      error,
    };
  }

  return {
    success: true,
    data: data as KnowledgeHubArticle[],
    error: null,
  };
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
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching contacts:", error);
      return {
        success: false,
        data: [],
        error: error.message,
      };
    }

    return {
      success: true,
      data: data || [],
    };
  } catch (error) {
    console.error("Error fetching contacts:", error);

    return {
      success: false,
      data: [],
      error: "Failed to fetch contacts",
    };
  }
}
export async function updateKnowledgeArticle(
  id: string,
  article: KnowledgeHubArticle
) {
  const { data, error } = await supabase
    .from("knowledge_hub")
    .update({
      title: article.title,
      content: article.content,
      category: article.category,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating knowledge article:", error);

    return {
      success: false,
      data: null,
      error,
    };
  }

  return {
    success: true,
    data,
    error: null,
  };
}

export async function deleteKnowledgeArticle(id: string) {
  const { error } = await supabase
    .from("knowledge_hub")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting knowledge article:", error);

    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    error: null,
  };
}