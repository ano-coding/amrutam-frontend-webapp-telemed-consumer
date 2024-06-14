import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Auth from "./features/Auth/components/Auth";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    element: <Auth />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
