const { Client } = require('discord.js');
const { TOKEN, PREFIX} = require('./config')
const client = new Client({ disableEveryone: true});
const ytdl = require('ytdl-core');

client.on(`error`, console.error);
client.on(`warn`, console.warn);
client.on(`ready`, () => console.log(`Ready`));
client.on(`disconnect`, ()=> console.log(`Disconnected`));
client.on(`reconnecting`,() => console.log(`Reconnecting`));
client.on(`message`, async msg =>{
    if(msg.author.bot){
        return undefined;
    }
    if(!msg.content.startsWith(PREFIX)){
        return undefined;
    }
    var args = msg.content.split(' ')
    
    if(msg.content.startsWith(`${PREFIX}play`)){
        var { voiceChannel } = msg.member;
        if(!voiceChannel){
            return msg.channel.send(`You need to be in a voice channel`);
        }
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if(!permissions.has(`CONNECT`)){
            return msg.channel.send(`I Cannot connect to your channel, permission required to connect`)
        }
        if(!permissions.has(`SPEAK`)){
            return msg.channel.send(`I need permission to speak`)
        }
        try{
            var connection = await voiceChannel.join();
        }catch(error){
            console.error(`I cannot joing the channel: ${error}`);
            return msg.channel.send(`I cannot join the channel`);
        }

        const dispatcher = connection.playStream(ytdl(args[1]))
        .on(`end`, ()=>{
            console.log(`song ended`)
            voiceChannel.leave();
        })
        .on(`error`, error =>{
            console.error(error)
        });
        dispatcher.setVolumeLogarithmic( 5/ 5);
    }
});
client.login(TOKEN);

