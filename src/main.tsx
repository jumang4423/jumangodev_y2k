import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.tsx";
import "./index.css";
import BlogList from "./BlogList.tsx";
import MicroCMSBlog from "./MicroCMSBlog.tsx";
import TechBlogList from "./TechBlogList.tsx";
import MicroCMSTechBlog from "./MicroCMSTechBlog.tsx";

const pinkTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
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
    outline: "0 0 0 3.75px rgba(255, 184, 244, 0.5)",
  },
  fontSizes: {
    xs: "0.9375rem",  // 0.75rem * 1.25
    sm: "1.125rem",   // 0.9rem * 1.25
    md: "1.25rem",    // 1rem * 1.25
    lg: "1.40625rem", // 1.125rem * 1.25
    xl: "1.5625rem",  // 1.25rem * 1.25
    "2xl": "1.875rem",  // 1.5rem * 1.25
    "3xl": "2.34375rem", // 1.875rem * 1.25
    "4xl": "2.8125rem",  // 2.25rem * 1.25
    "5xl": "3.75rem",    // 3rem * 1.25
    "6xl": "4.6875rem",  // 3.75rem * 1.25
    "7xl": "5.625rem",   // 4.5rem * 1.25
    "8xl": "7.5rem",     // 6rem * 1.25
    "9xl": "9.375rem",   // 7.5rem * 1.25
  },
  space: {
    px: "1px",
    0.5: "0.15625rem",  // 0.125rem * 1.25
    1: "0.3125rem",   // 0.25rem * 1.25
    1.5: "0.46875rem", // 0.375rem * 1.25
    2: "0.625rem",    // 0.5rem * 1.25
    2.5: "0.78125rem", // 0.625rem * 1.25
    3: "0.9375rem",   // 0.75rem * 1.25
    3.5: "1.09375rem", // 0.875rem * 1.25
    4: "1.25rem",     // 1rem * 1.25
    5: "1.5625rem",   // 1.25rem * 1.25
    6: "1.875rem",    // 1.5rem * 1.25
    7: "2.1875rem",   // 1.75rem * 1.25
    8: "2.5rem",      // 2rem * 1.25
    9: "2.8125rem",   // 2.25rem * 1.25
    10: "3.125rem",   // 2.5rem * 1.25
    12: "3.75rem",    // 3rem * 1.25
    14: "4.375rem",   // 3.5rem * 1.25
    16: "5rem",       // 4rem * 1.25
    20: "6.25rem",    // 5rem * 1.25
    24: "7.5rem",     // 6rem * 1.25
    28: "8.75rem",    // 7rem * 1.25
    32: "10rem",      // 8rem * 1.25
    36: "11.25rem",   // 9rem * 1.25
    40: "12.5rem",    // 10rem * 1.25
    44: "13.75rem",   // 11rem * 1.25
    48: "15rem",      // 12rem * 1.25
    52: "16.25rem",   // 13rem * 1.25
    56: "17.5rem",    // 14rem * 1.25
    60: "18.75rem",   // 15rem * 1.25
    64: "20rem",      // 16rem * 1.25
    72: "22.5rem",    // 18rem * 1.25
    80: "25rem",      // 20rem * 1.25
    96: "30rem",      // 24rem * 1.25
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
  {
    path: "/tech_blog",
    element: <TechBlogList />,
  },
  {
    path: "/tech_blog/:id",
    element: <MicroCMSTechBlog />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={pinkTheme}>
    <RouterProvider router={router} />
  </ChakraProvider>
);
