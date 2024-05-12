import { useState } from 'react';
import LoginForm from '../features/authentication/LoginForm';
import RegisterForm from '../features/authentication/RegisterForm';

function LoginRegister() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <section className="login-section">
        <div
          className={isActive ? `container right-panel-active` : 'container'}
          id="container"
        >
          <RegisterForm />
          <LoginForm />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <div className="title-section-overlay">Sign in</div>
                <p className="p-section-overlay">
                  ... here if you already have an account!{' '}
                </p>
                <button
                  className="button ghost mt-5"
                  id="signIn"
                  onClick={() => setIsActive(false)}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <div className="title-section-overlay">Welcome!</div>
                <p className="p-section-overlay">
                  Sign up if you still don&apos;t have an account!
                </p>
                <button
                  className="button ghost"
                  id="signUp"
                  onClick={() => setIsActive(true)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginRegister;
