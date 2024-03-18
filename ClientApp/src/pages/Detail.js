import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

import RelateProduct from "../components/pages/detail/RelateProduct";
import Description from "../components/pages/detail/Description";
import DetailImage from "../components/pages/detail/DetailImage";
import DetailInfo from "../components/pages/detail/DetailInfo";
import api, { call } from "../api/api";
import Loading from "./Loading";

const Detail = () => {
  // Get product id
  const params = useParams();
  const productId = params.productId;

  // Current item
  const [item, setItem] = useState({});
  // Relate items
  const [related, setRelated] = useState([]);
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Get item
  useEffect(() => {
    // Call products get api
    call(api.product.getAll(), (data) => {
      // Get all items
      const allItems = data.items;
      // Get current item
      const curItem = allItems.find((item) => item._id === productId);
      // Get relate items
      const related = allItems.filter((item) => item.category === curItem.category);
      // Set item
      setItem(curItem);
      setRelated(related);
      setIsLoading(false);
    });

    // Deps
  }, [productId]);

  // Render component
  if (isLoading) return <Loading />;

  return (
    <Fragment>
      <div className="row mt-5">
        <div className="col-md-6 mb-5">
          <DetailImage item={item} key={Math.random()} />
        </div>
        <div className="col-md-6 mb-5">
          <DetailInfo item={item} />
        </div>
      </div>
      <Description item={item} />
      <RelateProduct items={related} item={item} />
    </Fragment>
  );
};

export default Detail;
