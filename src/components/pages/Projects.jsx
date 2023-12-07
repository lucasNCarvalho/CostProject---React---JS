import React, { useEffect, useState } from "react";
import Message from "../layout/Message";
import { useLocation } from "react-router-dom"
import styles from "./projects.module.css";
import container from "../layout/container.module.css";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";
import SearchBar from "../form/SearchBar";

const Projects = () => {

    const [project, setProjects] = useState([] || "");
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState("");
    const [searchFilter, setSearchFilter] = useState([]);

    const location = useLocation();
    let message = "";
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
                method: "Get",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    setProjects(data);
                    setRemoveLoading(true);
                })
                .catch((err) => console.log(err))
        }, 2000);
    }, [])

    const removeProject = (id) => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(resp => resp.json())
            .then(() => {
                setProjects(project.filter((project) => project.id !== id))
                setProjectMessage("Projeto removido com sucesso!");
            })
            .catch(err => console.log(err))
    }

    const filter = (input) => {
        let valueTyped = input.toLowerCase();

        setSearchFilter(project.filter(project => project.name.toLowerCase().includes(valueTyped)));
    }

    useEffect(() => {
        filter("");
    }, [project]);

    return (
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1>Meus Projetos</h1>
                <LinkButton to={"/newproject"} text={"Criar Projeto"} />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <SearchBar handleSubmit={filter} text="Busca por projetos"/>
            <div className={container.start}>
                {project.length > 0 &&
                    searchFilter.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={removeProject}
                        />))}
                {!removeLoading && <Loading />}
                {removeLoading && project.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </div>
        </div>
    )
}

export default Projects;