import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, Avatar, Icon, Button } from 'react-native-elements';
import styles from '../constants/Styles';
import Colors from '../constants/Colors';

export default class ThirdScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: props.route.params.data,
      modalNotActive: true
    };
  }

  async fetchData() {
    try {
      let url = 'https://nubank-gamefy.herokuapp.com/persona?';
      for (var i = 0; i < this.state.questions.length; i++) {
        url += `q${i}=${this.state.questions[i] - 1}`;
        if (i < this.state.questions.length - 1) {
          url += '&';
        }
      }
      let response = await fetch(url);
      let responseJson = await response.json();
      return responseJson.response[0];
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    this.setState({ data: await this.fetchData() });
  }

  setRenderComponents() {
    if (this.state.modalNotActive) {
      return (
        <View style={{ flex: 1 }}>
          <Text style={thirdStyles.whiteText}>A partir das suas respostas, entendemos e selecionamos perfis de outros brasileiros como você</Text>
          <Card containerStyle={{...styles.card}}>
            <FlatList
              data={this.state.data}
              ItemSeparatorComponent={() => <View style={thirdStyles.personSeparator}></View>}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => {
                    this.setState({ personSelected: item });
                    this.setState({ modalNotActive: false });
                  }}>
                    <View style={thirdStyles.personView}>
                      <Avatar rounded source={{ uri: item.photo }} size="medium"></Avatar>
                      <Text style={thirdStyles.grayText}>{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </Card>
        </View>);
    } else {
      return (
        <View style={thirdStyles.modalView}>
          <View style={{ flexDirection: 'row' }}>
            <Button
              icon={<Icon {...iconProps} />}
              type="clear"
              onPress={() => this.setState({ modalNotActive: true })}
            />
            <View style={thirdStyles.textViewStyle}>
              <Text style={{ ...thirdStyles.grayText, marginStart: -60 }}>Escolha de perfil</Text>
            </View>
          </View>
          <View style={thirdStyles.personNamePhoto}>
            <Avatar rounded source={{ uri: this.state.personSelected.photo }} size="large"></Avatar>
            <Text style={{ ...thirdStyles.grayText, marginTop: 25 }}>{this.state.personSelected.title}</Text>
          </View>
          <Text style={{ ...thirdStyles.grayText, marginEnd: 50, marginStart: 50 }}>{this.state.personSelected.description}</Text>
          <Text style={{ ...thirdStyles.grayText, marginEnd: 50, marginStart: 50 }}>Saldo disponível</Text>
          <Text style={{ ...thirdStyles.purpleText, marginEnd: 50, marginStart: 50 }}>R$ {this.state.personSelected.payment},00</Text>
          <Text style={{ ...thirdStyles.grayText, marginEnd: 50, marginStart: 50 }}>Fatura fechada</Text>
          <Text style={{ ...thirdStyles.purpleText, marginEnd: 50, marginStart: 50 }}>R$ {this.state.personSelected.bill},00</Text>
          <View style={{ justifyContent: 'flex-end', flex: 1, marginBottom: 30 }}>
            <View style={thirdStyles.personSeparator}></View>
            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => this.props.navigation.navigate("FourthScreen", { data: this.state.personSelected })}>
              <Text style={thirdStyles.purpleText}>Continuar</Text>
              <View style={thirdStyles.buttonSeparator}></View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  render() {

    return (
      <View style={styles.background}>
        {this.setRenderComponents()}
      </View >
    );
  }
}

const iconProps = {
  name: 'close',
  type: 'material',
  size: 50,
  color: Colors.secondaryGray,
  containerStyle: { marginTop: 10, marginStart: 10 }
}

const thirdStyles = StyleSheet.create({
  whiteText: {
    marginStart: 50,
    marginEnd: 70,
    marginTop: 100,
    fontSize: 24,
    color: Colors.primaryWhite,
    fontFamily: 'KommonGrotesk-Normal',
  },
  personNamePhoto: {
    flexDirection: 'row',
    marginEnd: 50,
    marginStart: 50,
    marginBottom: 20,
    marginTop: 20
  },
  textViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    marginTop: 100,
    backgroundColor: Colors.primaryWhite,
    flex: 1
  },
  personSeparator: {
    backgroundColor: Colors.secondaryGray,
    marginTop: 15,
    marginBottom: 15,
    opacity: 0.5,
    height: 1
  },
  buttonSeparator: {
    backgroundColor: Colors.secondaryGray,
    marginTop: 15,
    opacity: 0.5,
    height: 3
  },
  personView: {
    flexDirection: 'row',
    height: 50
  },
  grayText: {
    marginStart: 10,
    marginEnd: 10,
    marginTop: 10,
    fontSize: 16,
    color: Colors.secondaryGray,
    fontFamily: 'KommonGrotesk-Normal',
  },
  purpleText: {
    marginStart: 10,
    marginEnd: 10,
    marginTop: 10,
    fontSize: 16,
    color: Colors.primaryPurple,
    fontFamily: 'KommonGrotesk-Bold',
  },
});