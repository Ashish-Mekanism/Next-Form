import "./contact.scss";
const Contact = () => {
  return (
    <div className="contact container">
      <div className="c-left">
        <form
          className="form"
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
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
