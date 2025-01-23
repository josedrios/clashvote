import { useState, useRef, useEffect } from "react";
import SearchResult from "../feature/Search/Player/SearchResult";
import SearchTip from "../feature/Search/SearchTip";
import TestJSON from "../../clasher.json";

import { BsPersonFill } from "react-icons/bs";
import { FaShieldAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

export default function Search() {
    const [searchTab, setSearchTab] = useState({
        input: "",
        type: "",
        data: "",
    });
    const [searchToggle, setSearchToggle] = useState("Player");
    const inputRef = useRef(null);

    function handleFormSubmit(event) {
        event.preventDefault();

        if (inputRef.current.value == "") {
            console.warn("User gave an empty string");
            return;
        } else {
            setSearchTab((prevState) => ({
                ...prevState,
                input: inputRef.current.value,
                type: searchToggle,
            }));
        }

        if (searchTab.type === "Player") {
            fetchPlayerData(inputRef.current.value);
        } else if (searchTab.type === "Clan") {

        }
        fetchPlayerData(inputRef.current.value);
        inputRef.current.value = "";
    }

    // add type parameter (player or clan) and incorporate it properly throughout function
    async function fetchPlayerData(playerTag) {
        try {
            const response = await fetch(
                `http://localhost:3001/api/players/${playerTag}`
            );
            if (response.status === 404) {
                setSearchTab((prevState) => ({
                    ...prevState,
                    data: "Player not found",
                }));
                throw new Error(`Failed to get player info for '${playerTag}'`);
            } else if (!response.ok) {
                setSearchTab((prevState) => ({
                    ...prevState,
                    data: "",
                }));
                throw new Error("Clash of Clans API error");
            }
            const data = await response.json();
            setSearchTab((prevState) => ({
                ...prevState,
                data: data,
            }));
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    function handleTestJson() {
        setSearchTab((prevState) => ({
            ...prevState,
            data: TestJSON,
        }));
    }

    return (
        <div id="search-page-container">
            <form id="searchbar-container" onSubmit={handleFormSubmit}>
                <div id="searchbar-toggle">
                    <button
                        id="player-search-toggle"
                        className="toggle-button"
                        onClick={() => setSearchToggle("Player")}
                    >
                        <BsPersonFill
                            id="player-toggle-icon"
                            className="toggle-icon"
                        />
                    </button>
                    <button
                        id="clan-search-toggle"
                        className="toggle-button"
                        onClick={() => setSearchToggle("Clan")}
                    >
                        <FaShieldAlt
                            id="clan-toggle-icon"
                            className="toggle-icon"
                        />
                    </button>
                    <div
                        id="toggle-bg-slider"
                        className={
                            searchToggle === "Player" ? "" : "shift-right"
                        }
                    />
                </div>
                <input
                    id="searchbar"
                    type="text"
                    placeholder={`Enter ${
                        searchToggle === "Player" ? "Tag" : "Clan Name"
                    }`}
                    ref={inputRef}
                />
                <button id="test-json" onClick={handleTestJson}>
                    Test
                </button>
                <button type="submit" id="searchbar-submit-button">
                    <IoIosSearch />
                </button>
            </form>
            <RenderContent searchTab={searchTab} />
        </div>
    );
}

function RenderContent({ searchTab }) {
    return (
        <>
            {searchTab.type === "Player" ? (
                <SearchResult playerData={searchTab.data} />
            ) : searchTab.type === "Clan" ? (
                <div>Clan stuff</div>
            ) : (
                <SearchTip />
            )}
        </>
    );
}
