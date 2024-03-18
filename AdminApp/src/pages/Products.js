import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import Card from "../components/UI/Card";
import api, { call } from "../api/api";
import { toStandard, toUpperFirstCase } from "../utils/string";

const Products = () => {
  const history = useHistory();

  // Table data state
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([]);
  const [ipSearch, setIpSearch] = useState("");

  // Table column options
  const columns = [
    // {
    //   name: "ID",
    //   selector: (row) => row._id,
    //   sortable: true,
    //   center: true,
    //   hide: "lg",
    //   grow: 2,
    // },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
      grow: 3,
    },
    {
      name: "Price",
      selector: (row) => `${Number(row.price).toLocaleString()} VND`,
      sortable: true,
      sortFunction: (rowA, rowB) => rowA.price - rowB.price,
      center: true,
      grow: 2,
    },
    {
      name: "Image",
      selector: (row) => <img src={row.imgs[0]} alt="product" width="75px" height="75px" className="p-1" />,
      center: true,
    },
    {
      name: "Category",
      selector: (row) => toUpperFirstCase(row.category),
      sortable: true,
      center: true,
    },
    {
      name: "Remaining",
      selector: (row) => row.remaining,
      sortable: true,
      center: true,
    },
    {
      name: "Edit",
      selector: (row) => (
        <div className="d-flex">
          <button
            onClick={() => history.push(`/products/edit?mode=update&productId=${row._id}`)}
            className="btn btn-success text-light me-2"
          >
            Update
          </button>
          <button
            onClick={() => {
              if (window.confirm("Are you sure to delete this product?")) {
                call(api.product.deleteById(row._id), (resData) => {
                  alert(resData.message);
                  const newData = data.filter((prod) => prod._id !== row._id);
                  setData(newData);
                });
              }
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      ),
      center: true,
      grow: 2,
    },
  ];

  // Get orders data
  useEffect(() => {
    call(api.product.getAll(), (resData) => {
      setFullData(resData.items);
      setData(resData.items);
    });
  }, []);

  // Filter data on search change
  useEffect(() => {
    const tokens = toStandard(ipSearch).split(" ");
    const filtered = fullData.filter((prod) => tokens.every((tok) => toStandard(prod.name).includes(tok)));
    setData(filtered);
  }, [fullData, ipSearch]);

  // Render component
  return (
    <div className="products px-3 py-5">
      <h5>Products</h5>
      <div className="d-flex justify-content-between mt-4 gap-3">
        <input
          type="text"
          placeholder="Filter by name . . ."
          style={{ maxWidth: "250px", width: "100%" }}
          className="px-2"
          value={ipSearch}
          onChange={(e) => setIpSearch(e.target.value)}
        />
        <button className="btn btn-success" onClick={() => history.push("/products/edit?mode=add")}>
          Add new
        </button>
      </div>
      <Card className="mt-4 p-3">
        <DataTable className="dashboard-table" columns={columns} data={data} pagination />
      </Card>
    </div>
  );
};

export default Products;
