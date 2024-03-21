/*  _____           _           _                   _                 _     
   |  __ \         (_)         | |       /\        | |               (_)    
   | |__) | __ ___  _  ___  ___| |_     /  \   _ __| |_ ___ _ __ ___  _ ___ 
   |  ___/ '__/ _ \| |/ _ \/ __| __|   / /\ \ | '__| __/ _ \ '_ ` _ \| / __|
   | |   | | | (_) | |  __/ (__| |_   / ____ \| |  | ||  __/ | | | | | \__ \
   |_|   |_|  \___/| |\___|\___|\__| /_/    \_\_|   \__\___|_| |_| |_|_|___/
                  _/ |                                                      
                 |__/   Testing the library, oh god.                         */
/*  Testing file, made to test various functions in the library.
    Perhaps this is not a file for you to use in a finished product.
    
*/
class testClass {
  constructor() {
    //this.embedTest();
  }

  async embedTest( value ) {
    let testMeTwo = new embed()
      .field({name: 'test1', value: 'hello1', inline: false})
      .field({name: 'test2', value: 'hello2', inline: true})
      .field({name: 'test3', value: 'hello3', inline: false});
      testMeTwo.footer();
      testMeTwo.color('FF00FF');
      testMeTwo.timestamp();
      console.log(testMeTwo.embedObject);
      
      let tempUpload = [{
            file: './test.txt',
            description: 'test.txt',
            filename: 'test.json'
          },{
            file: './test.gif',
            description: 'test1.gif',
            filename: 'test1.gif'
          },{
            file: './test1.png',
            description: 'test2.png',
            filename: 'test2.png'
        }];
        
      await new handleData().free({ embeds: [testMeTwo.embedObject], attachments: tempUpload, channel: '759889020368584716' });
      
      
      process.exit();
      /*  let tempUpload = [{
            file: './test.txt',
            description: 'test.txt',
            filename: 'test.json'
          },{
            file: './test.gif',
            description: 'test1.gif',
            filename: 'test1.gif'
          },{
            file: './test1.png',
            description: 'test2.png',
            filename: 'test2.png'
        }];

        let tempMsg = { 
          content: 'Hi',
          attachments: tempUpload,
          channel: '759889020368584716' 
        };
        
        let testMe = await new handleData().free( tempMsg );
        console.log(testMe);  */
  }
}

global.newTest = new testClass();
export const newTest = global.newTest;

