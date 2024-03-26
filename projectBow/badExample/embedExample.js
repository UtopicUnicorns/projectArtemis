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
    Limitations and usage:
      .title()
        Singular string with a maximum of 256 characters.
        
      .description()
        Singular string, supports newlines maximum of 4096 characters.
      
      .url()
        Singular string.
      
      .color()
        HEX color without '#' as a string.
        
      .field()
        Field needs a JSON object such as {}
        object entry 'name' has a maximum of 256 characters.
        object entry 'value' has a maximum of 1024 characters.
        object entry 'inline' is a boolean.
        There is a maximum of 25 fields per embed.
        
      .author()
        Author needs a JSON object such as {}
        Object entry 'name' has a maximum of 256 characters.
        Object entry 'url' 
        Object entry 'iconUrl' 
        Object entry 'proxyIconUrl' 
        
      .image()
        Image needs a JSON object such as {}
        Object entry '' 
        Object entry '' 
        Object entry '' 
        Object entry '' 
        
      .thumbnail()
        Thumbnail needs a JSON object such as {}
        Object entry '' 
        Object entry '' 
        Object entry '' 
        Object entry '' 
        
      .video()
        Video needs a JSON object such as {}
        Object entry '' 
        Object entry '' 
        Object entry '' 
        Object entry '' 
        
      .provider()
        Provider needs a JSON object such as {}
        Object entry '' 
        Object entry '' 
        
      .footer()
        Footer needs a JSON object such as {}
        Object entry 'text' has a maximum of 2048 characters. 
        Object entry '' 
        Object entry '' 
      
      .timestamp()
        ISO8601 timestamp or leave empty for current time.
  
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

