const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  ///o!sustur @üye 1s/m/h/d | 1s = 1 saniye , 1m = 1 dakika , 1h = 1 saat, 1d = 1 gün
  if (!message.member.roles.has('KULLANACAK ROL ID')) return message.channel.send('Bu komutu kullanabilmek için yeterli yetkiye sahip olmalısın.');
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Doğru Kullanım: w!mute <@531118052419567668> Bilgi:\n!mute @üye 1s/m/h/d | 1s = 1 saniye , 1m = 1 dakika , 1h = 1 saat, 1d = 1 gün");
let muterole = message.guild.roles.find(r => r.name === "Muted!");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted!",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];  
  if(!mutetime) return message.reply("Doğru Kullanım: !mute <@kişi> <süre>");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> sohbet kapatıldı! ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> Kişinin susturulma süresi dolduğu için mutesi kaldırıldı!`);
  }, ms(mutetime));



}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sustur', 'gsustur', 'mute', 'tempmute'],
  permLevel: 2
};

exports.help = {
  name: 'sürelimute',
  description: 'Sureli Susturur.',
  usage: 'sustur [Kullanıcı] [Süre]'
};


//Hodrige Society ψ Bot