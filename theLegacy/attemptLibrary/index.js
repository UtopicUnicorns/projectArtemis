exports.lib = async function (config) {
                                        path = require('path');
                                        util = require("util");
                                        https = await require('https');
                                        fs = await require('fs');
                                        ws = await require('./webSocket');
                                        fd = await require('./classes/formData');
                                        path = await require('path');
                                        os = await require('os');
                                        postMan = await require('events');
                                        const { spawn } = require('node:child_process');
                                        configData = await require(path.dirname(process.argv[1]) + config);
                                        errorConstruct = await require('./classes/errorClass');
                                        buildConstruct = await require('./classes/buildClass.js');
                                        endPointConstruct = await require('./classes/endPointClass');
                                        applicationConstruct = await require('./classes/applicationClass');
                                        interactionConstruct = await require('./classes/interactionClass');
                                        auditConstruct = await require('./classes/auditClass');
                                        autoModerationConstruct = await require('./classes/autoModerationClass');
                                        channelConstruct = await require('./classes/channelClass');
                                        emojiConstruct = await require('./classes/emojiClass');
                                        guildConstruct = await require('./classes/guildClass');
                                        guildEventConstruct = await require('./classes/guildEventClass');
                                        guildTemplateConstruct = await require('./classes/guildTemplateClass');
                                        inviteConstruct = await require('./classes/inviteClass');
                                        stageConstruct = await require('./classes/stageClass');
                                        stickerConstruct = await require('./classes/stickerClass');
                                        userConstruct = await require('./classes/userClass');
                                        regionConstruct = await require('./classes/regionClass');
                                        webhookConstruct = await require('./classes/webhookClass.js');
                                        cacheConstruct = await require('./classes/cacheClass');
                                        heartConstruct = await require('./classes/heartClass');
                                        voiceConstruct = await require('./classes/voiceClass');
                                        presenceConstruct = await require('./classes/presenceClass');
                                        linkLava = await require('./lavaLink');
                                        camelCase = function (str)  { 
                                                                      return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()); 
                                                                    };
                                        token = configData.botToken;
                                        appId = configData.appId;
                                        intent = configData.intent;
                                        useBuildInLavaLink = configData.useBuildInLavaLink;
                                        lavaLinkHost = configData.lavaLinkHost;
                                        lavaLinkPwd = configData.lavaLinkPwd;
                                        botId = configData.botId;
                                        botCaching = configData.caching;
                                        httpsConstruct = buildConstruct.httpsConstruct;
                                        appBuild = buildConstruct.appConstruct;
                                        embed = buildConstruct.embedConstruct;
                                        component = buildConstruct.componentConstruct;
                                        botConstruct = buildConstruct.botConstruct;
                                        timeConstruct = buildConstruct.timeConstruct;
                                        mimeConstruct = buildConstruct.mimeConstruct;
                                        relConstruct = buildConstruct.relConstruct;
                                        newError = new errorConstruct();
                                        fly = new httpsConstruct();
                                        bot = new botConstruct();	
                                        time = new timeConstruct();	
                                        mime = new mimeConstruct();
                                        rel = new relConstruct();
                                        class Emitter extends postMan {}
                                        mailMan = new Emitter();
                                        cache = new cacheConstruct();
                                        heart = new heartConstruct();
                                        exit = new endPointConstruct();
                                        application = new applicationConstruct();
                                        interaction = new interactionConstruct();
                                        audit = new auditConstruct();
                                        autoMod = new autoModerationConstruct();
                                        channel = new channelConstruct();
                                        emoji = new emojiConstruct();
                                        guild = new guildConstruct();
                                        guildEvent = new guildEventConstruct();
                                        guildTemplate = new guildTemplateConstruct();
                                        invite = new inviteConstruct();
                                        stage = new stageConstruct();
                                        sticker = new stickerConstruct();
                                        user = new userConstruct();
                                        region = new regionConstruct();
                                        webhook = new webhookConstruct();
                                        presence = new presenceConstruct();
                                        heart.run(this);
                                        if(useBuildInLavaLink)  {
                                                                  const lavaSpawn = await spawn('java', ['-Duser.dir=' + path.dirname(process.argv[1]), '-jar', path.dirname(__dirname) + '/project_bow/lavaLink/Lavalink.jar']);
                                                                  lavaSpawn.stderr.on('data', (data) => { 
                                                                                                          console.error(data.toString()); 
                                                                                                        });
                                                                  process.on('exit', code => process.kill(lavaSpawn.pid));
                                                                  lavaSpawn.on('exit', (code) =>  { 
                                                                                                    console.log(`Child exited with code ${code}`); 
                                                                                                  });
                                                                }
                                        voice = new voiceConstruct();
                                        lamp = new linkLava.Node( {
                                                                    password: lavaLinkPwd,
                                                                    userID: botId,
                                                                    host: lavaLinkHost,
                                                                    send(guildID, packet) { 
                                                                                            return heart.getSocket().send(JSON.stringify(packet)); 
                                                                                          },
                                                                  })
                                          .on('error', (e) => {
                                                                /**/
                                                              });
                                        voiceStatePass = function(pass) {
                                                                          if (pass.t === 'VOICE_STATE_UPDATE') lamp.voiceStateUpdate(pass.d);
                                                                          if (pass.t === 'VOICE_SERVER_UPDATE') lamp.voiceServerUpdate(pass.d);
                                                                        };
                                        lamp.on('event', (event) => mailMan.emit('playerEvent', event));
                                        mailMan.on('voiceStateUpdateSend', voiceStatePass);
                                        mailMan.on('voiceServerUpdateSend', voiceStatePass);
                                      };

