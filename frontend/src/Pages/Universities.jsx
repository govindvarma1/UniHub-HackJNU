import React, { useEffect, useState } from "react";
import { GetUniversitiesRoute } from "../Utils/APIRoutes";
import Header from "../Components/Layouts/Header";
import Footer from "../Components/Layouts/Footer";
import UniversityCard from "../Components/UniversityComponents/UniversityCard";
import UniversitySearchBar from "../Components/UniversityComponents/UniversitySearchBar";

export default function Universities() {
    const [ universities, setUniversities ] = useState([]);
    const {DisplayUniversities, setDisplayUniversities} = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function GetUniversities() {
            try {
                const Response = await fetch(GetUniversitiesRoute, {
                    method: "GET",
                });
                const Data = await Response.json();
                setUniversities(Data);
            } catch (error) {
                console.error(error);
            }
        }
        GetUniversities();
    }, []);

    function handleSearch(event) {
        setSearch(event.target.value);
    }

    return (
        <>
            <Header />
            <main className="px-16 py-8 mt-16">
                <UniversitySearchBar search={search} handleSearch={handleSearch}/>       
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {universities &&
                        universities.map((university, ind) => (
                            <UniversityCard
                                key={ind}
                                university={university}
                            />
                        ))}
                </div>
            </main>
            <Footer />
        </>
    );
}
