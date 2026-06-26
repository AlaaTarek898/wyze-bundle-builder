import BuilderSection from "../BuilderSection/BuilderSection";
import ReveiwPanel from "../ReviewPanel/ReveiwPanel";

export default function AppLayout({ products }) {
  return (
    <section
      className="
 w-full
    flex
    flex-col
    lg:grid
    lg:grid-cols-[2fr_1fr]
    2xl:flex
    2xl:flex-col
    gap-6
"
    >
      <BuilderSection products={products} />

      <ReveiwPanel products={products} />
    </section>
  );
}
