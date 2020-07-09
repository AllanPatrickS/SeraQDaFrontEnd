import React, { Component } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import styles from '../constants/Styles';
import Colors from '../constants/Colors';

export default class FirstScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: 'Começaremos nossa experiência em breve.',
            fadeWelcome: new Animated.Value(0),
            fadeText: new Animated.Value(0),
        };
    }

    fadeInView() {
        this.state.fadeWelcome.setValue(0);
        Animated.timing(
            this.state.fadeWelcome,
            {
                toValue: 1,
                duration: 2000,
            }
        ).start();
    }

    fadeIn() {
        this.state.fadeText.setValue(0);
        Animated.timing(
            this.state.fadeText,
            {
                toValue: 1,
                duration: 2000,
            }
        ).start();
    }

    fadeOut() {
        this.state.fadeText.setValue(1)
        Animated.timing(
            this.state.fadeText,
            {
                toValue: 0,
                duration: 2000,
            }
        ).start(() => {
            this.setState({ text: "Gostaríamos que tivessem a oportunidade de conhecer um pouquinho da vida dos brasileiros que usarão este serviço." });
            this.fadeIn()
        });
    }

    componentDidMount() {
        this.fadeInView();
        this.fadeIn();
        setTimeout(() => {
            this.fadeOut();
        }, 3000);
        setTimeout(() => { this.props.navigation.navigate("SecondScreen") }, 9000);
    }

    render() {
        return (
            <View style={styles.background}>
                <Animated.Image style={ { opacity: this.state.fadeWelcome, ...firstStyles.image,}} source={require('../assets/images/NubankLogo.png')} />
                <Animated.Text style={ { opacity: this.state.fadeWelcome, ...firstStyles.welcome,}}>Bem vindo,</Animated.Text>
                <Animated.Text style={ { opacity: this.state.fadeText, ...firstStyles.text,}}>{this.state.text}</Animated.Text>
            </View>
        );
    }
}

const firstStyles = StyleSheet.create({
    image: {
        marginStart: 50,
        marginTop: 100
    },
    welcome: {
        marginStart: 50,
        marginEnd: 50,
        marginTop: 20,
        fontSize: 30,
        color: Colors.primaryWhite,
        fontFamily: 'KommonGrotesk-ExtraBold',
    },
    text: {
        marginStart: 50,
        marginEnd: 50,
        marginTop: 20,
        fontSize: 24,
        color: Colors.primaryWhite,
        fontFamily: 'KommonGrotesk-Normal',
    }
});