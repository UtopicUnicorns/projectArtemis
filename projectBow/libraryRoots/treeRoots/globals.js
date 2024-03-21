/*  _____           _           _                   _                 _     
   |  __ \         (_)         | |       /\        | |               (_)    
   | |__) | __ ___  _  ___  ___| |_     /  \   _ __| |_ ___ _ __ ___  _ ___ 
   |  ___/ '__/ _ \| |/ _ \/ __| __|   / /\ \ | '__| __/ _ \ '_ ` _ \| / __|
   | |   | | | (_) | |  __/ (__| |_   / ____ \| |  | ||  __/ | | | | | \__ \
   |_|   |_|  \___/| |\___|\___|\__| /_/    \_\_|   \__\___|_| |_| |_|_|___/
                  _/ |                                                      
                 |__/   Project Bow, Discord API wrapper                  */
/*  This file serves as a globals exporter.
    The webSocket is imported from a base directory, while the other modules are native.
    Aside from the modules we also define a few global functions for functionality.
      treeBranch() is an event emitter.
      readClock() returns the current time in a somewhat formatted way.
      snakeCase() returns a string converted to snakeCase.
      snapString() is a promise and can be used to delay the code from running.
        .resolve() If defined as a variable available option.
        .reject() If defined as a variable available option.
    We also import a gateway parser for use in the gateWay.
    A subSet of variables are stored in a json, we also globalise that.  */
    
import { EventEmitter } from 'events'; /* Import specific emitter module from events module. */
import fs from 'fs'; /* Import native fs module. */
import path from 'path'; /* Import native path module. */
import util from 'util'; /* Import native util module. */
import https from 'https'; /* Import native https module. */
import os from 'os'; /* Import native os module. */
import ws from '../gatewayEvents/gatewaySocket/index.js'; /* Import webSocket from local file. */

global.fs = fs; /* Make native module global as 'fs'. */
global.path = path; /* Make native module global as 'path'. */
global.util = util; /* Make native module global as 'util'. */
global.https = https; /* Make native module global as 'https'. */
global.os = os; /* Make native module global as 'os'. */
global.ws = ws; /* Make webSocket global as 'ws'. */

global.globalsJSON = JSON.parse(await fs.promises.readFile('./libraryRoots/treeRoots/globals.json', 'utf8')); /* Reading globals JSON and globalise it to use in other files. */
global.parseMe = await import('../gatewayEvents/gateParser.js'); /* Global function to parse incoming events. */

global.treeBranch = new EventEmitter(); /* Attaching a new emitter to the global treeBranch. */
export const treeBranch = global.treeBranch; /* Export newly made emitter as treeBranch. */

global.readClock = function() { /* Return formatted time dd/mm/yyyy hh:mm:ss. */
  return `${new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }).format(new Date())}`;
};

global.snakeCase = function (str)  { /* Converts any string to snakeCase. */
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()); 
};

global.snapString = function() { /* Global promise function to delay pieces of code. */
  var res, rej;
  var promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
};

