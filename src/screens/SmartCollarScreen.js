import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SmartCollarScreen() {
  const [petNome, setPetNome] = useState('Buscando Pet...');
  const [bpm, setBpm] = useState(85);
  const [status, setStatus] = useState('Explorando');
  const [gps, setGps] = useState({ lat: -23.6938, lng: -46.5650 }); // Coordenadas iniciais
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    // 1. Busca o pet no banco de dados
    const carregarPet = async () => {
      const petsSalvos = await AsyncStorage.getItem('@clyvo_pets');
      if (petsSalvos) {
        const petsArray = JSON.parse(petsSalvos);
        if (petsArray.length > 0) setPetNome(petsArray[0].nome);
      } else {
        setPetNome('Nenhum pet pareado');
      }
    };
    carregarPet();

    // 2. Simula a telemetria do hardware
    const telemetria = setInterval(() => {
      // Variação de batimentos
      setBpm(prev => prev + (Math.random() > 0.5 ? 2 : -2));
      
      // Simulação de rota em direção à Fazenda Boa Vista, SP
      setGps(prev => ({
        lat: prev.lat + 0.0001,
        lng: prev.lng - 0.0002
      }));

      // Alterna o status aleatoriamente
      const statusPossiveis = ['Explorando', 'Correndo', 'Descansando'];
      if (Math.random() > 0.8) {
        setStatus(statusPossiveis[Math.floor(Math.random() * statusPossiveis.length)]);
      }

      // Pisca a luz de gravação
      setIsBlinking(prev => !prev);
    }, 2500);

    return () => clearInterval(telemetria);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statusBadge}>
          <ActivityIndicator size="small" color="#4CAF50" />
          <Text style={styles.statusText}>Sinal Estável</Text>
        </View>
        <Text style={styles.petName}>Coleira de {petNome}</Text>
      </View>

      <View style={styles.radarCard}>
        <View style={styles.radarHeader}>
          <Text style={styles.radarTitle}>Rastreamento em Tempo Real</Text>
          <View style={[styles.recDot, { opacity: isBlinking ? 1 : 0.2 }]} />
        </View>
        <Text style={styles.gpsCoord}>Lat: {gps.lat.toFixed(4)}</Text>
        <Text style={styles.gpsCoord}>Lon: {gps.lng.toFixed(4)}</Text>
        <Text style={styles.gpsLocation}>📍 Rota: Fazenda Boa Vista, SP</Text>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricBox}>
          <Text style={styles.icon}>❤️</Text>
          <Text style={styles.metricValue}>{bpm}</Text>
          <Text style={styles.metricLabel}>BPM</Text>
        </View>
        
        <View style={styles.metricBox}>
          <Text style={styles.icon}>⚡</Text>
          <Text style={styles.metricValue}>{status}</Text>
          <Text style={styles.metricLabel}>Status</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusText: {
    marginLeft: 8,
    color: '#4CAF50',
    fontWeight: '600',
  },
  petName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212121',
  },
  radarCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  radarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  radarTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
  },
  recDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E53935',
  },
  gpsCoord: {
    color: '#616161',
    fontSize: 14,
  },
  gpsLocation: {
    marginTop: 10,
    color: '#424242',
    fontSize: 14,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212121',
  },
  metricLabel: {
    marginTop: 6,
    color: '#757575',
    fontSize: 13,
    fontWeight: '600',
  },
});