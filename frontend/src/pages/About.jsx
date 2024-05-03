import Footer from '../ui/Footer';
import PrivateHeader from '../ui/PrivateHeader';

let aboutApp = `Introducing ToDoCards our to-do-list web application, a seamlessly integrated solution designed with efficiency in mind. This application leverages the robust capabilities of React for its front-end, ensuring a dynamic and responsive user experience. The back-end architecture is powered by Node.js and Express.js, providing a solid foundation for high-performance interactions. MongoDB is employed as the database, expertly handling data management and user authentication.

The application incorporates external libraries including React-Hot-Toast for intuitive notifications, React Router for seamless navigation, React Tooltip for enhanced user guidance, and React Icons for visually appealing interfaces. Designed with accessibility in mind, the app is beginner-friendly and facilitates easy connections to MongoDB. This allows for efficient management of list images, titles, and descriptions. Each list supports an unlimited number of tasks, which users can freely add or delete. The tasks are conveniently scrollable, thanks to an intuitive overflow setup, ensuring a tidy user interface.

List displays are innovatively implemented using HTML radio buttons, and the layout extensively utilizes CSS flexbox for optimal responsiveness and organization. We have enriched our app with high-quality, free stock images from Unsplash.com, and bespoke icons crafted by Ilham Fitrotul Hayat, sourced from FreePic.

Additionally, our 'Contact Me' page features Social Media Icons, which can be utilized both as a standalone feature and as an integrated module, enhancing both functionality and aesthetic appeal.`;

function About() {
  return (
    <>
      <PrivateHeader />
      <div className="wrapper">
        <div className="about-me-box">
          <p className="about-me">{aboutApp}</p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;
