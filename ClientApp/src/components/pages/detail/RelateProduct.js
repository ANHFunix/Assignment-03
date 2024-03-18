import ProductItem from "../shop/ProductItem";
import "./RelateProduct.css";

const RelateProduct = ({ items, item }) => {
  // Get related items
  const related = items.filter((relate) => relate.category === item.category && relate._id !== item._id).slice(0, 4);

  // Render component
  return (
    <div className="related-products">
      <h5>RELATED PRODUCT</h5>
      <div className="row">
        {/* Render related items */}
        {related.map((item, index) => (
          <div className="col-sm-4 col-md-3" key={index}>
            <ProductItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelateProduct;
