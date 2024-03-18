import { useEffect, useState } from "react";
import api from "../../../api/api";
import ProductItem from "../shop/ProductItem";
import "./TrendingList.css";

const TrendingList = () => {
  // Trending items
  const [items, setItems] = useState([]);

  // Fetch items
  useEffect(() => {
    api.product
      .getAll({ sort: "-price", limit: 8 })
      .then((res) => {
        // Get data
        const data = res.data;
        // Handle error
        if (res.data.error) throw new Error(data.error);
        // Set items
        setItems(data.items);
      })
      // Catch error
      .catch((err) => alert(err.response.data.error));
  }, []);

  // Render component
  return (
    <div className="trending-list">
      <div className="text--light">MADE THE HARD WAY</div>
      <h5>TOP TRENDING PRODUCTS</h5>
      <div className="row trending-items">
        {/* Render all items */}
        {items.map((item) => (
          <div className="col-sm-6 col-md-3" key={item._id}>
            <ProductItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingList;
