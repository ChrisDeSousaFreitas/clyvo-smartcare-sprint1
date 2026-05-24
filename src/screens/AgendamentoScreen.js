import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function AgendamentoScreen() {
  const simularAgendamento = () => {
    Alert.alert("Sucesso", "Agendamento registrado na clínica!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamento Inteligente</Text>
      <TouchableOpacity style={[styles.btn, styles.btnDestaque]} onPress={simularAgendamento}>
        <Text style={styles.btnTextDestaque}>💉 Reforço de Vacina V10</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1A2B4C', marginBottom: 20 },
  btn: { padding: 18, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#D3D3D3' },
  btnDestaque: { borderColor: '#B22222', backgroundColor: '#FFF5F5' },
  btnTextDestaque: { fontSize: 16, color: '#B22222', fontWeight: 'bold' }
});