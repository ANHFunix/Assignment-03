import ShopBanner from "../components/pages/shop/ShopBanner";
import CategoryNav from "../components/pages/shop/CategoryNav";
import ProductList from "../components/pages/shop/ProductList";
import { Fragment } from "react";

const Shop = () => {
  // Render component
  return (
    <Fragment>
      <Fragment>
        <ShopBanner />
        <div className="row mb-5">
          <div className="col-sm-3 col-md-3 mb-4">
            <CategoryNav pathname="/shop" />
          </div>
          <div className="col-sm-9 col-md-9">
            <ProductList />
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
};

export default Shop;
