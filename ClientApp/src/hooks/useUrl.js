import { useState, useEffect } from "react";

// Default fetch url
const defaultUrl =
  "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74";

// useUrl hook
const useUrl = (url = defaultUrl, convert = (data) => data) => {
  // Items state
  const [items, setItems] = useState([]);

  // Fetch items from url and set it to items state
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setItems(convert(data)))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  // Return items and setItems function
  return [items, setItems];
};

export default useUrl;
