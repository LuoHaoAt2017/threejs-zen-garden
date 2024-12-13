import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";

const basename = import.meta.env.VITE_BASE_PATH;

const routes = [
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "about",
    element: <About />,
  },
];

const router = createBrowserRouter(routes, {
  basename: basename,
});

export default router;
