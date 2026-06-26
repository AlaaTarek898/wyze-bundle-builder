import ProductGrid from "../ProductGrid/ProductGrid";
import stepIcon from "../../assets/icon1.png";
import { useBundle } from "../../context/BundleContext";

export default function BuilderStep({
  step,
  title,
  nextTitle,
  products,
  currentSection,
  selectedCount,
}) {
  const {
    currentStep,
    setCurrentStep,
    openStep,
    setOpenStep,
  } = useBundle();

  const isOpen = openStep === step;

  return (
    <div className="bg-[#EDF4FF] rounded-2xl p-4 p-md-6 flex flex-col gap-6">
      {/* Step Number */}

      <p className="text-[#484848] font-gilroy-medium text-2xl  xl:text-xl">
        Step {step} of 4
      </p>

      <div className="border-b border-[#D7D7D7]" />

      {/* Header */}

      <div className="flex justify-between items-center">
        <button
          onClick={() => {
            setOpenStep(step);
            setCurrentStep(step);
          }}
          className="flex items-center gap-4"
        >
          <img src={stepIcon} alt="step" />

          <p className="text-lg md-text-2xl xl:text-xl font-gilroy">
            {title}
          </p>
        </button>

        <button
          onClick={() =>
            setOpenStep(isOpen ? 0 : step)
          }
          className="flex text-sm text-md-xl  xl:text-xl font-gilroy items-center gap-2 text-[#4E2FD2]"
        >
          <span>{selectedCount} selected</span>

          <span>{isOpen ? "▲" : "▼"}</span>
        </button>
      </div>

      {/* Products */}

      {isOpen && (
        <>
          <ProductGrid
            products={products}
            currentSection={currentSection}
          />

          <button
            onClick={() => {
              if (step < 4) {
                setCurrentStep(step + 1);
                setOpenStep(step + 1);
              }
            }}
            className="text-[#4E2FD2] border-2 border-[#4E2FD2] rounded-xl py-3"
          >
            {step < 4 ? `Next: ${nextTitle}` : "Finish"}
          </button>
        </>
      )}
    </div>
  );
}