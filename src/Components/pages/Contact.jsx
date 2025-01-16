function Contact({}) {
    return (
        <div id="contact-container">
            <div id="contact-info">
                <h3>Contact Info</h3>
                <p>Need to get in touch? Shoot us an email</p>
                <div>clashvote@example.com</div>
            </div>
            <div id="contact-create-message">
                <form action="">
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
                    <input id="contact-email-input" type="text" placeholder="Enter your email here..." />
                    <h4>Message:</h4>
                    <textarea name="" id="contact-message-text"></textarea>
                </form>
            </div>
        </div>
    );
}

export default Contact;
