# Apply Manager

Aplicativo para gerenciamento de candidaturas a vagas de emprego, pensado para ajudar candidatos a organizar o processo de busca por oportunidades de forma centralizada e prática.

## Visão geral

O Apply Manager permite registrar cada candidatura, acompanhar o status atual, guardar links e detalhes importantes e manter um histórico organizado do processo seletivo. Em vez de espalhar informações em planilhas, mensagens e e-mails, o usuário consegue centralizar tudo em um único lugar.

A aplicação foi pensada para quem está buscando emprego e precisa acompanhar:

- vagas em que aplicou;
- plataformas usadas para candidatura;
- status da aplicação;
- empresa e cargo;
- links e observações;
- histórico de movimentação ao longo do processo.

## Objetivo do projeto

O projeto tem como foco facilitar a rotina de quem está em processo seletivo, dando visibilidade ao ciclo completo da candidatura e reduzindo a perda de informações. A ideia é transformar a busca por emprego em uma gestão simples, organizada e fácil de consultar.

## Funcionalidades

- autenticação de usuários via OAuth com provedores como Google e LinkedIn;
- cadastro e login do usuário;
- criação de registros de candidaturas;
- atualização do status e detalhes da vaga;
- consulta de todas as candidaturas do usuário;
- organização por dados como cargo, empresa, plataforma e data;
- armazenamento de observações e links relevantes;
- estrutura preparada para evoluir com dashboard, filtros e indicadores de desempenho.

## Arquitetura

O projeto está dividido em duas partes principais:

- Backend em FastAPI: responsável pela API, autenticação, regras de negócio e persistência de dados.
- Frontend em React + TypeScript + Vite: responsável pela interface web do usuário.

A comunicação entre as camadas acontece por meio da API REST do backend, com autenticação baseada em tokens.

## Stack tecnológica

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite (configuração local)
- OAuth 2.0

### Frontend
- React
- TypeScript
- Vite
- React Router

## Estrutura principal

- backend/: API e lógica de negócio
- frontend/: interface do usuário
- README.md: apresentação geral do projeto

## Perfil do projeto

O Apply Manager é um projeto de acompanhamento pessoal de candidaturas, com foco em produtividade e organização do processo seletivo. Ele combina controle de dados, autenticação e uma interface simples para ajudar o usuário a manter o acompanhamento de oportunidades de forma clara e eficiente.
