import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminProductsPage() {

  type Category = {
    id: string;
    name: string;
    slug: string;
  };

  type Product = {
    id: string;
    category_id: string;
    name: string;
    slug: string | null;
    description: string | null;
    summary: string | null;
    price_per_unit: number;
    unit: string;
    image: string | null;
    stock: number;
    moq: number;
    origin: string | null;
    grade: string | null;
    lead: string | null;
    blurb: string | null;
    spec: string[];
    active: boolean;
    featured: boolean;
    sort_order: number;
  };

  type ProductForm = {
    id: string;
    category_id: string;
    name: string;
    slug: string;
    description: string;
    summary: string;
    price_per_unit: string;
    unit: string;
    stock: string;
    moq: string;
    origin: string;
    grade: string;
    lead: string;
    blurb: string;
    spec: string;
    active: boolean;
    featured: boolean;
    sort_order: string;
  };

  const emptyForm: ProductForm = {
    id: "",
    category_id: "",
    name: "",
    slug: "",
    description: "",
    summary: "",
    price_per_unit: "",
    unit: "",
    stock: "0",
    moq: "1",
    origin: "",
    grade: "",
    lead: "",
    blurb: "",
    spec: "",
    active: true,
    featured: false,
    sort_order: "0",
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const [productsResult, categoriesResult] = await Promise.all([
      supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true }),

      supabase
        .from("categories")
        .select("id, name, slug")
        .eq("active", true)
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true }),
    ]);

    if (productsResult.error) {
      console.error("Error loading products:", productsResult.error);
      alert(productsResult.error.message);
    } else {
      setProducts(productsResult.data ?? []);
    }

    if (categoriesResult.error) {
      console.error("Error loading categories:", categoriesResult.error);
      alert(categoriesResult.error.message);
    } else {
      setCategories(categoriesResult.data ?? []);
    }

    setLoading(false);
  }

  function openAddModal() {
    setEditingProduct(null);

    setForm({
      ...emptyForm,
      category_id: categories[0]?.id ?? "",
    });
    setImageFile(null);
    setImagePreview(null);


    setModalOpen(true);
  }

  function openEditModal(product: Product) {
    setEditingProduct(product);

    setForm({
      id: product.id,
      category_id: product.category_id,
      name: product.name,
      slug: product.slug ?? "",
      description: product.description ?? "",
      summary: product.summary ?? "",
      price_per_unit: String(product.price_per_unit ?? ""),
      unit: product.unit ?? "",
      stock: String(product.stock ?? 0),
      moq: String(product.moq ?? 1),
      origin: product.origin ?? "",
      grade: product.grade ?? "",
      lead: product.lead ?? "",
      blurb: product.blurb ?? "",
      spec: Array.isArray(product.spec)
        ? product.spec.join("\n")
        : "",
      active: product.active,
      featured: product.featured,
      sort_order: String(product.sort_order ?? 0),
    });
    setImageFile(null);
    setImagePreview(product.image);
    setModalOpen(true);
  }

  function closeModal() {
    if (saving) return;

    setModalOpen(false);
    setEditingProduct(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);

  }

  function updateForm<K extends keyof ProductForm>(
    key: K,
    value: ProductForm[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.id.trim()) {
      alert("Product ID is required.");
      return;
    }

    if (!form.category_id) {
      alert("Please select a category.");
      return;
    }

    if (!form.name.trim()) {
      alert("Product name is required.");
      return;
    }

    if (!form.unit.trim()) {
      alert("Unit is required.");
      return;
    }

    setSaving(true);

    let uploadedImagePath: string | null = null;

    try {
      let imageUrl: string | null = editingProduct?.image ?? null;

      /*
       * Upload a new image only when the admin selected one.
       */
      if (imageFile) {
        const fileExtension =
          imageFile.name.split(".").pop()?.toLowerCase() || "jpg";

        const fileName = `${crypto.randomUUID()}.${fileExtension}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, imageFile, {
            cacheControl: "3600",
            upsert: false,
            contentType: imageFile.type,
          });

        if (uploadError) {
          throw new Error(
            `Image upload failed: ${uploadError.message}`
          );
        }

        uploadedImagePath = filePath;

        const { data: publicUrlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      const productData = {
        id: form.id.trim(),
        category_id: form.category_id,
        name: form.name.trim(),

        slug: form.slug.trim() || null,

        description: form.description.trim() || null,
        summary: form.summary.trim() || null,

        price_per_unit: Number(form.price_per_unit) || 0,

        unit: form.unit.trim(),

        image: imageUrl,

        stock: Number(form.stock) || 0,
        moq: Number(form.moq) || 1,

        origin: form.origin.trim() || null,
        grade: form.grade.trim() || null,
        lead: form.lead.trim() || null,
        blurb: form.blurb.trim() || null,

        spec: form.spec
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        active: form.active,
        featured: form.featured,
        sort_order: Number(form.sort_order) || 0,
      };

      if (editingProduct) {
        const { data, error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id)
          .select()
          .single();

        if (error) {
          throw error;
        }

        setProducts((current) =>
          current.map((product) =>
            product.id === editingProduct.id ? data : product
          )
        );
      } else {
        const { data, error } = await supabase
          .from("products")
          .insert(productData)
          .select()
          .single();

        if (error) {
          throw error;
        }

        setProducts((current) => [...current, data]);
      }

      closeModal();
    } catch (error: any) {
      console.error("Error saving product:", error);

      /*
       * If image uploaded successfully but product saving failed,
       * remove the orphaned image from Storage.
       */
      if (uploadedImagePath) {
        await supabase.storage
          .from("product-images")
          .remove([uploadedImagePath]);
      }

      alert(error?.message ?? "Failed to save product.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (error) {
      console.error("Error deleting product:", error);
      alert(error.message);
      return;
    }

    setProducts((current) =>
      current.filter((item) => item.id !== product.id)
    );
  }

  const filteredProducts = products.filter((product) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      !searchValue ||
      product.name.toLowerCase().includes(searchValue) ||
      product.id.toLowerCase().includes(searchValue);

    const matchesCategory =
      selectedCategory === "all" ||
      product.category_id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  function getCategoryName(categoryId: string) {
    return (
      categories.find((category) => category.id === categoryId)?.name ??
      "Unknown"
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Products
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your AgriLink products and inventory.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
          >
            + Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-green-500"
            >
              <option value="all">All Categories</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="p-10 text-center text-sm text-slate-500">
              Loading products...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-slate-500">
                No products found.
              </p>

              <button
                type="button"
                onClick={openAddModal}
                className="mt-3 text-sm font-semibold text-green-600 hover:text-green-700"
              >
                Add your first product
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Product
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Category
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Price
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Unit
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      MOQ
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Stock
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {/* Don't render anything when image is null */}
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                          ) : null}

                          <div>
                            <p className="font-semibold text-slate-900">
                              {product.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {product.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {getCategoryName(product.category_id)}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                        {Number(product.price_per_unit).toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {product.unit}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {product.moq}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {product.stock}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${product.active
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-500"
                            }`}
                        >
                          {product.active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(product)}
                            className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(product)}
                            className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-3 text-sm text-slate-500">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingProduct ? "Edit Product" : "Add Product"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingProduct
                    ? "Update the product information."
                    : "Add a new product to your catalog."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              {/* Basic Information */}
              <section>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">
                  Basic Information
                </h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    label="Product ID"
                    required
                    value={form.id}
                    onChange={(value) => updateForm("id", value)}
                    placeholder="e.g. sorghum-white"
                    disabled={!!editingProduct}
                  />

                  <FormField
                    label="Product Name"
                    required
                    value={form.name}
                    onChange={(value) => updateForm("name", value)}
                    placeholder="White Sorghum"
                  />

                  <FormField
                    label="Slug"
                    value={form.slug}
                    onChange={(value) => updateForm("slug", value)}
                    placeholder="white-sorghum"
                  />

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Category <span className="text-red-500">*</span>
                    </label>

                    <select
                      value={form.category_id}
                      onChange={(e) =>
                        updateForm("category_id", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                      required
                    >
                      <option value="">Select category</option>

                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <FormField
                    label="Unit"
                    required
                    value={form.unit}
                    onChange={(value) => updateForm("unit", value)}
                    placeholder="MT"
                  />

                  <FormField
                    label="Price Per Unit"
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price_per_unit}
                    onChange={(value) =>
                      updateForm("price_per_unit", value)
                    }
                    placeholder="410"
                  />

                  <FormField
                    label="MOQ"
                    type="number"
                    min="1"
                    value={form.moq}
                    onChange={(value) => updateForm("moq", value)}
                    placeholder="5"
                  />

                  <FormField
                    label="Stock"
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(value) => updateForm("stock", value)}
                    placeholder="0"
                  />
                </div>
              </section>

              {/* Product Details */}
              <section>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">
                  Product Details
                </h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    label="Origin"
                    value={form.origin}
                    onChange={(value) => updateForm("origin", value)}
                    placeholder="Kalobeyei Irrigation Cluster"
                  />

                  <FormField
                    label="Grade"
                    value={form.grade}
                    onChange={(value) => updateForm("grade", value)}
                    placeholder="Grade 1"
                  />

                  <FormField
                    label="Lead Time"
                    value={form.lead}
                    onChange={(value) => updateForm("lead", value)}
                    placeholder="7–10 days"
                  />

                  <FormField
                    label="Sort Order"
                    type="number"
                    value={form.sort_order}
                    onChange={(value) =>
                      updateForm("sort_order", value)
                    }
                    placeholder="0"
                  />
                </div>

                <div className="mt-4 space-y-4">
                  <TextAreaField
                    label="Blurb"
                    value={form.blurb}
                    onChange={(value) => updateForm("blurb", value)}
                    placeholder="Short product description..."
                  />

                  <TextAreaField
                    label="Description"
                    value={form.description}
                    onChange={(value) =>
                      updateForm("description", value)
                    }
                    placeholder="Detailed product description..."
                  />

                  <TextAreaField
                    label="Summary"
                    value={form.summary}
                    onChange={(value) => updateForm("summary", value)}
                    placeholder="Product summary..."
                  />

                  <TextAreaField
                    label="Specifications"
                    value={form.spec}
                    onChange={(value) => updateForm("spec", value)}
                    placeholder={`One specification per line:\nMoisture ≤ 13%\nForeign matter ≤ 1%\nAflatoxin < 10 ppb\n50kg PP bags`}
                    rows={5}
                  />
                </div>
              </section>

              {/* Settings */}
              <section>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">
                  Settings
                </h3>

                <div className="flex flex-wrap gap-6">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={(e) =>
                        updateForm("active", e.target.checked)
                      }
                      className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                    />

                    <span className="text-sm text-slate-700">
                      Active
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) =>
                        updateForm("featured", e.target.checked)
                      }
                      className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                    />

                    <span className="text-sm text-slate-700">
                      Featured
                    </span>
                  </label>
                </div>
              </section>

              {/* Image note */}
              <div className="rounded-lg border border-slate-300 bg-slate-50 p-4">
                <label
                  htmlFor="product-image"
                  className="text-sm font-medium text-slate-700"
                >
                  Product Image
                </label>

                <input
                  id="product-image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;

                    if (!file) {
                      setImageFile(null);
                      return;
                    }

                    // 5 MB limit
                    if (file.size > 5 * 1024 * 1024) {
                      alert("Image must be smaller than 5MB.");
                      e.target.value = "";
                      setImageFile(null);
                      return;
                    }

                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                  }}
                  className="mt-2 block w-full cursor-pointer rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-green-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-green-700"
                />

                <p className="mt-2 text-xs text-slate-500">
                  JPG, PNG, or WebP. Maximum 5MB.
                </p>

                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="h-32 w-32 rounded-lg border border-slate-200 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingProduct
                      ? "Update Product"
                      : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* -----------------------------
   Reusable Form Components
----------------------------- */

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  min,
  step,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  step?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}

        {required && <span className="text-red-500"> *</span>}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        step={step}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-slate-100"
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
      />
    </div>
  );
}
