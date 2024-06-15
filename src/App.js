import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Notfound from "./components/Notfound/Notfound";
import UserContextProvider from "./context/tokenContext";
import ProtectedRoutes from "./components/protectedRoutes/protectedRoutes";
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditUserPage from "./components/Edit/Edit";
import UsersList from "./components/userData/userData";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoutes>
            <UsersList />
          </ProtectedRoutes>
        ),
      },
      {
        path: "Edit/:id",
        element: (
          <ProtectedRoutes>
            <EditUserPage />
          </ProtectedRoutes>
        ),
      },

      {
        path: "userData",
        element: (
          <ProtectedRoutes>
            <UsersList />
          </ProtectedRoutes>
        ),
      },
   
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  return (
      <UserContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer theme="colored"/>
      </UserContextProvider>
  
  );
}

export default App;
