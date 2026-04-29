@'
# AGENTS.md

## Contexto do Projeto

Este repositório é a API de Inteligência Artificial do projeto **Chatbot Institucional Informativo e Formativo**.

O projeto completo é dividido em 3 repositórios:

1. **Front-end**
   - Interface web do sistema.
   - Possui tela de login com matrícula e senha.
   - Possui tela de chat.
   - Envia as mensagens do usuário para a API Controller.

2. **API Controller**
   - Recebe matrícula e senha.
   - Valida o aluno no banco de dados.
   - Busca informações acadêmicas do aluno.
   - Mantém essas informações em cache.
   - Recebe perguntas vindas do front-end.
   - Junta a pergunta do aluno com os dados acadêmicos em cache.
   - Envia tudo para esta API de IA.

3. **API da IA**
   - Este repositório.
   - Recebe a pergunta do aluno e o contexto acadêmico enviado pela API Controller.
   - Monta um prompt institucional.
   - Envia a requisição para o Gemini.
   - Retorna uma resposta clara, objetiva e contextualizada para o aluno.

---

## Objetivo deste Repositório

Criar uma API em Node.js com TypeScript responsável por integrar o sistema com o Gemini.

A API deve responder dúvidas acadêmicas dos alunos com base nas informações fornecidas pela API Controller.

A IA não deve ser treinada do zero.

A abordagem correta para este projeto é:

- usar o modelo Gemini já pronto;
- criar um system prompt institucional;
- contextualizar a IA com os dados acadêmicos enviados na requisição;
- impedir que a IA invente informações;
- orientar o aluno a procurar secretaria, coordenação ou professor quando os dados forem insuficientes.

---

## Stack Tecnológica

Utilizar:

- Node.js
- TypeScript
- Express
- Zod
- dotenv
- cors
- helmet
- morgan
- @google/genai

---

## Variáveis de Ambiente

O projeto deve usar um arquivo `.env` com as seguintes variáveis:

```env
PORT=3333
GEMINI_API_KEY=sua_chave_real_aqui
GEMINI_MODEL=gemini-3-flash-preview
NODE_ENV=development