const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json')
const prefix = config.prefix;

const scraper = require('./scraper.js');


function fail(message) {
  return message.channel.send('Comanda gresita, incearca: !bac --help.');
}

// async function getTest(major, testNumber, message) {
//   let result = await scraper.scrapeForTest(major, testNumber, message);
//   console.log(result);
// }

client.once('ready', () => {
	console.log('Ready!');

  client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();



    if(command == 'bac') {

      /**
        CHECKING FOR WRONG COMMANDS
      */

      if(!args.length) return message.channel.send('Spune mi ce subiect doresti.');
      if(args.length == 1 && (args[0] != '--mate-info' || args[0] != 'stiinte')) fail(message);
      args.forEach((argument, i) => {
        if(!argument.startsWith('--')) fail(message);
      });

      /**
        HANDLEING RIGHT COMMANDS
      */

      if(args[0] == '--help') {
        message.channel.send(config.help);
      } else {
        let major = (args[0] == '--mate-info') ? 1 : 2;
        let testNumber = args[1].substring(2);

        // start scrapeing
        scraper.scrapeForTest(major, testNumber, message);
      }

    }
  });
});

client.login(config.token);
