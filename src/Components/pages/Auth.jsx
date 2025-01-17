import images from "../../Components/feature/Images";
import { FiUser } from "react-icons/fi";

const getImage = (name) => images[name.replace(/[ .]/g, "_")] || null;

function Auth({}) {
    return (
        <div id="auth-container">
            <div id="sign-log-container">
                <div id="signup-container">
                    <h3 className="sign-log-header">Sign Up</h3>
                </div>
                <div id="login-container">
                    <h3 className="sign-log-header">Log In</h3>
                    <AuthForm authType={"login"} />
                </div>
                <div id="art-slider">
                    <img src={getImage("slider")} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Auth;

function AuthForm({ authType }) {
    return (
        <form id="auth-form" action="">
            <div className="auth-input-container">
            <FiUser className="auth-input-icon"/>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                />
            </div>
            <div className="auth-input-container">
                <FiUser className="auth-input-icon"/>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                />
            </div>
            <div className="auth-input-container">
                <FiUser className="auth-input-icon"/>
                <input
                    type="password"
                    name="username"
                    placeholder="Password"
                />
            </div>
            <input type="checkbox" name="tos" id="auth-form-tos" />
            <button id="auth-form-confirm">{authType}</button>
            <button id="auth-form-alternative">Forget/Already?</button>
        </form>
    );
}
