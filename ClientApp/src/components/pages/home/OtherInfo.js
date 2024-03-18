import { Fragment } from "react";

import Button from "../../UI/Button";
import "./OtherInfo.css";

const OtherInfo = () => {
  // Render component
  return (
    <Fragment>
      <div className="other-info-1 row">
        <div className="col-sm-4">
          <h5>FREE SHIPPING</h5>
          <div className="text--light">Free shipping worldwide</div>
        </div>
        <div className="col-sm-4">
          <h5>24 X 7 SERVICE</h5>
          <div className="text--light">Free shipping worldwide</div>
        </div>
        <div className="col-sm-4">
          <h5>FESTIVAL OFFER</h5>
          <div className="text--light">Free shipping worldwide</div>
        </div>
      </div>
      <div className="other-info-2 row">
        <div className="col-sm-6">
          <h5>LET'S BE FRIENDS!</h5>
          <div className="text--light">
            Nisi nisi tempor consequat laboris nisi.
          </div>
        </div>
        <div className="col-sm-6">
          <form>
            <input type="text" placeholder="Enter your email address" />
            <Button>Subscribe</Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default OtherInfo;
