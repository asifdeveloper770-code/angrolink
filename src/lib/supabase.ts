import { createClient } from "@supabase/supabase-js";
import { PRODUCTS } from "./catalog";

const envUrl = import.meta.env["VITE_SUPABASE_URL"];
const envKey = import.meta.env["VITE_SUPABASE_ANON_KEY"];

export const isConfigured = Boolean(envUrl) && !envUrl.includes("placeholder-project");

const supabaseUrl = envUrl || "https://placeholder-project.supabase.co";
const supabaseAnonKey = envKey || "placeholder-anon-key";

const realSupabase = createClient(supabaseUrl, supabaseAnonKey);

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

// Initial default data for offline/mock mode
const DEFAULT_SERVICES: ServiceEntry[] = [
  {
    id: "srv-1",
    pillar_slug: "agricultural-aggregation",
    pillar_title: "Agricultural Aggregation",
    pillar_intro:
      "Consolidating smallholder harvests across rural East Africa into graded, contract-ready commercial volumes.",
    service_name: "Producer Network Mobilization",
    service_copy:
      "Organizing smallholders into structured production groups with transparent quality standards.",
    sort_order: 1,
    active: true,
  },
  {
    id: "srv-2",
    pillar_slug: "agricultural-aggregation",
    pillar_title: "Agricultural Aggregation",
    pillar_intro:
      "Consolidating smallholder harvests across rural East Africa into graded, contract-ready commercial volumes.",
    service_name: "Decentralized Sorting & Quality Grading",
    service_copy:
      "Rigorous sorting, moisture testing, and certified grading at farm-gate trade yards.",
    sort_order: 2,
    active: true,
  },
  {
    id: "srv-3",
    pillar_slug: "end-to-end-logistics",
    pillar_title: "End-to-End Cold-Chain Logistics",
    pillar_intro:
      "Preserving harvest freshness and transporting commodities across regional trade corridors.",
    service_name: "Solar-Powered Cold Storage",
    service_copy:
      "Decentralized solar cooling units that cut post-harvest losses by 30% right at the farm gate.",
    sort_order: 1,
    active: true,
  },
  {
    id: "srv-4",
    pillar_slug: "end-to-end-logistics",
    pillar_title: "End-to-End Cold-Chain Logistics",
    pillar_intro:
      "Preserving harvest freshness and transporting commodities across regional trade corridors.",
    service_name: "Scheduled Regional Freight",
    service_copy:
      "Temperature-monitored fleet routes moving commodities across Kenya, South Sudan, and border hubs.",
    sort_order: 2,
    active: true,
  },
  {
    id: "srv-5",
    pillar_slug: "market-intelligence",
    pillar_title: "Market Intelligence & Digital Marketplace",
    pillar_intro:
      "Connecting producers directly to market demand signals, fair pricing, and commercial contracts.",
    service_name: "Real-Time Price Discovery Index",
    service_copy:
      "Daily SMS & app commodity price feeds across Kakuma, Lodwar, Kitale, Eldoret, and Juba.",
    sort_order: 1,
    active: true,
  },
];

const DEFAULT_ARTICLES: KnowledgeHubArticle[] = [
  {
    id: "kb-1",
    title: "East African Corridor 2026: Arid-Land Crop Aggregation & Yield Trends",
    content:
      "A comprehensive review of smallholder crop yields, sorghum resilience, and irrigated pulses performance across Kenya and South Sudan corridors.",
    category: "Crop Reports",
    excerpt:
      "Detailed analysis of sorghum, green grams, and sesame yields across northern Kenya and southern border routes.",
    read_time: "5 min read",
    created_at: "2026-03-15T08:00:00Z",
  },
  {
    id: "kb-2",
    title: "Weekly Market Pricing Intelligence: Cereals, Pulses & Oilseeds",
    content:
      "Cross-border wholesale benchmark pricing comparing farm-gate aggregation rates in Kakuma and Lodwar with regional demand centers in Kitale, Eldoret, and Juba.",
    category: "Market Pricing",
    excerpt:
      "Weekly commodity price index for white sorghum, ndengu, field tomatoes, and export sesame.",
    read_time: "3 min read",
    created_at: "2026-03-12T08:00:00Z",
  },
  {
    id: "kb-3",
    title: "Decentralized Solar Cold Storage: Reducing Post-Harvest Losses by 30%",
    content:
      "Operational findings from deploying 100% solar-powered refrigeration units at village aggregation hubs to prevent horticultural decay and distress selling.",
    category: "Sustainability",
    excerpt:
      "Field telemetry data proving shelf-life extension from 3 days to 21 days for horticultural produce.",
    read_time: "7 min read",
    created_at: "2026-03-08T08:00:00Z",
  },
];

const DEFAULT_CATEGORIES = [
  { id: "cat-1", name: "Cereals", slug: "cereals", sort_order: 1, active: true },
  { id: "cat-2", name: "Pulses", slug: "pulses", sort_order: 2, active: true },
  { id: "cat-3", name: "Fresh Produce", slug: "fresh-produce", sort_order: 3, active: true },
  { id: "cat-4", name: "Oilseeds", slug: "oilseeds", sort_order: 4, active: true },
];

const DEFAULT_ORDERS: CheckoutOrder[] = [
  {
    id: "ord-1",
    customer_name: "Lake Turkana Food Processors Ltd",
    email: "procurement@turkanafoods.co.ke",
    phone: "+254 712 345 678",
    address: "Plot 42, Trade Yard Road",
    city: "Kakuma",
    country: "Kenya",
    items: JSON.stringify([
      {
        product: { id: "sorghum-white", name: "White Sorghum", pricePerUnit: 410, unit: "MT" },
        quantity: 10,
      },
    ]),
    total_amount: 4100,
    status: "Confirmed",
    created_at: "2026-04-10T11:20:00Z",
  },
  {
    id: "ord-2",
    customer_name: "Equatoria Grain Wholesalers",
    email: "supply@equatoriagrain.com",
    phone: "+211 922 555 123",
    address: "Kaya Highway Depot",
    city: "Juba",
    country: "South Sudan",
    items: JSON.stringify([
      {
        product: { id: "green-grams", name: "Green Grams (Ndengu)", pricePerUnit: 985, unit: "MT" },
        quantity: 5,
      },
    ]),
    total_amount: 4925,
    status: "Processing",
    created_at: "2026-04-14T09:45:00Z",
  },
];

const DEFAULT_CONTACTS: ContactSubmission[] = [
  {
    id: "cnt-1",
    name: "Dr. Akech Deng",
    email: "adeng@southsudan-agri.org",
    phone: "Juba Cooperative Union",
    subject: "Partnerships & Off-Take Contracts",
    message:
      "Inquiring about aggregating 200 MT white sorghum for South Sudan humanitarian supply chain.",
    created_at: "2026-04-12T14:30:00Z",
  },
  {
    id: "cnt-2",
    name: "Esther Chemutai",
    email: "echemutai@eldoret-milling.co.ke",
    phone: "Rift Valley Millers",
    subject: "Quality Grading & Moisture Testing",
    message:
      "Seeking certified test specs for pulse shipments passing through Kitale and Eldoret corridors.",
    created_at: "2026-04-15T16:10:00Z",
  },
];

// Helper to access persistent localStorage when in browser
function getStore<T>(key: string, initial: T[]): T[] {
  if (typeof window === "undefined") return initial;
  try {
    const raw = localStorage.getItem(`agrilink_${key}`);
    if (!raw) {
      localStorage.setItem(`agrilink_${key}`, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return initial;
  }
}

function setStore<T>(key: string, list: T[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`agrilink_${key}`, JSON.stringify(list));
  } catch (err) {
    console.warn("localStorage write error:", err);
  }
}

// In-memory mock database query builder
class MockQueryBuilder {
  private tableName: string;
  private filters: Array<(row: Record<string, unknown>) => boolean> = [];
  private sorts: Array<{ field: string; ascending: boolean }> = [];
  private isSingle = false;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  private getData(): Record<string, unknown>[] {
    switch (this.tableName) {
      case "services":
        return getStore("services", DEFAULT_SERVICES) as unknown as Record<string, unknown>[];
      case "knowledge_hub":
        return getStore("knowledge_hub", DEFAULT_ARTICLES) as unknown as Record<string, unknown>[];
      case "orders":
        return getStore("orders", DEFAULT_ORDERS) as unknown as Record<string, unknown>[];
      case "contacts":
        return getStore("contacts", DEFAULT_CONTACTS) as unknown as Record<string, unknown>[];
      case "categories":
        return getStore("categories", DEFAULT_CATEGORIES) as unknown as Record<string, unknown>[];
      case "products": {
        const initialProducts = PRODUCTS.map((p, idx) => ({
          id: p.id,
          category_id:
            p.category === "Cereals" ? "cat-1" : p.category === "Pulses" ? "cat-2" : "cat-3",
          name: p.name,
          slug: p.id,
          description: p.blurb,
          summary: p.blurb,
          price_per_unit: p.pricePerUnit,
          unit: p.unit,
          image: p.image,
          stock: 100,
          moq: p.moq,
          origin: p.origin,
          grade: p.grade,
          lead: p.lead,
          blurb: p.blurb,
          spec: p.spec,
          active: true,
          featured: idx < 4,
          sort_order: idx + 1,
        }));
        return getStore("products", initialProducts) as unknown as Record<string, unknown>[];
      }
      default:
        return getStore(this.tableName, []) as unknown as Record<string, unknown>[];
    }
  }

  private saveData(data: Record<string, unknown>[]) {
    setStore(this.tableName, data);
  }

  select(_columns = "*") {
    return this;
  }

  eq(column: string, value: unknown) {
    this.filters.push((row) => row[column] === value);
    return this;
  }

  order(column: string, opts?: { ascending?: boolean }) {
    this.sorts.push({ field: column, ascending: opts?.ascending ?? true });
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  async insert(items: Record<string, unknown> | Record<string, unknown>[]) {
    const list = Array.isArray(items) ? items : [items];
    const data = this.getData();
    const inserted = list.map((item) => ({
      id: item["id"] || `mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      created_at: item["created_at"] || new Date().toISOString(),
      ...item,
    }));
    this.saveData([...data, ...inserted]);
    return {
      data: this.isSingle ? inserted[0] : inserted,
      error: null,
      select: () => ({
        data: this.isSingle ? inserted[0] : inserted,
        error: null,
        single: () => ({ data: inserted[0], error: null }),
      }),
    };
  }

  async update(updates: Record<string, unknown>) {
    const data = this.getData();
    const updated: Record<string, unknown>[] = [];
    const nextData = data.map((row) => {
      const matches = this.filters.every((f) => f(row));
      if (matches) {
        const u = { ...row, ...updates, updated_at: new Date().toISOString() };
        updated.push(u);
        return u;
      }
      return row;
    });
    this.saveData(nextData);
    return {
      data: this.isSingle ? updated[0] : updated,
      error: null,
      select: () => ({
        data: this.isSingle ? updated[0] : updated,
        error: null,
        single: () => ({ data: updated[0], error: null }),
      }),
    };
  }

  async delete() {
    const data = this.getData();
    const nextData = data.filter((row) => !this.filters.every((f) => f(row)));
    this.saveData(nextData);
    return { data: null, error: null };
  }

  // Then handler for async await
  then<TResult1 = unknown, TResult2 = never>(
    onfulfilled?:
      ((value: { data: unknown; error: null }) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2> {
    let rows = [...this.getData()];
    for (const filter of this.filters) {
      rows = rows.filter(filter);
    }
    for (const { field, ascending } of this.sorts) {
      rows.sort((a, b) => {
        const valA = a[field];
        const valB = b[field];
        if (valA === valB) return 0;
        if (valA === undefined || valA === null) return 1;
        if (valB === undefined || valB === null) return -1;
        if (ascending) return valA < valB ? -1 : 1;
        return valA > valB ? -1 : 1;
      });
    }

    const result = {
      data: this.isSingle ? (rows[0] ?? null) : rows,
      error: null,
    };
    return Promise.resolve(result).then(onfulfilled, onrejected);
  }
}

// In-memory mock Supabase client
const mockSupabase = {
  auth: {
    async getSession() {
      if (typeof window === "undefined") {
        return { data: { session: null }, error: null };
      }
      try {
        const raw = localStorage.getItem("agrilink_admin_session");
        if (raw) {
          const session = JSON.parse(raw);
          return { data: { session }, error: null };
        }
      } catch (err) {
        console.warn("Session read error:", err);
      }
      return { data: { session: null }, error: null };
    },

    async signInWithPassword({ email }: { email: string; password?: string }) {
      const mockSession = {
        access_token: "mock-token-" + Date.now(),
        token_type: "bearer",
        expires_in: 3600,
        user: {
          id: "admin-user-01",
          email: email || "admin@agrilinkea.com",
          user_metadata: { role: "admin" },
        },
      };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("agrilink_admin_session", JSON.stringify(mockSession));
        } catch (err) {
          console.warn("Session store error:", err);
        }
      }
      return { data: { session: mockSession, user: mockSession.user }, error: null };
    },

    async signOut() {
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("agrilink_admin_session");
        } catch (err) {
          console.warn("Session clear error:", err);
        }
      }
      return { error: null };
    },

    onAuthStateChange(callback: (event: string, session: unknown) => void) {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem("agrilink_admin_session");
        if (raw) {
          try {
            callback("SIGNED_IN", JSON.parse(raw));
          } catch {
            // ignore
          }
        }
      }
      return {
        data: {
          subscription: {
            unsubscribe: () => {},
          },
        },
      };
    },
  },

  storage: {
    from(_bucket: string) {
      return {
        async upload(path: string, _file: File | Blob) {
          return { data: { path }, error: null };
        },
        getPublicUrl(path: string) {
          return {
            data: {
              publicUrl: `/public/images/hero_green_farm.jpg?path=${encodeURIComponent(path)}`,
            },
          };
        },
        async remove(paths: string[]) {
          return { data: paths, error: null };
        },
      };
    },
  },

  from(tableName: string) {
    return new MockQueryBuilder(tableName);
  },
};

// Exported client delegates to real Supabase if configured, or mock fallback
export const supabase = isConfigured
  ? realSupabase
  : (mockSupabase as unknown as typeof realSupabase);

// Supabase operations with automatic offline fallback
export async function submitContactForm(data: ContactSubmission) {
  if (isConfigured) {
    try {
      const { data: result, error } = await realSupabase.from("contacts").insert([data]).select();
      if (!error) return { success: true, data: result };
      console.warn("Real Supabase error, falling back to local store:", error);
    } catch (err) {
      console.warn("Real Supabase network failure, falling back to local store:", err);
    }
  }

  // Mock / offline fallback
  try {
    const res = await mockSupabase.from("contacts").insert(data as Record<string, unknown>);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error };
  }
}

export async function submitCheckoutOrder(data: CheckoutOrder) {
  if (isConfigured) {
    try {
      const { data: result, error } = await realSupabase.from("orders").insert([data]).select();
      if (!error) return { success: true, data: result };
      console.warn("Real Supabase order error, falling back to local store:", error);
    } catch (err) {
      console.warn("Real Supabase network failure, falling back to local store:", err);
    }
  }

  // Mock / offline fallback
  try {
    const res = await mockSupabase.from("orders").insert(data as Record<string, unknown>);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Error submitting checkout order:", error);
    return { success: false, error };
  }
}

export async function getServices(): Promise<{
  success: boolean;
  data: ServiceEntry[];
  error: unknown;
}> {
  if (isConfigured) {
    try {
      const { data, error } = await realSupabase
        .from("services")
        .select("*")
        .eq("active", true)
        .order("pillar_slug", { ascending: true })
        .order("sort_order", { ascending: true });

      if (!error && data) {
        return { success: true, data: data as ServiceEntry[], error: null };
      }
    } catch (err) {
      console.warn("Supabase services fetch error, falling back to mock:", err);
    }
  }

  const { data } = await mockSupabase.from("services").select("*").eq("active", true);
  return { success: true, data: data as ServiceEntry[], error: null };
}

export async function addService(service: ServiceEntry) {
  if (isConfigured) {
    try {
      const { data, error } = await realSupabase.from("services").insert([service]).select();
      if (!error) return { success: true, data };
    } catch (err) {
      console.warn("Supabase addService error:", err);
    }
  }
  const res = await mockSupabase
    .from("services")
    .insert(service as unknown as Record<string, unknown>);
  return { success: true, data: res.data };
}

export async function updateService(id: string, service: Partial<ServiceEntry>) {
  if (isConfigured) {
    try {
      const { data, error } = await realSupabase
        .from("services")
        .update(service)
        .eq("id", id)
        .select();
      if (!error) return { success: true, data };
    } catch (err) {
      console.warn("Supabase updateService error:", err);
    }
  }
  const res = await mockSupabase
    .from("services")
    .eq("id", id)
    .update(service as unknown as Record<string, unknown>);
  return { success: true, data: res.data };
}

export async function deleteService(id: string) {
  if (isConfigured) {
    try {
      const { error } = await realSupabase.from("services").delete().eq("id", id);
      if (!error) return { success: true };
    } catch (err) {
      console.warn("Supabase deleteService error:", err);
    }
  }
  await mockSupabase.from("services").eq("id", id).delete();
  return { success: true };
}

export async function getKnowledgeHub(): Promise<{
  success: boolean;
  data: KnowledgeHubArticle[];
  error: unknown;
}> {
  if (isConfigured) {
    try {
      const { data, error } = await realSupabase
        .from("knowledge_hub")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return { success: true, data: data as KnowledgeHubArticle[], error: null };
      }
    } catch (err) {
      console.warn("Supabase getKnowledgeHub error:", err);
    }
  }

  const { data } = await mockSupabase
    .from("knowledge_hub")
    .select("*")
    .order("created_at", { ascending: false });
  return { success: true, data: data as KnowledgeHubArticle[], error: null };
}

export async function addKnowledgeArticle(article: KnowledgeHubArticle) {
  if (isConfigured) {
    try {
      const { data, error } = await realSupabase.from("knowledge_hub").insert([article]).select();
      if (!error) return { success: true, data };
    } catch (err) {
      console.warn("Supabase addKnowledgeArticle error:", err);
    }
  }
  const res = await mockSupabase
    .from("knowledge_hub")
    .insert(article as unknown as Record<string, unknown>);
  return { success: true, data: res.data };
}

export async function updateKnowledgeArticle(id: string, article: KnowledgeHubArticle) {
  if (isConfigured) {
    try {
      const { data, error } = await realSupabase
        .from("knowledge_hub")
        .update({
          title: article.title,
          content: article.content,
          category: article.category,
          excerpt: article.excerpt,
          read_time: article.read_time,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();
      if (!error) return { success: true, data, error: null };
    } catch (err) {
      console.warn("Supabase updateKnowledgeArticle error:", err);
    }
  }
  const res = await mockSupabase
    .from("knowledge_hub")
    .eq("id", id)
    .update(article as unknown as Record<string, unknown>);
  return { success: true, data: res.data, error: null };
}

export async function deleteKnowledgeArticle(id: string) {
  if (isConfigured) {
    try {
      const { error } = await realSupabase.from("knowledge_hub").delete().eq("id", id);
      if (!error) return { success: true, error: null };
    } catch (err) {
      console.warn("Supabase deleteKnowledgeArticle error:", err);
    }
  }
  await mockSupabase.from("knowledge_hub").eq("id", id).delete();
  return { success: true, error: null };
}

export async function getOrders() {
  if (isConfigured) {
    try {
      const { data, error } = await realSupabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) return { success: true, data };
    } catch (err) {
      console.warn("Supabase getOrders error:", err);
    }
  }
  const { data } = await mockSupabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  return { success: true, data: (data as CheckoutOrder[]) || [] };
}

export async function getContacts() {
  if (isConfigured) {
    try {
      const { data, error } = await realSupabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) return { success: true, data };
    } catch (err) {
      console.warn("Supabase getContacts error:", err);
    }
  }
  const { data } = await mockSupabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });
  return { success: true, data: (data as ContactSubmission[]) || [] };
}
