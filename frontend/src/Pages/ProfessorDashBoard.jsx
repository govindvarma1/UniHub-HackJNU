import Footer from "../Components/Layouts/Footer";
import Header from "../Components/Layouts/Header";
import React, { useEffect } from "react";

export default function ProfessorDashBoard() {
    useEffect(() => {
        async function FetchPendingProjects() {
            try {
                const response = await fetch();
            } catch (error) {
                console.error(error);
            }
        }
        FetchPendingProjects();
    }, []);
    return (
        <div>
            <Header />
            <main>
                
            </main>
            <Footer />
        </div>
    );
}
