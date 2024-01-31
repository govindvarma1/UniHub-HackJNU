import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import { ProfessorLoginRoute } from "../../Utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function ProfessorLogin() {
    const naviagate = useNavigate();

    // useEffect(() => {
    //   async function VerifyLogin() {
    //     const response = await CheckLogin();
    //     if(response === true) {
    //       login();
    //       naviagate("/")
    //     }
    //     console.log(response);
    //   }
    //   VerifyLogin();
    // }, [])

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
            valid = false;
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (validateForm()) {
                const Response = await fetch(ProfessorLoginRoute, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                const data = await Response.json();
                console.log(data);
                if (Response.status === 200) {
                    localStorage.setItem("professor", JSON.stringify(data));
                    naviagate("/professor/dashboard");
                } else {
                    toast.error(data.error);
                }
            }
        } catch (error) {
            toast.error(`try again: ${error}`);
        }
    };

    return (
        <>
            <div className="max-w-md p-8 mx-auto mt-64 bg-white rounded shadow-md">
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded"
                        />
                        <span className="text-xs text-red-500">
                            {errors.username}
                        </span>
                    </label>
                    <label className="block mb-2">
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded"
                        />
                        <span className="text-xs text-red-500">
                            {errors.password}
                        </span>
                    </label>
                    <button
                        type="submit"
                        className="w-full p-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        Login
                    </button>
                    <p className="font-semibold text-center">
                        Don't Have an Account ? Contact Admin
                    </p>
                </form>
                <ToastContainer />
            </div>
        </>
    );
}
