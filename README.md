# Hello, Mãe!

App de inglês (nível B1) feito para a minha mãe se preparar para a viagem à Holanda: situações reais, imigração, histórias e jogos, com áudio de voz neural e explicações em português. Feito para o celular.

**Abrir o app:** https://guilherme-paiva1999.github.io/hello-mae/
**Área do administrador:** https://guilherme-paiva1999.github.io/hello-mae/#admin

## O que tem

- **Sua viagem (6 etapas):** No avião → Imigração em Schiphol → Bagagem e alfândega → Trem até Amsterdam → Hotel → Ajuda e emergências
- **Situações reais:** conversas em que ela escolhe a resposta e recebe retorno (ótima, funciona ou problema)
- **Histórias:** "Helena em Amsterdam", em capítulos, com tradução ao tocar nas palavras destacadas
- **Jogos:** Simulador de imigração, Ditado, Caça ao erro e Contra o tempo
- **Revisão inteligente** das frases das etapas concluídas
- **Lista da viagem:** checklist de documentos
- **Avatar animado:** pensativa durante a pergunta, feliz no acerto, triste no erro
- **Falar com o Gui:** abre o WhatsApp com a animação do telefone
- **Comentários:** ao fim de cada etapa, história e jogo, e pelo botão 💬 em qualquer exercício

## Instalar como app

O Hello, Mãe! é um app instalável (PWA): ganha ícone na tela inicial, abre em tela cheia e **funciona sem internet** (as lições, os 205 áudios e as animações ficam guardados no celular, cerca de 6 MB).

- **Android:** abra o link no Google Chrome. Aparece o cartão "Instalar o app no celular" na tela inicial do app; toque em **Instalar agora**. (Ou: três pontinhos → Instalar app.)
- **iPhone:** abra o link no **Safari** → botão Compartilhar → **Adicionar à Tela de Início**.

Depois de instalar, entre pelo ícone e configure o WhatsApp em **Área do Gui** (no rodapé da tela inicial). No iPhone, o app instalado tem uma memória separada do Safari, então configure por dentro do app.

Atualizações: basta fazer push. O app baixa a versão nova em segundo plano e mostra na próxima vez que for aberto. Se mudar a lista de arquivos fixos do `sw.js`, aumente o `VERSION` dele.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | O app |
| `content.js` | Todo o conteúdo: etapas, conversas, histórias, jogos, checklist |
| `config.js` | Número do WhatsApp e endereço da planilha de comentários |
| `audio/` | Um MP3 por frase, com voz neural |
| `img/` | Avatares animados (WebP) e versões paradas (PNG) |
| `manifest.webmanifest`, `sw.js`, `icons/` | O que transforma o site em app instalável e offline |
| `tools/build-audio.mjs` | Gera os MP3 que faltam e apaga os que não são mais usados |
| `tools/feedback-apps-script.gs` | Script da planilha que recebe os comentários |

## Configurar o WhatsApp

O número **não** fica no repositório. No celular dela, abra o app com `#admin` no fim do endereço e salve o número em "WhatsApp do Gui". Ele fica guardado só naquele aparelho.

## Configurar a planilha de comentários (uns 5 minutos)

1. Crie uma planilha nova no Google Sheets (por exemplo, "Comentários Hello Mãe").
2. Menu **Extensões → Apps Script**. Apague o que estiver lá e cole o conteúdo de `tools/feedback-apps-script.gs`. Salve.
3. No Apps Script, vá em **Configurações do projeto** (engrenagem) → **Propriedades do script** → **Adicionar propriedade**:
   nome `ADMIN_KEY`, valor = a senha que você vai usar na área de admin.
4. Clique em **Implantar → Nova implantação** → tipo **App da Web**:
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
5. Autorize o acesso quando o Google pedir e copie o endereço que termina em `/exec`.
6. Cole esse endereço em `feedbackUrl`, no `config.js`, e faça commit e push.

Pronto: os comentários dela aparecem na planilha e em `#admin` (com a sua senha). Se ela estiver sem internet, o comentário fica guardado no celular e é enviado depois.

## Áudio

As frases são geradas com as vozes neurais da Microsoft (via [edge-tts](https://github.com/rany2/edge-tts)): **Ava** para a voz dela e do narrador, **Andrew** para oficiais e atendentes. O botão "Devagar" toca o mesmo arquivo a 70% da velocidade. Se faltar algum arquivo, o app usa a voz do aparelho.

## Mudar o conteúdo

1. Edite o `content.js` (as leituras de cada etapa ficam no bloco `READINGS`)
2. Gere os áudios:
   ```bash
   pip install edge-tts
   node tools/build-audio.mjs
   ```
3. Faça commit e push. O site atualiza sozinho em cerca de um minuto.
