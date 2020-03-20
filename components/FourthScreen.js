import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import styles from '../constants/Styles';
import Colors from '../constants/Colors';

export default class FourthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: props.route.params.data,
    };
  }

  componentDidMount() {
    setTimeout(() => { this.props.navigation.navigate("FifthScreen", { data: this.state.person }) }, 2000);
  }

  render() {
    return (
      <View style={styles.background}>
        <Avatar rounded source={{ uri: this.state.person.photo }} size="xlarge" containerStyle={{ alignSelf:'center', marginTop:150}}></Avatar>
        <Text style={fourthStyles.whiteText}>A partir de agora você viverá nossa experiencia como</Text>
        <Text style={fourthStyles.whiteBoldText}>{this.state.person.name}</Text>
      </View>
    );
  }
}

const fourthStyles = StyleSheet.create({
  whiteText: {
    textAlign:'center',
    marginStart: 60,
    marginEnd: 60,
    marginTop: 20,
    fontSize: 24,
    color: Colors.primaryWhite,
    fontFamily: 'KommonGrotesk-Normal',
  },
  whiteBoldText: {
    textAlign:'center',
    marginStart: 60,
    marginEnd: 60,
    fontSize: 24,
    color: Colors.primaryWhite,
    fontFamily: 'KommonGrotesk-Bold',
  },
});