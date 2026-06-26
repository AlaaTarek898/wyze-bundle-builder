import { useBundle } from "../../context/BundleContext";

function ProductCard({ product, currentSection }) {
  const {
    bundle,
    increaseQuantity,
    decreaseQuantity,
    selectedVariants,
    setSelectedVariants,
  } = useBundle();

  const hasVariants = product.variants?.length > 0;

  const selectedVariant = selectedVariants[product.id];

  const section = bundle[currentSection] || {};

  const quantity = hasVariants
    ? section?.[product.id]?.[selectedVariant] || 0
    : section?.[product.id] || 0;

  const displayPrice = product.salePrice ?? product.originalPrice;

  return (
    <div
      className={`rounded-2xl p-6 md:flex-row
xl:flex-col items-start gap-4 border-2 transition-all duration-300 ${
        quantity > 0
          ? "bg-[#F8F6FF] border-[#4E2FD2]"
          : "bg-white border-transparent"
      }`}
    >
      {/* Left */}

      <div
        className="w-full w-md-1/3 shrink-0 flex-col
 gap-4"
      >
        {product.badge && (
          <span className="bg-[#4E2FD2] text-white px-3 py-1 rounded-full text-sm font-gilroy">
            {product.badge}
          </span>
        )}

        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="object-contain"
          />
        )}
      </div>

      {/* Right */}

      <div className="flex-1">
        <h3 className="text-xl md-text-3xl xl:text-xl font-gilroy text-[#1F1F1F] mb-2">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-[#575757] text-sm md:text-xl xl:text-lg mb-4">
            {product.description}

            <a href="#" className="ml-1 text-[#4E2FD2] underline">
              Learn More
            </a>
          </p>
        )}

        {/* Variants */}

        {hasVariants && (
          <div className="flex flex-wrap gap-3 mb-6">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() =>
                  setSelectedVariants((prev) => ({
                    ...prev,
                    [product.id]: variant.id,
                  }))
                }
                className={`flex items-center text-sm text-md-2xl gap-2 p-2 rounded-lg border-2 transition-all duration-200 ${
                  selectedVariants[product.id] === variant.id
                    ? "border-[#4E2FD2] bg-[#F4F0FF]"
                    : "border-gray-300"
                }`}
              >
                {variant.image && (
                  <img
                    src={variant.image}
                    alt={variant.name}
                    className="w-8 h-8 object-contain"
                  />
                )}

                <span>{variant.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Footer */}

        <div className="flex items-end justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                decreaseQuantity(
                  currentSection,
                  product.id,
                  hasVariants ? selectedVariant : null,
                )
              }
              disabled={quantity === 0}
              className={`w-10 h-10 border rounded-md transition-colors
    ${quantity === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              onClick={() =>
                increaseQuantity(
                  currentSection,
                  product.id,
                  hasVariants ? selectedVariant : null,
                )
              }
              className="w-10 h-10 border rounded-md"
            >
              +
            </button>
          </div>

          <div className="flex flex-col items-end">
            {product.salePrice && (
              <span className="line-through text-[#D8392B]">
                ${product.originalPrice}
              </span>
            )}

            <span className="text-2xl font-bold text-[#575757]">
              ${displayPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
