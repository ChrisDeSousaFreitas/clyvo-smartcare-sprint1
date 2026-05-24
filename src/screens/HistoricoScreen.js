import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoricoScreen() {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem('@clyvo_agendamentos');
        if (dadosSalvos) {
          setHistorico(JSON.parse(dadosSalvos));
        }
      } catch (e) {
        console.error('Erro ao buscar histórico', e);
      }
    };
    buscarDados();
  }, []);

  const renderTimelineItem = ({ item, index }) => (
    <View style={styles.timelineRow}>
      {/* Linha e Ponto Visual */}
      <View style={styles.timelineGraphic}>
        <View style={styles.dot} />
        {index !== historico.length - 1 && <View style={styles.line} />}
      </View>
      
      {/* Conteúdo do Card */}
      <View style={styles.card}>
        <Text style={styles.dataBadge}>{item.data} às {item.hora}</Text>
        <Text style={styles.eventoTitle}>{item.tipo} - {item.pet.nome}</Text>
        <Text style={styles.eventoDesc}>Procedimento registrado na base de dados com sucesso.</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Histórico Clínico</Text>
      <Text style={styles.subtitle}>Registro longitudinal dos seus pets</Text>

      {historico.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Nenhum registro encontrado.</Text>
          <Text style={styles.emptySub}>Faça um agendamento para iniciar a linha do tempo.</Text>
        </View>
      ) : (
        <FlatList
          data={historico}
          keyExtractor={item => item.id}
          renderItem={renderTimelineItem}
          contentContainerStyle={{ paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#F5F7FA' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1A2B4C', marginTop: 10 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  emptyBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#333', fontWeight: 'bold' },
  emptySub: { fontSize: 14, color: '#666', marginTop: 8, textAlign: 'center' },
  
  // Design da Timeline
  timelineRow: { flexDirection: 'row' },
  timelineGraphic: { alignItems: 'center', width: 30, marginRight: 15 },
  dot: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#FF6B6B', zIndex: 1 },
  line: { width: 2, flex: 1, backgroundColor: '#D3E0EA', marginTop: -7, marginBottom: -7 },
  
  card: { flex: 1, backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 20, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
  dataBadge: { alignSelf: 'flex-start', backgroundColor: '#F0F4FF', color: '#0055D8', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, fontSize: 12, fontWeight: 'bold', marginBottom: 8 },
  eventoTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A2B4C', marginBottom: 4 },
  eventoDesc: { fontSize: 13, color: '#666', lineHeight: 18 }
});