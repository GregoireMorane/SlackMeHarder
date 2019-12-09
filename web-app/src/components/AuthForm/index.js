import React from 'react';
import { useAuthForm } from './services';

import './styles.css';

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
    setUsername(e);
  };

  const handleSetPassword = e => {
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
    <div className="form__container">
      <h2 className="form__title">
        {shouldPromptSignInForm ? 'Connexion' : 'Inscription'}
      </h2>
      {shouldPromptSignInForm ? (
        <form onSubmit={handleSubmit} className="form__container__content">
          <label>Nom d'utilisateur :</label>
          <input
            className="form__input"
            name="username"
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={e => handleSetUsername(e.target.value)}
          />
          <label>Mot de passe :</label>
          <input
            className="form__input"
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => handleSetPassword(e.target.value)}
          />
          <button type="submit" className="btn__submit">
            Connexion
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="form__container__content">
          <label>Choisissez un nom d'utilisateur :</label>
          <input
            className="form__input"
            name="username"
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={e => handleSetUsername(e.target.value)}
          />
          <label>Choisissez un mot de passe :</label>
          <input
            className="form__input"
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => handleSetPassword(e.target.value)}
          />
          <button type="submit" className="btn__submit">
            Inscription
          </button>
        </form>
      )}
      <button onClick={switchForm} className="btn__switch">
        {shouldPromptSignInForm
          ? 'Pas encore de compte ? Inscrivez-vous ! '
          : 'Vous avez déjà un compte ? Connectez-vous !'}
      </button>
    </div>
  );
};

export default AuthForm;
