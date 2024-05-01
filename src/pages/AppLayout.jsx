import CardContainer from '../features/cards/CardContainer';
import Header from '../pages/Header';
import Footer from '../pages/Footer';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <>
      <Header />
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
