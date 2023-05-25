import { createBrowserRouter, RouterProvider } from "react-router-dom";

//component
import Auth from "./pages/auth";

//helper component
import ErrorPage from "./pages/errorPage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
