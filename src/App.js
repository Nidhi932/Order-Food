import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantsMenu from "./components/RestaurantsMenu";
import { CartProvider } from "./context/CartContext";

const Applayout = () => (
  <CartProvider>
    <div className="applayout">
      <Header />
      <Outlet />
    </div>
  </CartProvider>
);
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/", element: <About /> },
      { path: "/", element: <Contact /> },
      { path: "/restaurants/:resid", element: <RestaurantsMenu /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
