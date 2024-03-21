/*  _____           _           _                   _                 _     
   |  __ \         (_)         | |       /\        | |               (_)    
   | |__) | __ ___  _  ___  ___| |_     /  \   _ __| |_ ___ _ __ ___  _ ___ 
   |  ___/ '__/ _ \| |/ _ \/ __| __|   / /\ \ | '__| __/ _ \ '_ ` _ \| / __|
   | |   | | | (_) | |  __/ (__| |_   / ____ \| |  | ||  __/ | | | | | \__ \
   |_|   |_|  \___/| |\___|\___|\__| /_/    \_\_|   \__\___|_| |_| |_|_|___/
                  _/ |                                                      
                 |__/   Project Bow, Discord API wrapper                  */
import { EventEmitter } from 'events'; /* Setup emitters */
import fs from 'fs'; /* read files */
import path from 'path'; /* parse paths */
import util from 'util'; /* import native utilities */
import https from 'https'; /* main send module */
import os from 'os'; /* operating system natives */
import ws from '../gatewaySocket/index.js'; /* modified websocket */

global.fs = fs; /* globalise module */
global.path = path; /* globalise module */
global.util = util; /* globalise module */
global.https = https; /* globalise module */
global.os = os; /* globalise module */
global.ws = ws; /* globalise module */

global.globalsJSON = JSON.parse(await fs.promises.readFile('./roots/treeRoots/globals.json', 'utf8')); /* Globalize discord stuff */
global.parseMe = await import('../treeRoots/gateParser.js'); /* Import parser */

const root = new EventEmitter(); /* Attach emitter */
global.root = root; /* Globalise root */
export default root; /* Export root */

global.branch = new EventEmitter(); /* Attach emitter */
export const branch = global.branch; /* Export branch */

global.readClock = function() { /* Return formatted time dd/mm/yyyy hh:mm:ss */
  return `${new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }).format(new Date())}`;
};

global.snakeCase = function (str)  { /* Return string to snakeCase */
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()); 
};

global.snapString = function() { /* A utility function for managing asynchronous code execution. Usage: 'newVar = snapString(); newVar.resolve(); newVar.reject();' */
  var res, rej;
  var promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
};

