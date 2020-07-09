import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { CheckBox, Text, Card } from 'react-native-elements';
import styles from '../constants/Styles';
import Colors from '../constants/Colors';

export default class SecondScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async fetchData() {
    try {
      let response = await fetch('https://nubank-gamefy.herokuapp.com/loadquestions');
      let responseJson = await response.json();
      const questionsSize = await responseJson.response[0].length;
      for(var i = 0; i < questionsSize; i++) {
        this.setState({ [`checked${i}`]: 0 })
      }
      return responseJson.response[0];
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    this.setState({ data: await this.fetchData() });
  }

  async tryNextScreen() {
    let goNext = true;
    const dataSize = this.state.data.length;
    let questions = [];
    for(var i = 0; i < dataSize; i++) {
      if(await this.state[`checked${i}`] == 0) {
        goNext = false;
      }
      questions.push(this.state[`checked${i}`]);
    }
    if(goNext){
      this.props.navigation.navigate("ThirdScreen", {data: questions});
    }
  }

  render() {
    return (
      <View style={styles.background}>
        <Text style={secondStyles.whiteText}>Primeiro Selecione as opções mais adequadas pava você</Text>
        <Card containerStyle={styles.card}>
          <FlatList
            data={this.state.data}
            ItemSeparatorComponent={() => <View style={secondStyles.checkboxSeparator}></View>}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const itemPos = this.state.data.indexOf(item);
              return (
                <View>
                  <Text style={secondStyles.grayText}>{item}</Text>
                  <View style={secondStyles.checkboxView}>
                    <CheckBox
                      {...checkboxProps.checkboxYes}
                      checked={this.state[`checked${itemPos}`] == 1}
                      onPress={() => {
                        if (this.state[`checked${itemPos}`] == 1) {
                          this.setState({ [`checked${itemPos}`]: 0 })
                        } else {
                          this.setState({ [`checked${itemPos}`]: 1 })
                        }
                        this.tryNextScreen();
                      }} >
                    </CheckBox>
                    <CheckBox
                      {...checkboxProps.checkboxNo}
                      checked={this.state[`checked${itemPos}`] == 2}
                      onPress={() => {
                        if (this.state[`checked${itemPos}`] == 2) {
                          this.setState({ [`checked${itemPos}`]: 0 })
                        } else {
                          this.setState({ [`checked${itemPos}`]: 2 })
                        }
                        this.tryNextScreen();
                      }}>
                    </CheckBox>
                  </View>
                </View>
              );
            }}
          />
        </Card>
      </View >
    );
  }
}

const checkboxProps = {
  checkboxNo: {
    fontFamily: 'KommonGrotesk-sNormal',
    left: true,
    title: 'Não',
    iconType: 'material',
    checkedIcon: 'lens',
    uncheckedIcon: 'radio-button-unchecked',
    containerStyle: {
      backgroundColor: Colors.primaryWhite,
      borderColor: Colors.primaryWhite
    },
    checkedColor: Colors.secondaryPurple,
    uncheckedColor: Colors.secondaryGray
  },
  checkboxYes: {
    fontFamily: 'KommonGrotesk-Normal',
    left: true,
    title: 'Sim',
    iconType: 'material',
    checkedIcon: 'lens',
    uncheckedIcon: 'radio-button-unchecked',
    containerStyle: {
      backgroundColor: Colors.primaryWhite,
      borderColor: Colors.primaryWhite
    },
    checkedColor: Colors.secondaryPurple,
    uncheckedColor: Colors.secondaryGray,
  },
}

const secondStyles = StyleSheet.create({
  whiteText: {
    marginStart: 50,
    marginEnd: 70,
    marginTop: 100,
    fontSize: 24,
    color: Colors.primaryWhite,
    fontFamily: 'KommonGrotesk-Normal',
  },
  checkboxView: {
    flexDirection: 'row',
  },
  checkboxSeparator: {
    backgroundColor: Colors.secondaryGray,
    opacity: 0.5,
    height: 1
  },
  grayText: {
    marginStart: 10,
    marginEnd: 10,
    marginTop: 10,
    fontSize: 16,
    color: Colors.secondaryGray,
    fontFamily: 'KommonGrotesk-Normal',
  },
});