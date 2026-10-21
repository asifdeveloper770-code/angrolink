export type Product = {
  id: string;
  name: string;
  category: string;
  unit: string;
  pricePerUnit: number;
  moq: number;
  origin: string;
  grade: string;
  lead: string;
  blurb: string;
  spec: string[];
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "sorghum-white",
    name: "White Sorghum",
    category: "Cereals",
    unit: "50kg Sack (MT)",
    pricePerUnit: 410,
    moq: 5,
    origin: "Kalobeyei Irrigation Cluster",
    grade: "Grade 1",
    lead: "7–10 days",
    blurb:
      "Drought-tolerant cereal aggregated in bulk 50kg export-grade sacks from 400+ smallholder plots.",
    spec: [
      "Moisture ≤ 13%",
      "Foreign matter ≤ 1%",
      "Aflatoxin < 10 ppb",
      "Stacked in 50kg PP sacks",
    ],
    image: "/images/bulk_sorghum_sack.jpg",
  },
  {
    id: "green-grams",
    name: "Green Grams (Ndengu)",
    category: "Pulses",
    unit: "50kg Sack (MT)",
    pricePerUnit: 985,
    moq: 3,
    origin: "Lokichar Producer Group",
    grade: "Grade 1",
    lead: "10–14 days",
    blurb:
      "High-protein pulses machine-cleaned and packed in 50kg burlap sacks at Kakuma grading yard.",
    spec: ["Moisture ≤ 12%", "Purity ≥ 99%", "Hand-sorted", "Bulk 50kg sacks on pallets"],
    image:
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cowpeas",
    name: "Cowpeas",
    category: "Pulses",
    unit: "50kg Sack (MT)",
    pricePerUnit: 760,
    moq: 3,
    origin: "Turkana West Cooperatives",
    grade: "Grade 2",
    lead: "10–14 days",
    blurb:
      "Dual-purpose bulk legumes aggregated in 50kg sacks supporting climate-smart soil rotation.",
    spec: ["Moisture ≤ 13%", "Split ≤ 2%", "Fumigated", "50kg commercial grain sacks"],
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sukuma-wiki",
    name: "Kale (Sukuma Wiki)",
    category: "Fresh Produce",
    unit: "Crate (20kg)",
    pricePerUnit: 14,
    moq: 40,
    origin: "Nadapal Solar Cold Hub",
    grade: "Fresh A",
    lead: "24–48 hrs",
    blurb:
      "Cold-chain leafy greens harvested fresh at dawn and packed into ventilated 20kg field crates.",
    spec: ["Cold chain 2–6°C", "Field-washed", "20kg vented crates", "Pre-cooled within 4 hours"],
    image:
      "https://images.unsplash.com/photo-1524179091875-bf99a9a6fa57?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tomatoes",
    name: "Field Tomatoes",
    category: "Fresh Produce",
    unit: "Crate (25kg)",
    pricePerUnit: 21,
    moq: 30,
    origin: "Napusimoru Riverine Farms",
    grade: "Fresh A",
    lead: "24–72 hrs",
    blurb:
      "Firm determinate red field tomatoes packed in commercial harvest crates for wholesale institutional buyers.",
    spec: ["Uniform sizing", "Cold chain 8–12°C", "25kg harvest crates", "Traceable lot codes"],
    image: "/images/bulk_tomatoes_crates.jpg",
  },
  {
    id: "goat-meat",
    name: "Chilled Goat Carcass",
    category: "Livestock",
    unit: "Carcass (12kg avg)",
    pricePerUnit: 68,
    moq: 25,
    origin: "Turkana Pastoralist Network",
    grade: "Inspected",
    lead: "3–5 days",
    blurb:
      "Veterinary-inspected small stock chilled in solar cold facilities for wholesale institutional off-take.",
    spec: ["Vet certificate", "Cold chain 0–4°C", "Halal slaughter", "Lot traceability"],
    image:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sesame",
    name: "Sesame Seed",
    category: "Oilseeds",
    unit: "50kg Sack (MT)",
    pricePerUnit: 1450,
    moq: 2,
    origin: "Kaikor Corridor",
    grade: "Export",
    lead: "14–21 days",
    blurb: "Export-grade whitish sesame consolidated in 50kg grain sacks for cross-border freight.",
    spec: ["Oil content ≥ 48%", "Purity ≥ 99.5%", "Moisture ≤ 7%", "50kg lined sacks"],
    image:
      "https://images.unsplash.com/photo-1608797178974-15b35a61dd73?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "honey",
    name: "Raw Acacia Honey",
    category: "Specialty",
    unit: "Drum (25kg)",
    pricePerUnit: 165,
    moq: 8,
    origin: "Lopiding Apiary Collective",
    grade: "Grade A",
    lead: "7–12 days",
    blurb:
      "Single-origin raw acacia honey delivered in wholesale food-grade 25kg drums from women-led apiaries.",
    spec: ["Moisture ≤ 19%", "Unheated", "Food-grade drums", "Lab certified"],
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "onions",
    name: "Red Onions",
    category: "Fresh Produce",
    unit: "Bag (50kg Net)",
    pricePerUnit: 45,
    moq: 10,
    origin: "Turkana Fresh Markets",
    grade: "Fresh A",
    lead: "3–5 days",
    blurb:
      "Cured red onions aggregated in commercial 50kg breathable mesh sacks from regional farm clusters.",
    spec: ["Fresh grade A", "50kg net mesh sacks", "Field-cured", "Cold storage preserved"],
    image:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "spinach",
    name: "Spinach",
    category: "Fresh Produce",
    unit: "Crate (20kg)",
    pricePerUnit: 16,
    moq: 20,
    origin: "Kalobeyei Irrigation Cluster",
    grade: "Fresh A",
    lead: "24–48 hrs",
    blurb: "Crisp leafy spinach packed in wholesale 20kg crates with cold-chain pre-cooling.",
    spec: ["Cold chain 2–6°C", "Field-washed", "20kg vented crates", "Daily harvest"],
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "okra",
    name: "Okra",
    category: "Fresh Produce",
    unit: "Crate (15kg)",
    pricePerUnit: 18,
    moq: 15,
    origin: "Napusimoru Riverine Farms",
    grade: "Fresh A",
    lead: "24–48 hrs",
    blurb:
      "Graded tender okra packed in ventilated 15kg harvest crates for wholesale distribution.",
    spec: ["Uniform sizing", "Cold chain 8–12°C", "15kg crates", "Same-day dispatch"],
    image:
      "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "wheat-flour",
    name: "Wheat Grain & Flour",
    category: "Cereals",
    unit: "50kg Sack",
    pricePerUnit: 55,
    moq: 20,
    origin: "Turkana Grain Mills",
    grade: "Grade 1",
    lead: "5–7 days",
    blurb:
      "Commercial 50kg sacks of clean milled wheat grain and flour on warehouse pallets for food processors.",
    spec: ["Protein ≥ 11%", "Moisture ≤ 13%", "50kg commercial sacks", "Fortified"],
    image: "/images/bulk_wheat_sack.jpg",
  },
  {
    id: "rice",
    name: "Milled Rice",
    category: "Cereals",
    unit: "50kg Sack",
    pricePerUnit: 75,
    moq: 10,
    origin: "Regional Supply Partners",
    grade: "Grade 1",
    lead: "7–10 days",
    blurb:
      "Long-grain white milled rice packed in durable 50kg commercial sacks for institutional catering.",
    spec: ["White rice", "Moisture ≤ 14%", "50kg PP sacks", "Palletized supply"],
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cooking-oil",
    name: "Refined Cooking Oil",
    category: "Oilseeds",
    unit: "Jerrycan (20L)",
    pricePerUnit: 32,
    moq: 50,
    origin: "Local Processing Hub",
    grade: "Food Grade",
    lead: "3–5 days",
    blurb:
      "Wholesale food-grade vegetable cooking oil supplied in 20-liter commercial jerrycans and drums.",
    spec: ["Food grade", "Refined vegetable oil", "20L sealed jerrycans", "Traceable batch"],
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "maize",
    name: "Yellow Maize Grain",
    category: "Cereals",
    unit: "50kg Sack (MT)",
    pricePerUnit: 50,
    moq: 15,
    origin: "Turkana County Farmers",
    grade: "Grade 1",
    lead: "5–7 days",
    blurb:
      "Clean dry yellow maize grain in 50kg burlap and woven sacks palletized in warehouse depots.",
    spec: ["Moisture ≤ 13%", "Foreign matter ≤ 1%", "50kg sacks", "Fumigated & graded"],
    image: "/images/bulk_maize_sack.jpg",
  },
  {
    id: "beans",
    name: "Dry Beans",
    category: "Pulses",
    unit: "50kg Sack (MT)",
    pricePerUnit: 65,
    moq: 10,
    origin: "Turkana West Cooperatives",
    grade: "Grade 1",
    lead: "7–10 days",
    blurb:
      "Sorted dry field beans consolidated in heavy-duty 50kg bags from sustainable farm rotations.",
    spec: ["Moisture ≤ 13%", "Purity ≥ 98%", "50kg bags", "Hand-sorted & fumigated"],
    image:
      "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "green-peas",
    name: "Dry Green Peas",
    category: "Pulses",
    unit: "50kg Sack (MT)",
    pricePerUnit: 72,
    moq: 8,
    origin: "Kalobeyei Producer Groups",
    grade: "Grade 1",
    lead: "10–14 days",
    blurb:
      "High-protein dry green peas aggregated in 50kg sacks from irrigated cooperative clusters.",
    spec: ["Moisture ≤ 12%", "Purity ≥ 99%", "50kg sacks", "Machine-cleaned"],
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "eggs",
    name: "Farm Fresh Eggs",
    category: "Specialty",
    unit: "Crate (360 eggs)",
    pricePerUnit: 85,
    moq: 5,
    origin: "Kakuma Poultry Collectives",
    grade: "Grade A",
    lead: "2–3 days",
    blurb:
      "Fresh graded poultry eggs packed in stacked 30-egg pulp trays inside commercial wholesale crates.",
    spec: [
      "Grade A fresh",
      "360-egg commercial crates",
      "Ventilated packing",
      "Cold-chain dispatched",
    ],
    image: "/images/bulk_eggs_crates.jpg",
  },
  {
    id: "solar-panels",
    name: "Solar Panels",
    category: "Machinery",
    unit: "Unit",
    pricePerUnit: 1200,
    moq: 1,
    origin: "AgriLink Equipment Supply",
    grade: "Standard",
    lead: "14–21 days",
    blurb: "High-efficiency commercial solar panels for farm cold storage and pump power systems.",
    spec: ["High efficiency", "Durable frame", "Weather-resistant", "Technical support"],
    image:
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "drip-irrigation",
    name: "Drip Irrigation Kits",
    category: "Machinery",
    unit: "Kit (1 hectare)",
    pricePerUnit: 350,
    moq: 1,
    origin: "AgriLink Equipment Supply",
    grade: "Standard",
    lead: "7–14 days",
    blurb:
      "Complete commercial drip irrigation kits with rolls, emitters, and pressure filters for 1 hectare.",
    spec: ["Complete setup", "Water-efficient", "Easy installation", "Training included"],
    image:
      "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hand-pumps",
    name: "Hand Operator Pumps",
    category: "Machinery",
    unit: "Unit",
    pricePerUnit: 280,
    moq: 1,
    origin: "AgriLink Equipment Supply",
    grade: "Standard",
    lead: "5–7 days",
    blurb: "Heavy-duty cast hand-operated water pumps for remote farm cluster boreholes.",
    spec: ["Durable construction", "Easy maintenance", "High capacity", "Reliable"],
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tractors",
    name: "Tractors",
    category: "Machinery",
    unit: "Unit",
    pricePerUnit: 35000,
    moq: 1,
    origin: "AgriLink Equipment Partners",
    grade: "Standard",
    lead: "30–45 days",
    blurb:
      "Rugged agricultural tractors for mechanized land preparation across regional soil types.",
    spec: ["Low maintenance", "4WD options", "Spare parts available", "Operator training"],
    image:
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "solar-sprayers",
    name: "Solar-Powered Backpack Sprayers",
    category: "Machinery",
    unit: "Unit",
    pricePerUnit: 420,
    moq: 1,
    origin: "AgriLink Equipment Supply",
    grade: "Standard",
    lead: "10–14 days",
    blurb: "Solar-rechargeable knapsack sprayers for precise nutrient and organic pest management.",
    spec: ["Solar-powered", "Efficient spray", "Ergonomic design", "Long battery life"],
    image:
      "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "smartphones-tablets",
    name: "Affordable Smartphones & Tablets",
    category: "Machinery",
    unit: "Unit",
    pricePerUnit: 180,
    moq: 5,
    origin: "AgriLink Technology Partners",
    grade: "Standard",
    lead: "7–14 days",
    blurb:
      "Ruggedized field smartphones and tablets preloaded with AgriLink farm data collection apps.",
    spec: ["Android OS", "Drop resistant", "Sunlight legible", "Bundled farm apps"],
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
  },
];

// Extract unique categories safely
export const CATEGORIES: string[] = [
  "All",
  ...Array.from(new Set(PRODUCTS.map((p) => p.category))),
];

// Robust product lookup function
export function findProduct(id?: string): Product | undefined {
  if (!id) return undefined;
  const cleanId = id.trim().toLowerCase();
  return PRODUCTS.find((p) => p.id.toLowerCase() === cleanId);
}
