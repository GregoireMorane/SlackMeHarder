import React from 'react';
import { useAuthForm } from './services';

const AuthForm = props => {
  const [
    username,
    password,
    setUsername,
    setPassword,
    shouldSignIn,
    shouldPromptSignInForm,
    setShouldPromptSignInForm,
  ] = useAuthForm();

  const handleSetUsername = e => {
    console.log(e);
    setUsername(e);
  };

  const handleSetPassword = e => {
    console.log(e);
    setPassword(e);
  };

  const handleSubmit = e => {
    e.preventDefault();
    shouldSignIn(props.setShouldTriggerAuth);
  };

  const switchForm = () => {
    setShouldPromptSignInForm(!shouldPromptSignInForm);
  };

  return (
    <div>
      <h2>{shouldPromptSignInForm ? 'Sign In' : 'Sign Up'}</h2>
      {shouldPromptSignInForm ? (
        <form onSubmit={handleSubmit}>
          <label>
            Username :
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => handleSetUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password :
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => handleSetPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Username :
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => handleSetUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password :
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => handleSetPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
      <button onClick={switchForm}>
        switch to {shouldPromptSignInForm ? 'signup' : 'signin'}
      </button>
    </div>
  );
};

export default AuthForm;
