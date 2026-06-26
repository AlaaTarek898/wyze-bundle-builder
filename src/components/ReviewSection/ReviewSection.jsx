import { useBundle } from "../../context/BundleContext";

export default function ReviewSection({ title, items, section }) {
  const { increaseQuantity, decreaseQuantity } = useBundle();

  return (
    <>
      <p className="text-[#A8B2BD] uppercase text-sm font-gilroy-medium">
        {title}
      </p>

      {items.map((item) => {
        const quantity = item.quantity || 1;

        const totalOriginalPrice = item.originalPrice * quantity;

        const totalSalePrice =
          (item.salePrice ?? item.originalPrice) * quantity;

        return (
          <div
            key={`${item.id}-${item.variantId || ""}`}
            className="flex items-center justify-between py-2 w-full"
          >
            {/* Left */}

            <div className="flex items-center gap-4 w-1/2">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-contain shrink-0"
              />

              <div>
                <p
                  className="text-[#1F1F1F] text-sm
md:text-xl
lg:text-2xl
xl:text-3xl
2xl:text-3xl font-gilroy"
                >
                  {item.name}

                  {item.variantName && (
                    <span className="text-[#6F7882]">
                      {" - "}
                      {item.variantName}
                    </span>
                  )}

                  {item.required && (
                    <span className="text-[#6F7882]"> (Required)</span>
                  )}
                </p>
              </div>
            </div>

            {/* Right */}

            <div className="flex items-center gap-2">
              {/* Counter */}

              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    decreaseQuantity(section, item.id, item.variantId || null)
                  }
                  className="w-10 h-10 rounded-md bg-white"
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  onClick={() =>
                    increaseQuantity(section, item.id, item.variantId || null)
                  }
                  className="w-10 h-10 rounded-md bg-white"
                >
                  +
                </button>
              </div>

              {/* Price */}

              <div className="text-right">
                <p className="text-[#6F7882] text-sm md:text-xl xl:text-2xl line-through">
                  ${totalOriginalPrice.toFixed(2)}
                </p>

                <p className="text-[#4E2FD2] text-sm md:text-xl xl:text-2xl font-semibold">
                  {item.salePrice === 0
                    ? "FREE"
                    : `$${totalSalePrice.toFixed(2)}`}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      <div className="w-full border-b border-[#D7D7D7]" />
    </>
  );
}
