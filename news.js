/* Notícia da semana do Hello, Mãe!
   A mais nova fica no TOPO da lista. Atualizado toda semana pela tarefa automática
   (veja tools/noticia-da-semana.md). Mantenha no máximo 12 notícias.

   Formato de cada notícia:
   - id: data no formato AAAA-MM-DD (única)
   - date: data por extenso em português
   - title: título em inglês
   - source: nome do site de onde veio a informação
   - paras: 3 ou 4 parágrafos {en, pt}; palavras com tradução ao tocar: [[palavra|tradução]]
   - questions: 2 ou 3 perguntas {t:'choice', q, options} (a primeira opção é a certa) */
window.HM_NEWS = [
  {
    id:'2026-10-07', date:'7 de outubro de 2026', title:'Dutch television turns 75', source:'DutchNews.nl',
    paras:[
      {en:"On 2 October 1951, the Netherlands had its first television [[broadcast|transmissão]]. It came live from a small studio in the town of Bussum and lasted about ninety minutes. The programme was a play, and the Dutch Royal Family watched it at home in their palace.", pt:'Em 2 de outubro de 1951, a Holanda teve sua primeira transmissão de televisão. Ela foi ao vivo, de um pequeno estúdio na cidade de Bussum, e durou cerca de noventa minutos. O programa era uma peça de teatro, e a Família Real holandesa assistiu em casa, no palácio.'},
      {en:"Very few people could see it, because there were only about 500 TV sets in the whole country. A television was very [[expensive|caro]]: it cost about a third of what a normal worker earned in a year. Most families listened to the radio instead.", pt:'Pouquíssimas pessoas conseguiram assistir, porque havia só uns 500 televisores no país inteiro. Uma televisão era muito cara: custava cerca de um terço do que um trabalhador comum ganhava num ano. A maioria das famílias ouvia rádio.'},
      {en:"But things changed fast. Only five years later, there were already 75,000 TV sets, and television slowly became the most popular [[entertainment|entretenimento]] in Dutch homes, especially in the 1960s, 70s and 80s.", pt:'Mas as coisas mudaram rápido. Só cinco anos depois, já havia 75 mil televisores, e a televisão aos poucos se tornou o entretenimento mais popular nas casas holandesas, principalmente nos anos 1960, 70 e 80.'},
      {en:"Today, many people watch films and series on their phones, but big events still bring families together in front of the TV, like the football matches of the Dutch national team, called [[Oranje|Laranja, o apelido da seleção]].", pt:'Hoje, muita gente assiste a filmes e séries no celular, mas os grandes eventos ainda reúnem as famílias em frente à TV, como os jogos da seleção holandesa de futebol, chamada Oranje.'}
    ],
    questions:[
      {t:'choice', q:'Quando foi a primeira transmissão de TV da Holanda?', options:['Em 2 de outubro de 1951','Em 1936','Em 1975']},
      {t:'choice', q:'Por que pouca gente assistiu à primeira transmissão?', options:['Havia só uns 500 televisores, e eles eram muito caros','Ela foi de madrugada','Só passou no rádio'], why:'<span class="eng">There were only about 500 TV sets</span> = havia só uns 500 televisores.'},
      {t:'choice', q:'Como é chamada a seleção holandesa de futebol?', options:['Oranje','Tulip','Blue']}
    ]
  }
];
