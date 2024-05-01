import Footer from './Footer';
import Header from './Header';

let aboutApp = `This is a ToDoList App that uses REACT for the front-end, Node.JS & Express.JS for back-end, and MongoDB as a database. When it comes to external front-end libraries used, I used React-Hot-Toast.
  
  Very beginner friendly Express.JS is used for connection with the MongoDB database, that stores list image links, list titles and list descriptions. Every list has its own tasks. Every task can be deleted and unlimited number of tasks can be added to the list. The tasks list will overflow and can be scrollable.
  
  To display the lists, HTML <input type="radio"> is used. 
  App extensivelly uses flexbox CSS.
  
  I am using free Unsplash.com stock images and an icons were created by Ilham Fitrotul Hayat and downloaded on FreePic.
  
  The contact me page accessible by clicking on my name in the footer was created using DevIcons (can be used as a standalone, or as a module).`;

function About() {
  return (
    <>
      <Header />
      <div
        className="about-me-box"
        style={{ width: '700px', height: '550px', margin: 'auto' }}
      >
        <p className="about-me">{aboutApp}</p>
      </div>
      <Footer />
    </>
  );
}

export default About;
