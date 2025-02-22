import PlayerResult from "../features/Search/Player/SearchResult";
import ClanResults from "../features/Search/Clan/SearchResults";
import SearchTip from "../features/Search/SearchTip";
import TestJSON from "../../clasher.json";
import TestsJSON from "../../claner.json";
import { useState, useRef, useEffect } from "react";

import { BsPersonFill } from "react-icons/bs";
import { FaShieldAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

export default function Search() {
    const inputRef = useRef(null);
    const [searchToggle, setSearchToggle] = useState("player");
    const [searchResult, setSearchResult] = useState({
        data: "",
        tab: "",
    });

    function handleFormSubmit(event) {
        event.preventDefault();
        if (inputRef.current.value.trim() == "") {
            console.warn("ALERT: Empty string was given");
            // Activate Alert Banner Here
            return;
        }
        fetchData(inputRef.current.value.trim(), searchToggle);
        inputRef.current.value = "";
    }

    async function fetchData(prompt, type) {
        try {
            var response;
            if (type === "player") {
                response = await fetch(
                    `http://localhost:3001/api/players/${prompt}`
                );
            } else {
                response = await fetch(
                    `http://localhost:3001/api/clans/${prompt}`
                );
            }
            if (response.status === 404) {
                setSearchResult({
                    data: "404",
                    tab: type,
                });
                throw new Error(`Failed to get ${type} info for '${prompt}'`);
            } else if (!response.ok) {
                setSearchResult({
                    data: "!200",
                    tab: type,
                });
                throw new Error("Clash of Clans API failed");
            }
            const data = await response.json();
            setSearchResult({
                data: data,
                tab: type,
            });
        } catch (error) {
            console.log(error);
        }
    }

    function handleTestJson() {
        if (searchToggle === "player") {
            setSearchResult({
                data: TestJSON,
                tab: "player"
            });
        } else {
            setSearchResult({
                data: TestsJSON,
                tab: "clan"
            });
        }
    }

    return (
        <div id="search-page-container">
            <form id="player-clan-search" onSubmit={handleFormSubmit}>
                <div id="searchbar-toggle">
                    <button
                        id="player-search-toggle"
                        className="toggle-btn"
                        type="button"
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
                        type="button"
                        id="clan-search-toggle"
                        className="toggle-btn"
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
                    type="search"
                    placeholder={`Enter ${
                        searchToggle === "player" ? "Tag" : "Clan Name"
                    }`}
                    ref={inputRef}
                />
                <button id="test-json" onClick={handleTestJson} type="button">
                    Test
                </button>
                <button type="submit" id="searchbar-submit-btn">
                    <IoIosSearch />
                </button>
            </form>
            <RenderContent
                searchToggle={searchToggle}
                searchResult={searchResult}
            />
        </div>
    );
}

function RenderContent({ searchResult }) {
    return (
        <>
            {searchResult.tab === "player" ? (
                <PlayerResult playerData={searchResult.data} />
            ) : searchResult.tab === "clan" ? (
                <ClanResults clanData={searchResult.data} />
            ) : (
                <SearchTip />
            )}
        </>
    );
}
