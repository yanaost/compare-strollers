import { CssBaseline } from "@mui/material";
import { Home } from "./pages/Home";
import { Comparison } from "./pages/Comparison";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Root } from "./pages/Root";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrollersProvider } from "./context/StrollersProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/compare/:slug",
        element: <Comparison />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

function App() {
  return (
    <StrollersProvider>
      <RouterProvider router={router} />
      <CssBaseline />
    </StrollersProvider>
  );
}

export default App;
