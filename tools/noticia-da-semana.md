# Notícia da semana: instruções da tarefa automática

Adicione uma notícia nova e real ao app de inglês **Hello, Mãe!** (nível B1, para uma brasileira que vai viajar sozinha como turista para a Holanda), gere os áudios e publique no GitHub.

Repositório local: `C:\Users\guipa\OneDrive\Área de Trabalho\hello-mae`
Site: https://guilherme-paiva1999.github.io/hello-mae/

## Passos

1. Entre na pasta do repositório e atualize: `git pull --ff-only`.
2. Leia o `news.js` para ver as notícias que já existem (não repita assuntos) e o formato.
   - Se já existir uma notícia com o `id` de hoje (AAAA-MM-DD), pare sem mudar nada.
3. Leia a lista `KEYWORDS` no `content.js`: são as expressões que ela aprende em cada etapa do curso (s1 = avião, s2 = imigração, s3 = bagagem, s4 = trem, s5 = hotel, s6 = emergências). O objetivo da notícia é ela **praticar o que acabou de aprender**.
4. Encontre **uma notícia real dos últimos 7 dias** sobre a Holanda, leve e útil para uma turista: cultura, viagem, transporte, turismo, comida, eventos, natureza, curiosidades, aniversários históricos, esporte.
   - **Evite:** política, crime, violência, guerras, desastres, mortes, doenças e qualquer assunto triste ou polêmico.
   - Fontes boas: dutchnews.nl, nltimes.nl, iamexpat.nl, nos.nl (inglês).
   - Abra a matéria e confira os fatos. Quando der, confirme os fatos principais numa segunda fonte.
   - Se não houver nada adequado na semana, use um tema da época (evento sazonal, data comemorativa) com fatos conferidos.
5. Escreva um texto **original** (não copie frases da fonte; nada de citações longas):
   - `title`: título em inglês, até 8 palavras.
   - `paras`: 3 ou 4 parágrafos em inglês B1, de 40 a 70 palavras cada, frases curtas. Explique palavras holandesas.
   - Use de forma **natural pelo menos 3 expressões da lista `KEYWORDS`** (o ideal são 4 ou 5), de etapas diferentes, escritas exatamente como na lista. Varie de uma semana para outra e prefira as das primeiras etapas (s1 a s3). Um jeito fácil: terminar com uma dica prática de viagem que use as expressões.
   - **Não** marque as expressões da lista com `[[ ]]`: o app as destaca sozinho em verde, quando ela já as aprendeu.
   - Marque de 2 a 5 **outras** palavras úteis com `[[palavra|tradução]]` (no máximo 2 por parágrafo).
   - Cada parágrafo tem `pt`: tradução natural em português do Brasil.
6. Escreva 3 perguntas de compreensão em português: `{t:'choice', q:'...', options:['certa','errada','errada']}`.
   A **primeira opção é a certa**; as erradas devem ser plausíveis. `why` (explicação curta) é opcional.
7. Coloque a notícia **no topo** de `window.HM_NEWS`, com:
   - `id`: a data de hoje, AAAA-MM-DD
   - `date`: a data por extenso em português, ex.: `14 de outubro de 2026`
   - `source`: nome do site da fonte, ex.: `DutchNews.nl`
   Mantenha no máximo 12 notícias (apague as mais antigas, no fim da lista).
8. Confira: `node tools/check-news.mjs`. Ele exige pelo menos 3 expressões da lista e mostra quais encontrou. Corrija até aparecer "news.js OK".
9. Gere os áudios: `node tools/build-audio.mjs` (se der erro de edge-tts, rode antes `pip install edge-tts`).
10. Publique:
   - `git add news.js audio sw.js`
   - `git commit` com a mensagem `Notícia da semana: <título>` e, na última linha, `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`
   - `git push`
11. Espere o site atualizar: confira (por até 3 minutos) se https://guilherme-paiva1999.github.io/hello-mae/news.js já contém o `id` novo.

## Regras

- Mexa só em `news.js`, `audio/` e `sw.js`. Não altere outros arquivos.
- Nunca coloque dados pessoais (nomes reais da família, telefone, e-mail) no repositório.
- Se algum passo falhar e você não conseguir resolver, não faça push de nada quebrado: explique o problema no relatório.

## Relatório final (em português)

Título da notícia, link da fonte, um resumo de uma linha, as expressões do curso praticadas e a confirmação de que foi publicada (ou o motivo de não ter sido).
