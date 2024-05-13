import Footer from '../ui/Footer';
import PrivateHeader from '../ui/PrivateHeader';

let about = `I'm a dedicated Junior Software Engineer eager to contribute my skills to innovative projects!With a robust background in web development, primarily using JavaScript technologies such as Node.js, React, jQuery, EJS, PostgreSQL, MongoDB, alongside proficient skills in HTML/CSS, Bootstrap, TailwindCSS and WebFlow I am enthusiastic about the opportunity to contribute and grow within a dynamic team. 

My practical experience in developing web applications has been continuously enriched by exploring emerging technologies. I am known for my proactive approach, meticulous attention to detail, and a steadfast commitment to continual improvement. 

I look forward to the possibility of collaborating with seasoned professionals and 
contributing to innovative projects in the field.`;

function Contact() {
  return (
    <>
      <PrivateHeader />
      <div className="contact-me-box">
        <div className="tech-stack-icons">
          <i className="devicon-html5-plain-wordmark colored"></i>
          <i className="devicon-css3-plain-wordmark colored"></i>
          <i className="devicon-tailwindcss-original-wordmark colored"></i>
          <i className="devicon-bootstrap-plain-wordmark colored"></i>
          <i className="devicon-jquery-plain-wordmark colored"></i>
          <i className="devicon-nodejs-plain colored"></i>
          <i className="devicon-express-original-wordmark colored"></i>
          <i className="devicon-mongodb-plain-wordmark colored"></i>
          <i className="devicon-postgresql-plain-wordmark colored"></i>
          <i className="devicon-react-original-wordmark colored"></i>
          <i className="devicon-redux-original colored"></i>
          <div className="rounded-corners">
            <i className="devicon-webflow-original"></i>
          </div>
        </div>
        <p className="contact-me">{about}</p>

        <div className="social-media-buttons">
          <button className="social-media-button">
            <a
              href="https://www.instagram.com/nejcfurh/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-instagram"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </button>
          <button className="social-media-button">
            <a
              href="https://twitter.com/nejcfurh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-brand-x"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </a>
          </button>
          <button className="social-media-button">
            <a href="mailto:nejc.furh7@gmail.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-mail"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </button>
          <button className="social-media-button linkedin">
            <a
              href="https://si.linkedin.com/in/nejcfurh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </button>
          <button className="social-media-button">
            <a
              href="https://www.facebook.com/nejcfurh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="none"
                stroke="white"
                strokeWidth="1.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H8.015V12h2.423V9.607c0-2.412 1.437-3.737 3.638-3.737 1.056 0 2.165.195 2.165.195v2.385h-1.219c-1.204 0-1.596.746-1.596 1.512V12h2.713l-.434 2.89h-2.28v6.988C18.343 21.128 22 16.991 22 12 22 6.477 17.523 2 12 2z"
                />
              </svg>
            </a>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
