import React, { useEffect, useState } from 'react';
import OktaAuth from '@okta/okta-auth-js';
// import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

import { config } from '../../../utils/oktaConfig';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [sessionToken, setSessionToken] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const { authState, authService } = useOktaAuth();

  // useEffect(() => {
  //   if (!authState.isAuthenticated) {
  //     setUserInfo(null);
  //   } else {
  //     authService.getUser().then(info => {
  //       setUserInfo(info);
  //     });
  //   }
  // }, [authState, authService]);

  const oktaAuth = new OktaAuth({
    pkce: config.pkce,
    issuer: config.issuer,
  });

  const handleSubmit = event => {
    event.preventDefault();
    oktaAuth
      .signIn({ email, password })
      .then(res => {
        const sessionToken = res.sessionToken;
        setSessionToken(sessionToken);
        authService.redirect({ sessionToken });
      })
      .catch(error => console.log('OktaAuth.signIn error: ', error));
  };
  const handleEmailChange = event => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  // if (sessionToken) {
  //   return null;
  // }

  // if (!userInfo) {
  //   return (
  //     <div>
  //       <p>Fetching user profile...</p>
  //     </div>
  //   );
  // }

  return (
    <form onSubmit={handleSubmit}>
      {/* {errorMessage} */}
      <div className="form-element">
        <label>Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
      </div>

      <div className="form-element">
        <label>Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <input id="submit" type="submit" value="Submit" />
    </form>
  );
};

export default LoginForm;
