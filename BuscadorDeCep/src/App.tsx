import React, {useState} from 'react';

import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import Api from './services/api';

export default function App() {
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUf] = useState('');

  async function buscarCep() {
    console.log("passou")
    if (cep == '') {
      Alert.alert('Cep inválido!');
      setCep('');
    }

    try {
      const response = await Api.get(`/${cep}/json/`);
      setLogradouro(response.data.logradouro);
      setBairro(response.data.bairro);
      setLocalidade(response.data.localidade);
      setUf(response.data.uf);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.containerPrincipal}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Buscador de Cep</Text>
      </View>
      <Image
        style={{width: 150, height: 150, margin: 10, alignSelf: 'center'}}
        source={require('./assets/img/local.png')}
      />
      <View style={styles.containerBusca}>
        <TextInput
          style={{
            width: 200,
            marginTop: 20,
            marginEnd: 20,
            paddingLeft: 20,
            borderWidth: 2,
            borderRadius: 5,
            borderColor: '#09021a',
            fontSize: 18,
          }}
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          placeholder="Cep"
        />
        <TouchableOpacity style={styles.botaoBusca} onPress={buscarCep}>
          <Text style={styles.textoBotaoBusca}>Buscar</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.caixaTexto}
        value={logradouro}
        onChangeText={(texto) => setLogradouro(texto)}
        placeholder="Logradouro"
      />
      <TextInput
        style={styles.caixaTexto}
        value={bairro}
        onChangeText={(texto) => setBairro(texto)}
        placeholder="Bairro"
      />
      <TextInput
        value={localidade}
        style={styles.caixaTexto}
        onChangeText={(texto) => setLocalidade(texto)}
        placeholder="Cidade"
      />
      <TextInput
        style={{
          width: 80,
          marginTop: 10,
          marginHorizontal: 20,
          marginEnd: 20,
          paddingLeft: 20,
          borderWidth: 2,
          borderRadius: 5,
          borderColor: '#09021a',
          fontSize: 18,
        }}
        value={uf}
        onChangeText={(texto) => setUf(texto)}
        placeholder="UF"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    flexDirection: 'column',
  },
  topBar: {
    height: 70,
    backgroundColor: '#00BFA6',
    flexDirection: 'row',
  },
  title: {
    margin: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  containerBusca: {
    height: 100,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  botaoBusca: {
    width: 120,
    height: 70,
    marginTop: 30,
    marginEnd: 20,
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#00BFA6',
  },
  textoBotaoBusca: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  caixaTexto: {
    marginTop: 10,
    marginHorizontal: 20,
    padding: 15,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#09021a',
    fontSize: 18,
  },
});
