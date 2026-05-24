import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroTutorScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const salvarTutor = async () => {
    if (!nome.trim()) {
      Alert.alert('Ops!', 'Por favor, digite seu nome para continuarmos.');
      return;
    }
    try {
      // Aqui a mágica da persistência acontece! Salvamos os dados localmente.
      await AsyncStorage.setItem('@tutor_nome', nome);
      await AsyncStorage.setItem('@tutor_telefone', telefone);
      
      // O 'replace' joga o usuário pra Home e apaga o histórico, 
      // impedindo que ele volte pra tela de cadastro sem querer.
      navigation.replace('Home'); 
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar os seus dados.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao Clyvo Care!</Text>
        <Text style={styles.subtitle}>Para começar, como podemos te chamar?</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Seu Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: João Silva"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Telefone (Opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="(11) 99999-9999"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={salvarTutor}>
          <Text style={styles.buttonText}>Começar a Jornada</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1A2B4C', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 32 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: { 
    backgroundColor: '#FFF', 
    borderWidth: 1, 
    borderColor: '#E0E0E0', 
    borderRadius: 12, 
    padding: 16, 
    fontSize: 16 
  },
  button: { 
    backgroundColor: '#FF6B6B', 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 12,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});