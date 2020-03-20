import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Image, Icon, Card, Badge, Button } from 'react-native-elements';
import styles from '../constants/Styles';
import Colors from '../constants/Colors';

export default class FifthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: props.route.params.data,
      modalNotActive: true
    };
  }

  setRenderComponents() {
    if (this.state.modalNotActive) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: 100, flexDirection: 'row', justifyContent: 'center' }}>
            <Image
              source={require('../assets/images/NubankLogo.png')}
              style={{ width: 80, height: 60, }}
              containerStyle={{ marginStart: 50 }}
            />
            <Text style={fifthStyles.whiteText}>{this.state.person.name}</Text>
          </View>
          <FlatList
            data={[
              <Card containerStyle={{ ...styles.card, width: 290, marginBottom: 0 }}>
                <Icon {...iconFirstProps}></Icon>
                <Text style={{ ...fifthStyles.redText, fontSize: 20 }}>FATURA FECHADA</Text>
                <Text style={{ ...fifthStyles.redText, fontSize: 30 }}>R${this.state.person.bill},00</Text>
                <Text style={{ ...fifthStyles.grayText, fontSize: 16 }}>Vencimento 27 MAR</Text>
              </Card>,
              <Card containerStyle={{ ...styles.card, width: 290, marginBottom: 0 }}>
                <Icon {...iconSecondProps}></Icon>
                <Text style={{ ...fifthStyles.blackText, fontSize: 30 }}>R${this.state.person.payment},00</Text>
                <Text style={{ ...fifthStyles.grayText, fontSize: 16 }}>Você já ganhou R$ 1,80 neste mês</Text>
              </Card>
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToOffsets={[0, 400]}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => item}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 50, marginTop: 10 }}>
            <Badge status="success" containerStyle={{ marginEnd: 5 }} badgeStyle={{ backgroundColor: Colors.secondaryGray, borderColor: Colors.secondaryGray }} />
            <Badge status="success" badgeStyle={{ backgroundColor: Colors.secondaryGray, borderColor: Colors.secondaryGray }} />
          </View>
          <Button
            containerStyle={{ alignSelf: 'center', marginBottom: 30 }}
            buttonStyle={{ backgroundColor: Colors.secondaryPurple, height: 100 }}
            onPress={() => this.setState({ modalNotActive: false })}
            title="Estudar compra"
          />
        </View >);
    } else {
      return (
        <View style={fifthStyles.modalView}>
          <Button
            icon={<Icon {...iconProps} />}
            type="clear"
            containerStyle={{ alignSelf: 'baseline' }}
            onPress={() => this.setState({ modalNotActive: true })}
          />
          <Text style={{...fifthStyles.grayText, fontSize: 30, marginStart: 30, marginEnd: 30, marginTop: 10}}>Qual tipo de informação você procura?</Text>
          <TouchableOpacity style={{ marginStart: 30, marginTop: 50 }} onPress={() => this.props.navigation.navigate("SixthScreen", { data: this.state.person })}>
            <Text style={fifthStyles.purpleText}>Analisar compra</Text>
          </TouchableOpacity>
          <View style={fifthStyles.separator}></View>
          <TouchableOpacity style={{ marginStart: 30 }} onPress={() => this.props.navigation.navigate("SeventhScreen", { data: this.state.person })}>
            <Text style={fifthStyles.purpleText}>Conteúdo de leitura rápida</Text>
          </TouchableOpacity>
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

const iconFirstProps = {
  name: 'credit-card',
  type: 'material',
  size: 30,
  color: Colors.secondaryGray,
  containerStyle: { marginTop: 10, marginStart: 10, alignSelf: 'baseline', marginBottom: 30 }
}

const iconSecondProps = {
  name: 'usd',
  type: 'font-awesome',
  size: 30,
  color: Colors.secondaryGray,
  containerStyle: { marginTop: 10, marginStart: 10, alignSelf: 'baseline', marginBottom: 30 }
}

const fifthStyles = StyleSheet.create({
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
});