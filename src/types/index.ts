export type ProductImage = {
  uuid: string;
  url: string;
  altText: string;
  sortOrder: number;
  isPrimary: boolean;
};

export type ProductVariant = {
  uuid: string;
  name: string;
  attribute: string;
  value: string;
  stock: number;
  priceModifier: number;
};

export type ProductTag = {
  uuid: string;
  name: string;
  slug: string;
};

export type Product = {
  uuid: string;
  name: string;
  slug: string;
  description: string;
  content: string;
  sku: string;
  categoryUuid: string;
  brandUuid: string;
  status: "published" | "draft";
  retailPrice: number;
  salePrice: number | null;
  compareAtPrice: number;
  hasVariants: boolean;
  variants: ProductVariant[];
  isFeatured: boolean;
  isDigital: boolean;
  stock: number;
  tags: ProductTag[];
  images: ProductImage[];
  rating: number;
  reviewCount: number;
  createdAt: string;
};

export type Category = {
  uuid: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentUuid: string | null;
  sortOrder: number;
};

export type Brand = {
  uuid: string;
  name: string;
  slug: string;
  logo: string;
};

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "ready_to_ship"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "completed"
  | "cancelled"
  | "returned";

export type OrderItem = {
  productUuid: string;
  variantUuid: string | null;
  name: string;
  image: string;
  variantLabel: string | null;
  unitPrice: number;
  quantity: number;
  subtotal: number;
};

export type ShippingAddress = {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
};

export type OrderTimelineStep = {
  status: OrderStatus;
  label: string;
  timestamp: string;
};

export type Order = {
  uuid: string;
  orderNumber: string;
  customerUuid: string;
  status: OrderStatus;
  paymentStatus: "unpaid" | "pending" | "paid" | "partial" | "refunded";
  paymentMethod: "cash_on_delivery" | "card" | "mobile_banking";
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  pricing: {
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
  };
  timeline: OrderTimelineStep[];
  createdAt: string;
};