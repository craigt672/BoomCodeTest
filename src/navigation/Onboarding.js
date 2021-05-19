import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { res } from '../core/resources/res';
import { Login } from '../components/onboarding/Login';
import { Signup } from '../components/onboarding/Signup';

const OnboardingStack = createStackNavigator();

export const Onboarding = () => {
  return (
      <OnboardingStack.Navigator headerMode="none">
        <OnboardingStack.Screen name={res.Navigation.Signup} component={Signup} />
        <OnboardingStack.Screen name={res.Navigation.Login} component={Login} />
      </OnboardingStack.Navigator>
  );
};
