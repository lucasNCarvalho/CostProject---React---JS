import React from "react";
import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import logo from "./../../assets/costs_logo.png";
import container from "./container.module.css";

const NavBar = () => {
    return (
        <div className={styles.navbar}>
            <div className={container.container}>
                <img src={logo} alt="logo" />
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/projects">Projetos</Link>
                    </li >
                    <li className={styles.item}>
                        <Link to="/company">Empresa</Link>
                    </li >
                    <li className={styles.item}>
                        <Link to="/contact">Contato</Link>
                    </li >
                </ul>
            </div>
        </div>
    )
}

export default NavBar;