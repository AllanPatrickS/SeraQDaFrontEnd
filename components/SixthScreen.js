import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Icon, CheckBox, Button, Input, Slider, Image } from 'react-native-elements';
import styles from '../constants/Styles';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export default class SixthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: props.route.params.data,
      modalPos: 0,
      checkbox: 0,
      type: '',
      value: 0,
      parcel: 0
    };
  }

  async fetchData() {
    try {
      let response = await fetch('https://nubank-gamefy.herokuapp.com/loadcategories');
      let responseJson = await response.json();
      return responseJson.response[0];
    } catch (error) {
      console.error(error);
    }
  }

  async fetchSafeBuy() {
    try {
      let url = 'https://nubank-gamefy.herokuapp.com/safebuy?';
      url += `persona_id=${this.state.person.id}&category_id=${this.state.checkbox}&product_price=${this.state.value}`;
      let response = await fetch(url);
      let responseJson = await response.json();
      this.setSliderValue(responseJson.response[0].evaluation.evaluation);
      return responseJson.response[0].evaluation.evaluation;
    } catch (error) {
      console.error(error);
    }
  }

  setParcels() {
    if (this.state.parcel == 0) {
      return this.state.value
    }
    return (this.state.value / this.state.parcel).toFixed(2);
  }

  setSliderValue(risk) {
    switch (risk) {
      case ('GE'):
        this.setState({ risk: 0 });
        this.setState({ possible: 'Sim' });
        break;
      case ('GM'):
        this.setState({ risk: 12.5 });
        this.setState({ possible: 'Sim' });
        break;
      case ('GB'):
        this.setState({ risk: 25 });
        this.setState({ possible: 'Talvez sim' });
        break;
      case ('YB'):
        this.setState({ risk: 35 });
        this.setState({ possible: 'Talvez sim' });
        break;
      case ('YM'):
        this.setState({ risk: 50 });
        this.setState({ possible: 'Talvez' });
        break;
      case ('YE'):
        this.setState({ risk: 65 });
        this.setState({ possible: 'Talvez não' });
        break;
      case ('RB'):
        this.setState({ risk: 76 });
        this.setState({ possible: 'Não' });
        break;
      case ('RM'):
        this.setState({ risk: 88.5 });
        this.setState({ possible: 'Não' });
        break;
      case ('RE'):
        this.setState({ risk: 100 });
        this.setState({ possible: 'Não' });
        break;
    }
  }

  async componentDidMount() {
    this.setState({ data: await this.fetchData() });
  }

  setRenderComponents() {
    if (this.state.modalPos == 0) {
      return (
        <View style={sixthStyles.modalView}>
          <Button
            icon={<Icon {...iconProps} />}
            type="clear"
            containerStyle={{ alignSelf: 'baseline' }}
            onPress={() => this.props.navigation.goBack()}
          />
          <Text style={{ ...sixthStyles.grayText, fontSize: 30, marginStart: 30, marginEnd: 30, marginTop: 10 }}>Qual è o tipo compra?</Text>
          <FlatList
            data={this.state.data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <View>
                  <View style={sixthStyles.checkboxView}>
                    <CheckBox
                      {...checkboxProps}
                      title={<Text style={{ ...sixthStyles.grayText, fontSize: 20 }}>{item.name}</Text>}
                      checked={this.state.checkbox == item.id}
                      onPress={() => {
                        this.setState({ checkbox: item.id });
                        this.setState({ type: item.name });
                      }} >
                    </CheckBox>
                  </View>
                </View>
              );
            }}
          />
          <View style={{ justifyContent: 'flex-end', marginBottom: 30 }}>
            <View style={{ ...sixthStyles.separator }}></View>
            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => {
              if (this.state.checkbox != 0) {
                this.setState({ modalPos: 1 });
              }
            }}>
              <Text style={sixthStyles.purpleText}>Continuar</Text>
              <View style={sixthStyles.buttonSeparator}></View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (this.state.modalPos == 1) {
      return (
        <View style={sixthStyles.modalView}>
          <Button
            icon={<Icon {...iconProps} />}
            type="clear"
            containerStyle={{ alignSelf: 'baseline' }}
            onPress={() => this.props.navigation.goBack()}
          />
          <Text style={{ ...sixthStyles.grayText, fontSize: 20, marginStart: 30, marginEnd: 30, marginTop: 10 }}>Escolha o valor</Text>
          <View style={{ marginHorizontal: 30 }}>
            <Input
              keyboardType='numeric'
              onChangeText={(text) => this.setState({ value: text.split(" ")[1] })}
              value={`R$ ${this.state.value}`}
              inputStyle={{ fontFamily: 'KommonGrotesk-Normal', color: Colors.primaryPurple }}
              labelStyle={{ fontFamily: 'KommonGrotesk-Normal', color: Colors.primaryPurple }}
            />
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
              <View>
                <Text style={{ ...sixthStyles.grayText, fontSize: 20, marginStart: 30, marginEnd: 30, marginTop: 10 }}>{this.state.parcel} parcelas</Text>
                <Text style={{ ...sixthStyles.grayText, fontSize: 20, marginStart: 30, marginEnd: 30, marginTop: 10 }}>de R$ {this.setParcels()}</Text>
              </View>
              <Button
                icon={<Icon {...iconPropsMinus} />}
                type="clear"
                containerStyle={{ alignSelf: 'baseline' }}
                onPress={() => {
                  if (this.state.parcel != 0) {
                    this.setState({ parcel: this.state.parcel - 1 })
                  }
                }}
              />
              <Button
                icon={<Icon {...iconPropsPlus} />}
                type="clear"
                containerStyle={{ alignSelf: 'baseline' }}
                onPress={() => this.setState({ parcel: this.state.parcel + 1 })}
              />
            </View>
            <View style={{ ...sixthStyles.separator }}></View>
          </View>
          <View style={{ justifyContent: 'flex-end', flex: 1, marginBottom: 30 }}>
            <View style={{ ...sixthStyles.separator }}></View>
            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => {
              if (this.state.value != 0) {
                this.fetchSafeBuy();
                this.setState({ modalPos: 2 });
              }
            }}>
              <Text style={sixthStyles.purpleText}>Analisar</Text>
              <View style={sixthStyles.buttonSeparator}></View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (this.state.modalPos == 2) {
      return (
        <View style={{ ...sixthStyles.modalView }}>
          <Button
            icon={<Icon {...iconProps} />}
            type="clear"
            containerStyle={{ alignSelf: 'baseline', flex: 0.20, }}
            onPress={() => this.props.navigation.goBack()}
          />
          <ScrollView style={{ flex: 1, alignSelf: 'auto' }}>

            <View style={{ justifyContent: 'center', flexDirection: 'row', }}>
              <Text style={{ ...sixthStyles.purpleText, fontSize: 20, marginStart: 30, marginTop: 10, alignSelf: 'center' }}>Será que dá?</Text>
              <Button
                icon={<Icon {...iconQuestionsProps} />}
                type="clear"
                containerStyle={{ alignSelf: 'baseline', }}
                onPress={() => this.setState({ modalPos: 3 })}
              />
            </View>


            <Text style={{ ...sixthStyles.grayText, fontSize: 20, marginStart: 30, marginEnd: 30, marginTop: 10, alignSelf: 'center' }}>{this.state.type} por R${this.state.value}</Text>
            <Text style={{ ...sixthStyles.grayText, fontSize: 20, marginStart: 30, marginEnd: 30, marginTop: 10, alignSelf: 'center' }}>{this.state.parcel} parcelas de R$ {this.setParcels()}</Text>

            <View style={{ justifyContent: 'center', marginStart: 20 }}>
              <Text style={{ ...sixthStyles.purpleText, fontSize: 20, marginStart: 30, marginEnd: 30, marginTop: 10, marginBottom: 10, alignSelf: 'center' }}>{this.state.possible}</Text>
              <Image source={require('../assets/images/slice.png')} style={{ width: Layout.window.width - 40, height: 10 }} />
              <Slider
                value={this.state.risk}
                disabled
                maximumValue={100}
                style={{ marginTop: -25, marginHorizontal: 20 }}
                thumbStyle={{ backgroundColor: Colors.primaryWhite, borderColor: Colors.primaryPurple, borderWidth: 3 }}
                trackStyle={{ opacity: 0 }}
              />
              <Text style={{ ...sixthStyles.grayText, fontSize: 16, marginStart: 30, marginEnd: 30, marginTop: 10, alignSelf: 'center' }}>Saldo disponível R${this.state.person.payment}</Text>
              <Text style={{ ...sixthStyles.grayText, fontSize: 20, marginStart: 30, marginEnd: 30, marginTop: 10, alignSelf: 'center' }}>Dica: Para conseguir um SIM seria preciso diminuir seus gastos mensais</Text>
              <Button
                type="outline"
                title="Refazer conta"
                titleStyle={{ ...sixthStyles.purpleText, marginStart: 0, marginEnd: 0, marginTop: 0, }}
                containerStyle={{ alignSelf: 'center' }}
                onPress={() => this.setState({ modalPos: 0 })}
              />
              <View style={{ ...sixthStyles.separator }}></View>
            </View>

            <Text style={{ ...sixthStyles.grayText, fontSize: 18, marginStart: 30, marginEnd: 30, marginTop: 10, alignSelf: 'center' }}>Que tal ver o seu dinheiro render?</Text>
            <Text style={{ ...sixthStyles.grayText, fontSize: 16, marginStart: 30, marginEnd: 30, marginTop: 10, alignSelf: 'center' }}>Separamos conteúdos rápidos baseados no seu histórico</Text>
            <Button
              type="outline"
              title="Refazer conta"
              titleStyle={{ ...sixthStyles.purpleText, marginStart: 0, marginEnd: 0, marginTop: 0, }}
              containerStyle={{ alignSelf: 'baseline', marginStart: 20 }}
              onPress={() => this.props.navigation.navigate("SeventhScreen")}
            />
          </ScrollView>
          <View style={{ justifyContent: 'flex-end', flex: 0.2, marginBottom: 30 }}>
            <View style={{ ...sixthStyles.separator }}></View>
            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => {
              this.props.navigation.goBack()
            }}>
              <Text style={sixthStyles.purpleText}>Concluir</Text>
              <View style={sixthStyles.buttonSeparator}></View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (this.state.modalPos == 3) {
      return (
        <View style={{ ...sixthStyles.modalView }}>
          <Button
            icon={<Icon {...iconProps} />}
            type="clear"
            containerStyle={{ alignSelf: 'baseline', flex: 0.20, }}
            onPress={() => this.setState({ modalPos: 2 })}
          />
          <ScrollView style={{ flex: 1, alignSelf: 'auto' }}>

            <Text style={{ ...sixthStyles.grayText, fontSize: 20, marginStart: 30, marginEnd: 30, marginTop: 10, alignSelf: 'center' }}>Será que dá?</Text>


            <Text style={{ ...sixthStyles.grayText, fontSize: 20, marginStart: 30, marginEnd: 30, marginTop: 10, alignSelf: 'center' }}>chegou para te dizer sim ou não</Text>
            <Text style={{ ...sixthStyles.grayText, fontSize: 20, marginStart: 30, marginEnd: 30, marginTop: 10, alignSelf: 'center' }}>"será que dá" é um sistema que estuda o risco de dívida ao comprar, te dando a oportunidade de descobrir se é o momento certo para fazer aquela comprinha extra.</Text>
            <Text style={{ ...sixthStyles.grayText, fontSize: 20, marginStart: 30, marginEnd: 30, marginTop: 10, alignSelf: 'center' }}>Vamos entender como funciona?</Text>
            <Text style={{ ...sixthStyles.grayText, fontSize: 20, marginStart: 30, marginEnd: 30, marginTop: 10, alignSelf: 'center' }}>Vermelho: Não é o momento certo para fazer esse gasto. Risco alto de dívida.</Text>
            <Image source={require('../assets/images/RedBar.png')} style={{ width: Layout.window.width - 40, height: 10 }} />
            <View style={{ ...sixthStyles.separator }}></View>
            <Text style={{ ...sixthStyles.grayText, fontSize: 20, marginStart: 30, marginEnd: 30, marginTop: 10, alignSelf: 'center' }}>Amarelo: No nível intermediário temos duas divisões: "Talvez Sim" e "Talvez Não".</Text>
            <Text style={{ ...sixthStyles.grayText, fontSize: 20, marginStart: 30, marginEnd: 30, marginTop: 10, alignSelf: 'center' }}>Talvez Sim: Risco médio-baixo da compra. A compra pode ser feita com monitoramento mensal. Talvez Não: Risco médio-alto da compra. Aconselhável esperar.</Text>
            <Image source={require('../assets/images/YellowBar.png')} style={{ width: Layout.window.width - 40, height: 10 }} />
            <View style={{ ...sixthStyles.separator }}></View>
            <Text style={{ ...sixthStyles.grayText, fontSize: 20, marginStart: 30, marginEnd: 30, marginTop: 10, alignSelf: 'center' }}>Verde: É o momento certo para fazer esse gasto. Baixo alto de dívida.</Text>
            <Image source={require('../assets/images/GreenBar.png')} style={{ width: Layout.window.width - 40, height: 10 }} />
            
          </ScrollView>
          <View style={{ justifyContent: 'flex-end', flex: 0.2, marginBottom: 30 }}>
            <View style={{ ...sixthStyles.separator }}></View>
            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => {
              this.props.navigation.goBack()
            }}>
              <Text style={sixthStyles.purpleText}>Concluir</Text>
              <View style={sixthStyles.buttonSeparator}></View>
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

const sixthStyles = StyleSheet.create({
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