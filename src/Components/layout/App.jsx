import NavBar from "./Navbar";
import MainBody from "./MainBody";
import SideBar from "./SideBar";
import { useState, useEffect } from "react";
import "../../styles/main.scss";

export default function App() {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [mainView, setMainView] = useState("season");

    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1200) {
                setIsSideBarOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    });

    return (
        <>
            <NavBar
                isSideBarOpen={isSideBarOpen}
                toggleSideBar={toggleSideBar}
                setMainView={setMainView}
                setIsSideBarOpen={setIsSideBarOpen}
            />
            <div id="main-container">
                <SideBar
                    isSideBarOpen={isSideBarOpen}
                    setIsSideBarOpen={setIsSideBarOpen}
                    setMainView={setMainView}
                />
                <MainBody mainView={mainView}/>
                {isSideBarOpen && (
                    <div
                        id="non-interactable-overlay"
                        onClick={() => setIsSideBarOpen(false)}
                    />
                )}
            </div>
        </>
    );
}