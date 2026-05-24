# Clyvo SmartCare - Challenge FIAP 2026

## Sobre o Projeto
[cite_start]O Clyvo SmartCare é um protótipo funcional de aplicativo móvel desenvolvido para o Challenge FIAP 2026 da Clyvo Vet[cite: 141, 142]. [cite_start]O objetivo principal da solução é atuar como o sistema operacional do relacionamento contínuo entre clínica, responsável e pet[cite: 250]. [cite_start]O aplicativo visa resolver a descontinuidade do cuidado preventivo (como atrasos em vacinas e vermífugos) e aumentar o Lifetime Value (LTV) na clínica por meio de um histórico unificado e acompanhamento de bem-estar[cite: 220, 229].

## Tecnologias Utilizadas
* React Native
* Expo (SDK 56)
* React Navigation (Stack Navigation)
* AsyncStorage (Armazenamento local persistente)

## Funcionalidades Implementadas e Requisitos Atendidos
O projeto foi estruturado para cumprir rigorosamente os requisitos da sprint da disciplina de Mobile Application Development:

* Navegacao entre telas: Implementação de 5 rotas principais utilizando o React Navigation, garantindo um fluxo coerente.
* Home (Dashboard): Tela inicial com alertas preventivos simulados e carregamento dinâmico de dados salvos localmente.
* Cadastro de Pet (Estado e AsyncStorage): Formulário que utiliza `useState` para visualização em tempo real dos dados inseridos. Os dados são salvos no dispositivo via `AsyncStorage`. Ao fechar e reiniciar o aplicativo, a Home recupera e exibe o nome do pet cadastrado, demonstrando a persistência de dados.
* Historico Longitudinal: Interface que centraliza eventos preventivos e consultas (dados mockados), evidenciando o cuidado contínuo.
* [cite_start]Smart Collar: Simulação de integração com a coleira inteligente, exibindo variação de batimentos cardíacos em tempo real, estado comportamental e localização GPS[cite: 65, 66, 67, 68].
* Agendamento Preventivo: Tela de recomendação de retornos e serviços focada em recorrência e adesão terapêutica.

## Integrantes da Equipe
* [cite_start]Bruno Andrade Zanatelli - RM 563736 [cite: 8]
* [cite_start]Christian de Sousa Freitas - RM 566098 [cite: 8]
* [cite_start]Matheus Enrico de Souza - RM 562532 [cite: 8]
* [cite_start]Pedro Pereira Biasolli da Fonseca - RM 562521 [cite: 8]
* [cite_start]Rodrigo Tiezzi - RM 562975 [cite: 9]
* [cite_start]Turma: ADS/2TDSPO [cite: 10]

## Como Executar o Projeto

1. Certifique-se de ter o Node.js e o Git instalados em sua máquina.
2. Clone este repositório.
3. Abra o terminal na raiz do projeto e instale as dependências executando:
   npm install
4. Inicie o servidor de desenvolvimento do Expo executando:
   npx expo start
5. Escaneie o código QR gerado no terminal utilizando o aplicativo Expo Go no seu dispositivo físico (Android ou iOS) ou utilize um emulador configurado em sua máquina.