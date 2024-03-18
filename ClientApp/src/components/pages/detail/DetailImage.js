import { useState } from "react";

import "./DetailImage.css";

const DetailImage = ({ item }) => {
  // Main image
  const [mainImage, setMainImage] = useState(item.imgs[0]);

  return (
    <div className="detail-image">
      <div className="side-img">
        {/* Render side images */}
        {item.imgs.map((img, index) => (
          <img src={img} alt="product" key={index} onClick={() => setMainImage(img)} />
        ))}
      </div>
      <div className="main-img">
        <img src={mainImage} alt="product" />
      </div>
    </div>
  );
};

export default DetailImage;
