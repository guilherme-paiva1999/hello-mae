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
    id:'2026-10-27', date:'27 de outubro de 2026', title:'Lost Erasmus book returns to Rotterdam', source:'DutchNews.nl',
    paras:[
      {en:"A very old little book has come home to Rotterdam. It is called La civilité puérile, a short guide to good [[manners|boas maneiras]] for children. It was written by Erasmus, the famous thinker from Rotterdam. The book was printed in French in 1609, more than four hundred years ago.", pt:'Um livrinho muito antigo voltou para casa, em Roterdã. Ele se chama La civilité puérile, um pequeno guia de boas maneiras para crianças. Foi escrito por Erasmo, o famoso pensador de Roterdã. O livro foi impresso em francês em 1609, há mais de quatrocentos anos.'},
      {en:"A collector in the United States found the book, and now it is back in the Rotterdam Library. The [[curator|curador]], John Tholen, says this copy is the only one left in the world. Maybe one thousand copies were printed, so this old book is a real treasure.", pt:'Um colecionador nos Estados Unidos encontrou o livro, e agora ele está de volta à Biblioteca de Roterdã. O curador, John Tholen, diz que este exemplar é o único que sobrou no mundo. Talvez mil exemplares tenham sido impressos, então este livro antigo é um verdadeiro tesouro.'},
      {en:"The advice inside is funny, too. For example, it tells children not to make trumpet sounds with their nose! Erasmus is still very famous in the city. The big white Erasmus [[bridge|ponte]], the Erasmusbrug, carries his name, and many people visit it when they come to Rotterdam.", pt:'Os conselhos do livro também são engraçados. Por exemplo, ele diz às crianças para não fazerem som de trombeta com o nariz! Erasmo ainda é muito famoso na cidade. A grande ponte branca, a Erasmusbrug, leva o nome dele, e muita gente a visita quando vai a Roterdã.'},
      {en:"Rotterdam is easy to visit by train. At the ticket desk, you can say: \"Excuse me, could I have a single ticket to Rotterdam, please?\" Then check the platform on the board. Are you travelling on holiday with a big suitcase? Ask a person in the queue: \"Is this seat free?\" on the train.", pt:'Roterdã é fácil de visitar de trem. No balcão de passagens, você pode dizer: "Com licença, posso ter uma passagem só de ida para Roterdã, por favor?" Depois confira a plataforma no painel. Está viajando de férias com uma mala grande? No trem, pergunte a alguém: "Este lugar está livre?"'}
    ],
    questions:[
      {t:'choice', q:'Que livro voltou para Roterdã?', options:['La civilité puérile, de Erasmo, impresso em francês em 1609','Um mapa antigo da cidade de Roterdã','Um livro de receitas holandesas do século 20'], why:'<span class="eng">printed in French in 1609</span> = impresso em francês em 1609.'},
      {t:'choice', q:'Por que esse exemplar é tão especial?', options:['É o único que sobrou no mundo','É o maior livro da biblioteca','Foi escrito por uma criança']},
      {t:'choice', q:'O que a turista pode dizer no balcão da estação?', options:['Excuse me, could I have a single ticket to Rotterdam, please?','Where is the queue for the bridge?','I have nothing to declare, thank you.']}
    ]
  },
  {
    id:'2026-10-13', date:'13 de outubro de 2026', title:'Clocks go back in the Netherlands', source:'IamExpat.nl',
    paras:[
      {en:"On Sunday, 25 October, the Netherlands changes the clocks. At 3 a.m., the time goes back to 2 a.m. This is the start of [[winter time|horário de inverno]], called wintertijd in Dutch. You get one extra hour of sleep, but the evenings become dark much earlier.", pt:'No domingo, 25 de outubro, a Holanda muda os relógios. Às 3 da manhã, a hora volta para as 2. É o começo do horário de inverno, chamado de wintertijd em holandês. Você ganha uma hora extra de sono, mas as noites escurecem bem mais cedo.'},
      {en:"Your phone will change the time by itself, but check your watch and your alarm. Trains and planes use the new time too, so read your ticket carefully. A late breakfast is also a nice way to enjoy the extra hour on that Sunday!", pt:'Seu celular muda a hora sozinho, mas confira seu relógio e seu despertador. Trens e aviões também usam a hora nova, então leia sua passagem com atenção. Um café da manhã tardio também é uma boa maneira de aproveitar a hora extra naquele domingo!'},
      {en:"There is another useful rule. Since 1 October, public transport inspectors can use the driving-licence register to identify passengers who have no ID. Then they can give a [[fine|multa]] without calling the police. So always carry your passport or [[ID card|documento de identidade]] on trains, trams and buses.", pt:'Há outra regra útil. Desde 1º de outubro, os fiscais do transporte público podem usar o registro de carteiras de motorista para identificar passageiros sem documento. Assim, eles podem dar uma multa sem chamar a polícia. Por isso, sempre leve seu passaporte ou documento de identidade em trens, bondes e ônibus.'},
      {en:"At the station, you can use the ticket desk. Say: \"Excuse me, could I have a single ticket to Utrecht, please?\" Then look at the board and check the platform number. Dutch trains are very punctual, so do not be late, especially on the day the clocks change!", pt:'Na estação, você pode usar o balcão de passagens. Diga: "Com licença, posso ter uma passagem só de ida para Utrecht, por favor?" Depois olhe o painel e confira o número da plataforma. Os trens holandeses são muito pontuais, então não se atrase, principalmente no dia da mudança de hora!'}
    ],
    questions:[
      {t:'choice', q:'O que acontece na Holanda no domingo, 25 de outubro?', options:['Os relógios voltam uma hora, das 3 para as 2 da manhã','Os relógios adiantam uma hora','Os trens não funcionam'], why:'<span class="eng">At 3 a.m., the time goes back to 2 a.m.</span> = às 3 da manhã, a hora volta para as 2.'},
      {t:'choice', q:'O que os fiscais do transporte público podem fazer desde 1º de outubro?', options:['Usar o registro de carteiras de motorista para identificar quem está sem documento','Cobrar a passagem em dinheiro dentro do trem','Pedir o passaporte só de estrangeiros']},
      {t:'choice', q:'O que a turista deve conferir na estação, segundo o texto?', options:['O número da plataforma no painel','A cor do trem','O nome do maquinista']}
    ]
  },
  {
    id:'2026-10-07', date:'7 de outubro de 2026', title:'Dutch television turns 75', source:'DutchNews.nl',
    paras:[
      {en:"On 2 October 1951, the Netherlands had its first television [[broadcast|transmissão]]. It came live from a small studio in the town of Bussum and lasted about ninety minutes. The programme was a play, and the Dutch Royal Family watched it at home in their palace.", pt:'Em 2 de outubro de 1951, a Holanda teve sua primeira transmissão de televisão. Ela foi ao vivo, de um pequeno estúdio na cidade de Bussum, e durou cerca de noventa minutos. O programa era uma peça de teatro, e a Família Real holandesa assistiu em casa, no palácio.'},
      {en:"Very few people could see it, because there were only about 500 TV sets in the whole country. A television was very [[expensive|caro]]: it cost about a third of what a normal worker earned in a year. Most families listened to the radio instead.", pt:'Pouquíssimas pessoas conseguiram assistir, porque havia só uns 500 televisores no país inteiro. Uma televisão era muito cara: custava cerca de um terço do que um trabalhador comum ganhava num ano. A maioria das famílias ouvia rádio.'},
      {en:"But things changed fast. Only five years later, there were already 75,000 TV sets, and television slowly became the most popular [[entertainment|entretenimento]] in Dutch homes, especially in the 1960s, 70s and 80s.", pt:'Mas as coisas mudaram rápido. Só cinco anos depois, já havia 75 mil televisores, e a televisão aos poucos se tornou o entretenimento mais popular nas casas holandesas, principalmente nos anos 1960, 70 e 80.'},
      {en:"Today, many people watch films and series on their phones, but big events still bring families together in front of the TV, like the football matches of the Dutch national team, called [[Oranje|Laranja, o apelido da seleção]]. If you visit a café during a match, it will be full, so ask \"Excuse me, is this seat free?\" before you sit down!", pt:'Hoje, muita gente assiste a filmes e séries no celular, mas os grandes eventos ainda reúnem as famílias em frente à TV, como os jogos da seleção holandesa de futebol, chamada Oranje. Se você for a um café durante um jogo, ele vai estar lotado, então pergunte "Com licença, este lugar está livre?" antes de se sentar!'}
    ],
    questions:[
      {t:'choice', q:'Quando foi a primeira transmissão de TV da Holanda?', options:['Em 2 de outubro de 1951','Em 1936','Em 1975']},
      {t:'choice', q:'Por que pouca gente assistiu à primeira transmissão?', options:['Havia só uns 500 televisores, e eles eram muito caros','Ela foi de madrugada','Só passou no rádio'], why:'<span class="eng">There were only about 500 TV sets</span> = havia só uns 500 televisores.'},
      {t:'choice', q:'Como é chamada a seleção holandesa de futebol?', options:['Oranje','Tulip','Blue']}
    ]
  }
];
