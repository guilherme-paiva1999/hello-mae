# Hello, Mãe!

Um app de inglês feito para a minha mãe: lições curtas, explicadas em português, com áudio em tudo, pensadas para o celular e para quem tem dificuldade com tecnologia.

**Abrir o app:** https://guilherme-paiva1999.github.io/hello-mae/

## O que tem

- **3 lições completas:** Cumprimentos, Por favor e obrigado, Muito prazer
- **Palavras novas** com áudio normal e devagar, além da pronúncia escrita "do nosso jeito" (ex.: *Hello → rê-LÔU*)
- **Exercícios:** múltipla escolha, ouvir e escolher, completar frase, montar frase, ligar pares e falar em voz alta
- **Conversas curtas** no estilo WhatsApp: toque numa palavra para ver a tradução
- **Revisão inteligente:** as palavras voltam em 1, 2, 4, 8... dias, e as que ela erra voltam antes
- **Sequência de dias e estrelas** para motivar

O progresso fica salvo no próprio navegador do celular.

## Como funciona

Site estático, sem instalação e sem servidor (roda no GitHub Pages).

| Arquivo | O que é |
|---|---|
| `index.html` | O app: telas, exercícios, revisão |
| `content.js` | O conteúdo do curso: lições, palavras, textos, dicionário |
| `audio/` | Um MP3 por frase, gravado com voz neural |
| `tools/build-audio.mjs` | Gera os MP3 que estiverem faltando |

### Áudio

As frases são geradas com as vozes neurais da Microsoft (via [edge-tts](https://github.com/rany2/edge-tts)): **Ava** para a voz principal e **Andrew** para os personagens masculinos. O botão "Devagar" toca o mesmo arquivo a 70% da velocidade, sem distorcer a voz. Se faltar algum arquivo, o app usa a voz do próprio aparelho.

### Adicionar uma lição

1. Adicione a lição em `LESSONS`, no `content.js`
2. Gere os áudios novos:
   ```bash
   pip install edge-tts
   node tools/build-audio.mjs
   ```
   Para gerar também as frases com o nome dela: `NOME=Maria node tools/build-audio.mjs`
3. Faça commit e push. O site atualiza sozinho.
