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
        Object entry 'url' Is for a hyperlink.
        Object entry 'iconUrl' either direct url or attachment.
        Object entry 'proxyIconUrl' either direct url or attachment.
        
      .image()
        Image needs a JSON object such as {}
        Object entry 'url' either direct url or attachment.
        Object entry 'proxyUrl' either direct url or attachment.
        Object entry 'height' height of the image.
        Object entry 'width' width of the image.
        
      .thumbnail()
        Thumbnail needs a JSON object such as {}
        Object entry 'url' either direct url or attachment.
        Object entry 'proxyUrl' either direct url or attachment.
        Object entry 'height' height of the image.
        Object entry 'width' width of the image.
        
      .video()
        Video needs a JSON object such as {}
        Object entry 'url' either direct url or attachment.
        Object entry 'proxyUrl' either direct url or attachment.
        Object entry 'height' height of the video.
        Object entry 'width' width of the video.
        
      .provider()
        Provider needs a JSON object such as {}
        Object entry 'name' string.
        Object entry 'url' string.
        
      .footer()
        Footer needs a JSON object such as {}
        Object entry 'text' has a maximum of 2048 characters. 
        Object entry 'iconUrl' either direct url or attachment.
        Object entry 'proxyIconUrl' either direct url or attachment. 
      
      .timestamp()
        ISO8601 timestamp or leave empty for current time.
    
    The combined character limit is 6000 characters.
*/

new embed() /* First example empty. */
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
  .timestamp();

new embed() /* Second example full. */
  .title('This is a title')
  .description('This is a description')
  .url('https://artemis.rest?what=ThisUrl')
  .color('FF00FF')
  .field({ name: 'Field name', value: 'Field content', inline: true })
  .field({ name: 'Field2 name', value: 'Field2 content', inline: false })
  .author({name: 'Author name', url: 'https://artemis.rest', iconUrl: 'https://artemis.rest/image.png', proxyIconUrl: 'https://cdn.artemis.rest/image.png'})
  .image({ url: 'https://artemis.rest/image.png', proxyUrl: 'https://cdn.artemis.rest/image.png', width: 100, height: 100 })
  .thumbnail({ url: 'https://artemis.rest/thumbImage.png', proxyUrl: 'https://cdn.artemis.rest/thumbImage.png', width: 100, height: 100 })
  .video({ url: 'https://artemis.rest/video.mov', proxyUrl: 'https://cdn.artemis.rest/video.mov', width: 100, height: 100 })
  .provider({ name: 'Your name', url: 'https://artemis.rest' })
  .footer({ text: 'A side note', iconUrl: 'https://artemis.rest/footer.png', proxyIconUrl: 'https://cdn.artemis.rest/footer.png' })
  .timestamp('04 September 1992 13:48 UTC');

new embed() /* Third example partial. */
  .title('This is a title')
  .description('This is a description')
  .url('https://artemis.rest?what=ThisUrl')
  .color('00FF00')
  .field({ name: 'Field name', value: 'Field content', inline: true })
  .field({ name: 'Field2 name', value: 'Field2 content'})
  .author({name: 'Author name', url: 'https://artemis.rest', iconUrl: 'https://artemis.rest/image.png', proxyIconUrl: 'https://cdn.artemis.rest/image.png'})
  .image({ url: 'https://artemis.rest/image.png', proxyUrl: 'https://cdn.artemis.rest/image.png' })
  .thumbnail({ url: 'https://artemis.rest/thumbImage.png' })
  .video({ url: 'https://artemis.rest/video.mov', width: 100, height: 100 })
  .provider({ name: 'Your name', url: 'https://artemis.rest' })
  .footer({ text: 'A side note', iconUrl: 'https://artemis.rest/footer.png' })
  .timestamp();
  
