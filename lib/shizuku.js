const fs = require("fs");

module.exports = sock = async(sock, mek, settings, color) => {
 try {
  const from = mek.key.remoteJid;
  const type = Object.keys(mek.message).find((key) => !['senderKeyDistributionMessage', 'messageContextInfo'].includes(key));

  await sock.sendPresenceUpdate('available', from);
  await sock.sendReadReceipt(from, mek.key.participant, [mek.key.id]);

  // Prefix: /
  const prefix = settings.prefix;
  const budy = (type === 'conversation') ? mek.message.conversation: (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text: ''
  const body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation: (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption: (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption: (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text: (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message.listResponseMessage.singleSelectReply.selectedRowId: (type == 'templateButtonReplyMessage') ? mek.message.templateButtonReplyMessage.selectedId: (type === 'messageContextInfo') ? mek.message[type].singleSelectReply.selectedRowId: (type == 'sock.sendMessageButtonMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId: (type == 'stickerMessage') && ((mek.message[type].fileSha256.toString('base64')) !== null && (mek.message[type].fileSha256.toString('base64')) !== undefined) ? (mek.message[type].fileSha256.toString('base64')): "" || mek.message[type]?.selectedButtonId || ""
  const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
  const isCmd = body.startsWith(prefix);

  const me = sock.user;
  const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';

  const isGroup = from.endsWith('@g.us');
  const sender = isGroup ? (mek.key.participant ? mek.key.participant: mek.participant): mek.key.remoteJid;
  const groupMetadata = isGroup ? await sock.groupMetadata(from): '';
  const groupName = isGroup ? groupMetadata.subject: '';

  const owner = settings.owner.filter(obj => obj === sender);
  const isOwner = owner.indexOf(sender) === 0;
  const pushname = mek.pushName || "-";

  const reply = (text) => {
   return sock.sendMessage(from, {
    text: text
   }, {
    quoted: mek
   });
  }

  if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m CMD \x1b[1;37m]', color(command, "yellow"), 'do', color(pushname, "yellow"), 'Em', color(groupName));
  if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m MSG \x1b[1;37m]', color("Mensagem", "yellow"), 'do', color(pushname, "yellow"), 'Em', color(groupName));

  switch (command) {
    case 'sair': // faz o bot sair do grupo
sock.groupLeave(from)
break

case 'join':  // faz o bot entrar pelo link
bkz = args.join(' ')
if(!bkz) return enviar('link')
if (bkz.includes('chat.whatsapp.com/')) {
link = bkz.split('app.com/')[1]
await sock.groupAcceptInvite(`${link}`)
enviar('Entrei!')}
   case 'ping':
    reply('Pong!');
    break;
   case 'menu':
     await reply("AGUARDE")
     var templateMessage = {
       text: `
       * SHIZUKU BOT * 
       
       | Versão: 0.1
       | Número do dono: +55 11 98145-8247
      
      *╔═══ꨄ︎•+¹⁸❤‍🔥+¹⁸•ꨄ︎═══╗* 

            ᬊ᭄ 𝐌𝐄𝐍𝐔ᬊ᭄      

      *╚═══ꨄ︎•+¹⁸❤‍🔥+¹⁸•ꨄ︎═══╝*
        
  ║ঔৣ͜͡҉ 💧 ${prefix}cep
  ║ঔৣ͜͡҉ 💧 ${prefix}ip
  ║ঔৣ͜͡҉ 💧 ${prefix}eval
  ║ঔৣ͜͡҉ 💧 ${prefix}menu
  
  *M7code*
       `

     }
     await sock.sendMessage(from, templateMessage)
     
case 'ip':

txt = args.join(" ")

if(txt.length < 2) return reply('Cadê o IP?, digita ae')
hack = await fetchJson(`https://akame-api.herokuapp.com/api/consulta/ip?ip=${txt}&apikey=ay9OWA6P`)

hack = hack.resultado

rsd = `𝐂𝐎𝐍𝐒𝐔𝐋𝐓𝐀 𝐃𝐄 𝐈𝐏`
rsd += `\n\n𝐈𝐩: ${hack.ip}\n`
rsd += `𝐓𝐢𝐩𝐨: ${hack.tipo}\n`
rsd += `𝐂𝐨𝐧𝐭𝐢𝐧𝐞𝐧𝐭𝐞: ${hack.continente}\n`
rsd += `𝐂𝐨𝐧𝐭𝐢𝐧𝐞𝐧𝐭𝐞 𝐒𝐢𝐠𝐥𝐚: ${hack.continente_sigla}\n`
rsd += `𝐏𝐚𝐢́𝐬: ${hack.país}\n`
rsd += `𝐏𝐚𝐢́𝐬 ??𝐢𝐠𝐥𝐚: ${hack.paÍs_sigla}\n`
rsd += `𝐂𝐚𝐩𝐢𝐭𝐚𝐥: ${hack.capital}\n`
rsd += `𝐃𝐃𝐃: ${hack.ddd}\n`
rsd += `𝐏𝐚𝐢́𝐬𝐞𝐬 𝐕𝐢𝐳𝐢𝐧𝐡𝐨𝐬: ${hack.países_vizinhos}\n`
rsd += `𝐂𝐢𝐝𝐚𝐝𝐞: ${hack.cidade}\n`
rsd += `𝐑𝐞𝐠𝐢𝐚̃𝐨: ${hack.região}\n`
rsd += `𝐋𝐚𝐭𝐢𝐭𝐮𝐝𝐞: ${hack.latitude}\n`
rsd += `𝐋𝐨𝐧𝐠𝐢𝐭??𝐝𝐞: ${hack.longitude}\n`
rsd += `𝐀𝐒𝐍: ${hack.asn}\n`
rsd += `𝐎??𝐠𝐚̃𝐨: ${hack.orgão}\n`
rsd += `𝐈𝐒𝐏: ${hack.isp}\n`
rsd += `𝐅𝐮𝐬𝐨 𝐇𝐨𝐫𝐚́𝐫𝐢𝐨: ${hack.fuso_horário}\n`
rsd += `𝐌𝐨𝐞𝐝𝐚: ${hack.moeda}\n`
rsd += `𝐌𝐨𝐞𝐝𝐚 𝐜𝐨́𝐝: ${hack.moeda_code}\n`
rsd += `𝐒𝐢𝐦𝐛𝐨𝐥𝐨 𝐝𝐚 𝐌𝐨𝐞𝐝𝐚: ${hack.símbolo_da_moeda}\n`

rsd +=`\n𝐁𝐘:*SHIZUKU BOT *`
reply(rsd)
break

case 'pong':
  return sock.sendMessage(from, args)
case 'cep':
// if(!isPremium) return reply(enviar.msg.premium)  
if (args.length == 0) return reply(`Exemplo: ${prefix + command} 54330235`)

get_result = await fetchJson(`https://api-team-of-hero.herokuapp.com/api/tools/cep?apikey=apiteam&cep=${query}`)
x = get_result.resultado
k = `𝐜𝐞𝐩 : ${x.cep}
𝐋𝐨𝐠𝐫𝐚𝐝𝐨𝐮𝐫𝐨: ${x.logradouro}
𝐁𝐚𝐢𝐫𝐫𝐨 : ${x.bairro}
𝐋𝐨𝐜𝐚𝐥𝐢𝐝𝐚𝐝𝐞 : ${x.localidade}
𝐔𝐟 : ${x.uf}
𝐈𝐁𝐆𝐄 : ${x.ibge}
𝐆𝐈𝐀 : ${x.gia}
𝐃𝐃𝐃 : ${x.ddd}
𝐒𝐢𝐚𝐟𝐢 : ${x.siafi}`
reply(k)
break 

   case 'eval':
    if (!isOwner) return reply('Recurso privado para meu dono!');
    try {
     eval(`(async () => {
      try {
      await reply('× [ Eval ] Comando executado!');
      ${budy.slice(5)}
      } catch(err) {
      console.log("Error : %s", color(err, "red"));
      reply(String(err));
      }
      })();`);
    } catch(err) {
     reply(String(err));
     console.log("Error : %s", color(err, "red"));
    }
    break;

   default:
    // code
   }
   /* code */
  } catch (e) {
   err = String(e);
   console.log("Error : %s", color(err, "red"));
  };
 }

 let file = require.resolve(__filename);
 fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update file: ${__filename}`);
  delete require.cache[file];
  require(file);
 });