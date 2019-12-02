const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
  if (!message.member.roles.has('KULLANACAK ROL ID')) return message.channel.send('Bu komutu kullanabilmek için gerekli role sahip olmalısın.');
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user) return message.reply("Kime **VİP** Rolü Vermek İstersin?");

  user.addRole('VERİLECEK ROL İD')
        message.react('✅')

} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'vip',
    description: 'Log kanalını belirler.',
    usage: '&kanal <#kanal>'
}