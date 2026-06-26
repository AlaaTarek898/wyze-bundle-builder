import ReviewSection from "../ReviewSection/ReviewSection";
import { useBundle } from "../../context/BundleContext";
import { toast } from "react-hot-toast";

import icon2 from "../../assets/icon2.png";
import badge from "../../assets/badge.png";

export default function ReveiwPanel({ products }) {
const {
  bundle,
  calculateTotal,
  calculateOriginalTotal,
  calculateSavings,
  saveConfiguration,
} = useBundle();
  const buildItems = (sectionName, source) => {
    const items = [];

    source.forEach((item) => {
      if (item.variants?.length) {
        const variants = bundle[sectionName]?.[item.id] || {};

        Object.entries(variants).forEach(([variantId, quantity]) => {
          if (quantity > 0) {
            const variant = item.variants.find(
              (v) => v.id === variantId
            );

            items.push({
              ...item,
              quantity,
              variantId,
              variantName: variant?.name,
            });
          }
        });
      } else {
        const quantity =
          bundle[sectionName]?.[item.id] || 0;

        if (quantity > 0) {
          items.push({
            ...item,
            quantity,
          });
        }
      }
    });

    return items;
  };

  const cameraItems = buildItems(
    "cameras",
    products.cameras
  );

  const planItems = buildItems(
    "plans",
    products.plans
  );

  const sensorItems = buildItems(
    "sensors",
    products.sensors
  );

  const accessoryItems = buildItems(
    "accessories",
    products.accessories
  );

  return (
    <section className="bg-[#EDF4FF] rounded-2xl p-4 flex flex-col gap-6">
      {/* Header */}

      <p className="text-[#484848] uppercase text-sm *:text-xl xl:text-xl font-gilroy-medium">
        Review
      </p>

      <h2 className="text-2xl md-text-4xl xl:text-4xl font-gilroy">
        Your security system
      </h2>

      <p className="text-[#1F1F1FBF] text-sm *:text-xl xl:text-xl">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>

      <div className="w-full border-b border-[#D7D7D7]" />

      <ReviewSection
        title="Cameras"
        items={cameraItems}
        section="cameras"
      />

      <ReviewSection
        title="Plans"
        items={planItems}
        section="plans"
      />

      <ReviewSection
        title="Sensors"
        items={sensorItems}
        section="sensors"
      />

      <ReviewSection
        title="Accessories"
        items={accessoryItems}
        section="accessories"
      />

      {/* Shipping */}

      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <img
            src={icon2}
            alt="shipping"
            className="w-12 h-12"
          />

          <p className="font-gilroy">
            Fast Shipping
          </p>
        </div>

        <div className="text-right">
          <p className="line-through text-[#6F7882]">
            $5.99
          </p>

          <p className="text-[#4E2FD2]">
            FREE
          </p>
        </div>
      </div>

      <div className="w-full border-b border-[#D7D7D7]" />

      {/* Total */}

      <div className="flex justify-between items-center py-4">
        <img
          src={badge}
          alt="badge"
          className="w-24 h-24"
        />

        <div className="flex flex-col items-end gap-3">
          <span className="bg-[#4E2FD2] text-white text-xs px-3 py-1 rounded-full">
            as low as $19.19/mo
          </span>

          <div className="flex gap-4">
            <p className="line-through text-[#6F7882]">
              ${calculateOriginalTotal().toFixed(2)}
            </p>

            <p className="text-[#4E2FD2] text-3xl font-bold">
              ${calculateTotal().toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Savings */}

      <p className="text-[#0AA288] text-center">
        Congrats! You're saving $
        {calculateSavings().toFixed(2)} on your security
        bundle!
      </p>

      {/* Checkout */}

      <button className="bg-[#4E2FD2] text-white py-4 rounded-md text-xl font-gilroy hover:cursor-pointer">
        Checkout
      </button>

      {/* Save */}

      <button
  onClick={() => {
    saveConfiguration();
   toast.success('Successfully saved!');

  }}
  className="text-center underline text-[#6F7882]"
>
  Save my system for later
</button>
    </section>
  );
}