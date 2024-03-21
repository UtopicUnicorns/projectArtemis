function defer() {
  var res, rej;
  var promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;  
  return promise;
}
module.exports =  {
  appMake:  {
    appName: 'manpage',
    appDescription: 'View Manual Pages for applications.',
    type: 'chatInput',
    permissions: [],
    build: [{
      commandName: 'page',
      commandDescription: 'Input a manual page t display',
      commandType: 3,
      commandRequired: true,
    }] 
  },
  name: 'manpage',
  module: 'tools',
  async execute(msg)  {
    interaction.create({
      id: msg.id, 
      token: msg.token, 
      type: 'deferedChannelMessage', 
      data: { content: `Handling request` }
    })
      .catch((err) => { console.log(err) });
    let fileGet;
    let waitForFile = defer();
    let appCheck = msg.data.options[0].value;
    fs.readFile(`./assets/manPages/${appCheck}.md`, 'utf8', (err, data) => {
      if (err) return waitForFile.resolve(true);
      fileGet = data;
      waitForFile.resolve(true);
    });
    await waitForFile;
    let contentForm;
    if(!fileGet) contentForm = 'No manualpage found.';
    if(fileGet) contentForm = fileGet;
    return interaction.createFollowupResponse({ 
      token: msg.token,
      content: contentForm 
    })
      .catch((err) => console.log(err));
  },
};
