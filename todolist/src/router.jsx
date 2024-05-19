import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import List from './component/homelist.jsx';
import {createBrowserRouter} from "react-router-dom";
import ListComplete from './component/complete.jsx';


const router = createBrowserRouter([
  {
  path: "/",
  element: <App/>,
  component: App,
  children: [
      {
        path: "/",
        element: <List/>,
     },
      {
        path: "/complete",
        element: <ListComplete/>,
     },
   
    ]
  },

])
export default router;

