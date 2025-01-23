import { useState, useRef, useEffect } from "react";
import SearchResult from "../feature/Search/Player/SearchResult";
import SearchTip from "../feature/Search/SearchTip";
import TestJSON from "../../clasher.json";

import { BsPersonFill } from "react-icons/bs";
import { FaShieldAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

export default function Search() {
    const inputRef = useRef(null);
    const [searchToggle, setSearchToggle] = useState("player");
    const [searchResult, setSearchResult] = useState({
        data: "",
        tab: ""
    })

    function handleFormSubmit(event) {
        event.preventDefault();

        if (inputRef.current.value == "") {
            console.warn("User gave an empty string");
            return;
        } 

        if (searchToggle === "player") {
            fetchPlayerData(inputRef.current.value);
        } else if (searchToggle === "clan") {
            console.log("clan stuff")
            setSearchResult({
                data: "",
                tab: "clan"
            })
        }

        inputRef.current.value = "";
    }

    async function fetchPlayerData(playerTag) {
        try {
            const response = await fetch(
                `http://localhost:3001/api/players/${playerTag}`
            );
            if (response.status === 404) {
                setSearchResult({
                    data: "Player not found",
                    tab: "player"
                })
                throw new Error(`Failed to get player info for '${playerTag}'`);
            } else if (!response.ok) {
                setSearchResult({
                    data: "Not ok",
                    tab: "player"
                })
                throw new Error("Clash of Clans API error");
            }
            const data = await response.json();
            setSearchResult({
                data: data,
                tab: "player"
            })
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    function handleTestJson() {
        setSearchResult(TestJSON)
    }

    return (
        <div id="search-page-container">
            <form id="searchbar-container" onSubmit={handleFormSubmit}>
                <div id="searchbar-toggle">
                    <button
                        id="player-search-toggle"
                        className="toggle-button"
                        onClick={(event) => {
                            event.preventDefault();
                            setSearchToggle("player");
                        }}
                    >
                        <BsPersonFill
                            id="player-toggle-icon"
                            className="toggle-icon"
                        />
                    </button>
                    <button
                        id="clan-search-toggle"
                        className="toggle-button"
                        onClick={(event) => {
                            event.preventDefault();
                            setSearchToggle("clan");
                        }}
                    >
                        <FaShieldAlt
                            id="clan-toggle-icon"
                            className="toggle-icon"
                        />
                    </button>
                    <div
                        id="toggle-bg-slider"
                        className={
                            searchToggle === "player" ? "" : "shift-right"
                        }
                    />
                </div>
                <input
                    id="searchbar"
                    type="text"
                    placeholder={`Enter ${
                        searchToggle === "player" ? "Tag" : "Clan Name"
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
            <RenderContent searchToggle={searchToggle} searchResult={searchResult}/>
        </div>
    );
}

function RenderContent({ searchResult }) {
    return (
        <>
            {searchResult.tab === "player" ? (
                <SearchResult playerData={searchResult.data} />
            ) : searchResult.tab === "clan" ? (
                <div>Clan stuff</div>
            ) : (
                <SearchTip />
            )}
        </>
    );
}
