import { useState } from 'react';
import { signIn, signUp } from '../../data/services/api';

export const useAuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shouldPromptSignInForm, setShouldPromptSignInForm] = useState(true);

  const shouldSignIn = async setShouldTriggerAuth => {
    try {
      shouldPromptSignInForm
        ? await signIn(username, password)
        : signUp(username, password);
      setShouldTriggerAuth(false);
    } catch (err) {
      console.log(err);
    }
  };

  return [
    username,
    password,
    setUsername,
    setPassword,
    shouldSignIn,
    shouldPromptSignInForm,
    setShouldPromptSignInForm,
  ];
};
