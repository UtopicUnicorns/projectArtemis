/*  _____           _           _                   _                 _     
   |  __ \         (_)         | |       /\        | |               (_)    
   | |__) | __ ___  _  ___  ___| |_     /  \   _ __| |_ ___ _ __ ___  _ ___ 
   |  ___/ '__/ _ \| |/ _ \/ __| __|   / /\ \ | '__| __/ _ \ '_ ` _ \| / __|
   | |   | | | (_) | |  __/ (__| |_   / ____ \| |  | ||  __/ | | | | | \__ \
   |_|   |_|  \___/| |\___|\___|\__| /_/    \_\_|   \__\___|_| |_| |_|_|___/
                  _/ |                                                      
                 |__/   How to use this library and what to expect         */
/*  Creating an embed is fairly easy, but can be a small challenge to start with,
    so here is a small example.
    This file will not show you how to send the embed, but rather how to create it.
    Each embed should be started with a 'new embed()', this gives you a blank slate to work with.
    
*/
new embed()
  .title()
  .description()
  .url()
  .color()
  .field({})
  .author({})
  .image({})
  .thumbnail({})
  .video({})
  .provider({})
  .footer()
  .timestamp()

