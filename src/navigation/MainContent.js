import React from 'react';
import { useSignedInCheck } from '../hooks/useSignedInCheck';
import { Game } from './Game';
import { Onboarding } from './Onboarding';

export const MainContent = () => {
  const { isSignedIn } = useSignedInCheck();

  if (isSignedIn) {
    return <Game />;
  }
  return <Onboarding />;
};
