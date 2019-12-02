const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
  if (!message.member.roles.has('KULLANACAK ROL ID')) return message.channel.send('Bu komutu kullanabilmek için: **Kayıtcı** adlı role sahip olmalısın.');
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user) return message.reply("Kime **'Ladys. 🛸** Rolü Vermek İstersin?");

  user.addRole('KIZ ROL İD')
  user.removeRole('ERKEK ROL İD')
  user.removeRole('KAYITSIZ ROL ID')
       message.react('✅')

} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'kız',
    description: 'Log kanalını belirler.',
    usage: '&kanal <#kanal>'
}