  //consts (for glitch)
// GEREKLİ YERLER
const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
// GEREKLİ YERLER
// -------------------------------------------------------------
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const Jimp = require('jimp');
const db = require('quick.db');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

////////////////////////


//////////////////
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

const invites = {};
const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('ready', () => {
    client.user.setPresence({
        game: {
            name: `Sunucuyu`, // BOTUN OYNUYOR KISMI
            type: 'WATCHING'
            // Değerler:
            // PLAYING: Oynuyor
            // WATCHING: İzliyor
            // LISTENING: Dinliyor
        },
        status: 'dnd'
        // Değerler:
        // online: Çevrimiçi
        // dnd: Rahatsız Etmeyin
        // idle: Boşta
    })
})


client.on("message", message => {
    if (message.channel.type === "dm") { // BOTUN DM SİNİ GÖSTERİR
        if (message.author.bot) return;
        const dmlog = new Discord.RichEmbed()
         .setTitle(`${client.user.username} - Dm Mesaj`)
         .setColor('RANDOM')
         .addField(`Mesajı Gönderen`, message.author.tag)
         .addField(`ID'si`, message.author.id)
         .addField(`Gönderilen Mesaj`, message.content)
         .setThumbnail(message.author.avatarURL) 
         .setTimestamp()
    client.channels.get("KANAL ID").send(dmlog);
    }
});


client.on("message", message => {
  if (message.content.startsWith("dmduyuru")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return; // DM DEN HERKESE MESAJ ATAR KOMUTU: dmduyuru mesaj PREFİXE İHTİYAÇ YOKTUR.!
    let args = message.content.split(" ").slice(1);
    var argresult = args.join(" ");
    message.guild.members
      .filter(m => m.presence.status !== "all")
      .forEach(m => {
        m.send(`${argresult}\n ${m}`);
      });
    message.channel.send(
      `\`${
        message.guild.members.filter(m => m.presence.status !== "all").size
      }\`:mailbox:  Herkese gönderildi.`
    );
    message.delete();
  }
});

client.on('message', message => {
if (message.content === '!tag') {
  const embed = new Discord.RichEmbed()
message.channel.send('TAGINIZ')
}
});

client.on('message', message => {
if (message.content === '!link') {
  const embed = new Discord.RichEmbed()
message.channel.send('SÜRESİZ DAVET LİNKİNİZ')
}
});

client.on('message', message => {
if (message.content === `${prefix}tag`) {
  const embed = new Discord.RichEmbed()
message.channel.send('TAGINIZ')
}
});

client.on('message', message => {
if (message.content === `${prefix}link`) {
  const embed = new Discord.RichEmbed()
message.channel.send('SÜRESİZ DAVET LİNKİNİZ')
}
});

client.on(`guildMemberAdd`, async member => {
member.send(`DM HOŞGELDİN MESAJINIZ`)
});

client.on('guildMemberAdd', member => {
    const koorx = member.guild.channels.find(channel => channel.name === "KANAL ISMI");
      koorx.send(`HOŞGELDİN MESAJINIZ`)
});