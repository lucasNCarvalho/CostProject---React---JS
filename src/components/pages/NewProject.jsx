import React from "react";
import style from "./newproject.module.css";
import ProjectForm from "../project/ProjectForm";
import {useNavigate} from "react-router-dom";

const NewProject = () => {

    const navigate = useNavigate();

    function createPost(project){

        //initialize cost and services
        project.cost = 0;
        project.services = [];

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log("dados: ", data);
            navigate("/projects", {state: { message: "Projeto criado com sucesso!" }})
        })
        .catch((err) => console.log(err));
    }

    return (
        <div className={style.newProjectContainer }>
             <h1>Criar Projeto</h1>
             <p>Crie o seu projeto para depois adicionar os serviços</p>
             <ProjectForm handleSubmit={createPost} btnText="Criar projeto"/>
        </div>
    )
}

export default NewProject;