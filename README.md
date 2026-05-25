# 🐾 Clyvo SmartCare

**FIAP - Challenge 1° e 2° Sprint (Mobile Development)**

O **Clyvo SmartCare** é um aplicativo mobile focado na gestão longitudinal de saúde e bem-estar de pets. Ele oferece desde o acompanhamento de prontuários clínicos até o monitoramento em tempo real de hardware inteligente (Smart Collar), com suporte a uma ampla variedade de espécies, incluindo animais exóticos.

---

## 👥 Integrantes da Equipe
**Turma:** ADS/2TDSPO

* **Bruno Andrade Zanatelli** - RM 563736
* **Christian de Sousa Freitas** - RM 566098
* **Matheus Enrico de Souza** - RM 562532
* **Pedro Pereira Biasolli da Fonseca** - RM 562521
* **Rodrigo Tiezzi** - RM 562975

---

## 📹 Apresentação e Pitch
Confira o vídeo completo de demonstração da nossa solução e a explicação do fluxo de desenvolvimento diretamente no YouTube:
▶️ **[Assistir ao Vídeo Pitch do Clyvo SmartCare](https://youtu.be/8wMluQitc-k)**

---

## 🚀 Funcionalidades e Missões Implementadas

O projeto foi construído de forma iterativa, dividindo as funcionalidades em 5 pilares principais:

### 1. Onboarding e Persistência de Dados (Tutor)
* **Conceito:** *State Management* e *Data Persistence*.
* Sistema de boas-vindas personalizado. O aplicativo captura e salva o nome do tutor localmente utilizando o `@react-native-async-storage/async-storage`, garantindo que o usuário não precise se identificar novamente ao reiniciar o app.

### 2. Multi-Perfis e Seletor Dinâmico de Espécies
* **Conceito:** Manipulação de *Arrays de Objetos JSON* e renderização performática com `FlatList`.
* O usuário pode cadastrar múltiplos pets. A interface conta com um seletor visual e intuitivo que suporta não apenas cães e gatos, mas espécies exóticas como Répteis e Aracnídeos.

### 3. Sistema de Agendamento Relacional
* **Conceito:** Relacionamento de Dados e *Input Masking* (Regex).
* O painel de agendamentos cruza os dados da lista de pets cadastrados, permitindo vincular uma consulta a um animal específico.
* **UX/UI:** O formulário conta com formatação automática via Expressões Regulares (Regex) para as datas (`DD/MM/AAAA`) e horas (`HH:MM`), impedindo erros de digitação e melhorando a experiência do usuário.

### 4. Simulação de Telemetria (Smart Collar) e Timeline
* **Conceito:** *Timers* (`setInterval`), *Mocking Dinâmico* e *Lifecycle Hooks* (`useEffect`).
* **Smart Collar:** O app simula a conexão com um hardware físico, gerando atualizações em tempo real (a cada 2,5 segundos) de Frequência Cardíaca (BPM), Status de Atividade e Coordenadas GPS contínuas em direção a rotas pré-definidas.
* **Histórico:** Os dados de agendamento são resgatados e exibidos em um formato de *Timeline* (linha do tempo visual), comum em softwares médicos.

### 5. Animações Nativas (Glow Up Visual)
* **Conceito:** *Animated API* e *Interpolation*.
* A tela inicial (`HomeScreen`) conta com transições fluidas. Ao montar a tela, os elementos utilizam o motor nativo do React para realizar efeitos de *Fade-In* e *Slide-Up*, entregando um aspecto comercial e premium ao aplicativo.

---

## 🛠️ Stack Tecnológica
* **React Native** (Framework principal)
* **Expo SDK 54** (Motor de build e desenvolvimento)
* **React Navigation Native Stack** (Roteamento entre telas)
* **AsyncStorage** (Banco de dados local/Offline-first)
* **Node.js & NPM** (Gerenciamento de pacotes)

---

## ⚔️ Jornada Técnica e Resolução de Problemas (Troubleshooting)

Durante o desenvolvimento deste Challenge, diversos desafios reais de engenharia de software e infraestrutura foram superados:

1. **Conflito de I/O com Nuvem (EPERM / Arquivos Corrompidos):** * *Problema:* O sincronizador do Windows estava bloqueando a leitura da pasta `node_modules`, gerando travamentos no Node.js (`ERR_MODULE_NOT_FOUND`).
   * *Solução:* Migração da arquitetura para um diretório raiz isolado, limpeza forçada do cache global do NPM (`npm cache clean --force`) e reinstalação limpa das dependências.
2. **Conflito de Build com Bibliotecas Estéticas:**
   * *Problema:* A biblioteca `expo-status-bar` apresentou incompatibilidade de importação em seu core interno.
   * *Solução:* Remoção cirúrgica da dependência via CLI e limpeza dos plugins no arquivo `app.json`, priorizando a compilação fluida do app.
3. **Bloqueio de Rede Local e Firewall (Hotspot 4.5G):**
   * *Problema:* Ao rotear a internet via dados móveis, o protocolo de segurança do roteador bloqueava a porta LAN do Expo, resultando no erro `java.io.IOException: Failed to download remote update`.
   * *Solução:* Implementação do **Modo Tunnel** via `@expo/ngrok` (`npx expo start --tunnel`), criando uma ponte na nuvem que permitiu a comunicação do celular com o servidor de desenvolvimento, ignorando bloqueios de NAT e Firewall.
4. **Alinhamento de SDKs:**
   * *Problema:* Incompatibilidade entre a versão do projeto e o cliente mobile.
   * *Solução:* Upgrade automatizado (`npx expo install --fix`) para o SDK 54, alinhando as dependências do React e React Native ao motor do dispositivo físico.

---

## 📱 Como Rodar o Projeto

Devido a possíveis firewalls de redes de faculdade ou conexões via Hotspot, recomenda-se iniciar o servidor em modo túnel:

1. Clone ou baixe este repositório.
2. Abra o terminal na pasta do projeto e instale as dependências:
   ```bash
   npm install