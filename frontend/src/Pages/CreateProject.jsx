import React, { useEffect, useState } from "react";
import Select from "react-select";
import Header from "../Components/Layouts/Header";
import Footer from "../Components/Layouts/Footer";
import SubmitButton from "../Components/Common/SubmitButton";
import TextInput from "../Components/Common/TextInput";
import TextAreaInput from "../Components/Common/TextAreaInput";
import { CheckLogin } from "../Utils/CheckLogin";
import { useNavigate } from "react-router-dom";
import { CreateProjectRoute } from "../Utils/APIRoutes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateProject() {
    const navigate = useNavigate();

    useEffect(() => {
        async function VerifyLogin() {
            const response = await CheckLogin();
            if (response === false) {
                navigate("/login");
            }
            console.log(response);
        }
        VerifyLogin();
    }, []);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        repoLink: "",
        techStack: [],
        methodology: "",
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        techStack: "",
        repoLink: "",
        methodology: "",
    });

    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }

    const handleTechStackChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);

        setFormData((prevData) => ({
            ...prevData,
            techStack: selectedValues,
        }));
    };

    async function CreateProject(event) {
        event.preventDefault();
        try {
            if (ValidateForm()) {
                const student = JSON.parse(localStorage.getItem("student"));
                const Response = await fetch(CreateProjectRoute, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${student.token}`,
                    },
                    body: JSON.stringify(formData),
                });
                const data = await Response.json();
                if (Response.status === 200) {
                    toast.success("Project added successfully");
                    setFormData({
                        title: "",
                        description: "",
                        repoLink: "",
                        techStack: [],
                        methodology: "",
                    });
                } else {
                    toast.error(data.msg);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    function ValidateForm() {
        let valid = true;
        const newErrors = { ...errors };
        const { title, description, techStack, repoLink, methodology } =
            formData;
        if (!title.trim()) {
            valid = false;
            newErrors.title = "Title cannot be empty";
        }
        if (!description.trim()) {
            valid = false;
            newErrors.description = "Description cannot be empty";
        }
        if (!repoLink.trim()) {
            valid = false;
            newErrors.repoLink = "Repo Link cannot be empty";
        }
        if (!methodology.trim()) {
            valid = false;
            newErrors.methodology = "Methodology cannot be empty";
        }
        if (techStack.length === 0) {
            valid = false;
            newErrors.techStack = "Tech Stack cannot be empty";
        }
        setErrors(newErrors);
        return valid;
    }

    return (
        <>
            <Header />
            <main className="w-1/2 m-auto mt-16">
                <form className="p-4" onSubmit={CreateProject}>
                    <TextInput
                        label={"Title"}
                        name={"title"}
                        value={formData.title}
                        handleChange={handleChange}
                        error={errors.title}
                    />
                    <TextInput
                        label={"Repo Link"}
                        name={"repoLink"}
                        value={formData.repoLink}
                        handleChange={handleChange}
                        error={errors.repoLink}
                    />
                    <TextAreaInput
                        label={"Description"}
                        name={"description"}
                        value={formData.description}
                        handleChange={handleChange}
                        error={errors.description}
                    />
                    <TextAreaInput
                        label={"Methodology"}
                        name={"methodology"}
                        value={formData.methodology}
                        handleChange={handleChange}
                        error={errors.methodology}
                    />
                    <Select
                        isMulti
                        name="techstack"
                        options={options}
                        value={formData.techStack.map(value => ({ value, label: value }))}
                        onChange={handleTechStackChange}
                        placeholder="Select Technologies Used"
                        className="mb-2"
                    />
                    <span className="text-xs text-red-500">
                        {errors.techStack}
                    </span>
                    <SubmitButton text={"Submit Project"} />
                </form>
            </main>
            <ToastContainer />
            <Footer />
        </>
    );
}
