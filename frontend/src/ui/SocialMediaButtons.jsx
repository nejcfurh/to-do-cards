function SocialMediaButtons() {
  //Auth Handlers
  const googleAuth = e => {
    e.preventDefault();
    window.location.href = `${import.meta.env.VITE_LOCALHOST}/auth/google`;
  };

  const facebookAuth = e => {
    e.preventDefault();
    window.location.href = `${import.meta.env.VITE_LOCALHOST}/auth/facebook`;
  };

  const twitterXAuth = e => {
    e.preventDefault();
    window.location.href = `${import.meta.env.VITE_LOCALHOST}/auth/twitter`;
  };

  const githubAuth = e => {
    e.preventDefault();
    window.location.href = `${import.meta.env.VITE_LOCALHOST}/auth/github`;
  };

  return (
    <div className="social-media-buttons">
      <ul>
        <li className="item">
          <a href="/auth/google" role="button" onClick={googleAuth}>
            <i className="fa-brands fa-google icon"></i>
          </a>
        </li>
        <li className="item">
          <a href="/auth/github" role="button" onClick={githubAuth}>
            <i className="fa-brands fa-github icon"></i>
          </a>
        </li>
        <li className="item">
          <a href="/auth/facebook" role="button" onClick={facebookAuth}>
            <i className="fa-brands fa-facebook icon"></i>
          </a>
        </li>
        <li className="item">
          <a href="/auth/twitter" role="button" onClick={twitterXAuth}>
            <i className="fa-brands fa-x-twitter icon"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SocialMediaButtons;
