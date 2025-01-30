import { MdOutlineEmail } from "react-icons/md";
import { FaDiscord } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Contact({}) {
    return (
        <div id="contact-container">
            <h2 id="contact-title">Contact Us</h2>
            <div id="contact-body-container">
                <div id="contact-info">
                    <h3>Have questions, issues or suggestions?</h3>
                    <div>clashvote@gmail.com</div>
                    <div id="contact-buttons-container">
                        <button>
                            <MdOutlineEmail />
                        </button>
                        <button>
                            <FaDiscord />
                        </button>
                        <button>
                            <FaInstagram />
                        </button>
                    </div>
                </div>
                <div id="contact-create-message">
                    <form action="" id="contact-form">
                        <div id="contact-naming-container">
                            <div
                                id="first-name-section"
                                className="contact-name-section"
                            >
                                <h4>First Name:</h4>
                                <input type="text" placeholder="First" />
                            </div>
                            <div
                                id="last-name-section"
                                className="contact-name-section"
                            >
                                <h4>Last Name:</h4>
                                <input type="text" placeholder="Last" />
                            </div>
                        </div>
                        <h4>Email:</h4>
                        <input
                            id="contact-email-input"
                            type="text"
                            placeholder="Enter your email here..."
                        />
                        <h4>Message:</h4>
                        <textarea name="" id="contact-message-text" placeholder="Type message here..."></textarea>
                        <button id="contact-submit-btn" className="standard-btn">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
