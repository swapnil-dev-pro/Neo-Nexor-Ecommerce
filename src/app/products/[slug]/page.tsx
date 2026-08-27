import productsData from "@/database/products.json";
import { Product } from "@/types";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";

const products = productsData as Product[];

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}