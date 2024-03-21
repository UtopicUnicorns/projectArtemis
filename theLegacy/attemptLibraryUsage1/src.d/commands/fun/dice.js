module.exports =  {
  appMake:  {
    appName: 'dice',
    appDescription: 'Roll some dices',
    type: 'chatInput',
    permissions: [],
    build: [{
      commandName: 'sides',
      commandDescription: 'How many sides does your die have? (max 20)',
      commandType: 4,
      commandRequired: true
    },    
    {
      commandName: 'rolls',
      commandDescription: 'Roll the die how many times? (max 10)',
      commandType: 4,
      commandRequired: true 
    }]
  },
  name: 'dice',
  module: 'fun',
  async execute(msg)  {
    interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'deferedChannelMessage', 
      data: { content: `Handling request` }
    })
      .catch((err) => { console.log(err) });
    
    let sides = 6, rolls = 1, i = 0, total = 0, numberSel = [
      ":one:", ":two:", ":three:", ":four:",
      ":five:", ":six:", ":seven:", ":eight:", 
      ":nine:", ":one::zero:", ":one::one:", ":one::two:",
      ":one::three:", ":one::four:", ":one::five:", ":one::six:",
      ":one::seven:", ":one::eight:", ":one::nine:", ":two::zero:"
    ];
    
    if(msg.data.options.find(item => item.name === 'sides')) sides = msg.data.options.find(item => item.name === 'sides').value;
    if(msg.data.options.find(item => item.name === 'rolls')) rolls = msg.data.options.find(item => item.name === 'rolls').value;
    
    if(sides > 20) sides = 20;
    if(sides < 6) sides = 6;
    if(rolls > 10) rolls = 10;
    if(rolls < 1) rolls = 1;
    
    let numCol = [`*Die count: ${rolls}, Max Die num: ${sides}*\n`];
    while (i < rolls) {
      let randomNum = Math.floor(Math.random() * sides);
      numCol.push(`Dice **${Math.floor(i + 1)}**: ${numberSel[randomNum]}\n`);
      total = Math.floor(total + randomNum + 1);
      i++;
    }
   
   return interaction.createFollowupResponse({ 
      token: msg.token,
      content: `${numCol.join("")}\nTotal: **${total}**` 
    })
      .catch((err) => console.log(err));
  },
};
