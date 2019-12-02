const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
  if (!message.member.roles.has('KULLANACAK ROL ID')) return message.channel.send('Bu komutu kullanabilmek için: **Kayıtcı** adlı role sahip olmalısın.');
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user) return message.reply("Kime **Erkek** Rolü Vermek İstersin?");

  user.addRole('ERKEK ROL İD')
  user.removeRole('KAYITSIZ ROL İD')
    user.removeRole('KIZ ROL İD')
        message.react('✅')

} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['e'],
    permLevel: 0
}

exports.help = {
    name: 'erkek',
    description: 'Log kanalını belirler.',
    usage: '&kanal <#kanal>'
}