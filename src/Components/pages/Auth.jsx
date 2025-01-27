import images from "../../Components/features/Images";
import { FiUser } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";
import { useState } from "react";

const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;

function Auth({}) {
    const [authTab, setAuthTab] = useState("login");

    return (
        <div id="auth-container">
            <div id="sign-log-container">
                <div id="signup-container" className={`auth-tab ${"signup" === authTab ? "selected" : "not-selected"}`}>
                    <h3 className={`sign-log-header ${"signup" === authTab ? "" : ""}`}>Sign Up</h3>
                    <AuthForm authType={"signup"} authTab={authTab} setAuthTab={setAuthTab} />
                </div>
                <div id="login-container" className={`auth-tab ${"login" === authTab ? "selected" : "not-selected"}`}>
                    <h3 className={`sign-log-header ${"login" === authTab ? "" : ""}`}>Log In</h3>
                    <AuthForm authType={"login"} authTab={authTab} setAuthTab={setAuthTab} />
                </div>
                <div
                    id="art-slider"
                    className={authTab === "login" ? "" : "art-slide-right"}
                >
                    <h3 id="art-slider-header">Welcome!</h3>
                    <img src={getImage("slider")} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Auth;

function AuthForm({ authType, authTab, setAuthTab }) {
    return (
        <form className={`auth-form ${authType === authTab ? "" : ""}`} action="" id={`${authType}-form`}>
            {authType === "signup" && (
                <div className="auth-input-container">
                    <FiUser className="auth-input-icon" />
                    <input type="text" name="username" placeholder="Username" className="auth-input"/>
                </div>
            )}
            <div className="auth-input-container">
                <HiOutlineMail className="auth-input-icon" />
                <input type="email" name="email" placeholder="Email" className="auth-input"/>
            </div>
            <div className="auth-input-container">
                <MdLockOutline className="auth-input-icon" />
                <input type="password" name="username" placeholder="Password" className="auth-input"/>
            </div>
            {authType === "signup" && (
                <div id="auth-tos-container">
                    <p>
                        <input type="checkbox" name="tos" id="auth-form-tos"/>{" "}
                        I agree to the <a href="">terms of services</a>
                    </p>
                </div>
            )}
            <button className="auth-form-confirm">{authType.toUpperCase()}</button>
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
                    <a className="forgot-already-link" href="">
                        Forgot password?
                    </a>
                </>
            )}
        </form>
    );
}
