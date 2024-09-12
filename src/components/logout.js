import React, {useContext} from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import {Button} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import appFonts from './appFonts';
import WashContextValues from './contextValue';
const Logout = () => {
  //Variables to add font sizes
  const mediumFont = Dimensions.get('screen').width > 600 ? 20 : 18;
  const navigation = useNavigation();
  const width = Dimensions.get('screen').width;

  //Varible to obtain useContext value
  const {signInValues} = useContext(WashContextValues);
  return (
    <View style={{flex: 1, alignSelf: 'center'}}>
      <View style={{paddingTop: 10}}>
        <Image
          source={require('../assets/washngo.png')}
          resizeMode="cover"
          style={{height: 150, width: 200}}></Image>
      </View>
      <View style={{flex: 1, marginTop: width / 2}}>
        <Text
          style={{
            fontFamily: appFonts.extraBold,
            fontSize: 20,
            color: 'black',
            textAlign: 'center',
          }}>
          Welcome {signInValues.data?.name}
        </Text>

        <Button
          buttonStyle={{backgroundColor: '#A3CFFF'}}
          titleStyle={{
            color: '#092A4D',
            fontFamily: appFonts.headingBold,
            fontSize: mediumFont,
          }}
          containerStyle={{
            backgroundColor: '#A3CFFF',
            borderRadius: 32,
            marginTop: 100,
            paddingVertical: 4,
          }}
          onPress={() => {
            navigation.navigate('GetStarted');
          }}>
          Logout
        </Button>
      </View>
    </View>
  );
};

export default Logout;
