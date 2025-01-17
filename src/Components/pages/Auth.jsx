import images from "../../Components/feature/Images";
import { FiUser } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";

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
                <FiUser className="auth-input-icon" />
                <input type="text" name="username" placeholder="Username" />
            </div>
            <div className="auth-input-container">
                <HiOutlineMail className="auth-input-icon" />
                <input type="text" name="email" placeholder="Email" />
            </div>
            <div className="auth-input-container">
                <MdLockOutline className="auth-input-icon" />
                <input type="password" name="username" placeholder="Password" />
            </div>
            <div id="auth-tos-container">
                <p><input type="checkbox" name="tos" id="auth-form-tos" /> I agree
                to the <a href="">terms of services</a></p>
            </div>
            <button id="auth-form-confirm">{authType.toUpperCase()}</button>
            <a className="forgot-already-link" id="already-link" href="">Already have an account?</a>
            <a className="forgot-already-link" id="forgot-link" href="">Forgot password?</a>
        </form>
    );
}
