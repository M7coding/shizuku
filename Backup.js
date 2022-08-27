const {
 default: makeWASocket,
  DisconnectReason,
  fetchLatestBaileysVersion,
  useSingleFileAuthState
 } = require('@adiwajshing/baileys');

 require("qrcode-terminal");
 const pino = require('pino');
 const fs = require('fs');

 const {
  color,
  bgcolor,
  logs
 } = require('./lib/color');

 // Configuração
 const settings = JSON.parse(fs.readFileSync('./settings/config.json'));
 // PREMIUMLIST
 const premium = JSON.parse(fs.readFileSync('./settings/premium.json'));

case 'bcgp':
case 'bcgc':  
if (args.length < 1) return reply('.......')
fgp = await groupMembers
var nomor = mek.participant
if (isMedia && !mek.message.videoMessage || isQuotedImage) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
buff = await conn.downloadMediaMessage(encmedia)
for (let _ of fgp) {
conn.sendMessage(_.jid, buff, image, {caption: ` ${body.slice(6)}`})
}
reply('')
} else {
for (let _ of fgp) {
sendMess(_.jid, ` ${body.slice(6)}`)
}
reply('X')
} 
break

 async function connectToWhatsApp () {
  const {
   version
  } = await fetchLatestBaileysVersion();

  const {
   state,
   saveState
  } = useSingleFileAuthState(`./BarBar.json`);

  const sock = makeWASocket({
   printQRInTerminal: true,
   logger: pino({
    level: 'silent'
   }),

   browser: ['NS Multi Device', 'Chrome', '3.0'],
   version: version,
   auth: state,
   defaultQueryTimeoutMs: undefined
  });

  sock.ev.on('connection.update', (update) => {
   const {
    connection, lastDisconnect
   } = update;

   if (connection === 'close') {
    const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
    console.log(logs("Erro não suportado! Reconectando..."));

    if (shouldReconnect) {
     connectToWhatsApp();
    }

   } else if (connection === 'open') {
    sock.sendMessage(settings.owner[0], {
     text: `Bot conectado!!\n\nObs: O Prefix é: ${settings.prefix}`
    });
    console.log(logs('Opened Connection - Bot conectado!'));
   }
  });

  sock.ev.on('messages.upsert',
   connection => {
    const mek = connection.messages[0];
    if (mek.key.fromMe) return;
    if (connection.type != 'notify') return;
    if (mek.key.remoteJid === 'status@broadcast') return;

    require('./lib/shizuku')(sock, mek, settings, color);
    // console.log("[ Mek ]", JSON.stringify(mek, null, 2));
   });

  sock.ev.on('creds.update',
   saveState);
 }

 connectToWhatsApp(), (err) => console.log("[ Connection Error ]", color(String(err), 'red'));