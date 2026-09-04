import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import AdminProductsPage from "@/components/admin/products";
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
  updateKnowledgeArticle,
  deleteKnowledgeArticle,
  getOrders,
  getContacts,
  type ServiceEntry,
  type KnowledgeHubArticle,
  supabase,
} from "@/lib/supabase";
import { AlertCircle, Trash2, Edit2, X } from "lucide-react";

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

function getErrorMessage(error: unknown, fallback: string) {
  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object") {
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }

    if ("details" in error && typeof error.details === "string") {
      return error.details;
    }
  }

  return fallback;
}

function Dashboard() {
  const [services, setServices] = useState<ServiceEntry[]>([]);
  const [articles, setArticles] = useState<KnowledgeHubArticle[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<EditingItem | null>(null);
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);
  const PAGE_SIZE = 10;

  const [servicePage, setServicePage] = useState(1);
  const [knowledgePage, setKnowledgePage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);
  const [contactPage, setContactPage] = useState(1);

  const paginatedServices = services.slice(
    (servicePage - 1) * PAGE_SIZE,
    servicePage * PAGE_SIZE
  );

  const paginatedArticles = articles.slice(
    (knowledgePage - 1) * PAGE_SIZE,
    knowledgePage * PAGE_SIZE
  );

  const paginatedOrders = orders.slice(
    (orderPage - 1) * PAGE_SIZE,
    orderPage * PAGE_SIZE
  );

  const paginatedContacts = contacts.slice(
    (contactPage - 1) * PAGE_SIZE,
    contactPage * PAGE_SIZE
  );

  const serviceTotalPages = Math.max(
    1,
    Math.ceil(services.length / PAGE_SIZE)
  );

  const knowledgeTotalPages = Math.max(
    1,
    Math.ceil(articles.length / PAGE_SIZE)
  );

  const orderTotalPages = Math.max(
    1,
    Math.ceil(orders.length / PAGE_SIZE)
  );

  const contactTotalPages = Math.max(
    1,
    Math.ceil(contacts.length / PAGE_SIZE)
  );

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    setAuthLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      navigate({
        to: "/login",
        replace: true,
      });
      return;
    }

    setAuthLoading(false);
    loadData();
  }

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

  async function handleServiceSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const serviceData: ServiceEntry = {
      pillar_slug: String(formData.get("pillar_slug") || "").trim(),
      pillar_title: String(formData.get("pillar_title") || "").trim(),
      pillar_intro: String(formData.get("pillar_intro") || "").trim(),
      service_name: String(formData.get("service_name") || "").trim(),
      service_copy: String(formData.get("service_copy") || "").trim(),
      sort_order: Number(formData.get("sort_order") || 0),
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (!serviceData.pillar_title) {
      toast.error("Pillar title is required");
      return;
    }

    if (!serviceData.service_name) {
      toast.error("Service name is required");
      return;
    }

    try {
      const result =
        editing?.type === "service" && editing.id
          ? await updateService(editing.id, serviceData)
          : await addService(serviceData);

      if (!result.success) {
        toast.error(
          getErrorMessage(result.error, "Failed to save service")
        );
        return;
      }

      toast.success(
        editing?.type === "service"
          ? "Service updated successfully"
          : "Service added successfully"
      );

      setEditing(null);
      setServicePage(1);
      await loadData();
    } catch (error) {
      console.error(error);
      toast.error("Error saving service");
    }
  }

  async function handleArticleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const articleData: KnowledgeHubArticle = {
      title: String(formData.get("title") || "").trim(),
      content: String(formData.get("content") || "").trim(),
      category: String(formData.get("category") || "").trim(),
      excerpt: String(formData.get("excerpt") || "").trim(),
      read_time: String(formData.get("read_time") || "").trim(),
    };

    if (!articleData.title) {
      toast.error("Article title is required");
      return;
    }

    if (!articleData.content) {
      toast.error("Article content is required");
      return;
    }

    try {
      const result =
        editing?.type === "article" && editing.id
          ? await updateKnowledgeArticle(
            editing.id,
            articleData
          )
          : await addKnowledgeArticle(articleData);

      if (!result.success) {
        toast.error(
          getErrorMessage(result.error, "Failed to save article")
        );
        return;
      }

      toast.success(
        editing?.type === "article"
          ? "Article updated successfully"
          : "Article added successfully"
      );

      setEditing(null);
      setKnowledgePage(1);
      await loadData();
    } catch (error) {
      console.error(error);
      toast.error("Error saving article");
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
  async function handleDeleteArticle(id: string) {
    if (
      !confirm(
        "Are you sure you want to delete this knowledge article?"
      )
    ) {
      return;
    }

    try {
      const result = await deleteKnowledgeArticle(id);

      if (result.success) {
        toast.success("Article deleted");
        await loadData();

        // Keep page valid after deletion
        setKnowledgePage((currentPage) =>
          Math.min(
            currentPage,
            Math.max(
              1,
              Math.ceil(
                (articles.length - 1) / PAGE_SIZE
              )
            )
          )
        );
      } else {
        toast.error(
          getErrorMessage(result.error, "Failed to delete article")
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting article");
    }
  }
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Failed to log out.");
      return;
    }

    navigate({
      to: "/login",
      replace: true,
    });
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mx-auto mb-3 h-8 w-8 rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-muted-foreground">
            Checking authentication...
          </p>
        </div>
      </div>
    );
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
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="services">
                Services
              </TabsTrigger>

              <TabsTrigger value="products">
                Products
              </TabsTrigger>

              <TabsTrigger value="knowledge">
                Knowledge Hub
              </TabsTrigger>

              <TabsTrigger value="orders">
                Orders
              </TabsTrigger>

              <TabsTrigger value="contacts">
                Contacts
              </TabsTrigger>

              <TabsTrigger
                value="logout"
                onClick={handleLogout}
                className="text-destructive hover:bg-destructive/10"
              >
                Logout
              </TabsTrigger>
            </TabsList>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              <Card className="overflow-hidden">
                <div className="flex items-center justify-between border-b p-6">
                  <div>
                    <h3 className="text-lg font-bold">
                      All Services
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {services.length} total services
                    </p>
                  </div>

                  <Button
                    variant="gold"
                    onClick={() =>
                      setEditing({
                        type: "service",
                        data: {
                          pillar_slug: "",
                          pillar_title: "",
                          pillar_intro: "",
                          service_name: "",
                          service_copy: "",
                          sort_order: 0,
                          active: true,
                        },
                      })
                    }
                  >
                    Add Service
                  </Button>
                </div>

                <div className="overflow-x-auto p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {paginatedServices.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="py-10 text-center text-muted-foreground"
                          >
                            No services found
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedServices.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell className="font-medium">
                              {service.service_name}
                            </TableCell>

                            <TableCell>
                              {service.pillar_title || "—"}
                            </TableCell>

                            <TableCell className="max-w-md truncate">
                              {service.service_copy || "—"}
                            </TableCell>

                            <TableCell>
                              <div className="flex justify-end gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    if (!service.id) return;

                                    setEditing({
                                      type: "service",
                                      id: service.id,
                                      data: service,
                                    });
                                  }}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>

                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => {
                                    if (!service.id) return;
                                    handleDeleteService(service.id);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                <Pagination
                  page={servicePage}
                  totalPages={serviceTotalPages}
                  totalItems={services.length}
                  pageSize={PAGE_SIZE}
                  onPageChange={setServicePage}
                />
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <AdminProductsPage />
            </TabsContent>

            {/* Knowledge Hub Tab */}
            <TabsContent value="knowledge" className="space-y-6">
              <Card className="overflow-hidden">
                <div className="flex items-center justify-between border-b p-6">
                  <div>
                    <h3 className="text-lg font-bold">
                      All Knowledge Articles
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {articles.length} total articles
                    </p>
                  </div>

                  <Button
                    variant="gold"
                    onClick={() =>
                      setEditing({
                        type: "article",
                        data: {
                          title: "",
                          content: "",
                          category: "",
                          excerpt: "",
                          read_time: "",
                        },
                      })
                    }
                  >
                    Add Article
                  </Button>
                </div>

                <div className="overflow-x-auto p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {paginatedArticles.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="py-10 text-center text-muted-foreground"
                          >
                            No articles found
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedArticles.map((article) => (
                          <TableRow key={article.id}>
                            <TableCell className="font-medium">
                              {article.title}
                            </TableCell>

                            <TableCell>
                              {article.category || "—"}
                            </TableCell>

                            <TableCell>
                              {article.created_at
                                ? new Date(
                                  article.created_at
                                ).toLocaleDateString()
                                : "—"}
                            </TableCell>

                            <TableCell>
                              <div className="flex justify-end gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    if (!article.id) return;

                                    setEditing({
                                      type: "article",
                                      id: article.id,
                                      data: article,
                                    });
                                  }}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>

                                <Button
                                  size="sm"
                                  onClick={() => {
                                    if (!article.id) return;
                                    handleDeleteArticle(article.id);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                <Pagination
                  page={knowledgePage}
                  totalPages={knowledgeTotalPages}
                  totalItems={articles.length}
                  pageSize={PAGE_SIZE}
                  onPageChange={setKnowledgePage}
                />
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
                        paginatedOrders.map((order) => (
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
                <Pagination
                  page={orderPage}
                  totalPages={orderTotalPages}
                  totalItems={orders.length}
                  pageSize={PAGE_SIZE}
                  onPageChange={setOrderPage}
                />
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
                        paginatedContacts.map((contact) => (
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
                <Pagination
                  page={contactPage}
                  totalPages={contactTotalPages}
                  totalItems={contacts.length}
                  pageSize={PAGE_SIZE}
                  onPageChange={setContactPage}
                />
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </section>
      {editing && (
        <AdminEditModal
          editing={editing}
          onClose={() => setEditing(null)}
          onServiceSubmit={handleServiceSubmit}
          onArticleSubmit={handleArticleSubmit}
        />
      )}
    </div>

  );
}

function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  if (totalItems === 0) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {start}–{end} of {totalItems}
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>

        {pages.map((pageNumber) => (
          <Button
            key={pageNumber}
            size="sm"
            variant={pageNumber === page ? "default" : "outline"}
            onClick={() => onPageChange(pageNumber)}
            className="min-w-9"
          >
            {pageNumber}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
function AdminEditModal({
  editing,
  onClose,
  onServiceSubmit,
  onArticleSubmit,
}: {
  editing: EditingItem;
  onClose: () => void;
  onServiceSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => void;
  onArticleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => void;
}) {
  const isService = editing.type === "service";
  const data = editing.data || {};

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-2xl rounded-xl bg-background shadow-2xl overflow-auto max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b px-6 py-4 ">
          <div>
            <h2 className="text-xl font-bold">
              {editing.id
                ? isService
                  ? "Edit Service"
                  : "Edit Knowledge Article"
                : isService
                  ? "Add Service"
                  : "Add Knowledge Article"}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {editing.id
                ? "Update the information below."
                : isService
                  ? "Create a new service."
                  : "Create a new knowledge hub article."}
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Service Form */}
        {isService ? (
          <form
            onSubmit={onServiceSubmit}
            className="space-y-5 p-6"
          >
            <div className="space-y-2">
              <Label htmlFor="pillar-title">
                Pillar Title
              </Label>

              <Input
                id="pillar-title"
                name="pillar_title"
                defaultValue={data.pillar_title || ""}
                placeholder="e.g. Agricultural Aggregation"
                autoFocus
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pillar-slug">
                Pillar Slug
              </Label>

              <Input
                id="pillar-slug"
                name="pillar_slug"
                defaultValue={data.pillar_slug || ""}
                placeholder="e.g. agricultural-aggregation"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pillar-intro">
                Pillar Introduction
              </Label>

              <Textarea
                id="pillar-intro"
                name="pillar_intro"
                defaultValue={data.pillar_intro || ""}
                placeholder="Describe this service pillar..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service-name">
                Service Name
              </Label>

              <Input
                id="service-name"
                name="service_name"
                defaultValue={data.service_name || ""}
                placeholder="e.g. Smallholder Crop Consolidation"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service-copy">
                Service Description
              </Label>

              <Textarea
                id="service-copy"
                name="service_copy"
                defaultValue={data.service_copy || ""}
                placeholder="Describe this service..."
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service-sort-order">
                Sort Order
              </Label>

              <Input
                id="service-sort-order"
                name="sort_order"
                type="number"
                min="0"
                defaultValue={data.sort_order ?? 0}
              />
            </div>

            <div className="flex justify-end gap-3 border-t pt-5">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button type="submit" variant="gold">
                {editing.id ? "Update Service" : "Add Service"}
              </Button>
            </div>
          </form>
        ) : (
          /* Knowledge Article Form */
          <form
            onSubmit={onArticleSubmit}
            className="space-y-5 p-6"
          >
            <div className="space-y-2">
              <Label htmlFor="article-title">
                Title
              </Label>

              <Input
                id="article-title"
                name="title"
                defaultValue={data.title || ""}
                placeholder="Enter article title"
                autoFocus
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="article-category">
                Category
              </Label>

              <Input
                id="article-category"
                name="category"
                defaultValue={data.category || ""}
                placeholder="e.g. Agriculture, Farming"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="article-content">
                Content
              </Label>

              <Textarea
                id="article-content"
                name="content"
                defaultValue={data.content || ""}
                placeholder="Write the knowledge article..."
                rows={10}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="article-excerpt">
                Excerpt
              </Label>

              <Textarea
                id="article-excerpt"
                name="excerpt"
                defaultValue={data.excerpt || ""}
                placeholder="Short description shown on the Knowledge Hub card..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="article-read-time">
                Read Time
              </Label>

              <Input
                id="article-read-time"
                name="read_time"
                defaultValue={data.read_time || ""}
                placeholder="e.g. 6 min"
              />
            </div>

            <div className="flex justify-end gap-3 border-t pt-5">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button type="submit" variant="gold">
                {editing.id
                  ? "Update Article"
                  : "Add Article"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}