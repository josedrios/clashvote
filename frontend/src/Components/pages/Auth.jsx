import images from "../../Components/features/Images";
import { FiUser } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";
import { useState } from "react";

const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;

export default function Auth({}) {
    const [authTab, setAuthTab] = useState("signup");

    return (
        <div id="auth-container">
            <div id="sign-log-container" 
            style={"login" === authTab ? {
                height: "310px"
            } : {
                height: "385px"
            }}>
                <AuthForm
                    authType={"signup"}
                    authTab={authTab}
                    setAuthTab={setAuthTab}
                />
                <AuthForm
                    authType={"login"}
                    authTab={authTab}
                    setAuthTab={setAuthTab}
                />
                <div
                    id="art-slider"
                    className={authTab === "login" ? "" : "art-slide-right"}
                >
                    <h3>CV</h3>
                    <img src={getImage("slider")} alt="" />
                </div>
            </div>
        </div>
    );
}

function AuthForm({ authType, authTab, setAuthTab }) {
    return (
        <form
            id={`${authType}-form`}
            className="auth-form"
            style={{
                animation: 
                authType === authTab
                ? "swipe-in 0.5s forwards" 
                : "swipe-out 0.2s forwards"
            }}
        >
            <h3 className="sign-log-header">
                {authType === "login" ? "Login" : "Sign Up"}
            </h3>
            {authType === "signup" && (
                <div className="auth-input-container">
                    <FiUser className="auth-input-icon" />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="auth-input"
                    />
                </div>
            )}
            <div className="auth-input-container">
                <HiOutlineMail className="auth-input-icon" />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="auth-input"
                />
            </div>
            <div className="auth-input-container">
                <MdLockOutline className="auth-input-icon" />
                <input
                    type="password"
                    name="username"
                    placeholder="Password"
                    className="auth-input"
                />
            </div>
            {authType === "signup" && (
                <div id="auth-tos-container">
                    <p>
                        <input type="checkbox" name="tos" id="auth-form-tos" />{" "}
                        I agree to the <a href="">terms of services</a>
                    </p>
                </div>
            )}
            <button className="auth-form-confirm">
                {authType.toUpperCase()}
            </button>
            {authType === "signup" && (
                <a
                    className="forgot-already-link"
                    id="already-link"
                    href=""
                    onClick={(e) => {
                        e.preventDefault();
                        setAuthTab("login");
                    }}
                >
                    Already have an account?
                </a>
            )}
            {authType === "login" && (
                <>
                    <a
                        className="forgot-already-link"
                        id="forgot-link"
                        href=""
                        onClick={(e) => {
                            e.preventDefault();
                            setAuthTab("signup");
                        }}
                    >
                        Don't have an account?
                    </a>
                    <a
                        className="forgot-already-link"
                        href=""
                        onClick={(event) => {
                            event.preventDefault();
                        }}
                    >
                        Forgot password?
                    </a>
                </>
            )}
        </form>
    );
}
