import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import Providers from "./app/Providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
