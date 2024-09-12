import React, {useState, useContext} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Input, Icon, Button, CheckBox} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import WashContextValues from './contextValue';

const SignUp = () => {
  //Variables to add font sizes
  const mediumFont = Dimensions.get('screen').width > 600 ? 20 : 22;
  const smallFont = Dimensions.get('screen').width > 600 ? 16 : 14;
  const tinyFont = Dimensions.get('screen').width > 600 ? 16 : 12;
  const errorFontSize = Dimensions.get('screen').width > 600 ? 13 : 10;
  const placeholderFont = Dimensions.get('screen').width > 600 ? 16 : 14;

  const {setSigninValues} = useContext(WashContextValues);

  //Usestate to set password field on or off
  const [password, setPassword] = useState({
    security: true,
    rightIcon: 'eye-off',
  });

  //Variable to store check value
  const [check, setCheck] = useState(false);

  const navigation = useNavigation();

  // Function which is used to handle password visibility
  const handlePasswordVisibility = () => {
    setPassword(prevState => ({
      rightIcon: prevState.rightIcon === 'eye' ? 'eye-off' : 'eye',
      security: !prevState.security,
    }));
  };

  //Formik values to be set from the form
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().label('name').required('This field is required'),
      email: yup
        .string()
        .label('email')
        .required('This field is required')
        .matches(/^[0-9]+$/, 'Phone number is invalid!')
        .max(10, 'Phone number is invalid!'),

      password: yup
        .string()
        .label('password')
        .required('This field is required'),
    }),
    onSubmit: values => {
      let submit = {
        name: values?.name,
        phone: values?.email,
        password: values?.password,
      };
      axios
        .post('https://tor.appdevelopers.mobi/api/register', submit)
        .then(function (response) {
          if (response?.data) {
            setSigninValues(response?.data);
            formik.resetForm();
            navigation.navigate('SignIn');
          }
        })
        .catch(function (error) {
          console.log(error?.response?.data);
        });
    },
  });

  return (
    <View
      style={{
        flex: 1,
      }}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
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
              Sign Up
            </Text>
            <Text
              style={{
                fontFamily: appFonts.medium,
                fontSize: smallFont,
                alignItems: 'flex-start',
                paddingTop: 10,
              }}>
              {`Fill in the below form and add life to \nyour cart`}
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
              Name
            </Text>
            <Input
              errorMessage={
                formik.touched.name && formik.errors.name
                  ? formik.touched.name && formik.errors.name
                  : null
              }
              errorStyle={{
                fontFamily: appFonts.medium,
                fontSize: errorFontSize,
                marginLeft: -5,
              }}
              inputStyle={{fontSize: 14}}
              value={formik.values.name}
              onChangeText={text => formik.setFieldValue('name', text)}
              inputContainerStyle={{borderBottomWidth: 0}}
              placeholder="Enter your name"
              onBlur={formik.handleBlur('name')}
              containerStyle={{
                borderColor: '#808080',
                borderWidth: 1,
                marginBottom: 15,
                borderRadius: 8,
                height: 50,
              }}
              leftIcon={
                <Icon name="user" size={20} color={'#808080'} type="feather" />
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
              onChangeText={text => formik.setFieldValue('email', text)}
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
              onChangeText={text => formik.setFieldValue('password', text)}
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

            <CheckBox
              checked={check}
              title={
                <>
                  <Text
                    style={{
                      fontFamily: appFonts.bold,
                      fontSize: smallFont,
                      textAlign: 'center',
                      color: 'black',
                    }}>
                    {`Agree With `}
                  </Text>

                  <Text
                    style={{
                      fontFamily: appFonts.bold,
                      fontSize: smallFont,
                      textAlign: 'center',
                      color: appColors.lightdark,
                      textDecorationLine: 'underline',
                    }}>
                    {`Terms & Conditions`}
                  </Text>
                </>
              }
              onPress={() => setCheck(!check)}
              containerStyle={{
                backgroundColor: 'transparent',
                marginLeft: -0.5,
                paddingLeft: 0,
                alignSelf: 'flex-start',
                marginTop: 15,
              }}
            />
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
              {`Already have an account? `}
            </Text>
            <TouchableOpacity
              onPress={() => {
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
              paddingBottom: 20,
            }}>
            {`By login or sign up,you agree to our terms of use and \n privacy policy`}
          </Text>
          <Image
            source={require('../assets/topright.png')}
            resizeMode="cover"
            style={{
              position: 'absolute',
              zIndex: -30,
              height: 150,
              width: 150,
              bottom: 0,
              right: 0,
              transform: [
                {rotate: '90deg'}, // Rotate the image
              ],
            }}></Image>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUp;
