import PropTypes from "prop-types";

const SelfAssessmentProduct = ({ product }) => {
  const { image, description, price } = product;
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4">
      <img className="w-full" src={image} alt="Product" />
      <div className="px-6 py-4 text-left font-semibold tracking-wide">
        <p className="text-gray-700 text-base">{description}</p>
        <div className="flex items-center mt-2">
          <div className="text-[#3a643b] text-lg mr-1">
            &#9733;&#9733;&#9733;&#9733;&#9733;
          </div>
          <span className="text-gray-600 text-sm">₹ {price}</span>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="bg-[#3a643b] mb-4 w-full text-white font-bold py-2 px-4 rounded-full">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

SelfAssessmentProduct.propTypes = {
  product: PropTypes.object,
};

export default SelfAssessmentProduct;
