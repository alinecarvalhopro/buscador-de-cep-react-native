import React, {useState} from 'react';

import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import api from './services/api';

const App = () => {
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUf] = useState('');

  const buscarCep = async () => {
    if (cep == '') {
      Alert.alert('Cep inválido!');
      setCep('');
    }

    try {
      const response = await api.get(`/${cep}/json/`);
      setLogradouro(response.data.logradouro);
      setBairro(response.data.bairro);
      setLocalidade(response.data.localidade);
      setUf(response.data.uf);
    } catch (error) {
      console.log(error);
    }
  };

  const limparBusca = () => {
    setCep('');
    setLogradouro('');
    setBairro('');
    setLocalidade('');
    setUf('');
  };

  return (
    <SafeAreaView style={styles.containerPrincipal}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Buscador de Cep</Text>
      </View>
      <Image
        style={{width: 135, height: 135, margin: 10, alignSelf: 'center'}}
        source={require('./assets/img/local.png')}
      />
      <View style={styles.containerBusca}>
        <TextInput
          style={{
            width: 200,
            paddingLeft: 20,
            borderWidth: 2,
            borderRadius: 5,
            borderColor: '#09021a',
            fontSize: 18,
          }}
          value={cep}
          onChangeText={texto => setCep(texto)}
          placeholder="Cep"
        />
        <TouchableOpacity style={styles.botaoBusca} onPress={buscarCep}>
          <Text style={styles.textoBotaoBusca}>Buscar</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.caixaTexto}
        value={logradouro}
        onChangeText={texto => setLogradouro(texto)}
        placeholder="Logradouro"
      />
      <TextInput
        style={styles.caixaTexto}
        value={bairro}
        onChangeText={texto => setBairro(texto)}
        placeholder="Bairro"
      />
      <TextInput
        value={localidade}
        style={styles.caixaTexto}
        onChangeText={texto => setLocalidade(texto)}
        placeholder="Cidade"
      />
      <TextInput
        style={{
          width: 100,
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
        onChangeText={texto => setUf(texto)}
        placeholder="UF"
      />
      <TouchableOpacity style={styles.botaoLimpar} onPress={limparBusca}>
        <Text style={styles.textoBotaoBusca}>Limpar a busca</Text>
      </TouchableOpacity>
      <Text
        style={{
          color: '#D21A5C',
          fontSize: 10,
          textAlign: 'center',
          marginTop: 20,
        }}>
        by Amie Aline
      </Text>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    flexDirection: 'column',
  },
  topBar: {
    height: 70,
    backgroundColor: '#00BFA6',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    margin: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  containerBusca: {
    height: 70,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botaoBusca: {
    width: 135,
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#00BFA6',

    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotaoBusca: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  caixaTexto: {
    height: 55,
    marginTop: 10,
    marginHorizontal: 20,
    padding: 15,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#09021a',
    fontSize: 18,
  },
  botaoLimpar: {
    height: 55,
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#D21A5C',

    justifyContent: 'center',
    alignItems: 'center',
  },
});
