import { CssBaseline } from "@mui/material";
import { Home } from "./pages/Home";
import { Root } from "./pages/Root";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrollersProvider } from "./context/StrollersProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
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
