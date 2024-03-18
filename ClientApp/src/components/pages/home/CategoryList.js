import { useHistory } from "react-router-dom";

import img1 from "../../../assets/images/product_1.png";
import img2 from "../../../assets/images/product_2.png";
import img3 from "../../../assets/images/product_3.png";
import img4 from "../../../assets/images/product_4.png";
import img5 from "../../../assets/images/product_5.png";
import "./CategoryList.css";

const CategoryList = () => {
  // Pages history
  const history = useHistory();

  // Render component
  return (
    <div className="category-list">
      <div className="text--light">CAREFULLY CREATED COLLECTIONS</div>
      <h5>BROWSE OUR CATEGORIES</h5>
      <div className="row category-items">
        <div className="col-sm-6 category-item">
          <img
            src={img1}
            alt="category 1"
            onClick={() => {
              history.push("/shop/iphone");
            }}
          />
        </div>
        <div className="col-sm-6 category-item">
          <img
            src={img2}
            alt="category 2"
            onClick={() => {
              history.push("/shop/macbook");
            }}
          />
        </div>
      </div>
      <div className="row category-items">
        <div className="col category-item">
          <img
            src={img3}
            alt="category 3"
            onClick={() => {
              history.push("/shop/ipad");
            }}
          />
        </div>
        <div className="col category-item">
          <img
            src={img4}
            alt="category 4"
            onClick={() => {
              history.push("/shop/watch");
            }}
          />
        </div>
        <div className="col category-item">
          <img
            src={img5}
            alt="category 5"
            onClick={() => {
              history.push("/shop/airpod");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
