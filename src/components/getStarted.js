import React from 'react';
import {View, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {Button} from '@rneui/base';
import appColors from './appColors';
import {useNavigation} from '@react-navigation/native';
import appFonts from './appFonts';

const GetStarted = () => {
  //Variables to add font sizes
  const mediumFont = Dimensions.get('screen').width > 600 ? 20 : 18;
  const smallFont = Dimensions.get('screen').width > 600 ? 16 : 13;

  const navigation = useNavigation();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={require('../assets/topleft.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}></Image>
      <Image source={require('../assets/washngo.png')}></Image>
      <Image
        resizeMode="cover"
        source={require('../assets/topright.png')}
        style={{
          position: 'absolute',
          height: 200,
          width: 200,
          top: 0,
          right: 0,
        }}></Image>
      <View>
        <Text
          style={{
            fontFamily: appFonts.bold,
            fontSize: mediumFont,
            textAlign: 'center',
            lineHeight: 36,
          }}>
          {`Sparkle & Shine Transform \n Your Drive with Every Wash!`}
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
            marginTop: 35,
            paddingVertical: 4,
          }}
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          Let's Start
        </Button>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 7,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: appFonts.bold,
              fontSize: smallFont,
              textAlign: 'center',
            }}>
            {`Already have an account? `}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text
              style={{
                fontFamily: appFonts.bold,
                fontSize: smallFont,
                textAlign: 'center',
                color: appColors.lightdark,
                textDecorationLine: 'underline',
                textDecorationStyle: 'solid',
              }}>
              {`Sign in`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GetStarted;
