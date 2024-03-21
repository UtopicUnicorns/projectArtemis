/*  _____           _           _                   _                 _     
   |  __ \         (_)         | |       /\        | |               (_)    
   | |__) | __ ___  _  ___  ___| |_     /  \   _ __| |_ ___ _ __ ___  _ ___ 
   |  ___/ '__/ _ \| |/ _ \/ __| __|   / /\ \ | '__| __/ _ \ '_ ` _ \| / __|
   | |   | | | (_) | |  __/ (__| |_   / ____ \| |  | ||  __/ | | | | | \__ \
   |_|   |_|  \___/| |\___|\___|\__| /_/    \_\_|   \__\___|_| |_| |_|_|___/
                  _/ |                                                      
                 |__/   Project Bow, Discord API wrapper                  */
class dataHandler { /* Exports methods for communicating with an external source. */
  async post( data ) { /* The HTTP POST method sends data to the server. The type of the body of the request is indicated by the Content-Type header. */
    return this;
  }
  
  async get( data ) { /* The HTTP GET method requests a representation of the specified resource. Requests using GET should only be used to request data (they shouldn't include data). */
    return this;
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
    return this;
  }
  
  /* sendData.fly('', `/repositories/466578733/releases`, 'GET', 'api.github.com', 443, { 'User-Agent': 'DiscordBot, 'Content-Type': 'application/json' })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      }); */
  /* The 'fly' method for making HTTP requests
     @param {string} data - The request data (optional)
     @param {string} path - The API endpoint path
     @param {string} method - The HTTP method (e.g., 'GET', 'POST')
     @param {string} host - The hostname of the server
     @param {number} port - The port number for the connection
     @param {Object} headers - The HTTP headers for the request
     @returns {Promise} A promise that resolves with the response data or rejects with an error */
  async fly(data, path, method, host, port, headers) {
    let promise = new Promise((resolve, reject) =>  { /* Create a promise to handle the asynchronous operation */
      const options = { /* Define HTTP request options */
        hostname: host,
        port: port,
        path: path,
        method: method,
        headers: headers,
      };

      const req = https.request(options, (res) => { /* Create an HTTP request object */
        let collect = [];
        res.on('data', async (data) => { collect.push(data); }); /* Event handler for receiving data chunks */
        res.on('end', async (data) => { /* Event handler for when the response ends */
          try {
            if (!collect[0]) resolve('Empty response type.'); /* Check if the response data is empty */
            const parsed_data = await JSON.parse(collect.join('')); /* Parse the response data as JSON */
            if (parsed_data.channel_id && isNaN(parsed_data.channel_id)) reject(parsed_data); /* Check for specific conditions and reject if needed */
            if (parsed_data.code) reject(parsed_data); /* Check for specific conditions and reject if needed */
            if (parsed_data.message == 'The resource is being rate limited.') reject(parsed_data); /* Check for specific conditions and reject if needed */
            resolve(parsed_data); /* Resolve with the parsed response data */
          } catch (err) {
            reject(err); /* Handle JSON parsing errors or other exceptions */
          }
        });
      });

      req.on('error', (err) => { reject(err); }); /* Event handler for request errors */
      if (data) { req.write(data); } /* Write data to the request if provided */     
      req.end(); /* End the request */
    }); 

    return promise; /* Return the promise for handling the HTTP request */
  }
}

global.sendData = dataHandler; /* Create an instance of 'dataHandler' and export it as 'sendData' */
export const sendData = global.sendData; /* Create an instance of 'dataHandler' and export it as 'sendData' */
