import { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import ProductItem from "./ProductItem";
import Pagination from "../../UI/Pagination";
import "./ProductList.css";
import api, { call } from "../../../api/api";

const ProductList = () => {
  // Products list
  const [products, setProducts] = useState([]);

  // Use router hook to get data from url
  const params = useParams();
  const history = useHistory();
  const location = useLocation();

  const [pagingOpts, setPagingOpts] = useState({
    page_number: params.page_number || 1,
    page_size: 12,
    page_count: 1,
    item_count: 0,
  });

  // Search parameters
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  // Fetch products
  useEffect(() => {
    // Set category to search params
    const tmpParams = searchParams;
    const category = params.category;
    if (category) tmpParams.set("category", category);
    else tmpParams.delete("category");
    tmpParams.set("page_number", pagingOpts.page_number);
    tmpParams.set("page_size", pagingOpts.page_size);

    // Fetch
    call(api.product.getAll(Object.fromEntries(tmpParams)), (data) => {
      setProducts(data.items);
      setPagingOpts({
        page_number: Number(data.page_number),
        page_size: Number(data.page_size),
        page_count: Number(data.page_count),
        item_count: Number(data.item_count),
      });
    });

    // Deps
  }, [pagingOpts.page_number, pagingOpts.page_size, params.category, searchParams]);

  // On change filter
  const filterChangeHandler = (e) => {
    // Set params
    const tmpParams = searchParams;
    if (e.target.value === "") tmpParams.delete("search");
    else tmpParams.set("search", e.target.value);
    // Change location
    history.push(location.pathname + "?" + tmpParams.toString());
  };

  // On change sort
  const sortChangeHandler = (e) => {
    // Set params
    const tmpParams = searchParams;
    if (e.target.value === "") tmpParams.delete("sort");
    else tmpParams.set("sort", e.target.value);
    // Change location
    history.push(location.pathname + "?" + tmpParams.toString());
  };

  // Render component
  return (
    <div className="product-list">
      <div className="product-filter">
        <input
          type="text"
          value={searchParams.get("search") || ""}
          onChange={filterChangeHandler}
          placeholder="Enter Search Here"
        />
        <select value={searchParams.get("sort") || ""} onChange={sortChangeHandler}>
          <option value="">Default sorting</option>
          <option value="price">Sort by price increase</option>
          <option value="-price">Sort by price decrease</option>
        </select>
      </div>
      <div className="product-items row">
        {products.map((item) => (
          <div className="col-sm-6 col-md-4" key={item._id}>
            <ProductItem item={item} />
          </div>
        ))}
      </div>
      {products.length !== 0 && (
        <div className="product-footer">
          <Pagination options={pagingOpts} setOptions={setPagingOpts} />
        </div>
      )}
    </div>
  );
};

export default ProductList;
