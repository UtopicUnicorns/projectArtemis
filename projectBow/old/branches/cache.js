/*  _____           _           _                   _                 _     
   |  __ \         (_)         | |       /\        | |               (_)    
   | |__) | __ ___  _  ___  ___| |_     /  \   _ __| |_ ___ _ __ ___  _ ___ 
   |  ___/ '__/ _ \| |/ _ \/ __| __|   / /\ \ | '__| __/ _ \ '_ ` _ \| / __|
   | |   | | | (_) | |  __/ (__| |_   / ____ \| |  | ||  __/ | | | | | \__ \
   |_|   |_|  \___/| |\___|\___|\__| /_/    \_\_|   \__\___|_| |_| |_|_|___/
                  _/ |                                                      
                 |__/   Project Bow, Discord API wrapper                  */
class cacheBuild { /* Initiate cache */
  constructor() { /* Set up fetchers */
    this.cacheHold = {};
    this.selfData = {};
    this.userCache = {};
    this.guildCache = {};
  }

  async getGuild( value ) { /* Fetch guild */
  }
  
  async insertGuild( value ) { /* Input guild */
    this.guildCache[value.id] = value; /* Insert guild */
  }
  
  async getUser( value ) { /* Fetch user */
  }
  
  async insertUser( value ) { /* Input user */
    this.userCache[value.id] = value; /* Insert user */
  }
  
  async getChannel( value ) { /* Fetch channel */
  }
}

global.cache = new cacheBuild(); /* Define new cache */
export const cache = global.cache; /* Export global */

