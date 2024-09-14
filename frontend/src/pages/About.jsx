import Footer from '../ui/Footer';
import PrivateHeader from '../ui/PrivateHeader';
import { aboutApp } from '../utils/constants';

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
