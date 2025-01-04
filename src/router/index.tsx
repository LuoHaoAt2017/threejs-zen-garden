import { createBrowserRouter } from "react-router-dom";
import ArrayCamera from "@/pages/ArrayCamera";
import About from "@/pages/About";

const basename = import.meta.env.VITE_BASE_PATH;

const routes = [
  {
    path: "arrayCamera",
    element: <ArrayCamera />,
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
