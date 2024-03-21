/*  _____           _           _                   _                 _     
   |  __ \         (_)         | |       /\        | |               (_)    
   | |__) | __ ___  _  ___  ___| |_     /  \   _ __| |_ ___ _ __ ___  _ ___ 
   |  ___/ '__/ _ \| |/ _ \/ __| __|   / /\ \ | '__| __/ _ \ '_ ` _ \| / __|
   | |   | | | (_) | |  __/ (__| |_   / ____ \| |  | ||  __/ | | | | | \__ \
   |_|   |_|  \___/| |\___|\___|\__| /_/    \_\_|   \__\___|_| |_| |_|_|___/
                  _/ |                                                      
                 |__/   Project Bow, Discord API wrapper                  */
/*  dataHandler class has multiple methods of sending data;
      await new handleData().post()
      await new handleData().get()
      await new handleData().patch()
      await new handleData().delete()
      await new handleData().put()
      await new handleData().trace()
      await new handleData().head()
      await new handleData().connect()
      await new handleData().options()
      await new handleData().free()
      await new handleData().multiForm()
        While you can manually call this function, it is adviced to let the other functions in this file do it.
        This function is specifically for multiPart file sending.
        Also note that this function is not async, since loading files into the buffer takes time and await can sometimes bug.

*/
class dataHandler { /* Exports methods for communicating with an external source. */
  multiForm( data ) { /* Processing function for multiform/part data */
    function processingUnit( upload ) { /* Processing unit for messages */
      let uploads = []; /* Items to be uploaded */
      let fields = {}; /* Fields for multiForm */
      let formatToSend = {}; /* JSON object holder for new objects and arrays. */
      
      if(upload.content) formatToSend['content'] = upload.content; /* Message content can hold up to 2000 characters. */
      if(upload.messageReference) formatToSend['message_reference'] = upload.messageReference; /* Include to make your message a reply. */
      if(upload.embeds) formatToSend['embeds'] = upload.embeds; /* Up to 10 rich embeds (up to 6000 characters). */
      if(upload.tts) formatToSend['tts'] = upload.tts; /* true if this is a TTS message. */
      if(upload.nonce) formatToSend['nonce'] = upload.nonce; /* Can be used to verify a message was sent (up to 25 characters). Value will appear in the Message Create event. */
      if(upload.enforceNonce) formatToSend['enforce_nonce'] = upload.enforceNonce; /* If true and nonce is present, it will be checked for uniqueness in the past few minutes. If another message was created by the same author with the same nonce, that message will be returned and no new message will be created. */
      if(upload.allowedMentions) formatToSend['allowed_mentions'] = upload.allowedMentions; /* Allowed mentions for the message */
      if(upload.flags) formatToSend['flags'] = upload.flags; /* Message flags combined as a bitfield (only SUPPRESS_EMBEDS and SUPPRESS_NOTIFICATIONS can be set). */
      if(upload.stickerIds) formatToSend['sticker_ids'] = upload.stickerIds; /* IDs of up to 3 stickers in the server to send in the message. */
      if(upload.components) formatToSend['components'] = upload.components; /* Components to include with the message. */
      if(upload && upload.attachments) { /* If attachments are present. */
        formatToSend['attachments'] = []; /* Attachment objects with filename and description. */
        for(let i of upload.attachments) { /* Loop over attachment objects. */
          formatToSend['attachments'].push({ /* Push new formatted attachment into the formatToSend object. */
            id: formatToSend['attachments'].length, /* Unique ID determined by *loading* preference. */
            description: i.description, /* The description given by the user. */
            filename: i.filename /* Filename is also given by the user. */
          });
        }
      }
      
      fields['payload_json'] = JSON.stringify(formatToSend, null, '\t'); /* In accordance with Discord API docs. */
      
      if(upload && upload.attachments) { /* If attachments are present. */
        for (let i of upload.attachments) { /* For each attachment in the load. */
          let ext = path.extname(i.file.toLowerCase()); /* Strip extention from the file. */
          let mimeType = mrMime.type(ext); /* Determine mimetype based by extention. */
          let attachmentConstruct = { /* New object for the uploading file. */
            id: uploads.length, /* Unique ID determined by order of preference. */
            description: i.description, /* Description set by the user. */
            filename: i.filename, /* Filename set by the user. */
          };
          fields[`files[${uploads.length}]`] = { /* Create new field for the upload. */
            name: i.filename, /* Filename as determined by user. */
            type: mimeType, /* Mimetype determined by extention. */
            data: fs.readFileSync(i.file), /* Provided the file is valid, load into buffer. */
          };
          uploads.push(attachmentConstruct); /* Push new object into upload handler. */
        }
      }
      
      const boundary = createNewBoundary(); /* Create a boundary token. */
      const header = { 'Content-Type': `multipart/form-data; boundary=${boundary}` }; /* Apply boundary to header and set to multiForm. */
      const contentType = `multipart/form-data; boundary=${boundary}`; /* Contenttype is the same as the header. */
      const body = formData(fields, boundary); /* Create the fields using formData(). */
      let fetcher = []; /* Fetcher is an empty array holder. */
      for (let i of body) { fetcher.push(Buffer.from(i)); } /* For each part of the *body* push into fetcher using toBuffer to assur safety of buffered files. */
      let newBuffer = Buffer.concat(fetcher); /* From the fetcher we make a new singular buffer. */
      return [newBuffer, contentType]; /* Return data and a boundary token. */
    }
        
    function formData(fields, boundary) { /* Processes the fields and uploads of objects */
      let body = []; /* Holder for final body to be send. */
      if (!boundary) boundary = createNewBoundary(); /* If no boundary, create one. */
      else if (typeof boundary !== 'string') throw new TypeError('`boundary` parameter should be a string.'); /* String because of dashes. */
      if (fields && fields.constructor === Object) { /* If proper object is made. */
        for (let fieldName in fields) { /* For every field to be created. */
          let fieldData = fields[fieldName]; /* Create fieldName. */
          if (Array.isArray(fieldData)) fieldName += '[]'; /* If needed create array. */
          else fieldData = [fieldData]; /* Place into array. */
          if (!fieldData.length) fieldData = [null]; /* Null if no data. */
          fieldData.forEach(field => { /* For every field in the data object. */
            if (field && field.constructor === Object) { /* Most likely a buffer. */
              body.push(`--${boundary}\r\n`); /* Add boundary. */
              body.push(`Content-Disposition: form-data; name="${fieldName}"; filename="${field.name}"\r\n`); /* Define content-disposition and name based on file name. */
              body.push(`Content-Type: ${field.type}\r\n\r\n`); /* Type is the earlier made mimeType. */
              body.push(field.data); /* Push data. */
              body.push(`\r\n`); /* Newline. */
            } else if (typeof field === 'string') { /* If not an object we return to payload field. */
              body.push(`--${boundary}\r\n`); /* Include boundary. */
              body.push(`Content-Disposition: form-data; name="${fieldName}"\r\n`); /* Include Content-Disposition with field name. */
              body.push(`Content-Type: application/json\r\n\r\n`); /* Add contentType for payload. */
              body.push(`${field}\r\n`); /* Add the field itself. */
            } else throw new TypeError(`\`fields.${fieldName}\` is an unsupported type, should be an object, string, or an array that contains those two types.`); /* How did you even get this error? */
          });
        }
        if (body.length) body.push(`--${boundary}--\r\n`); /* Include boundary in compliance with Discord API docs. */
      } else throw new TypeError('`fields` parameter is required and should be an object.'); /* Error since field should be an object. */
      return body; /* Pass back the processed fields. */
    }
    
    function createNewBoundary() { /* Creates a new boundary */
      let boundary = '--------------------------'; /* Initial dashes for boundary. */
      for (let i = 0; i < 24; i++) boundary += Math.floor(Math.random() * 10).toString(16); /* Maths to create unique boundary. */
      return boundary; /* Pass back the generated boundary. */
    }
    
    let processedUnit = processingUnit( data ); /* Invoke function for processing with data received. */
    return processedUnit; /* Return the data and the boundary. */
  }
  
  async post( data ) { /* The HTTP POST method sends data to the server. The type of the body of the request is indicated by the Content-Type header. */
    return this;
  }
  
  async get( data ) { /* The HTTP GET method requests a representation of the specified resource. Requests using GET should only be used to request data (they shouldn't include data). */
    let awaitFinish = snapString(); /* Promise to be resolved after finishing request. */

    const options = {
      hostname: globalsJSON.discordUrl,
      port: 443,
      path: `${data.endPoint}`,
      method: 'GET'
    };

    if(!data.contentType) options['headers'] = { 'Content-Type': 'application/json', Authorization: `Bot ${configContent.botToken}` };

    const req = https.request(options, (res) => {
      let collect = [];
      res.on('data', async (data) => { collect.push(data); });
      res.on('end', async (data) => {
        try {
          if (!collect[0]) awaitFinish.resolve('Empty response type.');
          awaitFinish.resolve(JSON.parse(collect.join('')));
        } catch(err) {
          awaitFinish.reject(err);
        }
      });
    });

    req.on('error', (err) => { awaitFinish.reject(err); });
    if (data.toSend) req.write(data.toSend);
    req.end();

    await awaitFinish; /* Wait for promise to get resolved before sending return signal. */
    return awaitFinish; /* Return the finished promise. */
  }
  
  async patch( data ) { /* The HTTP PATCH request method applies partial modifications to a resource. */
    return this;
  }
  
  async delete( data ) { /* The HTTP DELETE request method deletes the specified resource. */
    return this;
  }
  
  async put( data ) { /* The HTTP PUT request method creates a new resource or replaces a representation of the target resource with the request payload. */
    return this;
  }
  
  async trace( data ) { /* The HTTP TRACE method performs a message loop-back test along the path to the target resource, providing a useful debugging mechanism. */
    return this;
  }
  
  async head( data ) { /* The HTTP HEAD method requests the headers that would be returned if the HEAD request's URL was instead requested with the HTTP GET method. */
    return this;
  }
  
  async connect( data ) { /* The HTTP CONNECT method starts two-way communications with the requested resource. It can be used to open a tunnel. */
    return this;
  }
  
  async options( data ) { /* The HTTP OPTIONS method requests permitted communication options for a given URL or server. */
    return this;
  }
  
  async free( data ) { /* This function allows the user to freely choose which url, status, headers etc are chosen. */
    let awaitFinish = snapString(); /* Promise to be resolved after finishing request. */
    // application/json
    // multipart/form-data; boundary=${boundary}
    
    
    let processData = await this.multiForm( data );
    
    
     const options = {
        hostname: 'discord.com',
        port: 443,
        path: `/api/v10/channels/${data.channel}/messages`,
        method: 'POST',
        headers: { 'Content-Type': `multipart/form-data; boundary=${processData[1]}`, Authorization: `Bot ${configContent.botToken}` }
      };

      const req = https.request(options, (res) => {
        let collect = [];
        res.on('data', async (data) => { collect.push(data); });
        res.on('end', async (data) => {
          try {
            if (!collect[0]) awaitFinish.resolve('Empty response type.');
            awaitFinish.resolve(JSON.parse(collect.join('')));
          } catch(err) {
            awaitFinish.reject(err);
          }
        });
      });

      req.on('error', (err) => { awaitFinish.reject(err); });
      if (processData[0]) req.write(processData[0]);
      req.end();
    
    
    await awaitFinish; /* Wait for promise to get resolved before sending return signal. */
    return awaitFinish; /* Return the finished promise. */
  }
}

global.handleData = dataHandler;
export const handleData = global.handleData;

