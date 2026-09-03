import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Reveal } from "@/components/site/Reveal";
import { toast } from "sonner";
import {
  getServices,
  addService,
  updateService,
  deleteService,
  getKnowledgeHub,
  addKnowledgeArticle,
  getOrders,
  getContacts,
  type ServiceEntry,
  type KnowledgeHubArticle,
} from "@/lib/supabase";
import { AlertCircle, Trash2, Edit2 } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — AgriLink Kakuma LLC" },
      {
        name: "description",
        content: "Admin dashboard for managing services, knowledge hub, and orders.",
      },
    ],
  }),
  component: Dashboard,
});

interface EditingItem {
  type: "service" | "article";
  id?: string;
  data: any;
}

function Dashboard() {
  const [services, setServices] = useState<ServiceEntry[]>([]);
  const [articles, setArticles] = useState<KnowledgeHubArticle[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<EditingItem | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [servicesRes, articlesRes, ordersRes, contactsRes] = await Promise.all([
        getServices(),
        getKnowledgeHub(),
        getOrders(),
        getContacts(),
      ]);

      if (servicesRes.success) setServices(servicesRes.data || []);
      if (articlesRes.success) setArticles(articlesRes.data || []);
      if (ordersRes.success) setOrders(ordersRes.data || []);
      if (contactsRes.success) setContacts(contactsRes.data || []);
    } catch (error) {
      toast.error("Failed to load data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleServiceSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const serviceData: ServiceEntry = {
      title: String(formData.get("title")),
      description: String(formData.get("description")),
      category: String(formData.get("category")),
    };

    try {
      let result;
      if (editing?.type === "service" && editing.id) {
        result = await updateService(editing.id, serviceData);
      } else {
        result = await addService(serviceData);
      }

      if (result.success) {
        toast.success(editing?.id ? "Service updated" : "Service added");
        setEditing(null);
        await loadData();
        e.currentTarget.reset();
      } else {
        toast.error("Failed to save service");
      }
    } catch (error) {
      toast.error("Error saving service");
      console.error(error);
    }
  }

  async function handleArticleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const articleData: KnowledgeHubArticle = {
      title: String(formData.get("title")),
      content: String(formData.get("content")),
      category: String(formData.get("category")),
    };

    try {
      const result = await addKnowledgeArticle(articleData);
      if (result.success) {
        toast.success("Article added");
        setEditing(null);
        await loadData();
        e.currentTarget.reset();
      } else {
        toast.error("Failed to add article");
      }
    } catch (error) {
      toast.error("Error adding article");
      console.error(error);
    }
  }

  async function handleDeleteService(id: string) {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        const result = await deleteService(id);
        if (result.success) {
          toast.success("Service deleted");
          await loadData();
        } else {
          toast.error("Failed to delete service");
        }
      } catch (error) {
        toast.error("Error deleting service");
        console.error(error);
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative isolate overflow-hidden surface-forest">
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-3xl font-extrabold uppercase">Dashboard</h1>
            <p className="mt-2 text-primary-foreground/80">
              Manage services, knowledge hub, orders and contact submissions
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12">Loading data...</div>
        ) : (
          <Tabs defaultValue="services" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge Hub</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  {editing?.type === "service" ? "Edit Service" : "Add New Service"}
                </h2>
                <form onSubmit={handleServiceSubmit} className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      name="title"
                      placeholder="Service title"
                      defaultValue={editing?.type === "service" ? editing.data?.title : ""}
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input
                      name="category"
                      placeholder="e.g., Aggregation, Logistics"
                      defaultValue={editing?.type === "service" ? editing.data?.category : ""}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      name="description"
                      placeholder="Service description"
                      rows={4}
                      defaultValue={editing?.type === "service" ? editing.data?.description : ""}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" variant="gold">
                      {editing?.type === "service" ? "Update" : "Add"} Service
                    </Button>
                    {editing?.type === "service" && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setEditing(null)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">All Services</h3>
                <div className="space-y-2">
                  {services.length === 0 ? (
                    <p className="text-muted-foreground">No services added yet</p>
                  ) : (
                    services.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{service.title}</p>
                          <p className="text-sm text-muted-foreground">{service.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setEditing({
                                type: "service",
                                id: service.id,
                                data: service,
                              })
                            }
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => service.id && handleDeleteService(service.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </TabsContent>

            {/* Knowledge Hub Tab */}
            <TabsContent value="knowledge" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Add Knowledge Article</h2>
                <form onSubmit={handleArticleSubmit} className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input name="title" placeholder="Article title" />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input name="category" placeholder="e.g., Best Practices, Guidelines" />
                  </div>
                  <div>
                    <Label>Content</Label>
                    <Textarea name="content" placeholder="Article content" rows={6} />
                  </div>
                  <Button type="submit" variant="gold">
                    Add Article
                  </Button>
                </form>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">All Articles</h3>
                <div className="space-y-2">
                  {articles.length === 0 ? (
                    <p className="text-muted-foreground">No articles added yet</p>
                  ) : (
                    articles.map((article) => (
                      <div key={article.id} className="p-3 border rounded">
                        <p className="font-medium">{article.title}</p>
                        <p className="text-sm text-muted-foreground">{article.category}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(article.created_at || "").toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground">
                            No orders yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.customer_name}</TableCell>
                            <TableCell>{order.email}</TableCell>
                            <TableCell>${order.total_amount}</TableCell>
                            <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 bg-secondary text-xs rounded">
                                {order.status || "Pending"}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </TabsContent>

            {/* Contacts Tab */}
            <TabsContent value="contacts">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Contact Submissions</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground">
                            No contact submissions yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        contacts.map((contact) => (
                          <TableRow key={contact.id}>
                            <TableCell className="font-medium">{contact.name}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.subject}</TableCell>
                            <TableCell>{new Date(contact.created_at).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </section>
    </div>
  );
}
