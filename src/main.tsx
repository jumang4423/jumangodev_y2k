import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.tsx";
import "./index.css";
import BlogList from "./BlogList.tsx";
import MicroCMSBlog from "./MicroCMSBlog.tsx";

const pinkTheme = extendTheme({
  colors: {
    brand: {
      100: "rgb(255, 184, 244)",
      200: "rgb(255, 184, 244)",
      300: "rgb(255, 184, 244)",
      400: "rgb(255, 184, 244)",
      500: "rgb(255, 184, 244)",
      600: "rgb(255, 184, 244)",
      700: "rgb(255, 184, 244)",
      800: "rgb(255, 184, 244)",
      900: "rgb(255, 184, 244)",
    },
  },
  shadows: {
    outline: "0 0 0 3px rgba(255, 184, 244, 0.5)",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/blog",
    element: <BlogList />,
  },
  {
    path: "/blog/:id",
    element: <MicroCMSBlog />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={pinkTheme}>
    <RouterProvider router={router} />
  </ChakraProvider>
);
