import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/StudentAuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { AdminLoginRoute } from "../Utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { CheckLogin } from "../Utils/CheckLogin";
import { useAdminAuth } from "../Context/AdminAuthContext";
import { CheckAdminLogin } from "../Utils/CheckAdminLogin";

export default function AdminLogin() {
    const { isLoggedIn, login } = useAdminAuth();
    const navigate = useNavigate();

    useEffect(() => {
      async function VerifyLogin() {
        const response = await CheckAdminLogin();
        if(response === true) {
          login();
          navigate("/admin")
        } 
        console.log(response);
      }
      VerifyLogin();
    }, [])
   
    

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
                const response = await fetch(AdminLoginRoute, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const errorData = await response.text(); // Log or inspect errorData
                    console.error("Registration failed. Status:", response.status, errorData);
                    return;
                }

                const data = await response.json();
                console.log(data);
                if (response.status === 200) {
                    localStorage.setItem("admin", JSON.stringify(data));
                    navigate("/admin");
                    login();
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
            {!isLoggedIn && (
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
                            Don't Have an Account ?{" "}
                            <NavLink className="text-blue-700" to="/admin/register">
                                Register
                            </NavLink>
                        </p>
                    </form>
                    <ToastContainer />
                </div>
            )}
        </>
    );
}
