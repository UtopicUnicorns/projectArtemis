/*  _____           _           _                   _                 _     
   |  __ \         (_)         | |       /\        | |               (_)    
   | |__) | __ ___  _  ___  ___| |_     /  \   _ __| |_ ___ _ __ ___  _ ___ 
   |  ___/ '__/ _ \| |/ _ \/ __| __|   / /\ \ | '__| __/ _ \ '_ ` _ \| / __|
   | |   | | | (_) | |  __/ (__| |_   / ____ \| |  | ||  __/ | | | | | \__ \
   |_|   |_|  \___/| |\___|\___|\__| /_/    \_\_|   \__\___|_| |_| |_|_|___/
                  _/ |                                                      
                 |__/   Project Bow, Discord API wrapper                  */
/*  This file is for creating an embed structure.
    We use a combination of function chaining and JSON objects to create it.
    The embedType() function is deprecated and thus removed.
    
    The Embed structure has limits that we will not check for as the can change.
    However the current limits are like this:
      title	256 characters.
      description	4096 characters.
      fields	Up to 25 field objects.
      field.name	256 characters.
      field.value	1024 characters.
      footer.text	2048 characters.
      author.name	256 characters.
    Exceeding the limits will return errors by the API, or you can manually code the limits in if needed.
    
    Timestamps are limited to formats properly able to parse by new Date().
      (..).timestamp() will return the current date in the embed structure.
      (..).timestamp(new Date()) will return the current date in the embed structure.
      (..).timestamp(new Date('05 October 2011 14:48 UTC')) will return '2011-10-05T14:48:00.000Z' in the embed structure.
    
    Colours are HEX based withoutthe # sign.
      #FF0000 is red, but to use it we omit the #;
        (..).color('FF0000')
      #FF00FF is magenta, but to use it we omit the #;
        (..).color('FF00FF')
      Failing to submit a value while the chain is called will result in red getting used as colour.
      Using a non existing value will result in NaN.
      
    You can 'send' the embed structure at any point by calling the subvalue 'embedObject'.  */
    
class embedCreate { /* Embed class maker to export. */
  constructor() { /* Hold return value. */
    this.embedObject = {}; /* Holds an embed construction. */
  }

  title( value ) { /* string title of embed. */
    if(value) this.embedObject['title'] = value; /* title of embed. */
    
    return this; /* Return current structure. */
  }

  description( value ) { /* string description of embed. */
    if(value) this.embedObject['description'] = value; /* description of embed. */
    
    return this; /* Return current structure. */
  }

  url( value ) { /* string	url of embed. */
    if(value) this.embedObject['url'] = value; /* url of embed. */
    
    return this; /* Return current structure. */
  }

  timestamp( value ) { /* ISO8601 timestamp of embed content. */
    if(!value) this.embedObject['timestamp'] = new Date().toISOString(); /* ISO8601 timestamp. */
    
    if(value) { /* timestamp of embed content. */
      try {
        this.embedObject['timestamp'] = new Date(value).toISOString(); /* ISO8601 timestamp. */
      } catch(e) {
        this.embedObject['timestamp'] = new Date().toISOString(); /* ISO8601 timestamp. */
      }
    }
    
    return this; /* Return current structure. */
  }

  color( value ) { /* integer	color code of the embed. */
    if(!value) this.embedObject['color'] = parseInt(0xff0000); /* convert HEX red(FF0000) to decimal. */
    
    if(value) { /* color code of the embed. */
      try {
        this.embedObject['color'] = parseInt(`0x${value}`); /* convert value to decimal. */
      } catch(e) {
        this.embedObject['color'] = parseInt(0xff0000); /* convert HEX red(FF0000) to decimal. */
      }
    }
    
    return this; /* Return current structure. */
  }

  footer( value ) { /* embed footer object footer information. */
    if(!value) return this; /* Return current structure. */
    if(value) this.embedObject['footer'] = {}; /* Create object. */
    
    if(value.iconUrl) this.embedObject['footer'].icon_url = value.iconUrl; /* url of footer icon (only supports http(s) and attachments). */
    if(value.proxyIconUrl) this.embedObject['footer'].proxy_icon_url = value.proxyIconUrl; /* a proxied url of the footer image. */
    if(value.text) this.embedObject['footer'].text = value.text; /* footer text. */
    
    return this; /* Return current structure. */
  }

  image( value ) { /* embed image object image information. */
    if(!value) return this; /* Return current structure. */
    if(value) this.embedObject['image'] = {}; /* Create object. */
    
    if(value.url) this.embedObject['image'].url = value.url; /* source url of image (only supports http(s) and attachments). */
    if(value.proxyUrl) this.embedObject['image'].proxy_url = value.proxyUrl; /* a proxied url of the image. */
    if(value.height) this.embedObject['image'].height = value.height; /* height of image. */
    if(value.width) this.embedObject['image'].width = value.width; /* width of image. */
    
    return this; /* Return current structure. */
  }

  thumbnail( value ) { /* embed thumbnail object thumbnail information. */
    if(!value) return this; /* Return current structure. */
    if(value) this.embedObject['thumbnail'] = {}; /* Create object. */
    
    if(value.url) this.embedObject['thumbnail'].url = value.url; /* source url of thumbnail (only supports http(s) and attachments). */
    if(value.proxyUrl) this.embedObject['thumbnail'].proxy_url = value.proxyUrl; /* a proxied url of the thumbnail. */
    if(value.height) this.embedObject['thumbnail'].height = value.height; /* height of thumbnail. */
    if(value.width) this.embedObject['thumbnail'].width = value.width; /* width of thumbnail. */
    
    return this; /* Return current structure. */
  }

  video( value ) { /* embed video object video information. */
    if(!value) return this; /* Return current structure. */
    if(value) this.embedObject['video'] = {}; /* Create object. */
    
    if(value.url) this.embedObject['video'].url = value.url; /* source url of video (only supports http(s) and attachments). */
    if(value.proxyUrl) this.embedObject['video'].proxy_url = value.proxyUrl; /* a proxied url of the video. */
    if(value.height) this.embedObject['video'].height = value.height; /* height of video. */
    if(value.width) this.embedObject['video'].width = value.width; /* width of video. */
    
    return this; /* Return current structure. */
  }

  provider( value ) { /* embed provider object provider information. */
    if(!value) return this; /* Return current structure. */
    if(value) this.embedObject['provider'] = {}; /* Create object. */
    
    if(value.name) this.embedObject['provider'].name = value.name; /* name of provider. */
    if(value.url) this.embedObject['provider'].url = value.url; /* url of provider. */
    
    return this; /* Return current structure. */
  }

  author( value ) { /* embed author object author information. */
    if(!value) return this; /* Return current structure. */
    if(value) this.embedObject['author'] = {}; /* Create object. */
    
    if(value.name) this.embedObject['author'].name = value.name; /* name of author. */
    if(value.url) this.embedObject['author'].url = value.url; /* url of author (only supports http(s)). */
    if(value.iconUrl) this.embedObject['author'].icon_url = value.iconUrl; /* url of author icon (only supports http(s) and attachments). */
    if(value.proxyIconUrl) this.embedObject['author'].proxy_icon_url = value.proxyIconUrl; /* a proxied url of author icon. */
    
    return this; /* Return current structure. */
  }

  field( value ) { /* array of embed field objects. */
    if(!value) return this; /* Return current structure. */
    let fieldBuild = {}; /* Temporary object holder. */
    
    if(value && !this.embedObject['fields']) this.embedObject['fields'] = []; /* Create fields array. */
    if(value.name) fieldBuild['name'] = value.name; /* name of the field. */
    if(value.value) fieldBuild['value'] = value.value; /* value of the field. */
    if(value.inline) fieldBuild['inline'] = value.inline; /* whether or not this field should display inline. */
    if(!value.inline) fieldBuild['inline'] = value.inline; /* whether or not this field should display inline. */
    this.embedObject['fields'].push(fieldBuild); /* Push object. */
    
    return this; /* Return current structure. */
  }
}

global.embed = embedCreate; /* We asign the class as global. */
export const embed = global.embed; /* We export the global class. */

