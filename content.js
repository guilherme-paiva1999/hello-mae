/* Conteúdo do curso Hello, Mãe! (nível B1, viagem para a Holanda).

   Toda frase em inglês que o app fala fica num campo "en". Quem fala com voz masculina
   tem v:'m' (vale para o objeto e tudo dentro dele, menos as "choices", que são falas dela).
   Palavras com tradução ao tocar: [[palavra|tradução]].

   Depois de mudar o conteúdo, rode:  node tools/build-audio.mjs  */
(function(){

/* ---------- Etapas da viagem ---------- */

const STAGES = [
{
  id:'s1', emoji:'✈️', title:'No avião', sub:'Avisos de bordo, pedidos e refeição',
  steps:[
    {t:'explain', kicker:'Etapa 1 · A viagem começa', title:'Onze horas de voo em inglês', body:'<p>No voo para a Holanda, nem sempre alguém da tripulação fala português. Nesta etapa você vai entender os avisos de bordo e pedir o que precisar.</p><p>Toque em <b>Tradução</b> sempre que quiser. Usar a tradução também é aprender.</p>'},
    {t:'phrase', en:'Could I have some water, please?', pt:'Pode me dar um pouco de água, por favor?', note:'<b>Could I have...?</b> é o jeito mais educado de pedir qualquer coisa: <i>Could I have a blanket?</i> (um cobertor), <i>Could I have some coffee?</i>'},
    {t:'phrase', en:"Excuse me, I think you're in my seat.", pt:'Com licença, acho que você está no meu assento.', note:'Mostre o cartão de embarque junto. O número do assento aparece em <b>Seat</b>, por exemplo: 32C.'},
    {t:'phrase', en:'Could you help me put my bag in the overhead bin?', pt:'Pode me ajudar a colocar minha mala no compartimento de cima?', note:'<b>Overhead bin</b> é o bagageiro acima dos assentos.'},
    {t:'explain', kicker:'Ouça com atenção', title:'Os avisos de bordo', body:'<p>Estes são os avisos que você mais vai ouvir. Toque para escutar:</p>', examples:[
      {en:'Please fasten your seatbelt.', pt:'Por favor, aperte o cinto.', v:'m'},
      {en:'We will be landing shortly.', pt:'Vamos pousar em breve.', v:'m'},
      {en:'Please return to your seat.', pt:'Por favor, volte para o seu assento.', v:'m'},
      {en:'Please put your seat in the upright position.', pt:'Por favor, coloque o encosto da poltrona na posição vertical.', v:'m'}
    ]},
    {t:'listen', en:'Please return to your seat and fasten your seatbelt.', v:'m', q:'O que o comissário pediu?', options:['Voltar para o assento e apertar o cinto','Levantar e pegar a bagagem','Desligar o celular e dormir']},
    {t:'fill', text:'Could I ___ a blanket, please?', options:['have','give','take'], en:'Could I have a blanket, please?', pt:'Pode me dar um cobertor, por favor?', why:'<b>Could I have...?</b> é a fórmula para pedir coisas. "Could I give" seria "posso dar".'},
    {t:'dialog', title:'O jantar a bordo', scene:'Duas horas depois da decolagem, o carrinho de comida chega à sua fileira.', who:'Comissário', v:'m', nodes:[
      {en:'Good evening! Would you like chicken or pasta?', pt:'Boa noite! Você gostaria de frango ou massa?', choices:[
        {en:'The pasta, please.', pt:'A massa, por favor.', q:'best', fb:'Curto, claro e educado.'},
        {en:'I want pasta.', pt:'Eu quero massa.', q:'ok', fb:'Ele entende, mas <b>I want</b> soa um pouco seco. Prefira <b>The pasta, please</b> ou <b>I\'d like the pasta</b>.'},
        {en:'Yes, please.', pt:'Sim, por favor.', q:'bad', fb:'Ele perguntou frango <b>ou</b> massa. "Yes" não responde. Escolha uma das opções.'}]},
      {en:'And what would you like to drink?', pt:'E o que você gostaria de beber?', choices:[
        {en:'Could I have some orange juice, please?', pt:'Pode me dar um suco de laranja, por favor?', q:'best', fb:'Perfeito! Você usou o <b>Could I have...?</b>'},
        {en:'Orange juice.', pt:'Suco de laranja.', q:'ok', fb:'Funciona. Com um <b>please</b> no final fica bem mais simpático.'},
        {en:'I would like to drink.', pt:'Eu gostaria de beber.', q:'bad', fb:'Faltou dizer <b>o quê</b>! Diga a bebida: <i>orange juice, water, coffee...</i>'}]},
      {en:'Here you are. Enjoy your meal!', pt:'Aqui está. Bom apetite!', choices:[
        {en:'Thank you very much!', pt:'Muito obrigada!', q:'best', fb:'Isso!'},
        {en:'OK.', pt:'Ok.', q:'ok', fb:'Não está errado, mas um <b>Thank you</b> faz toda a diferença.'},
        {en:"You're welcome.", pt:'De nada.', q:'bad', fb:'<b>You\'re welcome</b> é "de nada". Quem recebe a comida agradece: <b>Thank you!</b>'}]}
    ]},
    {t:'choice', q:'Tem uma pessoa sentada no seu assento. O que você diz?', options:["Excuse me, I think you're in my seat.", 'Get out of my seat.', 'Sorry, this is mine chair.'], en:"Excuse me, I think you're in my seat.", why:'<b>Excuse me, I think...</b> é educado e firme. "Get out" é grosseiro, e "mine chair" está errado.'},
    {t:'build', pt:'Pode me ajudar com a minha mala?', answer:['Could','you','help','me','with','my','bag?'], extra:['to','for'], en:'Could you help me with my bag?'},
    {t:'listen', en:'We will be landing shortly.', v:'m', q:'O que significa este aviso?', options:['Vamos pousar em breve','Vamos decolar agora','O jantar vai ser servido']}
  ]
},
{
  id:'s2', emoji:'🛂', title:'Imigração em Schiphol', sub:'Perguntas reais e como responder',
  steps:[
    {t:'explain', kicker:'Etapa 2 · A parte mais importante', title:'Como funciona a imigração na Holanda', body:'<p>Brasileiros podem ficar até <b>90 dias</b> como turistas na Holanda e no resto do espaço Schengen, sem visto.</p><p>Ao descer do avião, siga as placas <b>All passports</b>. A fila <b>EU / EEA / CH</b> é só para europeus.</p><p>Quem atende é a <b>Koninklijke Marechaussee</b>, a polícia de fronteira holandesa. Eles falam inglês muito bem e são diretos: fazem poucas perguntas, e rápido.</p><p>Desde abril de 2026, o passaporte <b>não é mais carimbado</b>. Na primeira entrada, o oficial tira uma foto do seu rosto e registra quatro digitais no sistema europeu de entrada e saída (EES). É normal e rápido.</p><div class="alert"><b>Voo com conexão?</b> Se você trocar de avião em outro país europeu, como Portugal ou França, a imigração acontece <b>lá</b>, e não na Holanda.</div>'},
    {t:'explain', kicker:'Documentos', title:'O que levar na mão, impresso', body:'<p>Guarde tudo numa pasta, na bolsa de mão. Nunca na mala despachada.</p><ul class="checks"><li><b>Passaporte</b> válido por pelo menos 3 meses depois da data de volta</li><li><b>Passagem de volta</b></li><li><b>Reserva do hotel</b> com o endereço</li><li><b>Seguro-viagem</b> com cobertura mínima de €30.000</li><li><b>Cartão de crédito</b> ou extrato, para mostrar que tem dinheiro para a viagem</li></ul><div class="alert"><b>ETIAS:</b> a Europa vai exigir uma autorização online chamada ETIAS, mas ainda não há data confirmada. Uns 3 meses antes da viagem, confira no site oficial da União Europeia se ela já é obrigatória.</div><p>Na tela inicial, a <b>Lista da viagem</b> ajuda você a conferir tudo.</p>'},
    {t:'explain', kicker:'Regras de ouro', title:'Como se comportar no guichê', body:'<p><b>1. Responda só o que foi perguntado.</b> Frases curtas e verdadeiras.</p><p><b>2. Nunca fale em trabalhar.</b> Palavras como <i>work</i> e <i>job</i> fazem o oficial achar que você quer trabalhar sem visto.</p><p><b>3. Não entendeu? Peça para repetir.</b> É normal, e muito melhor do que responder qualquer coisa.</p>', examples:[
      {en:'Sorry, could you repeat that, please?', pt:'Desculpe, pode repetir, por favor?'},
      {en:'Could you speak more slowly, please?', pt:'Pode falar mais devagar, por favor?'}
    ]},
    {t:'phrase', en:"What's the purpose of your visit?", v:'m', pt:'Qual é o motivo da sua visita?', note:'A pergunta mais comum. Às vezes vem como <i>Business or pleasure?</i> (negócios ou lazer?).'},
    {t:'phrase', en:"Tourism. I'm here on holiday.", pt:'Turismo. Estou aqui de férias.', note:'Nos Estados Unidos dizem <i>vacation</i>. Na Europa, <b>holiday</b>.'},
    {t:'phrase', en:'How long are you staying?', v:'m', pt:'Quanto tempo você vai ficar?'},
    {t:'phrase', en:"I'm staying for three weeks. I fly back on the 20th of May.", pt:'Vou ficar três semanas. Volto no dia 20 de maio.', note:'Diga sempre a data de volta. Isso mostra que você tem passagem e vai embora no prazo.'},
    {t:'listen', optLang:'en', en:'How long are you staying?', v:'m', q:'Ouça a pergunta e escolha a melhor resposta.', options:['For three weeks.','At a hotel in Amsterdam.','Tourism.'], why:'<b>How long</b> = quanto tempo.'},
    {t:'phrase', en:'Where are you staying?', v:'m', pt:'Onde você vai ficar hospedada?'},
    {t:'phrase', en:'At a hotel in Amsterdam. Here is my booking.', pt:'Num hotel em Amsterdam. Aqui está minha reserva.'},
    {t:'phrase', en:'Do you have a return ticket?', v:'m', pt:'Você tem passagem de volta?'},
    {t:'choice', q:'O oficial pergunta: <span class="eng">Business or pleasure?</span> Você é turista. O que responder?', options:["Pleasure. I'm here on holiday.", 'Business.', 'Yes, please.'], en:"Pleasure. I'm here on holiday.", why:'<b>Pleasure</b> = lazer. <b>Business</b> seria negócios, que não é o seu caso.'},
    {t:'listen', en:'Please put your fingers on the scanner.', v:'m', q:'O que o oficial pediu?', options:['Colocar os dedos no leitor','Olhar para a câmera','Mostrar a passagem de volta']},
    {t:'listen', en:'Please look at the camera.', v:'m', q:'E agora, o que ele pediu?', options:['Olhar para a câmera','Tirar os óculos','Esperar na fila']},
    {t:'match', pairs:[['return ticket','passagem de volta'],['booking','reserva'],['travel insurance','seguro-viagem'],['queue','fila']]},
    {t:'choice', optLang:'en', q:'Qual destas respostas pode te trazer <b>problemas</b> na imigração?', options:['I might look for a job here.', "I'm visiting museums and canals.", "I'm going back to Brazil on the 20th of May."], why:'<b>Job</b> (trabalho) é a palavra que você nunca deve usar como turista. Nem de brincadeira.'},
    {t:'fill', text:'Could you speak more ___, please?', options:['slowly','slow','slowing'], en:'Could you speak more slowly, please?', pt:'Pode falar mais devagar, por favor?', why:'Para dizer <i>como</i> alguém fala, use a forma com <b>-ly</b>: slow → <b>slowly</b>.'},
    {t:'explain', kicker:'Pronta para treinar?', title:'Agora, o simulador', body:'<p>Na área de <b>Jogos</b>, o <b>Simulador de imigração</b> faz a entrevista completa com o oficial, em áudio, com perguntas diferentes a cada vez.</p><p>Faça pelo menos uma vez por semana até a viagem.</p>'}
  ]
},
{
  id:'s3', emoji:'🧳', title:'Bagagem e alfândega', sub:'Mala perdida e "nothing to declare"',
  steps:[
    {t:'explain', kicker:'Etapa 3', title:'Depois da imigração', body:'<p>Siga as placas <b>Baggage reclaim</b> (retirada de bagagem). Um painel mostra o número da esteira do seu voo.</p><p>Com a mala na mão, você passa pela alfândega (<b>customs</b>):</p><ul class="checks"><li><b>Nothing to declare</b> (verde): para quem não traz nada de especial. É o seu caso.</li><li><b>Goods to declare</b> (vermelho): para quem traz algo que precisa declarar.</li></ul><div class="alert"><b>Não leve na mala:</b> carne, queijo, leite ou doces com leite (como doce de leite) vindos de fora da União Europeia. É proibido e pode dar multa. Dinheiro acima de €10.000 precisa ser declarado.</div>'},
    {t:'phrase', en:"My suitcase didn't arrive.", pt:'Minha mala não chegou.'},
    {t:'phrase', en:'Where can I report lost luggage?', pt:'Onde posso avisar sobre bagagem perdida?', note:'<b>Luggage</b> e <b>baggage</b> não têm plural em inglês. Nunca diga "baggages".'},
    {t:'phrase', en:'Do you have anything to declare?', v:'m', pt:'Você tem algo a declarar?'},
    {t:'phrase', en:'No, nothing to declare.', pt:'Não, nada a declarar.'},
    {t:'choice', q:'Qual frase está correta?', options:['I lost my luggage.','I lost my luggages.','I lost my baggages.'], en:'I lost my luggage.', why:'<b>Luggage</b> não tem plural. Para contar, use <b>suitcase</b>: <i>two suitcases</i>.'},
    {t:'dialog', title:'A mala não chegou', scene:'A esteira parou e sua mala preta não apareceu. Você vai até o balcão <b>Baggage Services</b>.', who:'Atendente', v:'m', nodes:[
      {en:'Hello. How can I help you?', pt:'Olá. Como posso ajudar?', choices:[
        {en:"Hi. My suitcase didn't arrive. I was on the flight from São Paulo.", pt:'Oi. Minha mala não chegou. Eu estava no voo de São Paulo.', q:'best', fb:'Excelente: você disse o problema e de qual voo veio.'},
        {en:'My bag is not here.', pt:'Minha mala não está aqui.', q:'ok', fb:'Ele entende, mas vai precisar perguntar de qual voo você veio. Já diga de cara!'},
        {en:'I lost my baggages.', pt:'Eu perdi minhas bagagens.', q:'bad', fb:'<b>Baggage</b> não tem plural, e <b>I lost</b> dá a entender que <i>você</i> perdeu a mala. Diga: <b>My suitcase didn\'t arrive.</b>'}]},
      {en:"I'm sorry to hear that. Can I see your baggage tag, please?", pt:'Sinto muito. Posso ver a etiqueta da sua bagagem, por favor?', choices:[
        {en:'Yes, here it is.', pt:'Sim, aqui está.', q:'best', fb:'Isso. A <b>baggage tag</b> é o adesivo com código de barras que te deram no check-in, normalmente colado no cartão de embarque.'},
        {en:'What is a baggage tag?', pt:'O que é uma etiqueta de bagagem?', q:'ok', fb:'Perguntar quando não sabe é ótimo! É o adesivo com código de barras que te deram no check-in. Guarde sempre.'},
        {en:"I don't have a bag.", pt:'Eu não tenho mala.', q:'bad', fb:'Isso contradiz o que você acabou de dizer. <b>Tag</b> é a etiqueta, não a mala.'}]},
      {en:'Thank you. Can you describe your suitcase?', pt:'Obrigado. Pode descrever sua mala?', choices:[
        {en:"It's a large black suitcase with a red ribbon on the handle.", pt:'É uma mala preta grande com uma fita vermelha na alça.', q:'best', fb:'Perfeito: tamanho, cor e um detalhe único.'},
        {en:"It's black.", pt:'É preta.', q:'ok', fb:'Metade das malas do mundo é preta! Dê mais detalhes: tamanho, marca, uma fita.'},
        {en:"It's a suitcase.", pt:'É uma mala.', q:'bad', fb:'Isso ele já sabe. Descreva: <i>large, small, black, blue, with a red ribbon...</i>'}]},
      {en:"And where are you staying? We'll deliver it to you.", pt:'E onde você está hospedada? Nós vamos entregá-la para você.', choices:[
        {en:'At Hotel Nova in Amsterdam. Here is the address.', pt:'No Hotel Nova, em Amsterdam. Aqui está o endereço.', q:'best', fb:'Ótimo. Por isso é bom ter o endereço do hotel anotado em papel.'},
        {en:'In Amsterdam.', pt:'Em Amsterdam.', q:'ok', fb:'Eles precisam do endereço exato para entregar. Mostre a reserva.'},
        {en:"I don't know.", pt:'Não sei.', q:'bad', fb:'Sem endereço, não tem como entregar a mala. Tenha a reserva do hotel sempre à mão.'}]},
      {en:"Perfect. It should arrive at your hotel within 24 hours. Here's your reference number.", pt:'Perfeito. Ela deve chegar ao seu hotel em até 24 horas. Aqui está seu número de referência.', choices:[
        {en:'Thank you so much for your help.', pt:'Muito obrigada pela ajuda.', q:'best', fb:'Educada até o fim. E guarde bem esse número!'},
        {en:'OK, bye.', pt:'Ok, tchau.', q:'ok', fb:'Funciona, mas um agradecimento cai bem. E guarde o número de referência!'}]}
    ]},
    {t:'listen', en:'Could you open your suitcase, please?', v:'m', q:'O que o fiscal da alfândega pediu?', options:['Abrir a mala','Fechar a mala','Pesar a mala']},
    {t:'choice', q:'Você ia levar um queijo minas de presente. O que fazer?', options:['Não levar: laticínios de fora da UE são proibidos','Levar e passar pelo canal verde','Levar escondido no meio das roupas'], why:'Queijo, leite, carne e derivados vindos de fora da União Europeia são proibidos. Leve outro presente, como café ou artesanato.'},
    {t:'fill', text:'Nothing to ___.', options:['declare','declaring','declared'], en:'Nothing to declare.', pt:'Nada a declarar.'}
  ]
},
{
  id:'s4', emoji:'🚆', title:'Trem até Amsterdam', sub:'Passagem, plataforma e cartão',
  steps:[
    {t:'explain', kicker:'Etapa 4', title:'Do aeroporto para a cidade', body:'<p>A estação de trem fica dentro do aeroporto de Schiphol, logo abaixo do saguão de chegada. O trem até <b>Amsterdam Centraal</b> leva uns 15 minutos.</p><p><b>Jeito mais fácil de pagar:</b> encoste seu cartão de crédito ou débito por aproximação no leitor do portão. Isso se chama <b>check in</b>. Na saída, encoste de novo: <b>check out</b>. Se esquecer o check out, você paga uma tarifa bem mais cara.</p><p>Se preferir, compre o bilhete nas máquinas amarelas ou no balcão de atendimento.</p><div class="alert"><b>Palavra holandesa útil:</b> <i>spoor</i> quer dizer plataforma. Você vai ver "Spoor 1", "Spoor 2" nos painéis.</div>'},
    {t:'phrase', en:"I'd like a single ticket to Amsterdam Centraal, please.", pt:'Eu gostaria de uma passagem só de ida para Amsterdam Centraal, por favor.', note:'<b>Single</b> = só ida. <b>Return</b> = ida e volta. Cuidado para não confundir!'},
    {t:'phrase', en:'Which platform does the train leave from?', pt:'De qual plataforma sai o trem?'},
    {t:'phrase', en:'Does this train go to Amsterdam Centraal?', pt:'Este trem vai para Amsterdam Centraal?'},
    {t:'phrase', en:'Is this seat free?', pt:'Este lugar está livre?'},
    {t:'fill', text:'Which ___ does the train leave from?', options:['platform','door','street'], en:'Which platform does the train leave from?', pt:'De qual plataforma sai o trem?'},
    {t:'dialog', title:'No balcão de passagens', scene:'Você está no balcão de atendimento da estação de Schiphol.', who:'Atendente', v:'m', nodes:[
      {en:'Hi there. What can I do for you?', pt:'Olá. Em que posso ajudar?', choices:[
        {en:"Hi. I'd like a single ticket to Amsterdam Centraal, please.", pt:'Oi. Eu gostaria de uma passagem só de ida para Amsterdam Centraal, por favor.', q:'best', fb:'Perfeito: completo e educado.'},
        {en:'Ticket Amsterdam.', pt:'Passagem Amsterdam.', q:'ok', fb:'Ele vai entender, mas soa como telegrama. Use a frase completa com <b>I\'d like...</b>'},
        {en:'One return to Amsterdam, please.', pt:'Uma ida e volta para Amsterdam, por favor.', q:'bad', fb:'Cuidado! <b>Return</b> é ida e volta. Você só vai para a cidade, então peça <b>a single</b>.'}]},
      {en:'Sure. First or second class?', pt:'Claro. Primeira ou segunda classe?', choices:[
        {en:'Second class, please.', pt:'Segunda classe, por favor.', q:'best', fb:'Isso. A segunda classe é confortável e mais barata.'},
        {en:'The cheap one.', pt:'A mais barata.', q:'ok', fb:'Ele entende, mas o nome certo é <b>second class</b>.'},
        {en:'Yes.', pt:'Sim.', q:'bad', fb:'Pergunta com "ou" não se responde com "yes". Escolha: <b>first</b> ou <b>second</b>.'}]},
      {en:'How would you like to pay?', pt:'Como você gostaria de pagar?', choices:[
        {en:'By card, please.', pt:'No cartão, por favor.', q:'best', fb:'Perfeito. Na Holanda, quase tudo se paga com cartão.'},
        {en:'Card.', pt:'Cartão.', q:'ok', fb:'Funciona. <b>By card, please</b> é mais completo.'},
        {en:'With pleasure.', pt:'Com prazer.', q:'bad', fb:'<b>With pleasure</b> é "com prazer". Ele quer saber a forma de pagamento: <b>by card</b> ou <b>in cash</b>.'}]},
      {en:'Here you go. The next train leaves from platform 3 in ten minutes.', pt:'Aqui está. O próximo trem sai da plataforma 3 em dez minutos.', choices:[
        {en:'Platform 3 in ten minutes? Thank you!', pt:'Plataforma 3 em dez minutos? Obrigada!', q:'best', fb:'Ótima estratégia: repetir a informação confirma que você entendeu certo.'},
        {en:'Thanks.', pt:'Obrigada.', q:'ok', fb:'Tudo bem! Dica: repetir o número da plataforma ajuda a confirmar que você entendeu.'}]}
    ]},
    {t:'listen', optLang:'en', en:'The train to Amsterdam Centraal leaves from platform 3.', v:'m', q:'De qual plataforma sai o trem?', options:['3','13','30'], why:'<b>Three</b> = 3. Cuidado com <i>thirteen</i> (13) e <i>thirty</i> (30).'},
    {t:'choice', q:'Você encostou o cartão por aproximação para entrar na estação. O que fazer ao sair?', options:['Encostar o cartão de novo no leitor (check out)','Nada, já está pago','Comprar um bilhete na saída'], why:'Sem o <b>check out</b>, o sistema cobra uma tarifa alta, porque não sabe onde você desceu.'},
    {t:'build', pt:'Este lugar está livre?', answer:['Is','this','seat','free?'], extra:['chair','empty'], en:'Is this seat free?'}
  ]
},
{
  id:'s5', emoji:'🏨', title:'No hotel', sub:'Check-in, café da manhã e problemas',
  steps:[
    {t:'explain', kicker:'Etapa 5', title:'Chegando no hotel', body:'<p>O check-in na Holanda costuma ser entre 14h e 15h. Chegou antes? Peça para deixar a mala guardada e vá passear.</p><p>Muitos hotéis holandeses não têm ar-condicionado, mas têm aquecedor (<b>heating</b>).</p><div class="alert"><b>Atenção aos andares:</b> na Europa, o térreo é o <b>ground floor</b>. O <b>first floor</b> já é o primeiro andar acima dele.</div>'},
    {t:'phrase', en:'I have a reservation under the name Silva.', pt:'Tenho uma reserva no nome Silva.', note:'Troque <b>Silva</b> pelo seu sobrenome.'},
    {t:'phrase', en:'Could I leave my luggage here until check-in?', pt:'Posso deixar minha bagagem aqui até o check-in?'},
    {t:'phrase', en:'What time is breakfast?', pt:'Que horas é o café da manhã?'},
    {t:'phrase', en:"The heating in my room isn't working.", pt:'O aquecedor do meu quarto não está funcionando.'},
    {t:'phrase', en:'Could you call a taxi for me, please?', pt:'Pode chamar um táxi para mim, por favor?'},
    {t:'dialog', title:'Check-in no Hotel Nova', scene:'São 15h. Você chega à recepção com sua mala.', who:'Recepcionista', v:'m', nodes:[
      {en:'Good afternoon, welcome to Hotel Nova. How can I help you?', pt:'Boa tarde, bem-vinda ao Hotel Nova. Como posso ajudar?', choices:[
        {en:'Good afternoon. I have a reservation under the name Silva.', pt:'Boa tarde. Tenho uma reserva no nome Silva.', q:'best', fb:'Exatamente o que ele precisa ouvir.'},
        {en:'Reservation. Silva.', pt:'Reserva. Silva.', q:'ok', fb:'Funciona, mas a frase completa é mais simpática.'},
        {en:'I want a room.', pt:'Eu quero um quarto.', q:'bad', fb:'Você já tem reserva! Assim ele pode achar que você quer reservar outro quarto. Diga que tem reserva e o seu nome.'}]},
      {en:'Let me check... Yes, three weeks in a single room. Can I see your passport, please?', pt:'Deixe-me ver... Sim, três semanas num quarto individual. Posso ver seu passaporte, por favor?', choices:[
        {en:'Of course. Here you are.', pt:'Claro. Aqui está.', q:'best', fb:'Perfeito.'},
        {en:'Why?', pt:'Por quê?', q:'ok', fb:'Hotéis na Holanda sempre pedem o documento no check-in. É normal e obrigatório.'}]},
      {en:'Thank you. Your room is on the fourth floor, and breakfast is from seven to ten.', pt:'Obrigado. Seu quarto fica no quarto andar, e o café da manhã é das sete às dez.', choices:[
        {en:'Great. Is there Wi-Fi in the room?', pt:'Ótimo. Tem Wi-Fi no quarto?', q:'best', fb:'Boa! Aproveite para perguntar tudo que precisar.'},
        {en:'OK.', pt:'Ok.', q:'ok', fb:'Tudo bem. Mas aproveite o momento para tirar dúvidas: Wi-Fi, horários, elevador...'},
        {en:'From ten to seven?', pt:'Das dez às sete?', q:'bad', fb:'Ele disse <b>from seven to ten</b>: das 7h às 10h. Na dúvida, peça para repetir.'}]},
      {en:'Yes, the password is on your key card. Is there anything else?', pt:'Sim, a senha está no seu cartão-chave. Mais alguma coisa?', choices:[
        {en:"No, that's all. Thank you very much!", pt:'Não, é só isso. Muito obrigada!', q:'best', fb:'Check-in feito, todo em inglês! 🎉'},
        {en:'No.', pt:'Não.', q:'ok', fb:'Funciona. Com um <b>thank you</b> fica perfeito.'}]}
    ]},
    {t:'choice', q:'Seu quarto está gelado. O que você diz na recepção?', options:["The heating in my room isn't working.", 'My room is very hot.', 'I want to change my hotel.'], en:"The heating in my room isn't working."},
    {t:'listen', en:'Breakfast is served from seven to ten on the ground floor.', v:'m', q:'Quando e onde é o café da manhã?', options:['Das 7h às 10h, no térreo','Das 10h às 7h, no quarto andar','Das 7h às 10h, no quarto'], why:'<b>Ground floor</b> = térreo.'}
  ]
},
{
  id:'s6', emoji:'🆘', title:'Ajuda e emergências', sub:'Farmácia, se perder e o 112',
  steps:[
    {t:'explain', kicker:'Etapa 6', title:'Se algo der errado', body:'<p>O número de emergência em toda a Europa é o <b>112</b> (polícia, ambulância e bombeiros). A ligação é gratuita.</p><p>Farmácia em holandês é <b>apotheek</b>. Para remédios simples, como para dor de cabeça, também existe a <b>drogisterij</b> (drogaria), como a Kruidvat ou a Etos.</p><p>Na Holanda, antibióticos e muitos remédios só são vendidos com receita.</p><div class="alert">Anote em papel o endereço do hotel e um telefone de contato no Brasil. Se a bateria do celular acabar, você não fica perdida.</div>'},
    {t:'phrase', en:"Excuse me, could you help me? I'm lost.", pt:'Com licença, pode me ajudar? Estou perdida.'},
    {t:'phrase', en:"I don't feel well.", pt:'Não estou me sentindo bem.'},
    {t:'phrase', en:'I have a bad headache.', pt:'Estou com uma dor de cabeça forte.', note:'Outras dores: <i>stomach ache</i> (estômago), <i>toothache</i> (dente), <i>backache</i> (costas).'},
    {t:'phrase', en:"I've lost my phone.", pt:'Perdi meu celular.'},
    {t:'phrase', en:'Please call an ambulance!', pt:'Por favor, chamem uma ambulância!'},
    {t:'dialog', title:'Na farmácia', scene:'Você acordou com dor de cabeça e entrou numa apotheek.', who:'Farmacêutico', v:'m', nodes:[
      {en:'Good morning. How can I help?', pt:'Bom dia. Como posso ajudar?', choices:[
        {en:'Good morning. I have a bad headache. Do you have something for it?', pt:'Bom dia. Estou com uma dor de cabeça forte. Você tem algo para isso?', q:'best', fb:'Perfeito: disse o sintoma e pediu ajuda.'},
        {en:'Headache. Medicine.', pt:'Dor de cabeça. Remédio.', q:'ok', fb:'Ele vai entender, mas tente a frase completa: <b>I have a headache.</b>'},
        {en:'I need antibiotics.', pt:'Preciso de antibióticos.', q:'bad', fb:'Na Holanda, antibiótico só com receita médica. Descreva o que está sentindo e deixe o farmacêutico sugerir.'}]},
      {en:'I can give you some paracetamol. Are you allergic to anything?', pt:'Posso te dar paracetamol. Você tem alergia a alguma coisa?', choices:[
        {en:"No, I'm not allergic to anything.", pt:'Não, não tenho alergia a nada.', q:'best', fb:'Resposta completa e clara.'},
        {en:'No.', pt:'Não.', q:'ok', fb:'Correto! A frase completa é <b>I\'m not allergic to anything</b>.'},
        {en:'Yes, please.', pt:'Sim, por favor.', q:'bad', fb:'Cuidado! Assim você disse que <b>tem</b> alergia. Pergunta de saúde merece atenção: se não entendeu, peça para repetir.'}]},
      {en:'Take one tablet every six hours, with water. No more than four a day.', pt:'Tome um comprimido a cada seis horas, com água. No máximo quatro por dia.', choices:[
        {en:'One every six hours, maximum four a day. Thank you.', pt:'Um a cada seis horas, no máximo quatro por dia. Obrigada.', q:'best', fb:'Repetir a dose é a melhor forma de confirmar que você entendeu.'},
        {en:'OK, thanks.', pt:'Ok, obrigada.', q:'ok', fb:'Tudo bem, mas com remédio vale repetir a dose para confirmar.'}]}
    ]},
    {t:'listen', en:'Take one tablet twice a day after meals.', v:'m', q:'Como tomar o remédio?', options:['Um comprimido duas vezes por dia, depois das refeições','Dois comprimidos uma vez por dia, antes das refeições','Um comprimido a cada duas horas'], why:'<b>Twice a day</b> = duas vezes por dia. <b>After meals</b> = depois das refeições.'},
    {t:'choice', q:'Qual é o número de emergência na Holanda?', options:['112','190','911'], why:'O <b>112</b> funciona em toda a Europa.'},
    {t:'build', pt:'Não estou me sentindo bem.', answer:['I',"don't",'feel','well.'], extra:['am','bad'], en:"I don't feel well."}
  ]
}
];

/* ---------- Leituras dentro das etapas ----------
   Cada etapa ganha um texto (notícia ou história) com perguntas, inserido antes do
   último exercício. Para trocar ou adicionar textos, mexa só aqui.
   Fatos das notícias conferidos em outubro de 2026. */

const READINGS = {
  s1: {
    read:{kind:'news', title:'KLM: 100 years in the sky', date:'outubro de 2026', paras:[
      {en:"KLM Royal Dutch Airlines was founded in 1919, and it is the oldest airline in the world that still flies under its original name. Its planes are easy to [[recognise|reconhecer]]: they are light blue, like the Dutch sky on a sunny day.", pt:'A KLM foi fundada em 1919 e é a companhia aérea mais antiga do mundo que ainda voa com o nome original. Os aviões dela são fáceis de reconhecer: são azul-claros, como o céu holandês num dia de sol.'},
      {en:"For many years, KLM has given its business class passengers a small gift: a [[tiny|minúsculo]] blue and white house made of [[porcelain|porcelana]], filled with a Dutch drink called jenever. Each house is a copy of a real building in the Netherlands, and many people [[collect|colecionam]] them.", pt:'Há muitos anos, a KLM dá um presentinho aos passageiros da classe executiva: uma casinha minúscula de porcelana azul e branca, cheia de uma bebida holandesa chamada jenever. Cada casinha é a cópia de um prédio de verdade da Holanda, e muita gente coleciona.'},
      {en:"On long flights from Brazil, the crew usually speaks Dutch and English. Some flight attendants also speak Portuguese, but you can't be sure. So [[practise|pratique]] a few phrases before your trip. If you need something, just say \"Could I have some water, please?\" or \"Could I have a blanket?\" And before landing, you will hear: \"Please fasten your seatbelt.\"", pt:'Nos voos longos saindo do Brasil, a tripulação costuma falar holandês e inglês. Alguns comissários também falam português, mas não dá para ter certeza. Então pratique algumas frases antes da viagem. Se precisar de algo, é só dizer "Pode me dar um pouco de água, por favor?" ou "Pode me dar um cobertor?". E antes do pouso, você vai ouvir: "Por favor, aperte o cinto."'}
    ]},
    questions:[
      {t:'choice', q:'Qual é a cor dos aviões da KLM?', options:['Azul-claro','Vermelho','Verde']},
      {t:'choice', q:'O que a KLM dá de presente na classe executiva?', options:['Uma casinha de porcelana azul e branca','Um guarda-chuva holandês','Uma bicicleta em miniatura'], why:'<span class="eng">A tiny blue and white house made of porcelain</span> = uma casinha minúscula de porcelana azul e branca.'}
    ]
  },
  s2: {
    read:{kind:'news', title:'Goodbye, passport stamps', date:'outubro de 2026', paras:[
      {en:"Since April 2026, travellers from outside the European Union no longer get a [[stamp|carimbo]] in their passport when they enter the Schengen Area. Instead, a new digital system called EES [[records|registra]] who enters and leaves, and when.", pt:'Desde abril de 2026, viajantes de fora da União Europeia não recebem mais um carimbo no passaporte quando entram no espaço Schengen. Em vez disso, um novo sistema digital chamado EES registra quem entra e sai, e quando.'},
      {en:"The first time you arrive, the officer takes a photo of your face and scans four of your fingers. It only takes a few minutes. Children under twelve don't need to give their [[fingerprints|digitais]]. The officer may also ask \"What's the purpose of your visit?\" or \"How long are you staying?\", so have your return ticket and your hotel booking ready.", pt:'Na primeira vez que você chega, o oficial tira uma foto do seu rosto e escaneia quatro dedos. Leva só alguns minutos. Crianças com menos de doze anos não precisam dar as digitais. O oficial também pode perguntar "Qual é o motivo da sua visita?" ou "Quanto tempo você vai ficar?", então deixe a passagem de volta e a reserva do hotel à mão.'},
      {en:"The system also counts your days [[automatically|automaticamente]]. Tourists from Brazil can stay up to 90 days in any 180-day period, and the computer knows exactly when you arrived. In the first weeks, some airports had long queues, so be patient. And if you don't understand the officer, just say \"Excuse me, could you speak more slowly?\"", pt:'O sistema também conta seus dias automaticamente. Turistas do Brasil podem ficar até 90 dias em qualquer período de 180 dias, e o computador sabe exatamente quando você chegou. Nas primeiras semanas, alguns aeroportos tiveram filas longas, então tenha paciência. E se você não entender o oficial, é só dizer "Com licença, pode falar mais devagar?"'},
      {en:"Another system, called ETIAS, will ask visitors to fill in a form online before they travel. At the moment, the EU has not announced a date for it, so check the official website a few months before your trip.", pt:'Outro sistema, chamado ETIAS, vai pedir que os visitantes preencham um formulário online antes de viajar. Por enquanto, a UE não anunciou uma data, então confira o site oficial alguns meses antes da viagem.'}
    ]},
    questions:[
      {t:'choice', q:'O que mudou na imigração desde abril de 2026?', options:['O passaporte não é mais carimbado: tudo fica registrado no computador','Brasileiros agora precisam de visto','Não é mais preciso mostrar o passaporte']},
      {t:'choice', q:'Quanto tempo um turista brasileiro pode ficar?', options:['Até 90 dias a cada 180 dias','Até 30 dias','Até 1 ano'], why:'<span class="eng">Up to 90 days in any 180-day period</span> = até 90 dias em qualquer período de 180 dias.'},
      {t:'choice', q:'O que é o ETIAS?', options:['Um formulário online que ainda não tem data para começar','O novo carimbo do passaporte','Um tipo de seguro-viagem']}
    ]
  },
  s3: {
    read:{kind:'story', title:'The orange suitcase', paras:[
      {en:"Marta, a teacher from Recife, was waiting at the [[baggage reclaim|retirada de bagagem]] in Amsterdam. She was calm, because her suitcase was easy to find: it was bright orange, with a sticker of a toucan on it.", pt:'Marta, uma professora de Recife, esperava na retirada de bagagem em Amsterdam. Ela estava tranquila, porque a mala dela era fácil de achar: era laranja-viva, com um adesivo de tucano.'},
      {en:"Then she saw it. An old man was walking away with her orange suitcase! \"Excuse me, sir!\" she called. \"I think that's my suitcase.\" The man stopped, looked at the bag and [[frowned|franziu a testa]]. \"No, this is mine,\" he said.", pt:'Então ela viu. Um senhor estava indo embora com a mala laranja dela! "Com licença, senhor!", ela chamou. "Acho que essa é a minha mala." O homem parou, olhou para a mala e franziu a testa. "Não, essa é minha", ele disse.'},
      {en:"Marta smiled and pointed at the toucan. \"Does yours have a toucan?\" The man looked again, and his face turned red. \"Oh dear, I'm so sorry! Mine is orange too, but it has a [[tulip|tulipa]].\"", pt:'Marta sorriu e apontou para o tucano. "A sua tem um tucano?" O homem olhou de novo, e o rosto dele ficou vermelho. "Ai, meu Deus, me desculpe! A minha também é laranja, mas tem uma tulipa."'},
      {en:"They both laughed. A minute later, the man's suitcase came round on the [[belt|esteira]], with a big yellow tulip. \"Orange is the Dutch national colour,\" he explained. \"Half the suitcases here are orange!\" Then they walked out together through the green exit, the one that says \"Nothing to declare\".", pt:'Os dois riram. Um minuto depois, a mala do homem apareceu na esteira, com uma grande tulipa amarela. "Laranja é a cor nacional da Holanda", ele explicou. "Metade das malas aqui é laranja!" Depois, os dois saíram juntos pela saída verde, aquela que diz "Nada a declarar".'}
    ]},
    questions:[
      {t:'choice', q:'Por que a Marta achou fácil encontrar a mala dela?', options:['Era laranja, com um adesivo de tucano','Era muito pequena','Tinha o nome dela em letras grandes']},
      {t:'choice', q:'O que a Marta disse para o senhor?', options:["Excuse me, sir! I think that's my suitcase.", 'Hey! Give me my bag!', 'Sorry, is this your toucan?'], en:"Excuse me, sir! I think that's my suitcase.", why:'Educada e firme: <b>Excuse me</b> para chamar a atenção e <b>I think</b> para não acusar ninguém.'},
      {t:'choice', q:'Qual é a cor nacional da Holanda?', options:['Laranja','Azul','Vermelho']}
    ]
  },
  s4: {
    read:{kind:'news', title:'Pay for the train with your bank card', date:'outubro de 2026', paras:[
      {en:"In the Netherlands, you don't need to buy a paper ticket to take the train. You can simply hold your [[contactless|por aproximação]] bank card or your phone against the card reader at the [[gate|catraca]]. This is called checking in.", pt:'Na Holanda, você não precisa comprar um bilhete de papel para pegar o trem. Basta encostar seu cartão do banco por aproximação ou o celular no leitor da catraca. Isso se chama fazer o check-in.'},
      {en:"When you arrive at your station, you must hold the same card against the reader again to check out. If you forget, the system doesn't know where you got off, and you pay a much higher [[fare|tarifa]]. Travelling with a big suitcase? Look for the wider gate, so your luggage fits.", pt:'Quando chega à sua estação, você precisa encostar o mesmo cartão no leitor de novo para fazer o check-out. Se esquecer, o sistema não sabe onde você desceu, e você paga uma tarifa bem mais cara. Viajando com uma mala grande? Procure a catraca mais larga, para a bagagem passar.'},
      {en:"Use the same card for the whole trip. If you check in with your phone and check out with your plastic card, the system thinks they belong to two different people.", pt:'Use o mesmo cartão a viagem inteira. Se você fizer o check-in com o celular e o check-out com o cartão de plástico, o sistema acha que são duas pessoas diferentes.'},
      {en:"Prefer a paper ticket? At the desk, ask for \"a single ticket to Amsterdam Centraal\" and check which platform your train leaves from. On the train, ask \"Is this seat free?\" before you sit down. Dutch trains are usually [[on time|pontuais]], but there is often work on the tracks at weekends.", pt:'Prefere bilhete de papel? No balcão, peça "uma passagem só de ida para Amsterdam Centraal" e confira de qual plataforma sai o seu trem. No trem, pergunte "Este lugar está livre?" antes de se sentar. Os trens holandeses costumam ser pontuais, mas muitas vezes há obras nos trilhos nos fins de semana.'}
    ]},
    questions:[
      {t:'choice', q:'O que acontece se você esquecer o check-out?', options:['Você paga uma tarifa bem mais cara','Nada, a viagem já está paga','O trem não sai da estação']},
      {t:'choice', q:'Por que usar o mesmo cartão na entrada e na saída?', options:['Celular e cartão de plástico contam como pessoas diferentes','O cartão de plástico é mais barato','O celular não funciona nos trens']}
    ]
  },
  s5: {
    read:{kind:'news', title:"Amsterdam's tourist tax", date:'outubro de 2026', paras:[
      {en:"If you stay in a hotel in Amsterdam, you pay a tourist tax on top of the room price. In 2026, it is 12.5% of the price of your room, one of the highest in Europe.", pt:'Quem se hospeda num hotel em Amsterdam paga uma taxa turística além do preço do quarto. Em 2026, ela é de 12,5% do preço do quarto, uma das mais altas da Europa.'},
      {en:"The city says it needs the money because there are too many tourists in the [[city centre|centro da cidade]]. On busy days, the narrow streets near the canals are full of people, and many [[residents|moradores]] complain about the noise.", pt:'A cidade diz que precisa do dinheiro porque há turistas demais no centro. Nos dias mais cheios, as ruas estreitas perto dos canais ficam lotadas, e muitos moradores reclamam do barulho.'},
      {en:"The tax may go up again, because the city has [[plans|planos]] to raise it a little every year. Some hotels add it to your bill at the end of your stay, so don't be surprised if the total is higher than the price on the website.", pt:'A taxa pode subir de novo, porque a cidade tem planos de aumentá-la um pouco a cada ano. Alguns hotéis cobram a taxa no fim da estadia, então não se assuste se o total for maior que o preço do site.'},
      {en:"A tip to save money: some travellers stay in smaller cities like Haarlem or Utrecht, which are only a short train ride from Amsterdam. Wherever you stay, the check-in is the same: say \"I have a reservation under the name...\", and don't forget to ask \"What time is breakfast?\"", pt:'Uma dica para economizar: alguns viajantes ficam em cidades menores, como Haarlem ou Utrecht, que ficam a uma curta viagem de trem de Amsterdam. Onde quer que você fique, o check-in é igual: diga "Tenho uma reserva no nome..." e não se esqueça de perguntar "Que horas é o café da manhã?".'}
    ]},
    questions:[
      {t:'choice', q:'Quanto é a taxa turística de Amsterdam em 2026?', options:['12,5% do preço do quarto','1 euro por noite','Não existe taxa']},
      {t:'choice', q:'Por que o total do hotel pode ser maior que o preço do site?', options:['Alguns hotéis cobram a taxa no fim da estadia','O café da manhã é obrigatório','O euro fica mais caro à noite']}
    ]
  },
  s6: {
    read:{kind:'story', title:'A phone on the tram', paras:[
      {en:"Lúcia was on a tram in Amsterdam when she [[realised|percebeu]] that her phone was not in her bag. Her heart [[sank|gelou]], and she felt a headache coming. All her photos, her maps and her hotel address were on that phone.", pt:'Lúcia estava num bonde em Amsterdam quando percebeu que o celular não estava na bolsa. Ela gelou e sentiu uma dor de cabeça chegando. Todas as fotos, os mapas e o endereço do hotel estavam naquele celular.'},
      {en:"She took a deep breath and asked the woman next to her: \"Excuse me, could you help me? I think I've lost my phone.\" The woman smiled. \"Don't worry. Let's call it.\"", pt:'Ela respirou fundo e perguntou à mulher ao lado: "Com licença, você pode me ajudar? Acho que perdi meu celular." A mulher sorriu. "Não se preocupe. Vamos ligar para ele."'},
      {en:"The woman called Lúcia's number, and they heard a phone ringing at the back of the tram. A young man was holding it. \"I found it on the seat,\" he said. \"I was going to give it to the [[driver|motorista]].\"", pt:'A mulher ligou para o número da Lúcia, e elas ouviram um celular tocando no fundo do bonde. Um rapaz estava com ele. "Achei no banco", ele disse. "Eu ia entregar para o motorista."'},
      {en:"Lúcia thanked them both many times. That evening, she wrote her hotel address on a piece of paper and put it in her [[wallet|carteira]]. \"Now, if I'm lost, I can show this to anyone,\" she thought.", pt:'Lúcia agradeceu aos dois muitas vezes. Naquela noite, ela anotou o endereço do hotel num papel e guardou na carteira. "Agora, se eu estiver perdida, posso mostrar isto para qualquer pessoa", ela pensou.'}
    ]},
    questions:[
      {t:'choice', q:'O que a Lúcia perdeu?', options:['O celular','A carteira','O passaporte']},
      {t:'choice', q:'Como ela pediu ajuda?', options:["Excuse me, could you help me? I think I've lost my phone.", 'Give me your phone!', 'Where is the driver?'], en:"Excuse me, could you help me? I think I've lost my phone."},
      {t:'choice', q:'O que ela fez naquela noite?', options:['Anotou o endereço do hotel num papel e guardou na carteira','Comprou um celular novo','Voltou para o Brasil']}
    ]
  }
};

/* ---------- Expressões aprendidas em cada etapa ----------
   Nos textos (leituras, histórias e Notícia da semana), as expressões das etapas que ela
   já fez aparecem sublinhadas em verde, para praticar o que acabou de aprender.
   As notícias novas devem usar algumas destas expressões. */

const KEYWORDS = [
  {stage:'s1', en:'Could I have', pt:'Pode me dar...? / Posso ter...?'},
  {stage:'s1', en:'Excuse me', pt:'Com licença'},
  {stage:'s1', en:'fasten your seatbelt', pt:'aperte o cinto'},
  {stage:'s1', en:'blanket', pt:'cobertor'},
  {stage:'s1', en:'landing', pt:'pouso / pousando'},
  {stage:'s1', en:'Could you help me', pt:'Pode me ajudar?'},
  {stage:'s2', en:'purpose of your visit', pt:'motivo da sua visita'},
  {stage:'s2', en:'on holiday', pt:'de férias'},
  {stage:'s2', en:'How long are you staying', pt:'Quanto tempo você vai ficar?'},
  {stage:'s2', en:'Where are you staying', pt:'Onde você vai ficar hospedada?'},
  {stage:'s2', en:'return ticket', pt:'passagem de volta'},
  {stage:'s2', en:'booking', pt:'reserva'},
  {stage:'s2', en:'queue', pt:'fila'},
  {stage:'s2', en:'travel insurance', pt:'seguro-viagem'},
  {stage:'s2', en:'slowly', pt:'devagar'},
  {stage:'s3', en:'suitcase', pt:'mala'},
  {stage:'s3', en:'luggage', pt:'bagagem'},
  {stage:'s3', en:"didn't arrive", pt:'não chegou'},
  {stage:'s3', en:'baggage reclaim', pt:'retirada de bagagem'},
  {stage:'s3', en:'baggage tag', pt:'etiqueta da bagagem'},
  {stage:'s3', en:'nothing to declare', pt:'nada a declarar'},
  {stage:'s4', en:'single ticket', pt:'passagem só de ida'},
  {stage:'s4', en:'platform', pt:'plataforma'},
  {stage:'s4', en:'Is this seat free', pt:'Este lugar está livre?'},
  {stage:'s4', en:'check in', pt:'fazer check-in (entrada)'},
  {stage:'s4', en:'check out', pt:'fazer check-out (saída)'},
  {stage:'s5', en:'reservation under the name', pt:'reserva no nome de'},
  {stage:'s5', en:'reservation', pt:'reserva'},
  {stage:'s5', en:'What time is breakfast', pt:'Que horas é o café da manhã?'},
  {stage:'s5', en:'breakfast', pt:'café da manhã'},
  {stage:'s5', en:'heating', pt:'aquecedor'},
  {stage:'s5', en:'ground floor', pt:'térreo'},
  {stage:'s5', en:'call a taxi', pt:'chamar um táxi'},
  {stage:'s6', en:"I've lost", pt:'perdi'},
  {stage:'s6', en:"I'm lost", pt:'estou perdida'},
  {stage:'s6', en:"don't feel well", pt:'não estou me sentindo bem'},
  {stage:'s6', en:'headache', pt:'dor de cabeça'},
  {stage:'s6', en:'ambulance', pt:'ambulância'}
];

// Insere cada leitura (texto + perguntas) antes do último exercício da etapa
STAGES.forEach(s => {
  const r = READINGS[s.id];
  if (r) s.steps.splice(s.steps.length - 1, 0, {t:'read', ...r.read}, ...r.questions);
});

const SOON = [
  {emoji:'☕', title:'Pela cidade', sub:'Cafés, museus e bicicletas'},
  {emoji:'🛍️', title:'Compras', sub:'Mercado, lojas e tamanhos'},
  {emoji:'💬', title:'Conversando com holandeses', sub:'Bate-papo e amizades'},
  {emoji:'📞', title:'Ao telefone', sub:'Ligar para o hotel ou um restaurante'}
];

/* ---------- Histórias ---------- */

const STORIES = [
{
  id:'h1', emoji:'🛂', title:'Capítulo 1: A longa fila', en_title:'The long queue',
  paras:[
    {en:"Helena was tired. The flight from São Paulo had taken almost twelve hours, and she had slept very little. When the plane landed at Schiphol, it was seven o'clock in the morning and the sky was grey.", pt:'Helena estava cansada. O voo de São Paulo tinha levado quase doze horas, e ela tinha dormido muito pouco. Quando o avião pousou em Schiphol, eram sete da manhã e o céu estava cinza.'},
    {en:"She followed the other passengers and the signs that said \"All passports\". The [[queue|fila]] was long, and Helena felt her heart beating fast. She held a blue folder with all her documents: her [[return ticket|passagem de volta]], her hotel [[booking|reserva]] and her [[travel insurance|seguro-viagem]].", pt:'Ela seguiu os outros passageiros e as placas que diziam "All passports". A fila era longa, e Helena sentia o coração batendo rápido. Ela segurava uma pasta azul com todos os documentos: a passagem de volta, a reserva do hotel e o seguro-viagem.'},
    {en:"When it was her turn, a tall officer with a serious face looked at her passport. \"Good morning. What's the purpose of your visit?\" he asked. Helena took a [[deep breath|respiração profunda]]. \"Tourism. I'm here on holiday for three weeks,\" she answered.", pt:'Quando chegou a vez dela, um oficial alto, de rosto sério, olhou o passaporte. "Bom dia. Qual é o motivo da sua visita?", ele perguntou. Helena respirou fundo. "Turismo. Estou aqui de férias por três semanas", respondeu.'},
    {en:"\"Where are you staying?\" Helena opened her folder and showed him the booking. \"At a small hotel in Amsterdam. Here is the address.\" The officer read it and asked her to put her fingers on a small [[scanner|leitor]] and to look at the camera.", pt:'"Onde você vai ficar?" Helena abriu a pasta e mostrou a reserva. "Num hotel pequeno em Amsterdam. Aqui está o endereço." O oficial leu e pediu que ela colocasse os dedos num pequeno leitor e olhasse para a câmera.'},
    {en:"Then he gave her passport back and, for the first time, he smiled. \"Enjoy your stay in the Netherlands.\" Helena walked away [[smiling|sorrindo]] too. The hardest part was over. Or so she thought.", pt:'Então ele devolveu o passaporte e, pela primeira vez, sorriu. "Aproveite sua estadia na Holanda." Helena saiu sorrindo também. A parte mais difícil tinha passado. Pelo menos era o que ela pensava.'}
  ],
  questions:[
    {t:'choice', q:'Por que a Helena estava cansada?', options:['O voo foi longo e ela dormiu pouco','Ela correu pelo aeroporto','Ela estava doente']},
    {t:'choice', q:'O que havia na pasta azul?', options:['Os documentos da viagem','Dinheiro e cartões','Presentes para amigos']},
    {t:'choice', q:'O que a Helena respondeu quando o oficial perguntou o motivo da visita?', options:["Tourism. I'm here on holiday for three weeks.", 'At a small hotel in Amsterdam.', 'Enjoy your stay.'], en:"Tourism. I'm here on holiday for three weeks."},
    {t:'choice', q:'O que quer dizer a última frase: <span class="eng">Or so she thought.</span>', options:['Pelo menos era o que ela pensava','Ela pensou em voltar ao Brasil','Ela pensou muito antes de responder'], why:'O capítulo termina com um suspense: algo ainda vai acontecer...'}
  ]
},
{
  id:'h2', emoji:'🧳', title:'Capítulo 2: Cadê a minha mala?', en_title:'Where is my suitcase?',
  paras:[
    {en:'At the [[baggage reclaim|retirada de bagagem]], Helena waited next to belt number 12. Bags of all colours went round and round. Twenty minutes later, the [[belt|esteira]] stopped, and her black suitcase with the red [[ribbon|fita]] was not there.', pt:'Na retirada de bagagem, Helena esperou ao lado da esteira número 12. Malas de todas as cores davam voltas e voltas. Vinte minutos depois, a esteira parou, e a mala preta com a fita vermelha não estava lá.'},
    {en:"\"Don't panic,\" she told herself. She saw a sign that said \"Baggage Services\" and walked to the desk. A young man with glasses was working there.", pt:'"Não entre em pânico", ela disse a si mesma. Ela viu uma placa que dizia "Baggage Services" e foi até o balcão. Um rapaz de óculos estava atendendo.'},
    {en:"\"Hi. My suitcase didn't arrive. I was on the flight from São Paulo,\" Helena said slowly. The man asked for her [[baggage tag|etiqueta da bagagem]], typed something on his computer and [[nodded|fez que sim com a cabeça]].", pt:'"Oi. Minha mala não chegou. Eu estava no voo de São Paulo", Helena disse devagar. O rapaz pediu a etiqueta da bagagem, digitou algo no computador e fez que sim com a cabeça.'},
    {en:"\"Your suitcase is still in São Paulo. It will arrive on tomorrow's flight, and we'll [[deliver|entregar]] it to your hotel.\" Helena couldn't believe it. All her clothes were in that suitcase!", pt:'"Sua mala ainda está em São Paulo. Ela vai chegar no voo de amanhã, e nós vamos entregá-la no seu hotel." Helena não conseguia acreditar. Todas as roupas dela estavam naquela mala!'},
    {en:"\"Is there anything I can do tonight?\" she asked. \"You can buy what you need and keep the [[receipts|recibos]]. The airline will [[pay you back|te reembolsar]].\" Helena smiled. Her English was working. Now she only needed a toothbrush.", pt:'"Tem alguma coisa que eu possa fazer hoje à noite?", ela perguntou. "Você pode comprar o que precisar e guardar os recibos. A companhia aérea vai te reembolsar." Helena sorriu. O inglês dela estava funcionando. Agora ela só precisava de uma escova de dentes.'}
  ],
  questions:[
    {t:'choice', q:'Onde estava a mala da Helena?', options:['Ainda em São Paulo','Num voo para Londres','Com outro passageiro']},
    {t:'choice', q:'O que o atendente sugeriu?', options:['Comprar o necessário e guardar os recibos','Voltar ao aeroporto no dia seguinte','Comprar uma mala nova'], why:'<span class="eng">Keep the receipts</span> = guardar os recibos. Com eles, a companhia aérea reembolsa.'},
    {t:'choice', q:'<span class="eng">Deliver</span> significa:', options:['Entregar','Perder','Procurar']},
    {t:'choice', q:'Qual frase a Helena usou no balcão?', options:["My suitcase didn't arrive.", 'I lost my baggages.', 'Where is the belt?'], en:"My suitcase didn't arrive."}
  ]
}
];

const STORIES_SOON = [
  {emoji:'🚲', title:'Capítulo 3: Bicicletas por toda parte'},
  {emoji:'🧀', title:'Capítulo 4: O mercado de queijos'}
];

/* ---------- Simulador de imigração ---------- */

const INTERVIEW = {
  v:'m',
  start:{en:'Good morning. Passport, please.', pt:'Bom dia. Passaporte, por favor.', choices:[
    {en:'Good morning. Here you are.', pt:'Bom dia. Aqui está.', q:'best', fb:'Cumprimentou e entregou. Perfeito.'},
    {en:'Yes.', pt:'Sim.', q:'ok', fb:'Funciona, mas ao entregar algo, o ideal é <b>Here you are</b> (aqui está).'},
    {en:"You're welcome.", pt:'De nada.', q:'bad', fb:'<b>You\'re welcome</b> é "de nada". Ao entregar algo, diga <b>Here you are</b>.'}]},
  core:[
    {en:"What's the purpose of your visit?", pt:'Qual é o motivo da sua visita?', choices:[
      {en:"Tourism. I'm here on holiday.", pt:'Turismo. Estou aqui de férias.', q:'best', fb:'Clara e direta.'},
      {en:'Holiday.', pt:'Férias.', q:'ok', fb:'Correto, só um pouco curto. <b>I\'m here on holiday</b> soa mais natural.'},
      {en:'I want to see if I can find a job here.', pt:'Quero ver se consigo um emprego aqui.', q:'bad', fb:'Nunca! Como turista você não pode trabalhar, e essa frase pode fazer o oficial negar sua entrada.'}]},
    {en:'How long are you staying?', pt:'Quanto tempo você vai ficar?', choices:[
      {en:'Three weeks. I fly back on the 20th of May.', pt:'Três semanas. Volto no dia 20 de maio.', q:'best', fb:'Perfeita: tempo e data de volta.'},
      {en:'Three weeks.', pt:'Três semanas.', q:'ok', fb:'Correto! Dizer a data de volta deixa tudo ainda mais claro.'},
      {en:"I don't know yet. Maybe longer.", pt:'Ainda não sei. Talvez mais.', q:'bad', fb:'Resposta arriscada: parece que você pode ficar além do permitido. Seja exata.'}]},
    {en:'Where are you staying?', pt:'Onde você vai ficar hospedada?', choices:[
      {en:'At Hotel Nova in Amsterdam. Here is my booking.', pt:'No Hotel Nova, em Amsterdam. Aqui está minha reserva.', q:'best', fb:'Ótimo, e com a reserva na mão.'},
      {en:'In Amsterdam.', pt:'Em Amsterdam.', q:'ok', fb:'Ele pode pedir o endereço. Tenha a reserva na mão.'},
      {en:"At a friend of a friend's house, I think.", pt:'Na casa de um amigo de um amigo, eu acho.', q:'bad', fb:'Resposta vaga e insegura. Diga com certeza onde vai ficar e tenha o endereço.'}]}
  ],
  extra:[
    {en:'Do you have a return ticket?', pt:'Você tem passagem de volta?', choices:[
      {en:'Yes, here it is. I fly back on the 20th of May.', pt:'Sim, aqui está. Volto no dia 20 de maio.', q:'best', fb:'Perfeito, e mostrando a passagem.'},
      {en:'Yes.', pt:'Sim.', q:'ok', fb:'Correto! Mostrar a passagem impressa ajuda.'},
      {en:'No, I will buy it later.', pt:'Não, vou comprar depois.', q:'bad', fb:'Sem passagem de volta, o oficial pode negar a entrada. Compre antes de viajar.'}]},
    {en:'How are you going to pay for your trip?', pt:'Como você vai pagar pela viagem?', choices:[
      {en:'With my credit card and some euros in cash.', pt:'Com meu cartão de crédito e alguns euros em dinheiro.', q:'best', fb:'Clara e específica.'},
      {en:'I have money.', pt:'Eu tenho dinheiro.', q:'ok', fb:'Certo, mas seja específica: cartão, dinheiro em espécie.'},
      {en:'My friend will give me money when I arrive.', pt:'Meu amigo vai me dar dinheiro quando eu chegar.', q:'bad', fb:'Depender do dinheiro de outra pessoa, sem comprovar, levanta suspeita.'}]},
    {en:'Are you travelling alone?', pt:'Você está viajando sozinha?', choices:[
      {en:"Yes, I'm travelling alone.", pt:'Sim, estou viajando sozinha.', q:'best', fb:'Correto e completo.'},
      {en:'Yes.', pt:'Sim.', q:'ok', fb:'Resposta curta é ótima aqui!'},
      {en:'No.', pt:'Não.', q:'bad', fb:'Se você está sozinha, diga a verdade: <b>Yes</b>. Nunca invente nada na imigração.'}]},
    {en:'Is this your first time in the Netherlands?', pt:'É a sua primeira vez na Holanda?', choices:[
      {en:"Yes, it's my first time.", pt:'Sim, é a minha primeira vez.', q:'best', fb:'Natural e correto.'},
      {en:'Yes, first.', pt:'Sim, primeira.', q:'ok', fb:'Entendível. A forma natural é <b>Yes, it\'s my first time</b>.'},
      {en:'The first time was good.', pt:'A primeira vez foi boa.', q:'bad', fb:'Resposta confusa. Ele só quer saber se é a primeira vez: <b>Yes, it\'s my first time.</b>'}]},
    {en:'What do you do in Brazil?', pt:'O que você faz no Brasil?', choices:[
      {en:"I'm retired. I live in Brazil with my family.", pt:'Sou aposentada. Moro no Brasil com minha família.', q:'best', fb:'Ótimo: mostra que sua vida está no Brasil. Adapte à sua realidade: <i>I\'m a teacher</i>, <i>I have a small business</i>...'},
      {en:'Nothing special.', pt:'Nada de especial.', q:'ok', fb:'Evite parecer que não tem vínculos com o Brasil. Diga sua profissão ou que é aposentada.'},
      {en:"Nothing. That's why I want to stay here.", pt:'Nada. Por isso quero ficar aqui.', q:'bad', fb:'Essa resposta sugere que você quer ficar na Europa. Nunca diga isso!'}]},
    {en:'Which cities are you going to visit?', pt:'Quais cidades você vai visitar?', choices:[
      {en:'Amsterdam, Utrecht and Rotterdam.', pt:'Amsterdam, Utrecht e Rotterdam.', q:'best', fb:'Específica e segura.'},
      {en:'Some cities.', pt:'Algumas cidades.', q:'ok', fb:'Muito vago. Cite duas ou três cidades.'},
      {en:'Europe.', pt:'Europa.', q:'bad', fb:'Europa não é cidade! Cite os lugares: <b>Amsterdam, Utrecht...</b>'}]},
    {en:'Do you have travel insurance?', pt:'Você tem seguro-viagem?', choices:[
      {en:'Yes. Here is my insurance certificate.', pt:'Sim. Aqui está o certificado do seguro.', q:'best', fb:'Perfeito, e com o certificado impresso.'},
      {en:'Yes, I have.', pt:'Sim, tenho.', q:'ok', fb:'Correto! Tenha o certificado impresso para mostrar.'},
      {en:"What's that? I don't need it.", pt:'O que é isso? Não preciso.', q:'bad', fb:'O seguro-viagem é muito recomendado e pode ser pedido. Leve o seu impresso.'}]},
    {en:'What is the address of your hotel?', pt:'Qual é o endereço do seu hotel?', choices:[
      {en:"It's on my booking. Here it is.", pt:'Está na minha reserva. Aqui está.', q:'best', fb:'Perfeito, papel na mão.'},
      {en:"It's in the city centre.", pt:'Fica no centro da cidade.', q:'ok', fb:'Vago. Mostre a reserva com o endereço completo.'},
      {en:"It's on my phone, but the battery is dead.", pt:'Está no meu celular, mas a bateria acabou.', q:'bad', fb:'Por isso é essencial ter o endereço impresso!'}]}
  ],
  end:[
    {en:'Please put your four fingers on the scanner.', pt:'Por favor, coloque quatro dedos no leitor.', choices:[
      {pt:'👉 Colocar quatro dedos no leitor', q:'best', fb:'Isso! É o registro de digitais do novo sistema europeu.'},
      {pt:'👉 Entregar o passaporte de novo', q:'bad', fb:'Ele pediu <b>fingers</b> (dedos) no <b>scanner</b> (leitor).'},
      {pt:'👉 Olhar para a câmera', q:'bad', fb:'Ainda não! Primeiro os dedos: <b>fingers on the scanner</b>.'}]},
    {en:'Now look at the camera, please.', pt:'Agora olhe para a câmera, por favor.', choices:[
      {pt:'👉 Olhar para a câmera', q:'best', fb:'Isso, foto tirada.'},
      {pt:'👉 Tirar o passaporte do leitor', q:'bad', fb:'<b>Look at the camera</b> = olhe para a câmera.'},
      {pt:'👉 Colocar os dedos no leitor', q:'bad', fb:'Os dedos já foram. Agora é <b>camera</b>.'}]},
    {en:'Thank you. Enjoy your stay in the Netherlands!', pt:'Obrigado. Aproveite sua estadia na Holanda!', choices:[
      {en:'Thank you! Have a nice day.', pt:'Obrigada! Tenha um bom dia.', q:'best', fb:'Entrada liberada! 🇳🇱'},
      {en:'You too.', pt:'Você também.', q:'ok', fb:'Simpático, mas "você também" não combina com "aproveite sua estadia". Um <b>Thank you!</b> basta.'}]}
  ]
};

/* ---------- Jogos ---------- */

const DICTATION = [
  {en:"I'm here on holiday.", pt:'Estou aqui de férias.'},
  {en:'Could you speak more slowly, please?', pt:'Pode falar mais devagar, por favor?'},
  {en:"My suitcase didn't arrive.", pt:'Minha mala não chegou.'},
  {en:'Where is the train station?', pt:'Onde fica a estação de trem?'},
  {en:'I have a reservation for three weeks.', pt:'Tenho uma reserva de três semanas.'},
  {en:'Could I have some water, please?', pt:'Pode me dar um pouco de água, por favor?'},
  {en:'Which platform does the train leave from?', pt:'De qual plataforma sai o trem?'},
  {en:"I don't feel well.", pt:'Não estou me sentindo bem.'},
  {en:'Is this seat free?', pt:'Este lugar está livre?'},
  {en:'What time is breakfast?', pt:'Que horas é o café da manhã?'},
  {en:'Could you repeat that, please?', pt:'Pode repetir, por favor?'},
  {en:"I'm staying at a hotel in Amsterdam.", pt:'Estou hospedada num hotel em Amsterdam.'},
  {en:'How much is this?', pt:'Quanto custa isto?'},
  {en:'Can I pay by card?', pt:'Posso pagar com cartão?'}
];

// Erros típicos de brasileiros. "w" é a posição da palavra errada (começando em 0).
const SPOT = [
  {s:'I have 55 years.', w:1, en:'I am 55 years old.', why:'Em inglês, idade usa o verbo <b>to be</b>: <i>I am 55 years old</i>. Nunca "I have".'},
  {s:'I lost my baggages.', w:3, en:'I lost my baggage.', why:'<b>Baggage</b> e <b>luggage</b> não têm plural.'},
  {s:'Can you speak more slow, please?', w:4, en:'Can you speak more slowly, please?', why:'Para dizer <i>como</i> se faz algo, use <b>-ly</b>: slow → <b>slowly</b>.'},
  {s:'I want to make a question.', w:3, en:'I want to ask a question.', why:'Em inglês, pergunta se <b>ask</b>, e não "make".'},
  {s:'The people here is very nice.', w:3, en:'The people here are very nice.', why:'<b>People</b> é plural em inglês: <b>people are</b>.'},
  {s:'I arrived yesterday night.', w:2, en:'I arrived last night.', why:'"Ontem à noite" é <b>last night</b>, e não "yesterday night".'},
  {s:'I am going to travel for Amsterdam.', w:5, en:'I am going to travel to Amsterdam.', why:'Destino usa <b>to</b>: <i>travel to</i>, <i>go to</i>.'},
  {s:"I didn't went to the museum.", w:2, en:"I didn't go to the museum.", why:'Depois de <b>didn\'t</b>, o verbo fica na forma básica: <b>go</b>.'},
  {s:'I am here since Monday.', w:1, en:'I have been here since Monday.', why:'Com <b>since</b> (desde), use <b>have been</b>: <i>I have been here since Monday</i>.'},
  {s:'My hotel is near of the station.', w:4, en:'My hotel is near the station.', why:'<b>Near</b> não pede "of": <i>near the station</i>.'},
  {s:'How much costs this ticket?', w:2, en:'How much is this ticket?', why:'Em inglês, a pergunta de preço é <b>How much is...?</b> ou <b>How much does it cost?</b>'},
  {s:'I am agree with you.', w:1, en:'I agree with you.', why:'<b>Agree</b> já é verbo. Nada de "I am agree": diga <b>I agree</b>.'}
];

// Pares extras para o jogo Contra o tempo (além das frases das etapas).
const EXTRA_PAIRS = [
  ['Where is the toilet?','Onde fica o banheiro?'], ['How much is it?','Quanto custa?'], ['Can I pay by card?','Posso pagar com cartão?'],
  ["I'd like a coffee.",'Eu gostaria de um café.'], ['Turn left','Vire à esquerda'], ['Turn right','Vire à direita'],
  ['Go straight on','Siga em frente'], ['Next to the station','Ao lado da estação'], ['Delayed','Atrasado'],
  ['Cancelled','Cancelado'], ['Departures','Partidas'], ['Arrivals','Chegadas'], ['Boarding pass','Cartão de embarque'],
  ['Receipt','Recibo'], ['Change','Troco'], ['Bike lane','Ciclovia'], ['Ground floor','Térreo'], ['Queue','Fila']
];

/* ---------- Lista da viagem ---------- */

const CHECKLIST = [
  {id:'passport', t:'Passaporte válido por pelo menos 3 meses depois da volta'},
  {id:'return', t:'Passagem de volta impressa'},
  {id:'hotel', t:'Reserva do hotel impressa, com endereço'},
  {id:'insurance', t:'Seguro-viagem (mínimo €30.000) impresso'},
  {id:'etias', t:'Conferir no site oficial da UE se o ETIAS já é exigido'},
  {id:'card', t:'Cartão de crédito internacional liberado para uso no exterior'},
  {id:'cash', t:'Um pouco de dinheiro em euros'},
  {id:'paper', t:'Endereço do hotel e telefone de contato anotados em papel'},
  {id:'plug', t:'Adaptador de tomada (na Holanda, tomada de dois pinos redondos)'},
  {id:'food', t:'Nada de carne, queijo ou leite na mala'}
];

/* ---------- Utilidades compartilhadas com o gerador de áudio ---------- */

const strip = s => String(s).replace(/\[\[([^|\]]+)\|[^\]]+\]\]/g, '$1');

// Nome do arquivo de áudio: "How are you?" -> how-are-you-q. Frases longas ganham um código curto.
function slug(text){
  const t = strip(text).trim().toLowerCase();
  let s = t.replace(/'/g,'').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  if (t.endsWith('?')) s += '-q';
  if (s.length > 60){
    let h = 5381;
    for (let i = 0; i < t.length; i++) h = ((h * 33) ^ t.charCodeAt(i)) >>> 0;
    s = s.slice(0, 50).replace(/-+$/,'') + '-' + h.toString(36);
  }
  return s;
}

// Idioma das opções de resposta de um exercício, para ler em voz alta quando ela toca.
// Completar, montar frase e caça ao erro são sempre em inglês. Nas outras, as opções são
// em inglês quando a resposta certa é a frase "en" do exercício, ou quando optLang:'en'.
function optLang(st){
  if (st.optLang) return st.optLang;
  if (st.t === 'fill' || st.t === 'build' || st.t === 'spot') return 'en';
  if (st.en && (st.options || []).some(o => strip(o) === strip(st.en))) return 'en';
  return 'pt';
}

window.HM = {optLang, STAGES, SOON, KEYWORDS, STORIES, STORIES_SOON, INTERVIEW, DICTATION, SPOT, EXTRA_PAIRS, CHECKLIST, strip, slug};
})();
