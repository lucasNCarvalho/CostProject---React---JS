import React from "react";
import savings from "../../assets/savings.svg";
import styles from "./home.module.css";
import LinkButton from "../layout/LinkButton";

const Home = () => {
    return (
        <section className={styles.homeContainer}> 
            <h1>Bem-vindo ao <span>Cost</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to={"/newproject"} text={"Criar Projeto"}/>
            <img src={savings} alt="costs" />
        </section>
    )
}

export default Home;