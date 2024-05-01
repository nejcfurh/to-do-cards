import Footer from './Footer';
import Header from './Header';

let about = `I'm a dedicated Junior Software Engineer eager to contribute my skills to innovative projects. 
  
  With a solid foundation in mostly JavaScript (EJS, jQuerry, Node.JS, React), and HTML/CSS coupled with my hands-on experience in building web applications and exploring emerging technologies, I'm excited about the opportunity to collaborate and learn from experienced professionals in the field.

  I am proactive, detail-oriented, and committed to continuous improvement.`;

function Contact() {
  return (
    <>
      <Header />
      <div
        className="about-me-box"
        style={{ width: '950px', height: '570px', margin: 'auto' }}
      >
        <p className="about-me">{about}</p>
        <hr />
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
        <hr />
        <div className="contact">
          <p className="about-me" style={{ marginTop: '0px' }}>
            {`Let's connect and explore how I can be a valuable asset to your
            team`}
          </p>
          <hr />
          <div className="contact-icons">
            <a className="icon-button" href="mailto:nejc.furh7@gmail.com">
              <img
                className="mail-icon-mail"
                src="https://cdn-icons-png.flaticon.com/512/666/666162.png"
              />
            </a>
            <a
              className="footer-link"
              href="https://si.linkedin.com/in/nejcfurh"
            >
              <img
                className="mail-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png"
              />
            </a>
            <a className="footer-link" href="https://twitter.com/nejcfurh">
              <img
                className="mail-icon"
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-round-icon.png"
              />
            </a>
            <a
              className="footer-link"
              href="https://www.facebook.com/nejcfurh/"
            >
              <img
                className="mail-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
              />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
