import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockDados = [
  { id: '1', data: '22/05/2026', evento: 'Vacina V10 (Reforço)', status: 'Concluído' },
  { id: '2', data: '10/02/2026', evento: 'Check-up Nutricional', status: 'Concluído' },
  { id: '3', data: '15/12/2025', evento: 'Vermifugação', status: 'Atrasado' },
];

export default function HistoricoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico Longitudinal</Text>
      <FlatList
        data={mockDados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.data}>{item.data}</Text>
            <Text style={styles.evento}>{item.evento}</Text>
            <Text style={[styles.status, item.status === 'Atrasado' ? {color: 'red'} : {color: 'green'}]}>
              {item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#1A2B4C' },
  card: { padding: 15, borderBottomWidth: 1, borderColor: '#EEE', marginBottom: 10 },
  data: { fontSize: 12, color: '#888' },
  evento: { fontSize: 16, fontWeight: 'bold', color: '#333', marginVertical: 4 },
  status: { fontSize: 14, fontWeight: 'bold' }
});