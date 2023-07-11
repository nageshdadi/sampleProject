import React, {Component} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Alert,
} from 'react-native';

import auth from '@react-native-firebase/auth';

import {
  GoogleSignin,
  // GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

interface IProps {
  navigation?: any;
}

interface IState {
  email: string;
  password: string;
}
// GoogleSignin.configure({
//   webClientId:
//     '74496349300-3r8jubusmik28tff16lkqf9po9r0klm7.apps.googleusercontent.com',
// });

class Login extends Component<IProps, IState> {
  state = {
    email: '',
    password: '',
  };
  componentDidMount(): void {
    GoogleSignin.configure();
  }

  // googleSignIn = async () => {
  //   try {
  //     const {idToken} = await GoogleSignin.signIn();
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //     const response = await auth().signInWithCredential(googleCredential);
  //     console.log(response);

  //     // await GoogleSignin.hasPlayServices()
  //     // const userInfo = await GoogleSignin.signIn()
  //     // this.setState({userData: userInfo})
  //     // // this.props.navigation.navigate('Home')
  //   } catch (error: any) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled
  //       console.log('err1', error.code);
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation
  //       console.log('err2', error.code);
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services is not avaiable
  //       console.log('err3', error.code);
  //     } else {
  //       // some other
  //       console.log('err4', error);
  //     }
  //   }
  // };

  googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log('Success:', userInfo);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        console.log('Something went wrong:', error.toString());
        Alert.alert('Something went wrong', error.toString());
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => this.setState({email: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => this.setState({password: text})}
        />
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginWithCard}>
          <Image
            style={styles.facebookIcon}
            source={require('../images/facebook.png')}
          />
          <Text style={styles.smallText}>Login with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.googleSignIn}
          style={styles.loginWithCard}>
          <Image
            style={styles.facebookIcon}
            source={require('../images/GoogleImg.png')}
          />
          <Text style={styles.smallText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    marginBottom: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  loginBtn: {
    backgroundColor: '#037bfc',
    marginBottom: 16,
    padding: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 20,
  },
  loginWithCard: {
    marginBottom: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  facebookIcon: {
    height: 30,
    width: 30,
  },
  smallText: {
    fontSize: 18,
  },
});

export default Login;
