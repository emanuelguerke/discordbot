let { Client } = require('discord.js');

let { TOKEN, PREFIX} = require('./config')

let client = new Client({ disableEveryone: true});

client.on(`error`, console.error);
client.on(`warn`, console.warn);
client.on(`ready`, () => console.log(`Ready`));
client.on(`disconnect`, ()=> console.log(`Disconnected`));
client.on(`reconnecting`,() => console.log(`Reconnecting`));

client.login(TOKEN);

