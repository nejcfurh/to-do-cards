import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppLayout from './pages/AppLayout';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route
            element={
              <>
                <AppLayout />
              </>
            }
          > */}
          <Route index element={<Navigate replace to="todos" />} />
          <Route path="todos" element={<AppLayout />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          {/* </Route> */}
          {/* To implement login in options */}
          {/* <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 1500,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '18px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'white',
            color: 'black',
          },
        }}
      />
    </>
  );
}

export default App;
