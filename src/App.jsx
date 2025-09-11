// import { useState } from "react";

import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ThingList from "./components/ThingList";

const router = createBrowserRouter([
  {
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      {
        path: "/",
        element: <ThingList />,
      },
      {
        path: "/trash",
        element: (
          <div>
            <div>ゴミ箱</div>
          </div>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
