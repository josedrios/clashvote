import { useState, useRef, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import SearchResult from "../feature/Search/Player/SearchResult";
import TestJSON from "../../clasher.json";

import { BsPersonFill } from "react-icons/bs";
import { FaShieldAlt } from "react-icons/fa";

function Search() {
    const [userEntry, setUserEntry] = useState("");
    const [playerData, setPlayerData] = useState("null");
    const inputRef = useRef(null);
    const [searchToggle, setSearchToggle] = useState("Player");

    useEffect(() => {
        console.log(playerData);
    }, [playerData]);

    function handleFormSubmit(event) {
        event.preventDefault();
        if (inputRef.current.value == "") {
            console.log("Empty Entry");
            return;
        }
        setUserEntry(inputRef.current.value.toUpperCase());
        //ADD CLAN OR PLAYER FETCH IF STATEMENT HERE ()
            fetchPlayerData(inputRef.current.value);
        inputRef.current.value = "";
    }

    async function fetchPlayerData(playerTag) {
        try {
            const response = await fetch(
                `http://localhost:3001/api/players/${playerTag}`
            );
            if (response.status === 404) {
                setPlayerData("Player not found")
                throw new Error(`Failed to get player info for '${playerTag}'`)
            } else if (!response.ok) {
                setPlayerData("null")
                throw new Error("Clash of Clans API error");
            }
            const data = await response.json();
            setPlayerData(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    function handleTestJson() {
        setPlayerData(TestJSON);
    }

    return (
        <div id="search-page-container">
            <form id="searchbar-container" onSubmit={handleFormSubmit}>
                <div
                    id="searchbar-toggle"
                >
                    <button id="player-search-toggle" className="toggle-button" onClick={()=>setSearchToggle("Player")}>
                        <BsPersonFill
                            id="player-toggle-icon"
                            className="toggle-icon"
                        />
                    </button>
                    <button id="clan-search-toggle" className="toggle-button" onClick={()=>setSearchToggle("Clan")}>
                        <FaShieldAlt
                            id="clan-toggle-icon"
                            className="toggle-icon"
                        />
                    </button>
                    <div id="toggle-bg-slider" className={searchToggle === "Player" ? "" : "shift-right"}/>
                </div>
                <input
                    id="searchbar"
                    type="text"
                    placeholder={`Enter ${searchToggle === "Player" ? "Tag" : "Clan Name"}`}
                    ref={inputRef}
                />
                <button id="test-json" onClick={handleTestJson}>
                    Test
                </button>
                <button type="submit" id="searchbar-submit-button">
                    <IoIosSearch />
                </button>
            </form>
            <SearchResult playerData={playerData} />
        </div>
    );
}

export default Search;