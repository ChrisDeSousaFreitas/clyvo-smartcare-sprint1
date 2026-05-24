import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Alert, ScrollView, SafeAreaView, FlatList 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroPetScreen() {
  const [pets, setPets] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  // Campos do formulário
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('Cachorro');
  const [raca, setRaca] = useState('');
  const [faseVida, setFaseVida] = useState('');

  const especiesDisponiveis = [
    { id: 'Cachorro', icone: '🐶' },
    { id: 'Gato', icone: '🐱' },
    { id: 'Ave', icone: '🦜' },
    { id: 'Réptil', icone: '🦎' },
    { id: 'Aracnídeo', icone: '🕷️' },
    { id: 'Roedor', icone: '🐇' }
  ];

  // Carrega os pets salvos ao abrir a tela
  useEffect(() => {
    carregarPets();
  }, []);

  const carregarPets = async () => {
    try {
      const petsSalvos = await AsyncStorage.getItem('@clyvo_pets');
      if (petsSalvos) {
        setPets(JSON.parse(petsSalvos));
      }
    } catch (e) {
      console.error("Erro ao carregar pets", e);
    }
  };

  const salvarPet = async () => {
    if (!nome.trim() || !raca.trim() || !faseVida.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos para cadastrar seu pet.');
      return;
    }

    const novoPet = {
      id: Date.now().toString(), // Cria um ID único baseado na data
      nome,
      especie,
      raca,
      faseVida
    };

    try {
      const novaLista = [...pets, novoPet];
      await AsyncStorage.setItem('@clyvo_pets', JSON.stringify(novaLista));
      setPets(novaLista);
      
      // Limpa o formulário e fecha a tela de adição
      setNome('');
      setRaca('');
      setFaseVida('');
      setEspecie('Cachorro');
      setIsAdding(false);
      
      Alert.alert('Sucesso', `${nome} entrou para a família Clyvo!`);
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar os dados.');
    }
  };

  const removerPet = async (idRemover) => {
    try {
      const listaAtualizada = pets.filter(pet => pet.id !== idRemover);
      await AsyncStorage.setItem('@clyvo_pets', JSON.stringify(listaAtualizada));
      setPets(listaAtualizada);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível remover o pet.');
    }
  };

  const renderPetCard = ({ item }) => {
    const iconePet = especiesDisponiveis.find(e => e.id === item.especie)?.icone || '🐾';
    return (
      <View style={styles.petCard}>
        <Text style={styles.petIcon}>{iconePet}</Text>
        <View style={styles.petInfo}>
          <Text style={styles.petName}>{item.nome}</Text>
          <Text style={styles.petDetails}>{item.raca} • {item.faseVida}</Text>
        </View>
        <TouchableOpacity onPress={() => removerPet(item.id)} style={styles.deleteBtn}>
          <Text style={styles.deleteBtnText}>X</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isAdding ? (
        <View style={styles.listContainer}>
          <Text style={styles.headerTitle}>Meus Pets</Text>
          
          {pets.length === 0 ? (
            <Text style={styles.emptyText}>Você ainda não cadastrou nenhum pet.</Text>
          ) : (
            <FlatList
              data={pets}
              keyExtractor={(item) => item.id}
              renderItem={renderPetCard}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}

          <TouchableOpacity style={styles.mainBtn} onPress={() => setIsAdding(true)}>
            <Text style={styles.mainBtnText}>+ Adicionar Novo Pet</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.formContainer}>
          <View style={styles.formHeader}>
            <TouchableOpacity onPress={() => setIsAdding(false)}>
              <Text style={styles.backBtn}>← Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Novo Integrante</Text>
          </View>

          <Text style={styles.label}>Qual a espécie?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.speciesScroll}>
            {especiesDisponiveis.map((esp) => (
              <TouchableOpacity 
                key={esp.id} 
                style={[styles.speciesBtn, especie === esp.id && styles.speciesBtnActive]}
                onPress={() => setEspecie(esp.id)}
              >
                <Text style={styles.speciesIcon}>{esp.icone}</Text>
                <Text style={[styles.speciesText, especie === esp.id && styles.speciesTextActive]}>
                  {esp.id}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome do Pet</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex: Thor" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Raça ou Variação</Text>
            <TextInput style={styles.input} value={raca} onChangeText={setRaca} placeholder="Ex: Tarântula Golias" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fase de Vida</Text>
            <TextInput style={styles.input} value={faseVida} onChangeText={setFaseVida} placeholder="Filhote, Adulto ou Sênior" />
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={salvarPet}>
            <Text style={styles.saveBtnText}>Salvar Perfil Seguro</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  listContainer: { flex: 1, padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1A2B4C', marginBottom: 20 },
  emptyText: { color: '#666', textAlign: 'center', marginTop: 50, fontSize: 16 },
  
  // Cards da Lista
  petCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  petIcon: { fontSize: 30, marginRight: 15 },
  petInfo: { flex: 1 },
  petName: { fontSize: 18, fontWeight: 'bold', color: '#1A2B4C' },
  petDetails: { fontSize: 14, color: '#666', marginTop: 4 },
  deleteBtn: { padding: 10 },
  deleteBtnText: { color: '#FF6B6B', fontWeight: 'bold', fontSize: 16 },

  mainBtn: {
    backgroundColor: '#1A2B4C',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  mainBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  formContainer: {
    padding: 20,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backBtn: {
    color: '#1A2B4C',
    fontSize: 16,
  },
  speciesScroll: {
    marginBottom: 20,
  },
  speciesBtn: {
    backgroundColor: '#E9EEF5',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  speciesBtnActive: {
    backgroundColor: '#1A2B4C',
  },
  speciesIcon: {
    fontSize: 20,
  },
  speciesText: {
    marginTop: 6,
    fontSize: 12,
    color: '#1A2B4C',
  },
  speciesTextActive: {
    color: '#FFF',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#1A2B4C',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E3E7EE',
  },
  saveBtn: {
    backgroundColor: '#1A2B4C',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});