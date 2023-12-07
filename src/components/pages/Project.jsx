import styles from "./project.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import container from "../layout/container.module.css";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import {parse, v4 as uuidv4} from "uuid";
import ServiceCard from "../service/ServiceCard";
import SearchBar from "../form/SearchBar";

const Project = () => {
    const { id } = useParams();
    const [project, setProject] = useState({});
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();
    const [searchFilter, setSearchFilter] = useState([]);

    useEffect(() => {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then(resp => resp.json())
            .then((data) => {
                console.log("a", data)
                setProject(data);
                setServices(data.services);
            })
            .catch(err => console.log(err))

    }, [id]);

    const editPost = (project) => {
        if (project.budget < project.cot) {
            setMessage("O orçamento não pode ser menor que o custo do projeto!");
            setType("error");
            return false;
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false);
                setMessage("Projeto atualizado!");
                setType("success");
            })
            .catch(err => console.log(err))
        setMessage();
    }

    const createService = (project) => {
        const lastService = project.services[project.services.length - 1];
        lastService.id = uuidv4();
        const lastServiceCost = lastService.cost;

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        if(newCost > parseFloat(project.budget)) {
            console.log("createService");
            setMessage("Orçamento ultrapassado, verifique o valor do serviço");
            setType("error");
            project.services.pop();
            return;
        }

        project.cost = newCost;

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setShowServiceForm(false);
            setServices(data.services); 
        })
        .catch(err => console.log(err))
         
    }

    const removeService = (id, cost) => {

        const servicesUpdated = project.services.filter (
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdated;
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(projectUpdated),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated);
            setServices(servicesUpdated);
            setMessage("Serviço removido com sucesso");
            setType("success");
        })
        .catch(err => console.log(err))
        setMessage();
    }

    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm);
    }

    const toggleServiceForm = () => {
        setShowServiceForm(!showServiceForm);
    }

    const filter = (input) => {
        let valueTyped = input.toLowerCase();
        console.log("asdasdas")
       setSearchFilter(services.filter(service => service.name.toLowerCase().includes(valueTyped)));
    } 

    useEffect(() => {
        filter(""); 
      }, [services]);

    return (
        <>
            {project.name ? (
                <div className={styles.projectDetails}>
                    <div className={container.column}>
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.detailsContainer}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? "Editar projeto" : "Fechar"}</button>
                            {!showProjectForm ? (
                                <div className={styles.projectInfo}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.projectInfo}>
                                    <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.serviceFormContainer}>
                            <h2>Adicione um serviço: </h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>{!showServiceForm ? "Adicionar Serviço" : "Fechar"}</button>
                            <div className={styles.projectInfo}>{showServiceForm && <ServiceForm handleSubmit={createService} btnText={"Adicionar Serviço"} projectData={project}/>}
                            </div>
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <SearchBar handleSubmit={filter}  text="Busca por serviços"/>
                    <div className={container.start}>
                    {services.length > 0 && searchFilter.map((service) => (
                            <ServiceCard
                            id={service.id}
                            name={service.name}
                            cost={service.cost}
                            description={service.description}
                            key={service.id}
                            handleRemove={removeService}
                            />
                        ))
                        }
                        {services.length === 0 && (<p> não há serviços cadastrados</p>)}
                    </div>
                    <div>

                    </div>
                </div>
            ) : (<Loading />)}
        </>
    )
}

export default Project;