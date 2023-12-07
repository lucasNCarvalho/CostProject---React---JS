import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./components/layout/container.module.css";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/footer";


function App() {

  return (
    <div>
        <NavBar />

        <div className={`${styles.container} ${styles.minHeight} `}>
        <Outlet/>
        </div>
        
        <Footer/>
    </div>
  )
}

export default App
