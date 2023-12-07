import React from 'react'
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import NewProject from "./components/pages/NewProject";
import Projects from './components/pages/Projects.jsx';
import Project from './components/pages/Project.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "company",
        element: <Company />
      },
      {
        path: "newproject",
        element: <NewProject />
      },
      {
        path: "projects",
        element: <Projects/>
      },
      {
        path: "project/:id",
        element: <Project/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render( 
    <RouterProvider router={router}/>
)
