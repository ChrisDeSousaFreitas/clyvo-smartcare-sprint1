import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Alert, ScrollView, SafeAreaView, FlatList 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AgendamentoScreen() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [pets, setPets] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  // Estados do Formulário
  const [petSelecionado, setPetSelecionado] = useState(null);
  const [tipo, setTipo] = useState('Vacina');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

  const tiposConsulta = [
    { id: 'Vacina', icone: '💉', cor: '#FFE5E5', texto: '#D80000' },
    { id: 'Check-up', icone: '🩺', cor: '#E5F0FF', texto: '#0055D8' },
    { id: 'Banho', icone: '🛁', cor: '#E5FFE5', texto: '#008000' },
    { id: 'Retorno', icone: '🔄', cor: '#FFF4E5', texto: '#D88000' }
  ];

  // Máscara para DD/MM/AAAA
  const formatarData = (texto) => {
    let num = texto.replace(/\D/g, ''); // Tira tudo que não for número
    if (num.length > 4) {
      num = num.replace(/^(\d{2})(\d{2})(\d+)/, '$1/$2/$3');
    } else if (num.length > 2) {
      num = num.replace(/^(\d{2})(\d+)/, '$1/$2');
    }
    setData(num.substring(0, 10)); // Trava em 10 caracteres no máximo
  };

  // Máscara para HH:MM
  const formatarHora = (texto) => {
    let num = texto.replace(/\D/g, '');
    if (num.length > 2) {
      num = num.replace(/^(\d{2})(\d+)/, '$1:$2');
    }
    setHora(num.substring(0, 5)); // Trava em 5 caracteres no máximo
  };

  // Disparado quando a tela abre
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const petsSalvos = await AsyncStorage.getItem('@clyvo_pets');
      const agendamentosSalvos = await AsyncStorage.getItem('@clyvo_agendamentos');
      
      if (petsSalvos) setPets(JSON.parse(petsSalvos));
      if (agendamentosSalvos) setAgendamentos(JSON.parse(agendamentosSalvos));
    } catch (e) {
      console.error("Erro ao carregar dados", e);
    }
  };

  const salvarAgendamento = async () => {
    if (!petSelecionado || !data.trim() || !hora.trim()) {
      Alert.alert('Atenção', 'Selecione um pet e preencha data e hora.');
      return;
    }

    const novoAgendamento = {
      id: Date.now().toString(),
      pet: petSelecionado,
      tipo,
      data,
      hora
    };

    try {
      // Cria a nova lista ordenando pela data de criação (mais recentes primeiro)
      const novaLista = [...agendamentos, novoAgendamento];
      await AsyncStorage.setItem('@clyvo_agendamentos', JSON.stringify(novaLista));
      setAgendamentos(novaLista);
      
      // Reseta o formulário
      setPetSelecionado(null);
      setTipo('Vacina');
      setData('');
      setHora('');
      setIsAdding(false);
      
      Alert.alert('Agendado!', 'O compromisso foi registrado no painel.');
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar agendamento.');
    }
  };

  const removerAgendamento = async (idRemover) => {
    try {
      const listaAtualizada = agendamentos.filter(ag => ag.id !== idRemover);
      await AsyncStorage.setItem('@clyvo_agendamentos', JSON.stringify(listaAtualizada));
      setAgendamentos(listaAtualizada);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível cancelar o agendamento.');
    }
  };

  const renderAgendamento = ({ item }) => {
    const infoTipo = tiposConsulta.find(t => t.id === item.tipo) || tiposConsulta[0];
    
    return (
      <View style={styles.card}>
        <View style={[styles.iconContainer, { backgroundColor: infoTipo.cor }]}>
          <Text style={styles.iconText}>{infoTipo.icone}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.petName}>{item.pet.nome}</Text>
          <Text style={[styles.typeText, { color: infoTipo.texto }]}>{item.tipo}</Text>
          <Text style={styles.dateTime}>📅 {item.data}  ⏰ {item.hora}</Text>
        </View>
        <TouchableOpacity onPress={() => removerAgendamento(item.id)} style={styles.cancelBtn}>
          <Text style={styles.cancelBtnText}>X</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isAdding ? (
        <View style={styles.listContainer}>
          <Text style={styles.headerTitle}>Próximos Compromissos</Text>
          
          {agendamentos.length === 0 ? (
            <Text style={styles.emptyText}>Sua agenda está livre! Nenhum compromisso marcado.</Text>
          ) : (
            <FlatList
              data={agendamentos}
              keyExtractor={(item) => item.id}
              renderItem={renderAgendamento}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}

          <TouchableOpacity style={styles.mainBtn} onPress={() => {
            if (pets.length === 0) {
              Alert.alert('Ops!', 'Você precisa cadastrar um pet primeiro antes de agendar algo.');
            } else {
              setIsAdding(true);
            }
          }}>
            <Text style={styles.mainBtnText}>+ Novo Agendamento</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.formContainer}>
          <View style={styles.formHeader}>
            <TouchableOpacity onPress={() => setIsAdding(false)}>
              <Text style={styles.backBtn}>← Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Marcar Consulta</Text>
          </View>

          <Text style={styles.label}>Para qual Pet?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {pets.map((p) => (
              <TouchableOpacity 
                key={p.id} 
                style={[styles.petSelectBtn, petSelecionado?.id === p.id && styles.petSelectBtnActive]}
                onPress={() => setPetSelecionado(p)}
              >
                <Text style={[styles.petSelectText, petSelecionado?.id === p.id && styles.petSelectTextActive]}>
                  {p.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.label}>Motivo do Agendamento</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {tiposConsulta.map((t) => (
              <TouchableOpacity 
                key={t.id} 
                style={[
                  styles.typeBtn, 
                  { backgroundColor: tipo === t.id ? t.cor : '#FFF', borderColor: tipo === t.id ? t.texto : '#E0E0E0' }
                ]}
                onPress={() => setTipo(t.id)}
              >
                <Text style={styles.typeBtnIcon}>{t.icone}</Text>
                <Text style={[styles.typeBtnText, { color: tipo === t.id ? t.texto : '#666' }]}>{t.id}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.row}>
            <View style={styles.inputGroupHalf}>
              <Text style={styles.label}>Data</Text>
              <TextInput 
                style={styles.input} 
                value={data} 
                onChangeText={formatarData} 
                placeholder="DD/MM/AAAA" 
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
            <View style={styles.inputGroupHalf}>
              <Text style={styles.label}>Hora</Text>
              <TextInput 
                style={styles.input} 
                value={hora} 
                onChangeText={formatarHora} 
                placeholder="HH:MM" 
                keyboardType="numeric"
                maxLength={5}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={salvarAgendamento}>
            <Text style={styles.saveBtnText}>Confirmar Agendamento</Text>
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
  
  // Dashboard Cards
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 26,
  },
  cardContent: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A2B4C',
    marginBottom: 4,
  },
  typeText: {
    fontSize: 16,
    marginBottom: 4,
  },
  dateTime: {
    color: '#666',
  },
  cancelBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#D80000',
    fontWeight: 'bold',
  },
  mainBtn: {
    backgroundColor: '#1A2B4C',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  mainBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
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
    color: '#0055D8',
    fontSize: 16,
  },
  label: {
    color: '#1A2B4C',
    marginBottom: 8,
    fontWeight: '600',
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  petSelectBtn: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 10,
    backgroundColor: '#FFF',
  },
  petSelectBtnActive: {
    borderColor: '#1A2B4C',
    backgroundColor: '#E5F0FF',
  },
  petSelectText: {
    color: '#1A2B4C',
    fontWeight: '500',
  },
  petSelectTextActive: {
    color: '#0055D8',
  },
  typeBtn: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeBtnIcon: {
    marginRight: 8,
    fontSize: 18,
  },
  typeBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroupHalf: {
    width: '48%',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  saveBtn: {
    backgroundColor: '#0055D8',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});