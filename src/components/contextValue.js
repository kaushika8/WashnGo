import {createContext} from 'react';

const WashContextValues = createContext({
  signInValues: {},
  setSigninValues: () => {},
});
export default WashContextValues;
