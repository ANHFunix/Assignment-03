import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import initStore from "./store";

const initApp = async () => {
  const store = await initStore();
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

initApp();
