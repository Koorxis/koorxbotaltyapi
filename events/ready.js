const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const log = message => {
  console.log(`BOT : ${message}`);
};

var prefix = ayarlar.prefix;

module.exports = client => {
  log(`Komutları yükledim!`)
  log(`${client.user.username} ismi ile giriş yaptım!`)
  log(`Oyun ismimi ayarladım!`)
  log(`Şu an ${client.channels.size} kanala, ${client.guilds.size} sunucuya ve ${client.users.size} kullanıcıya hizmet veriyorum!`)
  client.user.setStatus("dnd")
client.on('ready', () => {
    client.user.setPresence({
        game: {
            name: `KOORX ALTYAPI...`,
            type: 'LISTENING'
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
};