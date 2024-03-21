/*  The config has to be a readable and parsable JSON.
    do note that the path needs to start in the library directory.
    The await import is needed to ensure the complete library is loaded before you tinker with it.
    
    Config path is a partial path where the starting point is your working directory.
const projectBow = await import('./library/index.js');
  await projectBow.lib('./configs.json');

/*  You can choose to ignore everything and use the raw events instead.  */
const projectBow = await import('project_bow');
await projectBow.lib('/configs.json');
mailMan.on('rawSocket', async (msg) => {  /**/  });
