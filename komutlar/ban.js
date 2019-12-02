const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args) => {
  if (!message.member.roles.find('name', 'ban Hammer')) return message.channel.send("**Ban Hammer** Yetkin yok!");
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (reason.length < 1) return message.reply('Banlama sırasında bir hata oluştu.');
  if (message.mentions.users.size < 1) return message.reply('Kimi banlayacağını yazmalısın.').catch(console.error);

  if (!message.guild.member(user).bannable) return message.reply('Yetkilileri banlayamam.');
  message.guild.ban(user, 2);
  message.react("EMOJİ ID")
  let embed = new Discord.RichEmbed()
  .setColor('BLACK')
  .addField(`Başarılı :`, `**Yasaklanan Kullanıcı :**  ${user.username}#${user.discriminator} \n **Yasaklayan Yetkili  :**  ${message.author.username}#${message.author.discriminator}   \n **Yasaklama Sebebi :**  ${reason} `)
  .setImage(`GİF LİNKİ`)
  return message.channel.send(embed).then(msg => msg.delete(10000));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.', // Code Community
  usage: 'ban [kullanıcı] [sebep]'
};