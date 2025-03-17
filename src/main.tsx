import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@/App.tsx";
import { Provider } from "react-redux";
import store from "@/store";
import Layout from "@/components/Layout.tsx";
import { ThemeProvider } from "@/components/Theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Layout>
          <App />
        </Layout>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
