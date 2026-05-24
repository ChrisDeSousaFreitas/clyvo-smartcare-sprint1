import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroPetScreen() {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [faseVida, setFaseVida] = useState('');

  const salvarNoDispositivo = async () => {
    if (!nome) {
      Alert.alert('Atenção', 'O nome do pet é obrigatório.');
      return;
    }
    try {
      await AsyncStorage.setItem('@clyvo_nome', nome);
      await AsyncStorage.setItem('@clyvo_raca', raca);
      await AsyncStorage.setItem('@clyvo_fase', faseVida);
      Alert.alert('Sucesso', 'Dados sincronizados!');
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar dados.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instrucao}>Mantenha o perfil atualizado para protocolos precisos.</Text>
      
      <Text style={styles.label}>Nome do Pet:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex: Thor" />

      <Text style={styles.label}>Raça:</Text>
      <TextInput style={styles.input} value={raca} onChangeText={setRaca} placeholder="Ex: Bulldog" />

      <Text style={styles.label}>Fase de Vida:</Text>
      <TextInput style={styles.input} value={faseVida} onChangeText={setFaseVida} placeholder="Filhote, Adulto ou Sênior" />

      <View style={styles.previewBox}>
        <Text style={styles.previewTitle}>Pré-visualização do Perfil:</Text>
        <Text>Nome: {nome || 'Aguardando digitação...'}</Text>
        <Text>Raça: {raca}</Text>
        <Text>Fase: {faseVida}</Text>
      </View>

      <TouchableOpacity style={styles.btnSalvar} onPress={salvarNoDispositivo}>
        <Text style={styles.btnText}>Salvar Perfil Seguro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  instrucao: { fontSize: 14, color: '#666', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#1A2B4C', marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#D3D3D3', borderRadius: 8, padding: 12, marginTop: 5, fontSize: 16 },
  previewBox: { marginTop: 25, padding: 15, backgroundColor: '#F0F8FF', borderRadius: 8, borderWidth: 1, borderColor: '#B0C4DE' },
  previewTitle: { fontWeight: 'bold', color: '#1A2B4C', marginBottom: 8 },
  btnSalvar: { backgroundColor: '#1A2B4C', padding: 15, borderRadius: 8, marginTop: 30, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});