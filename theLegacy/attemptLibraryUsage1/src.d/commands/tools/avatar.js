module.exports =  {
  appMake:  {
    appName: 'avatar',
    appDescription: 'Show someone\'s avatar.',
    type: 'chatInput',
    permissions: [],
    build: [{ 
      commandName: 'user',
      commandDescription: 'Input user name.',
      commandType: 6,
      commandRequired: true
    }]
  },
  name: 'avatar',
  module: 'tools',
  async execute(msg)  {
    interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'deferedChannelMessage', 
      data: { content: `Handling request`, visibleForAll: true }
    })
      .catch((err) => { console.log(err) });
    const userGot = msg.data.resolved.users[msg.data.options[0].value];
    let avatarUrl = `https://cdn.discordapp.com/avatars/${userGot.id}/${userGot.avatar}.png?size=4096`;
    if(userGot.avatar && userGot.avatar.startsWith('a_')) avatarUrl = `https://cdn.discordapp.com/avatars/${userGot.id}/${userGot.avatar}.gif?size=4096`
    return interaction.createFollowupResponse({ 
      token: msg.token,
      content: avatarUrl 
    })
      .catch((err) => console.log(err));
  },
};
