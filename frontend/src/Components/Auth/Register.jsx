import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import { GetUniversitiesRoute, StudentRegister } from "../../Utils/APIRoutes";
import { ConvertList } from "../../Utils/UniversityList";
import { useAuth } from "../../Context/AuthContext";
import { CheckLogin } from "../../Utils/CheckLogin";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const { isLoggedIn, login } = useAuth();

    useEffect(() => {
        const fetchUniversities = async () => {
            async function VerifyLogin() {
                const response = await CheckLogin();
                if (response === true) {
                    login();
                    naviagate("/");
                }
                console.log(response);
            }
            VerifyLogin();
            try {
                const response = await fetch(GetUniversitiesRoute, {
                    method: "GET",
                });
                const data = await response.json();
                setUniversities(ConvertList(data));
                console.log(ConvertList(data));
            } catch (error) {
                console.error("Error fetching universities:", error);
            }
        };
        fetchUniversities();
    }, []);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        gradYear: "",
        universityId: null,
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        gradYear: "",
        universityId: "",
    });

    const [universities, setUniversities] = useState([]);

    const graduationYears = [
        { label: "2024", value: "2024" },
        { label: "2025", value: "2025" },
        { label: "2026", value: "2026" },
        { label: "2027", value: "2027" },
        { label: "2028", value: "2028" },
        { label: "2029", value: "2029" },
        { label: "2030", value: "2030" },
    ];

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

    const handleUniversityChange = (selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            universityId: selectedOption ? selectedOption.value : null,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            universityId: "",
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

        if (!formData.gradYear.trim()) {
            newErrors.graduation = "Graduation year is required";
            valid = false;
        }

        if (!formData.universityId) {
            newErrors.universityId = "University is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetch(StudentRegister, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...formData }),
                });
                const data = await response.json();
                if(response.status === 200) {
                    localStorage.setItem("student", JSON.stringify(data));
                    login();
                    navigate("/");
                } else {
                    toast.error(`${data.error}`)
                }
            } catch (error) {
                console.error("Error during registration:", error);
            }
        } else {
            console.log("Form has errors. Please fix them.");
        }
    };

    return (
        <>
            {!isLoggedIn && 
                <div className="max-w-md p-6 mx-auto mt-48 bg-white rounded shadow-md">
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
                        <label className="block mb-2">
                            Graduation Year:
                            <Select
                                maxMenuHeight={200}
                                options={graduationYears}
                                value={graduationYears.find(
                                    (year) => year.value === formData.graduation
                                )}
                                onChange={(selectedOption) =>
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        gradYear: selectedOption
                                            ? selectedOption.value
                                            : "",
                                    }))
                                }
                                isSearchable
                                placeholder="Select Graduation Year"
                            />
                            <span className="text-xs text-red-500">
                                {errors.graduation}
                            </span>
                        </label>
                        <label className="block mb-2">
                            University:
                            <Select
                                maxMenuHeight={200}
                                options={universities}
                                value={universities.find(
                                    (uni) => uni.label === formData.universityId
                                )}
                                onChange={handleUniversityChange}
                                isSearchable
                                placeholder="Search for University"
                            />
                            <span className="text-xs text-red-500">
                                {errors.universityId}
                            </span>
                        </label>
                        <button
                            type="submit"
                            className="w-full p-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                            Register
                        </button>
                        <p className="font-semibold text-center">
                            Already Have an Account ?{" "}
                            <NavLink className="text-blue-700" to="/login">
                                Login
                            </NavLink>
                        </p>
                    </form>
                </div>
            }
            <ToastContainer />
        </>
    );
};

export default RegistrationForm;
