import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/components/appStack';
import SplashScreen from './src/components/splashScreen';
import WashContextValues from './src/components/contextValue';
const App = () => {
  const [initial, setInitial] = useState(false);
  const [signInValues, setSigninValues] = useState();
  useEffect(() => {
    setTimeout(() => {
      setInitial(true);
    }, 2000);
  }, []);
  console.log(initial);

  return (
    <WashContextValues.Provider value={{signInValues, setSigninValues}}>
      <NavigationContainer>
        {initial ? <AppStack /> : <SplashScreen />}
      </NavigationContainer>
    </WashContextValues.Provider>
  );
};

export default App;
