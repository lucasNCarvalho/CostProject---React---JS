import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import Input from "../form/input";
import styles from "./projectForm.module.css";
import { useState, useEffect } from "react";

const ProjectForm = ({handleSubmit, btnText, projectData}) => {

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});
    
    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-Type": "aplication/json"
            }
        }).then((resp) => resp.json())
        .then((data) => {
            console.log("a", data)
            setCategories(data);
        })
        .catch((err) => console.log (err));
    }, [])

    const submit = (e) => {
        e.preventDefault();
        console.log("b", project);
        handleSubmit(project);
    }

    const handleChange= (e) => {
        setProject({...project, [e.target.name]: e.target.value})
    }   

    const handleCategory = (e) => {
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        },
    })
    }

    return (
        <form  onSubmit={submit} className={styles.form} action="">
            <Input
                type="text"
                text="Nome do Projeto"
                name="name"
                placeHolder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ""}
            />
            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ""}
            />
            <Select  
            name="category_id" 
            text="Selecione a categoria"  
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ""}/>
            <SubmitButton text={btnText} type="submit" value="Criar projeto" />

        </form>
    )
}

export default ProjectForm