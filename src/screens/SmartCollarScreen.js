import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function SmartCollarScreen() {
  const [bpm, setBpm] = useState(85);

  useEffect(() => {
    const interval = setInterval(() => {
      setBpm(Math.floor(Math.random() * (100 - 80 + 1) + 80));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.connectionBox}>
        <ActivityIndicator size="small" color="#4CAF50" />
        <Text style={styles.connectionText}>Hardware Conectado</Text>
      </View>
      <View style={styles.metricCard}>
        <Text style={styles.icon}>❤️</Text>
        <Text style={styles.metricTitle}>Frequência Cardíaca</Text>
        <Text style={styles.metricValue}>{bpm} BPM</Text>
      </View>
      <View style={styles.gpsBox}>
        <Text style={styles.gpsTitle}>📍 Localização GPS</Text>
        <Text style={styles.gpsText}>Lat: -23.6938, Long: -46.5650</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F4F6F9' },
  connectionBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', padding: 10, borderRadius: 8, marginBottom: 20 },
  connectionText: { color: '#2E7D32', fontWeight: 'bold', marginLeft: 10 },
  metricCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 15, elevation: 1 },
  icon: { fontSize: 32, marginBottom: 5 },
  metricTitle: { color: '#666', fontSize: 14 },
  metricValue: { fontSize: 28, fontWeight: 'bold', color: '#1A2B4C', marginVertical: 5 },
  gpsBox: { backgroundColor: '#1A2B4C', padding: 20, borderRadius: 12, marginTop: 10 },
  gpsTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  gpsText: { color: '#D3D3D3', fontFamily: 'monospace' }
});