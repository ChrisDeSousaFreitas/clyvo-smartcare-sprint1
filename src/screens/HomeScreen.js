import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [nomeTutor, setNomeTutor] = useState('');

  // Verifica se o tutor já se cadastrou toda vez que a tela abre
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const nomeSalvo = await AsyncStorage.getItem('@tutor_nome');
        if (!nomeSalvo) {
          navigation.replace('CadastroTutor');
        } else {
          // Pega apenas o primeiro nome para deixar amigável
          setNomeTutor(nomeSalvo.split(' ')[0]);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do tutor", error);
      }
    };

    const unsubscribe = navigation.addListener('focus', carregarDados);
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Cabeçalho de Boas-vindas */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá, {nomeTutor}! 👋</Text>
          <Text style={styles.subtitle}>Cuidado Contínuo para seus pets</Text>
        </View>

        {/* Card de Alerta (Vindo da sua versão anterior, agora modernizado) */}
        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>⚠️ Alerta Preventivo</Text>
          <Text style={styles.alertText}>A dose de Vermífugo da Sky está atrasada em 3 dias.</Text>
        </View>

        {/* Grid de Menus */}
        <Text style={styles.sectionTitle}>Acesso Rápido</Text>
        <View style={styles.grid}>
          
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('CadastroPet')}
          >
            <Text style={styles.cardIcon}>🐶</Text>
            <Text style={styles.cardText}>Meus Pets</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('Historico')}
          >
            <Text style={styles.cardIcon}>📋</Text>
            <Text style={styles.cardText}>Histórico</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('SmartCollar')}
          >
            <Text style={styles.cardIcon}>📡</Text>
            <Text style={styles.cardText}>Smart Collar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('Agendamento')}
          >
            <Text style={styles.cardIcon}>📅</Text>
            <Text style={styles.cardText}>Agendar</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F7FA' },
  container: { padding: 20 },
  header: { marginBottom: 24, marginTop: 10 },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#1A2B4C' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 4 },
  alertCard: {
    backgroundColor: '#FFE5E5',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF4D4D',
    marginBottom: 30,
  },
  alertTitle: { color: '#D80000', fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  alertText: { color: '#B20000', fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A2B4C', marginBottom: 16 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFF',
    width: '48%',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  cardIcon: { fontSize: 32, marginBottom: 12 },
  cardText: { fontSize: 14, fontWeight: '600', color: '#333', textAlign: 'center' }
});