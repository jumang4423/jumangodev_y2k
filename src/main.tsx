import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.tsx";
import "./index.css";
import GenericBlogList from "./GenericBlogList.tsx";
import GenericMicroCMSBlog from "./GenericMicroCMSBlog.tsx";

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
    outline: "0 0 0 2.7px rgba(255, 184, 244, 0.5)", /* 90% of 3px */
  },
  styles: {
    global: {
      /* 90% scale for all Chakra UI components */
      body: {
        fontSize: "14.4px", /* 90% of default 16px */
      },
    },
  },
  sizes: {
    /* Scale down common sizes by 90% */
    xs: "10.8rem", /* 90% of 12rem */
    sm: "14.4rem", /* 90% of 16rem */
    md: "21.6rem", /* 90% of 24rem */
    lg: "28.8rem", /* 90% of 32rem */
    xl: "36rem", /* 90% of 40rem */
    "2xl": "43.2rem", /* 90% of 48rem */
    "3xl": "50.4rem", /* 90% of 56rem */
    "4xl": "57.6rem", /* 90% of 64rem */
    "5xl": "64.8rem", /* 90% of 72rem */
    "6xl": "72rem", /* 90% of 80rem */
  },
  space: {
    /* Scale down spacing by 90% */
    0.5: "0.113rem", /* 90% of 0.125rem */
    1: "0.225rem", /* 90% of 0.25rem */
    1.5: "0.338rem", /* 90% of 0.375rem */
    2: "0.45rem", /* 90% of 0.5rem */
    2.5: "0.563rem", /* 90% of 0.625rem */
    3: "0.675rem", /* 90% of 0.75rem */
    3.5: "0.788rem", /* 90% of 0.875rem */
    4: "0.9rem", /* 90% of 1rem */
    5: "1.125rem", /* 90% of 1.25rem */
    6: "1.35rem", /* 90% of 1.5rem */
    7: "1.575rem", /* 90% of 1.75rem */
    8: "1.8rem", /* 90% of 2rem */
    9: "2.025rem", /* 90% of 2.25rem */
    10: "2.25rem", /* 90% of 2.5rem */
  },
  fontSizes: {
    /* Scale down font sizes by 90% */
    xs: "10.8px", /* 90% of 12px */
    sm: "12.6px", /* 90% of 14px */
    md: "14.4px", /* 90% of 16px */
    lg: "16.2px", /* 90% of 18px */
    xl: "18px", /* 90% of 20px */
    "2xl": "21.6px", /* 90% of 24px */
    "3xl": "27px", /* 90% of 30px */
    "4xl": "32.4px", /* 90% of 36px */
    "5xl": "43.2px", /* 90% of 48px */
    "6xl": "54px", /* 90% of 60px */
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/blog",
    element: <GenericBlogList 
      endpoint="blog" 
      routeBase="/blog" 
      title="thoughts" 
      linkColor="gray" 
      borderWidth="0.9px" 
    />,
  },
  {
    path: "/blog/:id",
    element: <GenericMicroCMSBlog 
      endpoint="blog" 
      routeBase="/blog" 
      linkColor="gray" 
    />,
  },
  {
    path: "/tech_blog",
    element: <GenericBlogList 
      endpoint="tech_blog" 
      routeBase="/tech_blog" 
      title="projects" 
      linkColor="black" 
      borderWidth="1px" 
    />,
  },
  {
    path: "/tech_blog/:id",
    element: <GenericMicroCMSBlog 
      endpoint="tech_blog" 
      routeBase="/tech_blog" 
      linkColor="black" 
    />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={pinkTheme}>
    <RouterProvider router={router} />
  </ChakraProvider>
);
