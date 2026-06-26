import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import products from "../data/product.json";

const BundleContext = createContext();

const STORAGE_KEY = "bundle-builder-config";

function getSavedConfiguration() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

export function BundleProvider({ children }) {

 

  const savedConfig = getSavedConfiguration();

  const defaultVariants = {
    "cam-v4": "white",
    "cam-pan-v3": "white",
    "cam-floodlight-v2": "white",
    "cam-battery-pro": "white",
  };


  

  const [bundle, setBundle] = useState(
    savedConfig?.bundle ?? products.initialSelections
  );

  const [selectedVariants, setSelectedVariants] =
    useState(
      savedConfig?.selectedVariants ??
        defaultVariants
    );

  const [currentStep, setCurrentStep] =
    useState(savedConfig?.currentStep ?? 1);

  const [openStep, setOpenStep] =
    useState(savedConfig?.openStep ?? 1);


  

  const increaseQuantity = (
    section,
    productId,
    variantId = null
  ) => {
    setBundle((prev) => ({
      ...prev,

      [section]: {
        ...prev[section],

        [productId]: variantId
          ? {
              ...prev[section]?.[productId],

              [variantId]:
                (prev[section]?.[productId]?.[
                  variantId
                ] || 0) + 1,
            }
          : (prev[section]?.[productId] || 0) + 1,
      },
    }));
  };

  const decreaseQuantity = (
    section,
    productId,
    variantId = null
  ) => {
    setBundle((prev) => ({
      ...prev,

      [section]: {
        ...prev[section],

        [productId]: variantId
          ? {
              ...prev[section]?.[productId],

              [variantId]: Math.max(
                0,
                (prev[section]?.[productId]?.[
                  variantId
                ] || 0) - 1
              ),
            }
          : Math.max(
              0,
              (prev[section]?.[productId] || 0) - 1
            ),
      },
    }));
  };


  // Calculations
  // =========================
const calculateTotal = () => {
  let total = 0;

  const sections = [
    { key: "cameras", products: products.cameras },
    { key: "plans", products: products.plans },
    { key: "sensors", products: products.sensors },
    { key: "accessories", products: products.accessories },
  ];

  sections.forEach(({ key, products: sectionProducts }) => {
    sectionProducts.forEach((item) => {
      if (item.variants?.length) {
        const variants = bundle[key]?.[item.id] || {};

        Object.values(variants).forEach((quantity) => {
          total +=
            (item.salePrice ?? item.originalPrice) * quantity;
        });
      } else {
        total +=
          (item.salePrice ?? item.originalPrice) *
          (bundle[key]?.[item.id] || 0);
      }
    });
  });

  return total;
};

 const calculateOriginalTotal = () => {
  let total = 0;

  const sections = [
    { key: "cameras", products: products.cameras },
    { key: "plans", products: products.plans },
    { key: "sensors", products: products.sensors },
    { key: "accessories", products: products.accessories },
  ];

  sections.forEach(({ key, products: sectionProducts }) => {
    sectionProducts.forEach((item) => {
      if (item.variants?.length) {
        const variants = bundle[key]?.[item.id] || {};

        Object.values(variants).forEach((quantity) => {
          total += item.originalPrice * quantity;
        });
      } else {
        total +=
          item.originalPrice *
          (bundle[key]?.[item.id] || 0);
      }
    });
  });

  return total;
};

  const calculateSavings = () =>
    calculateOriginalTotal() -
    calculateTotal();





  const getSelectedCount = (section) => {
    const data = bundle[section];

    let count = 0;

    Object.values(data).forEach((value) => {
      if (typeof value === "number") {
        if (value > 0) count++;
      } else {
        Object.values(value).forEach((qty) => {
          if (qty > 0) count++;
        });
      }
    });

    return count;
  };


  // Context Value
  // =========================
const saveConfiguration = () => {
  const data = {
    bundle,
    selectedVariants,
    currentStep,
    openStep,
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
};
 const value = useMemo(
  () => ({
    bundle,
    setBundle,

    selectedVariants,
    setSelectedVariants,

    currentStep,
    setCurrentStep,

    openStep,
    setOpenStep,

    increaseQuantity,
    decreaseQuantity,

    calculateTotal,
    calculateOriginalTotal,
    calculateSavings,

    getSelectedCount,

    saveConfiguration, 
  }),
  [
    bundle,
    selectedVariants,
    currentStep,
    openStep,
  ]
);
console.log({
  total: calculateTotal(),
  original: calculateOriginalTotal(),
  savings: calculateSavings(),
});
  return (
    <BundleContext.Provider value={value}>
      {children}
    </BundleContext.Provider>
  );
}

export function useBundle() {
  const context = useContext(BundleContext);

  if (!context) {
    throw new Error(
      "useBundle must be used inside BundleProvider"
    );
  }

  return context;
}