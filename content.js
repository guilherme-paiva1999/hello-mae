/* Conteúdo do curso Hello, Mãe! Para criar uma lição nova, adicione um item em LESSONS.
   Depois rode: node tools/build-audio.mjs  (gera os áudios das frases novas) */
(function(){

const DAY_HTML = `
<p>Antes de cumprimentar, olhe o relógio:</p>
<ul class="day">
  <li class="d-morning"><span class="d-sky" aria-hidden="true">🌅</span><span class="d-time">Das 6h ao meio-dia</span><button class="d-en" data-say="Good morning">Good morning <span aria-hidden="true">🔊</span></button><span class="d-pt">Bom dia</span></li>
  <li class="d-afternoon"><span class="d-sky" aria-hidden="true">☀️</span><span class="d-time">Do meio-dia às 18h</span><button class="d-en" data-say="Good afternoon">Good afternoon <span aria-hidden="true">🔊</span></button><span class="d-pt">Boa tarde</span></li>
  <li class="d-evening"><span class="d-sky" aria-hidden="true">🌆</span><span class="d-time">À noite, ao chegar</span><button class="d-en" data-say="Good evening">Good evening <span aria-hidden="true">🔊</span></button><span class="d-pt">Boa noite</span></li>
  <li class="d-night"><span class="d-sky" aria-hidden="true">🌙</span><span class="d-time">À noite, ao sair ou dormir</span><button class="d-en" data-say="Good night">Good night <span aria-hidden="true">🔊</span></button><span class="d-pt">Boa noite</span></li>
</ul>
<p>E o <b>Hello</b> funciona a qualquer hora.</p>`;

const LESSONS = [
{
  id:'l1', emoji:'👋', title:'Cumprimentos', sub:'Hello, bom dia, boa noite',
  words:[
    {en:'Hello', pt:'Olá / Oi', say:'rê-LÔU', emoji:'👋', note:'Serve a qualquer hora e com qualquer pessoa. Também existe <b>Hi</b> (fala-se "rái"), mais informal, como o nosso "oi".'},
    {en:'Good morning', pt:'Bom dia', say:'gud MÓR-nin', emoji:'🌅', note:'Use de manhã, até o meio-dia.'},
    {en:'Good afternoon', pt:'Boa tarde', say:'gud éf-ter-NÚN', emoji:'☀️', note:'Use do meio-dia até umas 6 da tarde.'},
    {en:'Good evening', pt:'Boa noite (ao chegar)', say:'gud ÍV-nin', emoji:'🌆', note:'Use à noite, quando você <b>chega</b> em algum lugar.'},
    {en:'Good night', pt:'Boa noite (ao sair ou dormir)', say:'gud NÁIT', emoji:'🌙', note:'Use quando você <b>vai embora</b> ou <b>vai dormir</b>.'},
    {en:'Goodbye', pt:'Tchau / Até logo', say:'gud-BÁI', emoji:'🚪', note:'Também pode dizer só <b>Bye</b> (bái), mais informal.'}
  ],
  steps:[
    {t:'explain', kicker:'Lição 1', title:'Vamos aprender a cumprimentar', body:'<p>Cumprimentar é a primeira coisa que a gente faz ao encontrar alguém. Nesta lição você vai aprender 6 expressões.</p><p>Toque em <b>Ouvir</b> para escutar cada palavra. Se estiver rápido, toque em <b>🐢 Devagar</b>.</p>'},
    {t:'word', w:'Hello'},
    {t:'explain', kicker:'Entenda', title:'Em inglês, o cumprimento muda com a hora', body:DAY_HTML},
    {t:'word', w:'Good morning'},
    {t:'choice', q:'O que significa <span class="eng">Good morning</span>?', audio:'Good morning', options:['Bom dia','Boa noite','Tchau']},
    {t:'word', w:'Good afternoon'},
    {t:'fill', before:'Good', after:'!', pt:'Boa tarde!', options:['afternoon','morning','night'], sentence:'Good afternoon!'},
    {t:'word', w:'Good evening'},
    {t:'word', w:'Good night'},
    {t:'explain', kicker:'Atenção', title:'Boa noite: chegando ou saindo?', body:'<p>Em português, "boa noite" serve para as duas coisas. Em inglês são duas expressões diferentes:</p>', examples:[{en:'Good evening', pt:'Boa noite, quando você <b>chega</b>'},{en:'Good night', pt:'Boa noite, quando você <b>vai embora</b> ou <b>vai dormir</b>'}]},
    {t:'choice', q:'São 8 da noite e você <b>chega</b> num jantar. O que você diz?', options:['Good evening!','Good night!','Good morning!'], why:'<b>Good evening</b> é para quando você chega. <b>Good night</b> é para quando você vai embora.', say:'Good evening!'},
    {t:'word', w:'Goodbye'},
    {t:'listen', audio:'Good night', options:['Good night','Good morning','Goodbye'], why:'<b>Good night</b> = boa noite (ao sair ou dormir).'},
    {t:'match', pairs:[['Hello','Olá'],['Good morning','Bom dia'],['Good afternoon','Boa tarde'],['Goodbye','Tchau']]},
    {t:'choice', q:'São 3 da tarde e você encontra uma vizinha. O que você diz?', options:['Good afternoon!','Good morning!','Good night!'], why:'Do meio-dia até umas 6 da tarde, use <b>Good afternoon</b>.', say:'Good afternoon!'},
    {t:'speak', en:'Good morning', pt:'Bom dia', say:'gud MÓR-nin'},
    {t:'read', title:'Um dia de viagem', lines:[
      {scene:'De manhã, no hotel'},
      {who:'Recepcionista', en:'Good morning!', pt:'Bom dia!'},
      {who:'{nome}', en:'Hello! Good morning!', pt:'Olá! Bom dia!'},
      {scene:'À noite, chegando no jantar'},
      {who:'Tom', en:'Good evening, {nome}!', pt:'Boa noite, {nome}!'},
      {who:'{nome}', en:'Good evening, Tom!', pt:'Boa noite, Tom!'},
      {scene:'Mais tarde, indo dormir'},
      {who:'{nome}', en:'Goodbye, Tom! Good night!', pt:'Tchau, Tom! Boa noite!'},
      {who:'Tom', en:'Good night!', pt:'Boa noite!'}
    ]},
    {t:'choice', q:'Na conversa, o que o Tom disse quando a {nome} <b>chegou</b> no jantar?', options:['Good evening, {nome}!','Good night, {nome}!','Good morning, {nome}!'], say:'Good evening, {nome}!'},
    {t:'choice', q:'E o que a {nome} disse quando foi <b>dormir</b>?', options:['Goodbye, Tom! Good night!','Good afternoon, Tom!','Hello, Tom!'], say:'Goodbye, Tom! Good night!'}
  ]
},
{
  id:'l2', emoji:'🙏', title:'Por favor e obrigado', sub:'Please, thank you, sorry',
  words:[
    {en:'Please', pt:'Por favor', say:'PLÍIZ', emoji:'🙏', note:'Pode vir no começo ou no fim do pedido: <span class="eng">A coffee, please.</span>'},
    {en:'Thank you', pt:'Obrigado / Obrigada', say:'TÊNK-iu', emoji:'😊', note:'Serve para homem e para mulher. Não muda como no português!'},
    {en:"You're welcome", pt:'De nada', say:'iór UÉL-kam', emoji:'🙂', note:'É a resposta para <b>Thank you</b>.'},
    {en:'Sorry', pt:'Desculpa', say:'SÓ-ri', emoji:'😔', note:'Use quando você errou ou esbarrou em alguém.'},
    {en:'Excuse me', pt:'Com licença', say:'eks-KIÚZ mi', emoji:'🙋', note:'Use para chamar alguém ou pedir passagem.'},
    {en:'How are you?', pt:'Como você está?', say:'ráu ár IU?', emoji:'💬', note:'Os americanos perguntam isso o tempo todo, até no caixa do mercado!'},
    {en:"I'm fine, thank you", pt:'Estou bem, obrigado(a)', say:'áim FÁIN, TÊNK-iu', emoji:'👍', note:'A resposta mais comum para <b>How are you?</b>'}
  ],
  steps:[
    {t:'explain', kicker:'Lição 2', title:'As palavrinhas mágicas', body:'<p>Educação abre portas em qualquer país.</p><p>Nesta lição você vai aprender a dizer por favor, obrigado e desculpa, e a perguntar se alguém está bem.</p>'},
    {t:'word', w:'Please'},
    {t:'word', w:'Thank you'},
    {t:'explain', kicker:'Dica de pronúncia', title:'O som do TH', body:'<p>O <b>th</b> de <b>th</b>ank you não existe em português.</p><p>Coloque a pontinha da língua entre os dentes da frente e solte o ar. Parece um "t" soprado.</p><p>Se no começo sair "tênk-iu", tudo bem! Todo mundo vai entender.</p>', examples:[{en:'Thank you', pt:'Obrigado(a)'},{en:'Thanks', pt:'Obrigado(a), mais informal'}]},
    {t:'fill', before:'Thank', after:'!', pt:'Obrigada!', options:['you','me','please'], sentence:'Thank you!'},
    {t:'word', w:"You're welcome"},
    {t:'choice', q:'Alguém te diz <span class="eng">Thank you!</span> O que você responde?', options:["You're welcome!",'Sorry!','Please!'], why:'<b>You\'re welcome</b> é o nosso "de nada".', say:"You're welcome!"},
    {t:'word', w:'Sorry'},
    {t:'word', w:'Excuse me'},
    {t:'explain', kicker:'Atenção', title:'Sorry ou Excuse me?', body:'<p>As duas parecem "desculpa", mas são usadas em momentos diferentes:</p>', examples:[{en:'Excuse me', pt:'Com licença: para chamar alguém ou pedir passagem'},{en:'Sorry', pt:'Desculpa: quando você errou ou esbarrou em alguém'}]},
    {t:'choice', q:'Você esbarrou em alguém sem querer. O que você diz?', options:['Sorry!','Excuse me!','Please!'], why:'Quando algo já aconteceu, peça desculpas com <b>Sorry</b>.', say:'Sorry!'},
    {t:'choice', q:'Você quer chamar o garçom. O que você diz?', options:['Excuse me!','Sorry!','Thank you!'], why:'Para chamar alguém ou pedir licença, use <b>Excuse me</b>.', say:'Excuse me!'},
    {t:'listen', audio:'Excuse me', options:['Excuse me','Please','Sorry'], why:'<b>Excuse me</b> = com licença.'},
    {t:'word', w:'How are you?'},
    {t:'word', w:"I'm fine, thank you"},
    {t:'build', pt:'Estou bem, obrigada.', answer:["I'm",'fine','thank','you'], extra:['please','sorry'], full:"I'm fine, thank you."},
    {t:'match', pairs:[['Please','Por favor'],['Thank you','Obrigado(a)'],['Sorry','Desculpa'],["You're welcome",'De nada']]},
    {t:'speak', en:'Thank you', pt:'Obrigado(a)', say:'TÊNK-iu'},
    {t:'read', title:'Na cafeteria', lines:[
      {scene:'Numa cafeteria em Nova York'},
      {who:'{nome}', en:'Excuse me! A coffee, please.', pt:'Com licença! Um café, por favor.'},
      {who:'Garçom', en:'Here you are.', pt:'Aqui está.'},
      {who:'{nome}', en:'Thank you!', pt:'Obrigada!'},
      {who:'Garçom', en:"You're welcome! How are you today?", pt:'De nada! Como você está hoje?'},
      {who:'{nome}', en:"I'm fine, thank you. And you?", pt:'Estou bem, obrigada. E você?'},
      {who:'Garçom', en:"I'm very well, thanks!", pt:'Estou muito bem, obrigado!'}
    ]},
    {t:'choice', q:'O que a {nome} pediu na cafeteria?', options:['Um café','Uma água','Um suco'], why:'<span class="eng">A coffee, please</span> = um café, por favor.'},
    {t:'build', pt:'Um café, por favor.', answer:['A','coffee','please'], extra:['sorry','you'], full:'A coffee, please.'}
  ]
},
{
  id:'l3', emoji:'🤝', title:'Muito prazer', sub:'Seu nome e de onde você é',
  words:[
    {en:'My name is...', pt:'Meu nome é...', say:'mái NÊIM iz', emoji:'📛'},
    {en:"What's your name?", pt:'Qual é o seu nome?', say:'uóts iór NÊIM?', emoji:'❓'},
    {en:'Nice to meet you', pt:'Prazer em te conhecer', say:'NÁIS tu MÍT iu', emoji:'🤝', note:'Se a outra pessoa falar primeiro, responda: <span class="eng">Nice to meet you too!</span> (too = também, fala-se "tú").'},
    {en:'Where are you from?', pt:'De onde você é?', say:'uér ár iu FROM?', emoji:'🌎'},
    {en:"I'm from Brazil", pt:'Eu sou do Brasil', say:'áim from bra-ZÍL', emoji:'🇧🇷'},
    {en:'I speak a little English', pt:'Eu falo um pouco de inglês', say:'ái SPÍK a LÍ-tou ÍN-glix', emoji:'🗣️', note:'Uma frase ótima para viagens. Quando ouvem isso, as pessoas falam mais devagar com você!'}
  ],
  steps:[
    {t:'explain', kicker:'Lição 3', title:'Hora de se apresentar', body:'<p>Nesta lição você vai aprender a dizer seu nome, perguntar o nome das pessoas e contar que é do Brasil.</p><p>No final, você vai ler sua primeira conversa inteira em inglês!</p>'},
    {t:'word', w:'My name is...'},
    {t:'build', pt:'Meu nome é {nome}.', answer:['My','name','is','{nome}'], extra:['from','you'], full:'My name is {nome}.'},
    {t:'word', w:"What's your name?"},
    {t:'choice', q:'Alguém te pergunta: <span class="eng">What\'s your name?</span> O que você responde?', options:['My name is {nome}.',"I'm fine, thank you.",'Good night!'], say:'My name is {nome}.'},
    {t:'word', w:'Nice to meet you'},
    {t:'fill', before:'Nice to', after:'you!', pt:'Prazer em te conhecer!', options:['meet','name','from'], sentence:'Nice to meet you!'},
    {t:'explain', kicker:'Entenda', title:"I'm é o mesmo que I am", body:'<p><b>I am</b> quer dizer "eu sou" ou "eu estou". Na conversa, quase sempre vira <b>I\'m</b> (fala-se "áim").</p><p>Você já conhece uma frase com ele. Olhe como ele aparece em várias:</p>', examples:[{en:"I'm fine", pt:'Eu estou bem'},{en:"I'm {nome}", pt:'Eu sou a {nome}'},{en:"I'm from Brazil", pt:'Eu sou do Brasil'}]},
    {t:'word', w:'Where are you from?'},
    {t:'word', w:"I'm from Brazil"},
    {t:'choice', q:'Alguém pergunta: <span class="eng">Where are you from?</span> O que você responde?', options:["I'm from Brazil.",'Nice to meet you.','My name is {nome}.'], say:"I'm from Brazil."},
    {t:'listen', audio:'Nice to meet you', options:['Nice to meet you',"What's your name?",'Where are you from?'], why:'<b>Nice to meet you</b> = prazer em te conhecer.'},
    {t:'build', pt:'Eu sou do Brasil.', answer:["I'm",'from','Brazil'], extra:['name','is'], full:"I'm from Brazil."},
    {t:'word', w:'I speak a little English'},
    {t:'match', pairs:[['My name is','Meu nome é'],["What's your name?",'Qual é o seu nome?'],['Where are you from?','De onde você é?'],['Nice to meet you','Prazer em conhecer']]},
    {t:'speak', en:'My name is {nome}', pt:'Meu nome é {nome}', say:'mái NÊIM iz {nome}'},
    {t:'read', title:'Numa festa', lines:[
      {scene:'Conhecendo alguém numa festa'},
      {who:'John', en:"Hi! My name is John. What's your name?", pt:'Oi! Meu nome é John. Qual é o seu nome?'},
      {who:'{nome}', en:'My name is {nome}. Nice to meet you!', pt:'Meu nome é {nome}. Prazer em te conhecer!'},
      {who:'John', en:'Nice to meet you too! Where are you from?', pt:'Prazer em te conhecer também! De onde você é?'},
      {who:'{nome}', en:"I'm from Brazil. I speak a little English.", pt:'Eu sou do Brasil. Eu falo um pouco de inglês.'},
      {who:'John', en:'Wow! Your English is very good!', pt:'Uau! Seu inglês é muito bom!'},
      {who:'{nome}', en:'Thank you!', pt:'Obrigada!'}
    ]},
    {t:'choice', q:'De onde a {nome} é?', options:['Do Brasil','Dos Estados Unidos','De Portugal'], why:'<span class="eng">I\'m from Brazil</span> = eu sou do Brasil.'},
    {t:'choice', q:'O que o John achou do inglês da {nome}?', options:['Que é muito bom','Que é ruim','Que ela não fala inglês'], why:'<span class="eng">Your English is very good!</span> = Seu inglês é muito bom!'},
    {t:'speak', en:'I speak a little English', pt:'Eu falo um pouco de inglês', say:'ái SPÍK a LÍ-tou ÍN-glix'}
  ]
}
];

const SOON = [
  {emoji:'👨‍👩‍👧', title:'Minha família', sub:'Mother, father, son, daughter'},
  {emoji:'🔢', title:'Números', sub:'De 0 a 100, preços e horas'},
  {emoji:'🍽️', title:'No restaurante', sub:'Pedir comida e a conta'},
  {emoji:'✈️', title:'No aeroporto', sub:'Check-in, passaporte, portão'},
  {emoji:'🏨', title:'No hotel', sub:'Reserva, quarto, café da manhã'},
  {emoji:'🗺️', title:'Pedindo informações', sub:'Where is...? Esquerda e direita'},
  {emoji:'🛍️', title:'Compras', sub:'How much is it? Tamanhos e cores'}
];

const GLOSS = {
  hello:'olá', hi:'oi', good:'bom / boa', morning:'manhã', afternoon:'tarde', evening:'noite (começo da noite)',
  night:'noite', goodbye:'tchau', bye:'tchau', excuse:'com licença (excuse me)', me:'me / mim', a:'um / uma',
  coffee:'café', please:'por favor', here:'aqui', you:'você', are:'é / está / são', thank:'agradecer (thank you = obrigado)',
  thanks:'obrigado(a)', "you're":'você é / você está', welcome:'bem-vindo (you\'re welcome = de nada)',
  how:'como', today:'hoje', "i'm":'eu sou / eu estou', i:'eu', fine:'bem', and:'e', very:'muito', well:'bem',
  my:'meu / minha', name:'nome', is:'é / está', "what's":'qual é / o que é', your:'seu / sua', nice:'agradável, legal',
  to:'a / para', meet:'conhecer (alguém)', too:'também', where:'onde', from:'de (origem)', brazil:'Brasil',
  speak:'falar', little:'pouco (a little = um pouco)', english:'inglês', wow:'uau!'
};


/* Nome do arquivo de áudio de uma frase: "How are you?" -> how-are-you-q */
function slug(text){
  const t = String(text).trim().toLowerCase();
  const s = t.replace(/\.\.\./g,'').replace(/'/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  return s + (t.endsWith('?') ? '-q' : '');
}

window.HM = {DAY_HTML, LESSONS, SOON, GLOSS, slug};
})();
