import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/mian.css'
import App from './App'
import Moderate from './Moderate'
import Verify from './Verify'
import Edit from './Edit'
import Export from './Export'
import Detail from './Detail'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
    {
    path: "/moderate",
    element: <Moderate/>,
  },
      {
    path: "/export",
    element: <Export/>,
  },
      {
    path: "/edit",
    element: <Edit/>,
  },
      {
    path: "/verify",
    element: <Verify/>,
  },
  {
    path: "/verify/:id",
    element: <Detail/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <RouterProvider router={router} />
)