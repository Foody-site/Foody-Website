import { Provider } from "react-redux";
import store from "./redux/store.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n"; // استيراد الترجمة
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
