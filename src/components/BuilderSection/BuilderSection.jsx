import BuilderStep from "../BuilderStep/BuilderStep";
import { useBundle } from "../../context/BundleContext";

export default function BuilderSection({ products }) {
  const {
    getSelectedCount,
  } = useBundle();

  return (
    <section className="w-full flex flex-col gap-6">

      <BuilderStep
        step={1}
        title="Choose your cameras"
        nextTitle="Choose your plan"
        products={products.cameras}
        currentSection="cameras"
        selectedCount={getSelectedCount("cameras")}
      />

      <BuilderStep
        step={2}
        title="Choose your plan"
        nextTitle="Choose your sensors"
        products={products.plans}
        currentSection="plans"
        selectedCount={getSelectedCount("plans")}
      />

      <BuilderStep
        step={3}
        title="Choose your sensors"
        nextTitle="Choose your accessories"
        products={products.sensors}
        currentSection="sensors"
        selectedCount={getSelectedCount("sensors")}
      />

      <BuilderStep
        step={4}
        title="Choose your accessories"
        nextTitle=""
        products={products.accessories}
        currentSection="accessories"
        selectedCount={getSelectedCount("accessories")}
      />

    </section>
  );
}