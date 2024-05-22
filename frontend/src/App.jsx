import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "../Routes/Dashboard";
import SendMoney from "../Routes/SendMoney";
import Signin from "../Routes/Signin";
import Signup from "../Routes/Signup";

const router=createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/send",
    element: <SendMoney />
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
