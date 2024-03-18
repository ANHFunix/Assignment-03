import { Fragment } from "react";

import CategoryList from "../components/pages/home/CategoryList";
import TrendingList from "../components/pages/home/TrendingList";
import OtherInfo from "../components/pages/home/OtherInfo";
import Banner from "../components/pages/home/Banner";

const Home = () => {
  // Render component
  return (
    <Fragment>
      <Banner />
      <CategoryList />
      <TrendingList />
      <OtherInfo />
    </Fragment>
  );
};

export default Home;
