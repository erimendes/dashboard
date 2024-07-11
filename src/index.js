import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";

import store from "./store/index";
import { Toaster } from "react-hot-toast";

const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster
          toastOptions={{
            position: "top-right",
            style: {
              background: "#283046",
              color: "white",
            },
          }}
        />
      </Provider>
    </BrowserRouter>
  </Suspense>
);

reportWebVitals();
