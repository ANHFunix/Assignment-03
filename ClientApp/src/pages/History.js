import { Fragment } from "react";
import { useSelector } from "react-redux";

import HistoryBanner from "../components/pages/history/HistoryBanner";
import HistoryTable from "../components/pages/history/HistoryTable";
import NotLogin from "./NotLogin";

const History = () => {
  // Current user
  const user = useSelector((state) => state.user.user);

  // If user did not login
  if (!user) return <NotLogin />;

  // If user logged in
  return (
    <Fragment>
      <HistoryBanner />
      <h5 className="mb-4">HISTORY</h5>
      <HistoryTable />
    </Fragment>
  );
};

export default History;
