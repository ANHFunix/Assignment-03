import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import css from "./Pagination.module.css";
import { useEffect, useState } from "react";

const Pagination = ({ options, setOptions }) => {
  // List of page numbers
  const [pages, setPages] = useState([]);

  // Generate page numbers
  useEffect(() => {
    const page_number = options.page_number;
    const page_count = options.page_count;
    let pageNumbers = [];
    for (let i = 1; i <= page_count; i++) pageNumbers.push(i);
    pageNumbers = pageNumbers.filter(
      (nb) => nb === 1 || nb === page_count || nb === page_number - 1 || nb === page_number || nb === page_number + 1
    );
    if (page_count !== 1) {
      if (pageNumbers[1] !== 2) pageNumbers.splice(1, 0, "...");
      if (pageNumbers[pageNumbers.length - 2] !== page_count - 1) pageNumbers.splice(pageNumbers.length - 1, 0, "...");
    }
    setPages(pageNumbers);
  }, [options.page_number, options.page_count]);

  // Render component
  return (
    <div className={css["pagination"]}>
      <nav>
        <button
          className={css["prev"]}
          disabled={options.page_number === 1}
          onClick={() => setOptions({ ...options, page_number: options.page_number - 1 })}
        >
          <FaAngleDoubleLeft />
        </button>
        {pages.map((page) => {
          if (page === options.page_number)
            return (
              <button className={css["active"]} key={page}>
                {page}
              </button>
            );
          if (page === "...") return <button key={Math.random()}>{page}</button>;
          return (
            <button key={page} onClick={() => setOptions({ ...options, page_number: page })}>
              {page}
            </button>
          );
        })}
        <button
          className={css["next"]}
          disabled={options.page_number === options.page_count}
          onClick={() => setOptions({ ...options, page_number: options.page_number + 1 })}
        >
          <FaAngleDoubleRight />
        </button>
      </nav>
      <div className="text--light">
        Showing {options.page_number * options.page_size - options.page_size + 1} -{" "}
        {Math.min(options.item_count, options.page_number * options.page_size)} of {options.item_count} results
      </div>
    </div>
  );
};

export default Pagination;
