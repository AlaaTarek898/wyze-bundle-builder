import AppLayout from "./components/AppLayout/AppLayout";
import products from "./data/product.json";

export default function AppContent() {
  return (
    <div className=" mx-auto p-0 md:p-6 *:px-4">
      <AppLayout products={products} />
    </div>
  );
}