import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [nomeTutor, setNomeTutor] = useState('');
  
  // 1. Criamos as referências de animação (começam invisíveis e mais abaixo na tela)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const nomeSalvo = await AsyncStorage.getItem('@tutor_nome');
        if (!nomeSalvo) {
          navigation.replace('CadastroTutor');
        } else {
          setNomeTutor(nomeSalvo.split(' ')[0]);
        }
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      carregarDados();
      
      // 2. Dispara a animação toda vez que a Home ganha foco
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
      
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1, // Vai para opacidade 100%
          duration: 800, // Em 800 milissegundos
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0, // Sobe de 50px para 0px (posição original)
          duration: 800,
          useNativeDriver: true,
        })
      ]).start();
    });

    return unsubscribe;
  }, [navigation, fadeAnim, slideAnim]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* 3. Trocamos a View comum por uma Animated.View */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          
          <View style={styles.header}>
            <Text style={styles.greeting}>Olá, {nomeTutor}! 👋</Text>
            <Text style={styles.subtitle}>Cuidado Contínuo para seus pets</Text>
          </View>

          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>⚠️ Alerta Preventivo</Text>
            <Text style={styles.alertText}>Lembre-se de manter os protocolos de vacinação em dia.</Text>
          </View>

          <Text style={styles.sectionTitle}>Acesso Rápido</Text>
          <View style={styles.grid}>
            
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CadastroPet')}>
              <Text style={styles.cardIcon}>🐶</Text>
              <Text style={styles.cardText}>Meus Pets</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Historico')}>
              <Text style={styles.cardIcon}>📋</Text>
              <Text style={styles.cardText}>Histórico</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SmartCollar')}>
              <Text style={styles.cardIcon}>📡</Text>
              <Text style={styles.cardText}>Smart Collar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Agendamento')}>
              <Text style={styles.cardIcon}>📅</Text>
              <Text style={styles.cardText}>Agendar</Text>
            </TouchableOpacity>

          </View>
        </Animated.View>
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
  alertCard: { backgroundColor: '#FFE5E5', padding: 16, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#FF4D4D', marginBottom: 30 },
  alertTitle: { color: '#D80000', fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  alertText: { color: '#B20000', fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A2B4C', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { backgroundColor: '#FFF', width: '48%', paddingVertical: 24, paddingHorizontal: 16, borderRadius: 16, alignItems: 'center', marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 3 },
  cardIcon: { fontSize: 32, marginBottom: 12 },
  cardText: { fontSize: 14, fontWeight: '600', color: '#333', textAlign: 'center' }
});