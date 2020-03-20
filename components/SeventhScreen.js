import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Text, Image, Icon, Button, ButtonGroup } from 'react-native-elements';
import styles from '../constants/Styles';
import Colors from '../constants/Colors';

export default class SeventhScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: props.route.params.data,
      modalPos: 0,
      selectedIndex: 0
    };
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }

  async fetchSafeBuy() {
    try {
      let url = 'https://nubank-gamefy.herokuapp.com/loadposts';
      let response = await fetch(url);
      let responseJson = await response.json();
      this.setState({ data: responseJson.response[0] });
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    this.fetchSafeBuy();
  }

  component1 = () => <Button
    icon={<Icon {...iconClockProps} />}
    title='1 minuto'
    type="clear"
    onPress={() => {
      this.fetchSafeBuy();
      this.updateIndex(0);
    }}
  />

  component2 = () => <Button
    icon={<Icon {...iconClockProps} />}
    title='5 minutos'
    type="clear"
    onPress={() => {
      this.fetchSafeBuy();
      this.updateIndex(1);
    }}
  />

  component3 = () => <Button
    icon={<Icon {...iconClockProps} />}
    title='10 minutos'
    type="clear"
    onPress={() => {
      this.fetchSafeBuy();
      this.updateIndex(2);
    }}
  />

  setList() {
    console.log(this.state.data)
    if (this.state.data != null) {
      return (
        <FlatList
          data={this.state.data}
          ItemSeparatorComponent={() => <View style={seventhStyles.checkboxSeparator}></View>}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View>
                <Text style={{ ...seventhStyles.grayText, fontSize: 20, marginStart: 30, marginEnd: 30, marginTop: 10, alignSelf: 'center' }}>{item.title}</Text>
              </View>
            );
          }}
        />);
    }
  }

  render() {
    const buttons = [{ element: this.component1 }, { element: this.component2 }, { element: this.component3 }]
    return (
      <View style={styles.background}>
        <View style={{ ...seventhStyles.modalView }}>
          <Button
            icon={<Icon {...iconProps} />}
            type="clear"
            containerStyle={{ alignSelf: 'baseline', flex: 0.20, }}
            onPress={() => this.props.navigation.goBack()}
          />

          <Text style={{ ...seventhStyles.purpleText, fontSize: 20, marginStart: 30, marginTop: 10, alignSelf: 'center' }}>Muito ocupado?</Text>
          <Text style={{ ...seventhStyles.purpleText, fontSize: 20, marginStart: 30, marginTop: 10, alignSelf: 'center' }}>Aprenda no seu ritmo.</Text>
          <Text style={{ ...seventhStyles.grayText, fontSize: 20, marginStart: 30, marginEnd: 30, marginTop: 10, alignSelf: 'center' }}>Separamos estes conteúdos de 1 a 10 minutos de tempo de leitura especialmente para você</Text>

          <ButtonGroup
            selectedIndex={this.state.selectedIndex}
            buttons={buttons}
            containerStyle={{ height: 100 }}
          />
          {this.setList()}

          <View style={{ justifyContent: 'flex-end', flex: 0.2, marginBottom: 30 }}>
            <View style={{ ...seventhStyles.separator }}></View>
            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => {
              this.props.navigation.goBack()
            }}>
              <Text style={seventhStyles.purpleText}>Concluir</Text>
              <View style={seventhStyles.buttonSeparator}></View>
            </TouchableOpacity>
          </View>
        </View>
      </View >
    );
  }
}


const checkboxProps = {
  fontFamily: 'KommonGrotesk-Normal',
  left: true,
  iconType: 'material',
  checkedIcon: 'lens',
  uncheckedIcon: 'radio-button-unchecked',
  containerStyle: {
    backgroundColor: Colors.primaryWhite,
    borderColor: Colors.primaryWhite
  },
  checkedColor: Colors.secondaryPurple,
  uncheckedColor: Colors.secondaryGray,

}

const iconProps = {
  name: 'close',
  type: 'material',
  size: 50,
  color: Colors.primaryPurple,
  containerStyle: { marginTop: 10, marginStart: 10 }
}

const iconClockProps = {
  name: 'clockcircleo',
  type: 'antdesign',
  size: 50,
  color: Colors.secondaryGray,
  containerStyle: { marginTop: 10, marginStart: 10 }
}

const iconQuestionsProps = {
  name: 'questioncircle',
  type: 'antdesign',
  size: 50,
  color: Colors.primaryPurple,
  containerStyle: { marginTop: 10, marginStart: 10 }
}

const iconPropsMinus = {
  name: 'minus-circle-outline',
  type: 'material-community',
  size: 50,
  color: Colors.secondaryGray,
  containerStyle: { marginTop: 10, marginStart: 10 }
}

const iconPropsPlus = {
  name: 'add-circle-outline',
  type: 'material',
  size: 50,
  color: Colors.secondaryGray,
  containerStyle: { marginTop: 10, marginStart: 10 }
}

const seventhStyles = StyleSheet.create({
  whiteText: {
    marginStart: 5,
    marginEnd: 70,
    fontSize: 40,
    color: Colors.primaryWhite,
    fontFamily: 'KommonGrotesk-Normal',
  },
  blackText: {
    marginStart: 5,
    fontFamily: 'KommonGrotesk-Normal',
  },
  redText: {
    marginStart: 5,
    color: Colors.terciaryRed,
    fontFamily: 'KommonGrotesk-Bold',
  },
  grayText: {
    marginStart: 5,
    color: Colors.secondaryGray,
    fontFamily: 'KommonGrotesk-Normal',
  },
  modalView: {
    marginTop: 100,
    backgroundColor: Colors.primaryWhite,
    flex: 1
  },
  separator: {
    backgroundColor: Colors.secondaryGray,
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 15,
    opacity: 0.5,
    height: 1
  },
  purpleText: {
    marginStart: 10,
    marginEnd: 10,
    marginTop: 10,
    fontSize: 16,
    color: Colors.primaryPurple,
    fontFamily: 'KommonGrotesk-Bold',
  },
  checkboxView: {
    flexDirection: 'row',
  },
  buttonSeparator: {
    backgroundColor: Colors.secondaryGray,
    marginTop: 15,
    opacity: 0.5,
    height: 3
  },
});