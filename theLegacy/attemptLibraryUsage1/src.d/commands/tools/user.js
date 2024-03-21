module.exports =  {
  appMake:  {
    appName: 'user',
    appDescription: 'View basic user info.',
    type: 'chatInput',
    permissions: [],
    build:  [{ 
      commandName: 'user',
      commandDescription: 'Input user name.',
      commandType: 6,
      commandRequired: true
    }]
  },
  name: 'user',
  module: 'tools',
  async execute(msg, sql)  {
    interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'deferedChannelMessage', 
      data: { content: `Handling request`, visibleForAll: true }
    })
      .catch((err) => { console.log(err) });
    const userGot = msg.data.resolved.users[msg.data.options[0].value];
    const userInfo = await guild.getMember({	guild: msg.guild_id,	member: userGot.id	});
    let avatarUrl = `https://cdn.discordapp.com/avatars/${userGot.id}/${userGot.avatar}.png?size=4096`;
    if(userGot.avatar && userGot.avatar.startsWith('a_')) avatarUrl = `https://cdn.discordapp.com/avatars/${userGot.id}/${userGot.avatar}.gif?size=4096`
    let embedObject = new embed()
      .description(`<@&${userInfo.roles.join('><@&').slice(0,500)}>`)
      .field('User ID:', userInfo.user.id, true)
      .field('User Name:', userInfo.user.username, true)
      .color('FF00FF')
      .author(`${userInfo.user.username}`, avatarUrl)
      .thumbnail(avatarUrl)
      .timestamp(userInfo.joined_at)
      .footer('🕐 Member since: ')
      .output;
    return interaction.createFollowupResponse({ 
      token: msg.token,
      embeds: embedObject 
    })
      .catch((err) => console.log(err));
  },
};
