import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AppLayout from './pages/AppLayout';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';
import ProtectedRoute from './ui/ProtectedRoute';
import Account from './pages/Account';
import OAuthSuccess from './features/authentication/OAuthSuccess';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<Navigate replace to="todos" />} />
            <Route
              path="todos"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            />
            <Route
              path="contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />
            <Route
              path="account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="login/success" element={<OAuthSuccess />} />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '12px' }}
        toastOptions={{
          success: {
            duration: 1500,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: '18px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'lightgray',
            color: 'black',
          },
        }}
      />
    </>
  );
}

export default App;
