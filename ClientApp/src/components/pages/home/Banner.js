import { useHistory } from "react-router-dom";

import Button from "../../UI/Button";
import "./Banner.css";

const Banner = () => {
  // Pages history
  const history = useHistory();

  // Move to shop page
  const moveToShopHandler = (e) => {
    e.preventDefault();
    history.push("/shop");
  };

  // Render component
  return (
    <div className="banner">
      <div className="banner-content">
        <div className="text--light">NEW INSPIRATION 2020</div>
        <h2>20% OFF ON NEW SEASON</h2>
        <Button onClick={moveToShopHandler}>Browse collection</Button>
      </div>
    </div>
  );
};

export default Banner;
