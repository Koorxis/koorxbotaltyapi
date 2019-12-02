const Discord = require('discord.js')

exports.run = (client, message, params) => {
const embed = new Discord.RichEmbed()
message.channel.send(`Sunucumuzda güncel olarak **${client.users.size}** üye bulunmaktadır.!`)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'say',
    description: 'saat',
    usage: 'saat'
  };