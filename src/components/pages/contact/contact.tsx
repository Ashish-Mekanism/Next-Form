"use client";

import { useState, FormEvent } from "react";
import "./contact.scss";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString()
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="contact container">
      <div className="c-left">
        {isSubmitted && (
          <div className="success-message">
            Your message has been sent successfully!
          </div>
        )}
        <form
          className="form"
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className="f-left">
            <input type="text" name="name" placeholder="Your Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="tel" name="mobile" placeholder="Mobile Number" />
            <textarea
              name="Message"
              id=""
              cols={30}
              rows={10}
              placeholder="Any Message For Us"
            />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
