import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Card from "../components/UI/Card";
import api, { call } from "../api/api";
import NotFound from "./NotFound";

const EditProduct = () => {
  const history = useHistory();

  // Get search params
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode");
  const productId = searchParams.get("productId");

  // Get product in update mode
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: 0,
    remaining: 0,
    short_desc: "",
    long_desc: "",
    imgs: [],
  });

  useEffect(() => {
    // If is not in update mode, do nothing
    if (!productId) return;

    // Get product by productId
    call(api.product.getById(productId), (data) => setProduct(data.item));
  }, [productId]);

  // Handle form submit
  const handleSubmitForm = (e) => {
    e.preventDefault();

    // Handle when add product
    if (mode === "add") {
      // Check if image file is not valid
      if (product.imgs.length === 0) {
        alert("You must upload at least 1 image file");
        return;
      }

      // Create form data
      const data = new FormData();
      data.append("name", product.name);
      data.append("category", product.category);
      data.append("price", product.price);
      data.append("remaining", product.remaining);
      data.append("short_desc", product.short_desc);
      data.append("long_desc", product.long_desc);
      product.imgs.forEach((img) => data.append("imgs", img));
      // Create product
      call(
        api.product.create(data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        (data) => {
          alert(data.message);
          history.push("/products");
        }
      );
    }

    // Handle when update file
    if (mode === "update") {
      const updateData = product;
      delete updateData.imgs;
      // Update product
      call(api.product.updateById(productId, updateData), (data) => {
        alert(data.message);
        history.push("/products");
      });
    }
  };

  if (mode !== "add" && mode !== "update") return <NotFound />;

  // Render component
  return (
    <div className="edit-product px-3 py-5">
      <h5>{mode === "add" ? "Add new product" : "Update product"}</h5>
      <Card className="mt-4 p-3">
        <form onSubmit={handleSubmitForm}>
          <div className="row g-3">
            <div className="form-group d-flex flex-column gap-2 col-md-6">
              <label>Product name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the product name . . ."
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group d-flex flex-column gap-2 col-md-6">
              <label>Category</label>
              <select
                className="form-control"
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                required
              >
                <option value="" disabled>
                  Enter the product category . . .
                </option>
                <option value="iphone">Iphone</option>
                <option value="ipad">Ipad</option>
                <option value="airpod">Airpod</option>
                <option value="watch">Watch</option>
                <option value="mouse">Mouse</option>
                <option value="keyboard">Keyboard</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="row g-3 mt-0">
            <div className="form-group d-flex flex-column gap-2 col-md-6">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the product price . . ."
                min="0"
                step="1000"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                required
              />
            </div>
            <div className="form-group d-flex flex-column gap-2 col-md-6">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter the product quantity . . ."
                min="0"
                step="1"
                value={product.remaining}
                onChange={(e) => setProduct({ ...product, remaining: Number(e.target.value) })}
                required
              />
            </div>
          </div>
          <div className="row g-3 mt-0">
            <div className="form-group d-flex flex-column gap-2 col-md-6">
              <label>Short description</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter the short description . . ."
                rows="5"
                value={product.short_desc}
                onChange={(e) => setProduct({ ...product, short_desc: e.target.value })}
                required
              />
            </div>
            <div className="form-group d-flex flex-column gap-2 col-md-6">
              <label>Long description</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter the long description . . ."
                rows="5"
                value={product.long_desc}
                onChange={(e) => setProduct({ ...product, long_desc: e.target.value })}
                required
              />
            </div>
          </div>
          {mode === "add" && (
            <div className="form-group d-flex flex-column gap-2 mt-3">
              <label>Product images (up to 5 images)</label>
              <input
                type="file"
                className="form-control"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  const imgs = [];
                  for (let i = 0; i < files.length; i++)
                    if (files[i] && files[i].type.includes("image")) imgs.push(files[i]);
                  setProduct({ ...product, imgs });
                }}
                required
              />
            </div>
          )}
          <div className="form-group mt-4 text-center">
            <button type="submit" className="btn btn-success px-5 py-2">
              {mode === "add" ? "Add new product" : "Update product"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditProduct;
