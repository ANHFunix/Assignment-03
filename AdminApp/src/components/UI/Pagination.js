import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import css from "./Pagination.module.css";

const Pagination = ({ page, pageSize, totalItems }) => {
  // Render component
  return (
    <div className={css["pagination"]}>
      <nav>
        <button className={css["prev"]}>
          <FaAngleDoubleLeft />
        </button>
        <button className={css["active"]}>1</button>
        <button className={css["next"]}>
          <FaAngleDoubleRight />
        </button>
      </nav>
      <div className="text--light">
        Showing {page * pageSize - pageSize + 1} -{" "}
        {Math.min(totalItems, page * pageSize + 1)} of {totalItems} results
      </div>
    </div>
  );
};

export default Pagination;
