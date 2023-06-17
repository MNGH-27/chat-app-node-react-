import { createBrowserRouter, RouterProvider } from "react-router-dom";

//component
import Auth from "./pages/auth";
import Chat from "./pages/chat";
//layout
import Layout from "./components/common/layout";

//helper component
import ErrorPage from "./pages/errorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

function MainPage() {
  return (
    <div className="bg-[#150050] text-white w-screen h-screen flex flex-col items-center justify-center gap-7">
      <p className="text-8xl font-bold">Chat App</p>
      <span>Chat App Developed with React and Express</span>
      <span>MNGH - GITHUB</span>
      <a
        href="/auth"
        className="px-9 py-2 bg-[#576CBC] rounded-md hover:shadow-xl duration-200"
      >
        use it
      </a>
    </div>
  );
}

export default App;
