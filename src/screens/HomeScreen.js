import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [petData, setPetData] = useState({ nome: '', fase: '' });

  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        try {
          const nomeSalvo = await AsyncStorage.getItem('@clyvo_nome');
          const faseSalva = await AsyncStorage.getItem('@clyvo_fase');
          if (nomeSalvo) {
            setPetData({ nome: nomeSalvo, fase: faseSalva || 'Adulto' });
          }
        } catch (e) {
          console.error("Erro ao carregar do AsyncStorage", e);
        }
      };
      carregarDados();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {petData.nome ? `Cuidado Contínuo para ${petData.nome}` : 'Bem-vindo à Clyvo'}
      </Text>
      
      <View style={styles.alertBox}>
        <Text style={styles.alertTitle}>⚠️ Alerta Preventivo</Text>
        <Text style={styles.alertDesc}>A dose de Vermífugo está atrasada em 3 dias.</Text>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CadastroPet')}>
          <Text style={styles.cardTitle}>🐶 Perfil e Fase de Vida</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Historico')}>
          <Text style={styles.cardTitle}>📋 Histórico Clínico</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SmartCollar')}>
          <Text style={styles.cardTitle}>📡 Smart Collar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Agendamento')}>
          <Text style={styles.cardTitle}>📅 Agendar Retorno</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F4F6F9', justifyContent: 'center' },
  headerText: { fontSize: 22, fontWeight: 'bold', color: '#1A2B4C', marginBottom: 20, textAlign: 'center' },
  alertBox: { backgroundColor: '#FFE4E1', padding: 15, borderRadius: 10, marginBottom: 20, borderLeftWidth: 5, borderLeftColor: '#FF6347' },
  alertTitle: { fontWeight: 'bold', color: '#B22222', fontSize: 16 },
  alertDesc: { color: '#B22222', marginTop: 5 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { backgroundColor: '#FFF', width: '48%', padding: 20, borderRadius: 12, marginBottom: 15, elevation: 2, alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#1A2B4C', textAlign: 'center' }
});