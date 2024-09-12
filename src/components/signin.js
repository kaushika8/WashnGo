import React, {useState, useContext} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Input, Icon, Button, Divider} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import WashContextValues from './contextValue';
import appFonts from './appFonts';

const SignIn = () => {
  //Variables to add font sizes
  const mediumFont = Dimensions.get('screen').width > 600 ? 20 : 22;
  const smallFont = Dimensions.get('screen').width > 600 ? 16 : 14;
  const tinyFont = Dimensions.get('screen').width > 600 ? 16 : 12;
  const errorFontSize = Dimensions.get('screen').width > 600 ? 13 : 10;
  const placeholderFont = Dimensions.get('screen').width > 600 ? 16 : 14;

  //Usestate to set password
  const [password, setPassword] = useState({
    security: true,
    rightIcon: 'eye-off',
  });

  //variable to set navigation
  const navigation = useNavigation();

  //Varible to obtain useContext value
  const {setSigninValues} = useContext(WashContextValues);

  // Function which is used to handle password visibility
  const handlePasswordVisibility = () => {
    setPassword(prevState => ({
      rightIcon: prevState.rightIcon === 'eye' ? 'eye-off' : 'eye',
      security: !prevState.security,
    }));
  };

  //Formik values to be set from the form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .label('email')
        .required('This field is required')
        .matches(/^[0-9]+$/, 'Phone number is invalid!')
        .max(12, 'Phone number is invalid!'),
      password: yup
        .string()
        .label('password')
        .required('This field is required'),
    }),
    onSubmit: values => {
      let submit = {
        phone: values?.email,
        password: values?.password,
      };
      axios
        .post('https://tor.appdevelopers.mobi/api/login', submit)
        .then(function (response) {
          if (response?.data) {
            setSigninValues(response?.data);
            formik.resetForm();
            navigation.navigate('logout');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        <View style={{alignSelf: 'center', paddingTop: 10}}>
          <Image
            source={require('../assets/washngo.png')}
            resizeMode="cover"
            style={{height: 150, width: 200}}></Image>
        </View>
        <View style={{paddingHorizontal: 20, paddingTop: 20}}>
          <Text
            style={{
              fontFamily: appFonts.extraBold,
              fontSize: mediumFont,
              alignItems: 'flex-start',
              color: 'black',
            }}>
            Sign In
          </Text>
          <Text
            style={{
              fontFamily: appFonts.medium,
              fontSize: tinyFont,
              alignItems: 'flex-start',
              paddingTop: 10,
            }}>
            {`Hi ! Welcome back, you \nhave been missed`}
          </Text>
        </View>
        <View style={{paddingHorizontal: 20, paddingTop: 15}}>
          <Text
            style={{
              fontFamily: appFonts.bold,
              fontSize: placeholderFont,
              alignItems: 'flex-start',
              color: 'black',
              paddingVertical: 10,
            }}>
            Email/Phone
          </Text>
          <Input
            errorMessage={
              formik.touched.email && formik.errors.email
                ? formik.touched.email && formik.errors.email
                : null
            }
            errorStyle={{
              fontFamily: appFonts.medium,
              fontSize: errorFontSize,
              marginLeft: -5,
            }}
            inputStyle={{fontSize: 14}}
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            inputContainerStyle={{borderBottomWidth: 0}}
            placeholder="xyz@gmail.com"
            onBlur={formik.handleBlur('email')}
            containerStyle={{
              borderColor: '#808080',
              borderWidth: 1,
              marginBottom: 15,
              borderRadius: 8,
              height: 50,
            }}
            leftIcon={
              <Icon
                name="mail-outline"
                size={20}
                color={'#808080'}
                type="material"
              />
            }
          />
          <Text
            style={{
              fontFamily: appFonts.bold,
              fontSize: placeholderFont,
              alignItems: 'flex-start',
              color: 'black',
              paddingVertical: 10,
            }}>
            Password
          </Text>
          <Input
            errorMessage={
              formik.touched.password && formik.errors.password
                ? formik.touched.password && formik.errors.password
                : null
            }
            errorStyle={{
              fontFamily: appFonts.medium,
              fontSize: errorFontSize,
              marginLeft: -5,
            }}
            secureTextEntry={password?.security}
            value={formik.values?.password}
            onChangeText={formik.handleChange('password')}
            inputStyle={{fontSize: 14}}
            onBlur={formik.handleBlur('password')}
            inputContainerStyle={{borderBottomWidth: 0}}
            placeholder="password"
            containerStyle={{
              borderColor: '#808080',
              borderWidth: 1,
              marginBottom: 5,
              borderRadius: 8,
              height: 50,
            }}
            rightIcon={
              //eye-off
              <TouchableOpacity onPress={handlePasswordVisibility}>
                <Icon
                  name={password.rightIcon}
                  type="feather"
                  size={18}
                  color={'#808080'}
                />
              </TouchableOpacity>
            }
            leftIcon={
              <Icon name="lock" type="feather" size={18} color={'#808080'} />
            }
          />
          <Text
            style={{
              fontFamily: appFonts.bold,
              fontSize: tinyFont,
              color: appColors.lightdark,
              textDecorationLine: 'underline',
              textDecorationStyle: 'solid',
              alignSelf: 'flex-end',
            }}>
            {`Forgot Password?`}
          </Text>
          <Button
            buttonStyle={{backgroundColor: '#A3CFFF'}}
            titleStyle={{
              color: '#092A4D',
              fontFamily: appFonts.headingBold,
              fontSize: smallFont,
            }}
            containerStyle={{
              backgroundColor: '#A3CFFF',
              borderRadius: 32,
              marginTop: 35,
              paddingVertical: 4,
            }}
            onPress={() => {
              formik.handleSubmit();
            }}>
            Sign In
          </Button>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 10,
            }}>
            <Divider
              style={{
                borderTopWidth: 1,
                width: 120,
                marginTop: 10,
                marginRight: 10,
                borderTopColor: '#A3CFFF',
                borderBottomWidth: 0,
              }}
              orientation="horizontal"></Divider>
            <Text style={{fontSize: 13}}>or</Text>
            <Divider
              style={{
                borderTopWidth: 1,
                width: 120,
                marginTop: 10,
                marginLeft: 10,
                borderTopColor: '#A3CFFF',
                borderBottomWidth: 0,
              }}
              orientation="horizontal"></Divider>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 10,
            }}>
            <Image
              style={{height: 35, width: 35, marginRight: 10}}
              source={require('../assets/Google.png')}></Image>
            <Image
              style={{height: 35, width: 35}}
              source={require('../assets/Apple.png')}></Image>
          </View>
        </View>
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
            {`Don't have an account? `}
          </Text>
          <TouchableOpacity
            onPress={() => {
              formik.resetForm();

              navigation.navigate('SignUp');
            }}>
            <Text
              style={{
                fontFamily: appFonts.bold,
                fontSize: smallFont,
                textAlign: 'center',
                color: appColors.lightdark,
                textDecorationLine: 'underline',
                textDecorationStyle: 'solid',
              }}>
              {`Sign Up`}
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontFamily: appFonts.bold,
            fontSize: tinyFont,
            textAlign: 'center',
            textDecorationStyle: 'solid',
            paddingTop: 20,
          }}>
          {`By login or sign up,you agree to our terms of use and \n privacy policy`}
        </Text>
        <Image
          source={require('../assets/topright.png')}
          resizeMode="cover"
          style={{
            position: 'absolute',
            height: 150,
            width: 150,
            bottom: 0,
            left: 0,
            zIndex: -30,

            transform: [
              {rotate: '180deg'}, // Rotate the image
            ],
          }}></Image>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignIn;
