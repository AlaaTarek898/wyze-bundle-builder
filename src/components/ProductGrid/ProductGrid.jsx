import ProductCard from "../ProductCard/ProductCard";

export default function ProductGrid({ products, currentSection }) {
  return (
    <div
      className="grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-5
gap-4"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          currentSection={currentSection}
        />
      ))}
    </div>
  );
}
