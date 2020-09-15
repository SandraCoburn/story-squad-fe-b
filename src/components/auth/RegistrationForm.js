import React, { useState, useEffect } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { usetOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { config } from '../../utils/oktaConfig';

const RegistrationForm = () => {
  // const [ userInfo, setUserInfo ] = useState({});
  const [sessionToken, setSessionToken] = useState();
  const [name, setName] = useState();
  const [pin, setPin] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const oktaAuth = new OktaAuth({
    pkce: config.pkce,
    issuer: config.issuer,
  });

  const handleSubmit = event => {
    event.preventDefault();
    fetch('/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(user => {
        oktaAuth
          .signIn({
            email: email,
            password: password,
          })
          .then(res => {
            setSessionToken(res.sessionToken);
          });
      })
      .catch(error =>
        console.log('Error reaching the node users endpoint: ', error)
      );
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handlePinChange = event => {
    setPin(event.target.value);
  };
  const handleEmailChange = event => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* {errorMessage} */}
      <div className="form-element">
        <label>Name:</label>
        <input id="name" type="text" value={name} onChange={handleNameChange} />
      </div>

      <div className="form-element">
        <label>PIN:</label>
        <input id="pin" type="text" value={pin} onChange={handlePinChange} />
      </div>

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
          id="name"
          type="text"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <input id="submit" type="submit" value="submit" />
    </form>
  );
};

export default RegistrationForm;
