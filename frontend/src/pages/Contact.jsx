import { ContactButtons } from '../ui/ContactButtons';
import Footer from '../ui/Footer';
import PrivateHeader from '../ui/PrivateHeader';
import { TechStack } from '../ui/TechStack';
import { aboutContact } from '../utils/constants';
function Contact() {
  return (
    <>
      <PrivateHeader />
      <div className="contact-me-box">
        <TechStack />
        <p className="contact-me">{aboutContact}</p>
        <ContactButtons />
      </div>
      <Footer />
    </>
  );
}

export default Contact;
