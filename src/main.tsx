import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AnimatedCursor from "react-animated-cursor";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <AnimatedCursor
      innerSize={16}
      outerSize={16}
      color="255, 164, 244"
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
    />
  </>
);
