import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
    return (
        <section className="contact-us" id="contact">
            <h2>Get in Touch</h2>
            <p>Reach out to us for any questions, feedback, or collaboration opportunities.</p>
            <div className="team-members">
                <div className="team-member">
                    <h3>Usman Saeed</h3>
                    <p>Co-Founder & Developer</p>
                    <ul className="contact-info">
                        <li><a href="mailto:uusaeed749@gmail.com">uusaeed749@gmail.com</a></li>
                        <li><a href="tel:+923335539340">+92 333 5539340</a></li>
                    </ul>
                </div>
                <div className="team-member">
                    <h3>Matee Ur Rehman</h3>
                    <p>Co-Founder & Developer</p>
                    <ul className="contact-info">
                        <li><a href="mailto:mateerehman42@gmail.com">mateerehman42@gmail.com</a></li>
                        <li><a href="tel:+923485495563">+92 348 5495563</a></li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;