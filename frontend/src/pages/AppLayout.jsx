import CardContainer from '../features/cards/CardContainer';
import Footer from '../ui/Footer';
import { Outlet } from 'react-router-dom';
import PrivateHeader from '../ui/PrivateHeader';

function AppLayout() {
  return (
    <>
      <PrivateHeader />
      <div className="cards-box">
        <div className="wrapper">
          <CardContainer>
            <Outlet />
          </CardContainer>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AppLayout;
