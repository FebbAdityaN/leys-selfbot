/*
* Example Script WhatsApp-Bot
* With API leyscoders-api.herokuapp.com
* Di Script ini tidak full api diatas
* Hanya beberapa yang dimasukan ke script ini
* Thank you to mhankbarbar for providing the base
*/
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const qrcode = require("qrcode-terminal")
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const getEmoji = require('./lib/emoji-api')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const lolis = require('lolis.life')
const loli = new lolis()
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))
prefix = setting.prefix
blocked = []

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
const client = new WAConnection()
client.logger.level = 'warn'
client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color('Silahkan Scan Qr Nya!'))
	})
	client.on('credentials-updated', () => {
		fs.writeFileSync('./leys-selfbot.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
		info('2', 'Sedang Menyambungkan...')
	})
	fs.existsSync('./leys-selfbot.json') && client.loadAuthInfo('./leys-selfbot.json')
	client.on('connecting', () => {
		start('2', 'Connecting')
	})
	client.on('open', () => {
		success('2', 'Sukses Connect')
	})
	await client.connect({timeoutMs: 30*1000})

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Halo @${num.split('@')[0]}\nSelamat datang di group *${mdata.subject}*`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Sayonara @${num.split('@')[0]}👋`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

	client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
            if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (!mek.key.fromMe) return // For Self-Bot
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = setting.apiKey // get it at leyscoders-api.herokuapp.com
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			let d = new Date
			let locale = 'id'
			let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
			let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
			let week = d.toLocaleDateString(locale, { weekday: 'long' })
			let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
			let waktu = d.toLocaleDateString(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric' })
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			txt = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			const q = args.join(' ')

			mess = {
				wait: 'Tunggu sedang diproses...',
				success: '_Self-Bot_\n- - - - - - - - - - - - - -\nSince 2020\nAPI : leyscoders-api.herokuapp.com',
				error: {
					stick: 'Gagal, terjadi kesalahan saat mengkonversi gambar ke sticker',
					Iv: 'Link tidak valid'
				},
				only: {
					group: '❌ Perintah ini hanya bisa di gunakan dalam group! ❌',
					ownerG: '❌ Perintah ini hanya bisa di gunakan oleh owner group! ❌',
					ownerB: '❌ Perintah ini hanya bisa di gunakan oleh owner bot! ❌',
					admin: '❌ Perintah ini hanya bisa di gunakan oleh admin group! ❌',
					Badmin: '❌ Perintah ini hanya bisa di gunakan ketika bot menjadi admin! ❌'
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`] // replace this with your number
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			function convertToString(angka) {
				var balancenyeini = '';
				var angkarev = angka.toString().split('').reverse().join('');
				for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) balancenyeini += angkarev.substr(i,3)+'.';
				return ''+balancenyeini.split('',balancenyeini.length-1).reverse().join('');
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			
			let authorname = client.contacts[from] != undefined ? client.contacts[from].vname || client.contacts[from].notify : undefined	
			if (authorname != undefined) { } else { authorname = groupName }	
			
			function addMetadata(packname, author) {
				if (!packname) packname = 'WABot'; if (!author) author = 'Bot';	
				author = author.replace(/[^a-zA-Z0-9]/g, '');	
				let name = `${author}_${packname}`
				if (fs.existsSync(`./src/stickers/${name}.exif`)) return `./src/stickers/${name}.exif`
				const json = {	
					"sticker-pack-name": packname,
					"sticker-pack-publisher": author,
				}
				const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
				const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

				let len = JSON.stringify(json).length	
				let last	

				if (len > 256) {	
					len = len - 256	
					bytes.unshift(0x01)	
				} else {	
					bytes.unshift(0x00)	
				}	

				if (len < 16) {	
					last = len.toString(16)	
					last = "0" + len	
				} else {	
					last = len.toString(16)	
				}	

				const buf2 = Buffer.from(last, "hex")	
				const buf3 = Buffer.from(bytes)	
				const buf4 = Buffer.from(JSON.stringify(json))	

				const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

				fs.writeFile(`./src/stickers/${name}.exif`, buffer, (err) => {	
					return `./src/stickers/${name}.exif`	
				})	

			}
			switch(command) {
				case 'help':
				case 'menu':
					/** get apikey on https://leyscoders-api.herokuapp.com/api */
					teks =`「 SELF-BOT LeysCoders-Api 」

• Lib: Baileys
• Prefix: 「 ${prefix} 」
• Recode: Febb
• ${week} ${weton}, ${date}

╭── -> STICKER
│• ${prefix}sticker
│• ${prefix}toimg
│• ${prefix}togif
│• ${prefix}semoji *emoji|type*
╰───

╭── -> DOWNLOADER
│• ${prefix}ytmp4 *link*
│• ${prefix}ytmp3 *link*
│• ${prefix}fbdl *link*
│• ${prefix}lk21 *query*
│• ${prefix}apkpure *query*
│• ${prefix}rexdl *query*
│• ${prefix}moddroid *query*
│• ${prefix}sfile *query*
│• ${prefix}mediafire *link*
│• ${prefix}igfoto *link*
│• ${prefix}igvideo *link*
╰───

╭── -> INFO
│• ${prefix}info gempa
│• ${prefix}info hujan
│• ${prefix}info tsunami
│• ${prefix}info loker
│• ${prefix}info hoax
│• ${prefix}info bola
│• ${prefix}info cuaca *query*
│• ${prefix}jalantikus *query*
│• ${prefix}cek-ip *query*
╰───

╭── -> NEWS
│• ${prefix}news detik
│• ${prefix}news kompas
│• ${prefix}news okezone
╰───

╭── -> ISLAMI
│• ${prefix}randomsurah
│• ${prefix}kisahnabi *query*
│• ${prefix}asmaulhusna
╰───

╭── -> EDUCATION
│• ${prefix}fakta
│• ${prefix}wiki *query*
╰───

╭── -> PRIMBON
│• ${prefix}primbon tahilalat
│• ${prefix}primbon nama *query*
│• ${prefix}primbon mimpi *query*
╰───

╭── -> STALKER
│• ${prefix}stalk github *query*
│• ${prefix}stalk ig *query*
╰───

╭── -> IMAGE MAGICK
│• ${prefix}tahta *teks*
│• ${prefix}quotemaker *teks*
╰───

╭── -> TEXT MAKER
│• ${prefix}glitch *teks|teks*
│• ${prefix}pokemon *teks*
│• ${prefix}csgo *teks*
│• ${prefix}crossfire *teks*
│• ${prefix}warface *teks*
│• ${prefix}shadow *teks*
│• ${prefix}smoke *teks*
╰───

╭── -> IMAGE MANIPULATION
│• ${prefix}joke
│• ${prefix}wasted
│• ${prefix}hitler
│• ${prefix}wanted
│• ${prefix}greyscale
│• ${prefix}trash
│• ${prefix}circle
│• ${prefix}blur
│• ${prefix}sepia
│• ${prefix}invert
│• ${prefix}affect
│• ${prefix}picture
╰───

╭── -> RANDOM IMAGE
│• ${prefix}random nekonime
│• ${prefix}random anime
│• ${prefix}random waifu
│• ${prefix}random darkjoke
│• ${prefix}random meme
│• ${prefix}random aesthetic
│• ${prefix}random pp-couple
╰───

╭── -> ANIME/MANGA
│• ${prefix}kiryuu *query*
│• ${prefix}dewabatch *query*
│• ${prefix}jurnalotaku-popular
│• ${prefix}jadwal-anoboy
│• ${prefix}anoboy-ongoing
│• ${prefix}animanga
│• ${prefix}otakunews
╰───

╭── -> MOVIE & STORY
│• ${prefix}movie drakor-ongoing
│• ${prefix}movie jadwal-bioskop
│• ${prefix}story cersex
│• ${prefix}story horror
│• ${prefix}story cerpen
╰───

╭── -> TOOLS
│• ${prefix}tinyurl *link*
│• ${prefix}cuttly *link*
│• ${prefix}shorturl *link*
│• ${prefix}porn-detect
╰───

╭── -> CONVERTER
│• ${prefix}bytes *query*
│• ${prefix}encrypt *query*
│• ${prefix}deceypt *query*
│• ${prefix}base64-enc *query*
│• ${prefix}base64-dec *query*
│• ${prefix}base32-enc *query*
│• ${prefix}base32-dec *query*
╰───

_Powered by nodejs 14.x.x_`
					client.sendMessage(from, teks, text, {quoted: mek})
					break
				case 'semoji':
					var imgbb = require('imgbb-uploader')
					emoji = await body.slice(8).split("|")
					arrtype = ['apple', 'google', "samsung", "microsoft", "whatsapp", "twitter", "facebook", "joypixel", "openemoji", "emojidex", "messenger", "ig", "htc", "mozilla"]
					if (!arrtype.includes(emoji[1])) return reply(`Type yang kamu input tidak terdaftar dalam list\nList Type:\napple, google, samsung, microsoft, whatsapp, twitter, facebook, joypixel, openemoji, emojidex, messenger, ig, htc, mozilla`)
					emo = await getEmoji(`${emoji[0]}`, `${emoji[1]}`)
					data = await imageToBase64(JSON.stringify(emo).replace(/\"/gi, ''))
					fs.writeFileSync('emoji.jpeg', data, 'base64')
					result = await imgbb("b0fc132474ca03ee7898fd5cac7275fe", 'emoji.jpeg')
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					exec(`wget ${result.display_url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						febb.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
					})
					break
				case 'porn-detect':
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						owgi = await client.downloadAndSaveMediaMessage(ger)
						data = await imgbb("b0fc132474ca03ee7898fd5cac7275fe", owgi)
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/porn-detect?url=${data.display_url}&apikey=${apiKey}`)
						teks = `• ${anu.result[0].name} -> ${anu.result[0].persentase}\n• ${anu.result[1].name} -> ${anu.result[1].persentase}\n• ${anu.result[2].name} -> ${anu.result[2].persentase}\n• ${anu.result[3].name} -> ${anu.result[3].persentase}\n• ${anu.result[4].name} -> ${anu.result[4].persentase}`
						reply(teks)
					} else {
						reply('Reply fotonya untuk mengetahui persentase foto yang di inginkan')
					}
					break
				case 'igfoto':
				case 'igphoto':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/instagram/photo?url=${q}&apikey=${apiKey}`)
					buff = await getBuffer(anu.result)
					client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					break
				case 'igvideo':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/instagram/video?url=${q}&apikey=${apiKey}`)
					buff = await getBuffer(anu.result)
					client.sendMessage(from, buff, video, {quoted: mek, caption: mess.success})
					break
				case 'bytes':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/byte-converter?q=${q}&apikey=${apiKey}`)
					teks = `${anu.result}`
					client.sendMessage(from, teks, text, {quoted: mek})
					break
				case 'encrypt':
					query = body.slice(9).split("|")
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/encrypt-with-password?q=${query[0]}&password=${query[1]}&apikey=${apiKey}`)
					teks = `${anu.result.encrypt}`
					client.sendMessage(from, teks, text, {quoted: mek})
					break
				case 'decrypt':
					query = body.slice(9).split("|")
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/decrypt-with-password?q=${query[0]}&password=${query[1]}&apikey=${apiKey}`)
					teks = `${anu.result.decrypt}`
					client.sendMessage(from, teks, text, {quoted: mek})
					break
				case 'base64-dec':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/base64/decode?q=${q}&apikey=${apiKey}`)
					teks = `${anu.result.decode}`
					client.sendMessage(from, teks, text, {quoted: mek})
					break
				case 'base64-enc':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/base64/encode?q=${q}&apikey=${apiKey}`)
					teks = `${anu.result.encode}`
					client.sendMessage(from, teks, text, {quoted: mek})
					break
				case 'base32-enc':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/base32/encode?q=${q}&apikey=${apiKey}`)
					teks = `${anu.result.encode}`
					client.sendMessage(from, teks, text, {quoted: mek})
					break
				case 'base32-dec':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/base32/decode?q=${q}&apikey=${apiKey}`)
					teks = `${anu.result.decode}`
					client.sendMessage(from, teks, text, {quoted: mek})
					break
				case 'cek-ip':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/cekip?ip=${q}&apikey=${apiKey}`)
					v = anu.result
					client.sendMessage(from, `「 RESULT FOUND 」\n• Code Country: ${v.code_country}\n• Country: ${v.country}\n• Region Code: ${v.region_code}\n• Region Name: ${v.region_name}\n• City: ${v.city}\n• Isp: ${v.isp}\n• Zip Code: ${v.zip_code}\n• Timezone: ${v.timezone}`, text, {quoted: mek})
					break
				case 'sfile':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/sfile?q=${q}&apikey=${apiKey}`)
					teks = '=================\n'
					no = 0
					for (let v of anu.result) {
						no += 1
						teks += `HASIL KE - ${no.toString()}\n• Title: ${v.title}\n• Size: ${v.size}\n• Url: ${v.url}\n=================\n`
					}
					reply(teks)
					break
				case 'shadow':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/textmaker/shadow-sky?q=${q}&apikey=${apiKey}`)
					buff = await getBuffer(anu.result.url)
					client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					break
				case 'smoke':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/textmaker/smooke?q=${q}&apikey=${apiKey}`)
					buff = await getBuffer(anu.result.url)
					client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					break
				case 'warface':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/textmaker/warface?q=${q}&apikey=${apiKey}`)
					buff = await getBuffer(anu.result.url)
					client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					break
				case 'csgo':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/textmaker/csgo?q=${q}&apikey=${apiKey}`)
					buff = await getBuffer(anu.result.url)
					client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					break
				case 'crossfire':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/textmaker/crossfire?q=${q}&apikey=${apiKey}`)
					buff = await getBuffer(anu.result.url)
					client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					break
				case 'glitch':
					teks = body.slice(8).split("|")
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/textmaker/glitch?q1=${teks[0]}&q2=${teks[1]}&apikey=${apiKey}`)
					buff = await getBuffer(anu.result.url)
					client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					break
				case 'pokemon':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/textmaker/pokemon?q=${q}&apikey=${apiKey}`)
					buff = await getBuffer(anu.result.url)
					client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					break
				/** TEXT MAKER LAINNYA? INPUT SENDIRI YA, CONTOH UDAH ADA */
				case 'picture':
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						owgi = await client.downloadAndSaveMediaMessage(ger)
						data = await imgbb("b0fc132474ca03ee7898fd5cac7275fe", owgi)
						buff = await getBuffer(`https://leyscoders-api.herokuapp.com/api/img/picture?url=${data.display_url}&apikey=${apiKey}`)
						client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					} else {
						reply(`Kirim foto atau reply foto yang sudah dikirim, dengan caption ${prefix}picture`)
					}
					break
				case 'affect':
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						owgi = await client.downloadAndSaveMediaMessage(ger)
						data = await imgbb("b0fc132474ca03ee7898fd5cac7275fe", owgi)
						buff = await getBuffer(`https://leyscoders-api.herokuapp.com/api/img/affect?url=${data.display_url}&apikey=${apiKey}`)
						client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					} else {
						reply(`Kirim foto atau reply foto yang sudah dikirim, dengan caption ${prefix}affect`)
					}
					break
				case 'invert':
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						owgi = await client.downloadAndSaveMediaMessage(ger)
						data = await imgbb("b0fc132474ca03ee7898fd5cac7275fe", owgi)
						buff = await getBuffer(`https://leyscoders-api.herokuapp.com/api/img/invert?url=${data.display_url}&apikey=${apiKey}`)
						client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					} else {
						reply(`Kirim foto atau reply foto yang sudah dikirim, dengan caption ${prefix}invert`)
					}
					break
				case 'firework':
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						owgi = await client.downloadAndSaveMediaMessage(ger)
						data = await imgbb("b0fc132474ca03ee7898fd5cac7275fe", owgi)
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/img/invert?url=${data.display_url}&apikey=${apiKey}`)
						buff = await getBuffer(anu.result.url)
						client.sendMessage(from, buff, video, {quoted: mek, caption: mess.success})
					} else {
						reply(`Kirim foto atau reply foto yang sudah dikirim, dengan caption ${prefix}firework`)
					}
					break
				case 'sepia':
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						owgi = await client.downloadAndSaveMediaMessage(ger)
						data = await imgbb("b0fc132474ca03ee7898fd5cac7275fe", owgi)
						buff = await getBuffer(`https://leyscoders-api.herokuapp.com/api/img/sepia?url=${data.display_url}&apikey=${apiKey}`)
						client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					} else {
						reply(`Kirim foto atau reply foto yang sudah dikirim, dengan caption ${prefix}sepia`)
					}
					break
				case 'blur':
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						owgi = await client.downloadAndSaveMediaMessage(ger)
						data = await imgbb("b0fc132474ca03ee7898fd5cac7275fe", owgi)
						buff = await getBuffer(`https://leyscoders-api.herokuapp.com/api/img/blur?url=${data.display_url}&level=20&apikey=${apiKey}`)
						client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					} else {
						reply(`Kirim foto atau reply foto yang sudah dikirim, dengan caption ${prefix}blur`)
					}
					break
				case 'circle':
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						owgi = await client.downloadAndSaveMediaMessage(ger)
						data = await imgbb("b0fc132474ca03ee7898fd5cac7275fe", owgi)
						buff = await getBuffer(`https://leyscoders-api.herokuapp.com/api/img/circle?url=${data.display_url}&apikey=${apiKey}`)
						client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					} else {
						reply(`Kirim foto atau reply foto yang sudah dikirim, dengan caption ${prefix}circle`)
					}
					break
				case 'trash':
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						owgi = await client.downloadAndSaveMediaMessage(ger)
						data = await imgbb("b0fc132474ca03ee7898fd5cac7275fe", owgi)
						buff = await getBuffer(`https://leyscoders-api.herokuapp.com/api/img/trash?url=${data.display_url}&apikey=${apiKey}`)
						client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					} else {
						reply(`Kirim foto atau reply foto yang sudah dikirim, dengan caption ${prefix}trash`)
					}
					break
				case 'greyscale':
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						owgi = await client.downloadAndSaveMediaMessage(ger)
						data = await imgbb("b0fc132474ca03ee7898fd5cac7275fe", owgi)
						buff = await getBuffer(`https://leyscoders-api.herokuapp.com/api/img/greyscale?url=${data.display_url}&apikey=${apiKey}`)
						client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					} else {
						reply(`Kirim foto atau reply foto yang sudah dikirim, dengan caption ${prefix}greyscale`)
					}
					break
				case 'wanted':
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						owgi = await client.downloadAndSaveMediaMessage(ger)
						data = await imgbb("b0fc132474ca03ee7898fd5cac7275fe", owgi)
						buff = await getBuffer(`https://leyscoders-api.herokuapp.com/api/img/wanted?url=${data.display_url}&apikey=${apiKey}`)
						client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					} else {
						reply(`Kirim foto atau reply foto yang sudah dikirim, dengan caption ${prefix}wanted`)
					}
					break
				case 'hitler':
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						owgi = await client.downloadAndSaveMediaMessage(ger)
						data = await imgbb("b0fc132474ca03ee7898fd5cac7275fe", owgi)
						buff = await getBuffer(`https://leyscoders-api.herokuapp.com/api/img/hitler?url=${data.display_url}&apikey=${apiKey}`)
						client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					} else {
						reply(`Kirim foto atau reply foto yang sudah dikirim, dengan caption ${prefix}hitler`)
					}
					break
				case 'wasted':
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						owgi = await client.downloadAndSaveMediaMessage(ger)
						data = await imgbb("b0fc132474ca03ee7898fd5cac7275fe", owgi)
						buff = await getBuffer(`https://leyscoders-api.herokuapp.com/api/img/wasted?url=${data.display_url}&apikey=${apiKey}`)
						client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					} else {
						reply(`Kirim foto atau reply foto yang sudah dikirim, dengan caption ${prefix}wasted`)
					}
					break
				case 'joke':
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						owgi = await client.downloadAndSaveMediaMessage(ger)
						data = await imgbb("b0fc132474ca03ee7898fd5cac7275fe", owgi)
						buff = await getBuffer(`https://leyscoders-api.herokuapp.com/api/img/joke?url=${data.display_url}&apikey=${apiKey}`)
						client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					} else {
						reply(`Kirim foto atau reply foto yang sudah dikirim, dengan caption ${prefix}joke`)
					}
					break
				case 'kiryuu':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/kiryuu-search?q=${q}&apikey=${apiKey}`)
					teks = '=================\n'
					no = 0
					for (let v of anu.result) {
						no += 1
						teks += `HASIL KE - ${no.toString()}\n• Title: ${v.title}\n• Chapter: ${v.chapter}\n• Rate: ${v.rate}\n• Url: ${v.url}\n=================\n`
					}
					reply(teks)
					break
				case 'otakunews':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/otakunews?apikey=${apiKey}`)
					teks = '=================\n'
					no = 0
					for (let v of anu.result) {
						no += 1
						teks += `HASIL KE - ${no.toString()}\n• Title: ${v.title}\n• Thumb: ${v.img}\n• Url: ${v.url}\n=================\n`
					}
					reply(teks)
					break
				case 'dewabatch':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/dewabatch-search?q=${q}&apikey=${apiKey}`)
					teks = '=================\n'
					no = 0
					for (let v of anu.result) {
						no += 1
						teks += `HASIL KE - ${no.toString()}\n• Title: ${v.title}\n• Thumb: ${v.img}\n• Url: ${v.url}\n=================\n`
					}
					reply(teks)
					break
				case 'jurnalotaku-popular':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/jurnalotaku-popular?apikey=${apiKey}`)
					teks = '=================\n'
					no = 0
					for (let v of anu.result) {
						no += 1
						teks += `HASIL KE - ${no.toString()}\n• Title: ${v.judul}\n• Thumb: ${v.img}\n• Url: ${v.url}\n=================\n`
					}
					reply(teks)
					break
				case 'animanga':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/animanga?apikey=${apiKey}`)
					teks = '=================\n'
					no = 0
					for (let v of anu.result) {
						no += 1
						teks += `HASIL KE - ${no.toString()}\n• Title: ${v.title}\n• Thumb: ${v.img}\n• Url: ${v.url}\n=================\n`
					}
					reply(teks)
					break
				case 'jadwal-anoboy':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/jadwalanoboy?apikey=${apiKey}`)
					client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					break
				case 'anoboy-ongoing':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/anoboy-ongoing?apikey=${apiKey}`)
					client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					break
				case 'random':
					if (args.length < 1) return reply(`Penggunaan Fitur Random:\n• ${prefix}random nekonime\n• ${prefix}random anime\n• ${prefix}random waifu\n• ${prefix}random darkjoke\n• ${prefix}random meme\n• ${prefix}random aesthetic\n• ${prefix}random pp-couple`)
					if (args[0].toLowerCase() === 'nekonime') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/nekonime?apikey=${apiKey}`)
						buff = await getBuffer(anu.result)
						client.sendMessage(from, buff, image, {quoted: mek})
					} else if (args[0].toLowerCase() === 'anime') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/random-nimek?apikey=${apiKey}`)
						buff = await getBuffer(anu.result)
						client.sendMessage(from, buff, image, {quoted: mek})
					} else if (args[0].toLowerCase() === 'waifu') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/random-waifu?apikey=${apiKey}`)
						buff = await getBuffer(anu.result)
						client.sendMessage(from, buff, image, {quoted: mek})
					} else if (args[0].toLowerCase() === 'darkjoke') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/darkjoke?apikey=${apiKey}`)
						buff = await getBuffer(anu.result)
						client.sendMessage(from, buff, image, {quoted: mek})
					} else if (args[0].toLowerCase() === 'meme') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/memeindo?apikey=${apiKey}`)
						buff = await getBuffer(anu.result)
						client.sendMessage(from, buff, image, {quoted: mek})
					} else if (args[0].toLowerCase() === 'aesthetic') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/estetik?apikey=${apiKey}`)
						buff = await getBuffer(anu.result)
						client.sendMessage(from, buff, image, {quoted: mek})
					} else if (args[0].toLowerCase() === 'pp-couple') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/ppcouple?apikey=${apiKey}`)
						buff1 = await getBuffer(anu.result.male)
						client.sendMessage(from, buff1, image, {quoted: mek, caption: 'Male'})
						buff2 = await getBuffer(anu.result.female)
						setTimeout( async () => {
							client.sendMessage(from, buff2, image, {quoted: mek, caption: 'Female'})
						}, 5000)
					}
					break
				case 'tahta':
					buff = await getBuffer(`https://leyscoders-api.herokuapp.com/api/harta-tahta?text=${q}&apikey=${apiKey}`)
					client.sendMessage(from, buff, image, {quoted: mek})
					break
				case 'quotemaker':
					buff = await getBuffer(`https://leyscoders-api.herokuapp.com/api/quote-maker?text=${q}&apikey=${apiKey}`)
					client.sendMessage(from, buff, image, {quoted: mek})
				case 'tinyurl':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/tinyurl?url=${q}&apikey=${apiKey}`)
					client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					break
				case 'cuttly':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/cuttly?url=${q}&apikey=${apiKey}`)
					client.sendMessage(from, `• Hasil: ${anu.result.hasil}\n• Dibuat Pada: ${anu.result.create_at}`, text, {quoted: mek})
					break
				case 'shorturl':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/shrturl?url=${q}&apikey=${apiKey}`)
					client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					break
				case 'movie':
					if (args.length < 1) return reply(`Penggunaan Fitur Movie:\n• ${prefix}movie drakor-ongoing\n• ${prefix}movie jadwal-bioskop`)
					if (args[0].toLowerCase() === 'drakor-ongoing') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/drakor-ongoing?apikey=${apiKey}`)
						teks = '=================\n'
						no = 0
						for (let v of anu.result) {
							no += 1
							teks += `HASIL KE - ${no.toString()}\n• Title: ${v.title}\n• Genre: ${v.genre}\n• Thumb: ${v.img}\n• Url: ${v.url}\n=================\n`
						}
						reply(teks)
					} else if (args[0].toLowerCase() === 'jadwal-bioskop') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/jadwal-bioskop?apikey=${apiKey}`)
						teks = '=================\n'
						no = 0
						for (let v of anu.result) {
							no += 1
							teks += `HASIL KE - ${no.toString()}\n• Title: ${v.title}\n• Thumb: ${v.img}\n• Url: ${v.url}\n=================\n`
						}
					}
					break
				case 'story':
					if (args.length < 1) return reply(`Penggunaan Fitur Story:\n• ${prefix}story cersex\n• ${prefix}story horror\n• ${prefix}story cerpen`)
					if (args[0].toLowerCase() === 'cersex') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/cersex?apikey=${apiKey}`)
						buff = await getBuffer(anu.gambar)
						client.sendMessage(from, buff, image, {quoted: mek, caption: `${anu.result}`})
					} else if (args[0].toLowerCase() === 'horror') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/cerita-horor?apikey=${apiKey}`)
						client.sendMessage(from, `• Title: ${anu.result.title}\n• Desc: ${anu.result.desc}\n• Cerita: ${anu.result.story}`, text, {quoted: mek})
					} else if (args[0].toLowerCase() === 'cerpen') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/cerpen?apikey=${apiKey}`)
						client.sendMessage(from, `• Title: ${anu.result.title}\n• Pengarang: ${anu.result.pengarang}\n• Kategori: ${anu.result.kategori}\n• Cerita: ${anu.result.story}`, text, {quoted: mek})
					}
					break
				/*
				* JIKA ERROR :
				* cannot read property 'toString'
				* Maka hapus ${convertToString(..)}
				* Cukup Panggil Json nya saja, jadi seperti, contoh :
				* ${data.view} < tidak perlu menggunakan func convertToString
				* Segitu Saja yahaha
				* Regards: febb^^
				*/
				case 'stalk':
					if (args.length < 1) return reply(`Penggunaan Fitur Stalk:\n• ${prefix}stalk github *username*\n• ${prefix}stalk ig *username*`)
					if (args[0].toLowerCase() === 'github') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/github?q=${args[1]}&apikey=${apiKey}`)
						stringTime = new Date(`${anu.result.user.dibuat_pada}`);
						stringTime2 = stringTime.getDate() + "/" + (stringTime.getMonth() + 1) + "/" + stringTime.getFullYear();
						teks = `「 RESULT FOUND 」\n• Username: ${anu.result.username}\n• Nama: ${anu.result.user.nama}\n• Bio: ${anu.result.user.bio}\n• Public Repos: ${anu.result.user.public_repos}\n• Following: ${anu.result.user.following}\n• Followers: ${anu.result.followers}\n• Dibuat Pada: ${stringTime2}\n• Source: ${anu.result.user.link}`
						buff = await getBuffer(anu.result.user.avatar)
						client.sendMessage(from, buff, image, {quoted: mek, caption: teks})
					} else if (args[0].toLowerCase() === 'ig') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/igstalk?user=${args[1]}&apikey=${apiKey}`)
						data = anu.result[0]
						teks = `「 RESULT FOUND 」\n• Username: ${data.username}\n• Full Name: ${data.fullName}\n• Bio: ${data.biography}\n• Follower: ${convertToString(data.follower)}\n• Following: ${convertToString(data.following)}\n• Total Post: ${data.postsCount}\n• Verified: ${data.isVerified}\n• Private: ${data.isPrivate}`
						buff = await getBuffer(data.profilePic)
						client.sendMessage(from, buff, image, {quoted: mek, caption: teks})
					}
					break
				case 'fakta':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/fakta?apikey=${apiKey}`)
					client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					break
				case 'wiki':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/wiki?kata=${q}&apikey=${apiKey}`)
					client.sendMessage(from, `「 RESULT FOUND 」\n• Hasil Pencarian Dari: ${anu.result.from}\n• Hasil: ${anu.hasil}`, text, {quoted: mek})
					break
				case 'primbon':
					argz = body.split(' ')
					if (argz.length === 1) return reply(`Penggunaan Fitur Primbon:\n• ${prefix}primbon nama *nama*\n• ${prefix}primbon tahilalat\n• ${prefix}primbon mimpi *query*`)
					if (argz[1].toLowerCase() === 'nama') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/artinama?q=${argz[2]}&apikey=${apiKey}`)
						client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					} else if (argz[1].toLowerCase() === 'tahilalat') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/tahi-lalat?apikey=${apiKey}`)
						client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					} else if (argz[1].toLowerCase() === 'mimpi') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/artimimpi?q=${argz[2]}&apikey=${apiKey}`)
						client.sendMessage(from, `${anu.result}`, text, {quoted: mek})
					}
					break
				case 'asmaulhusna':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/asmaul-husna?apikey=${apiKey}`)
					client.sendMessage(from, `• Arab: ${anu.result.arab}\n• Latin: ${anu.result.latin}\n• Urut: ${anu.result.urut}\n• Id: ${anu.result.id}`, text, {quoted: mek})
					break
				case 'randomsurah':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/randomquran?apikey=${apiKey}`)
					teks = `• Nama: ${anu.result.nama}\n• Arti: ${anu.result.arti}\n• Ayat Ke: ${anu.result.ayat}\n• Diturunkan: di ${anu.result.type}\n• Penjelasan: ${anu.result.ket}\n• Audio: ${anu.result.audio}`
					client.sendMessage(from, teks, text, {quoted: mek})
					break
				case 'kisahnabi':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/nabi?q=${q}&apikey=${apiKey}`)
					teks = `「 RESULT FOUND 」\n• Nama: ${anu.result.nabi}\n• Lahir: ${anu.result.lahir}\n• Umur: ${anu.result.umur}\n• Tempat: ${anu.result.tempat}\n• Kisah: ${anu.result.kisah}`
					buff = await getBuffer(anu.result.image)
					client.sendMessage(from, buff, image, {quoted: mek, caption: teks})
					break
				case 'news':
					argz = body.split(' ')
					if (argz.length === 1) return reply(`Penggunaan Fitur News:\n• ${prefix}news detik\n• ${prefix}news kompas\n• ${prefix}news okezone`)
					if (argz[1].toLowerCase() === 'detik') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/detik?apikey=${apiKey}`)
						teks = '=================\n'
						no = 0
						for (let v of anu.result) {
							no += 1
							teks += `HASIL KE - ${no.toString()}\n• Title: ${v.title}\n• Url: ${v.url}\n=================\n`
						}
						reply(teks)
					} else if (argz[1].toLowerCase() === 'kompas') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/kompas?apikey=${apiKey}`)
						teks = '=================\n'
						no = 0
						for (let v of anu.result) {
							no += 1
							teks += `HASIL KE - ${no.toString()}\n• Title: ${v.title}\n• Url: ${v.url}\n=================\n`
						}
						reply(teks)
					} else if (argz[1].toLowerCase() === 'okezone') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/okezone?apikey=${apiKey}`)
						teks = '=================\n'
						no = 0
						for (let v of anu.result) {
							no += 1
							teks += `HASIL KE - ${no.toString()}\n• Title: ${v.title}\n• Url: ${v.url}\n=================\n`
						}
						reply(teks)
					}
					break
				case 'jalantikus':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/jalantikus?q=${q}&apikey=${apiKey}`)
					teks = '=================\n'
					no = 0
					for (let v of anu.result) {
						no += 1
						teks += `HASIL KE - ${no.toString()}\n• Title: ${v.title}\n• Url: ${v.url}\n=================\n`
					}
					reply(teks)
					break
				case 'info':
					argz = body.split(' ')
					if (argz.length === 1) return reply(`Penggunaan Fitur Info:\n• ${prefix}info gempa\n• ${prefix}info hujan\n• ${prefix}info tsunami\n• ${prefix}info loker\n• ${prefix}info bola\n• ${prefix}info hoax`)
					if (argz[1].toLowerCase() === 'gempa') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/infogempa?apikey=${apiKey}`)
						teks = `「 RESULT 」\n• Wilayah: ${anu.result.Wilayah}\n• Waktu: ${anu.result.Waktu}\n• Kedalaman: ${anu.result.Kedalaman}\n• Magnitudo: ${anu.result.Magnitudo}\n• Bujur: ${anu.result.Bujur}\n• Lintang: ${anu.result.Lintang}`
						buff = await getBuffer(anu.result.Map)
						client.sendMessage(from, buff, image, {quoted: mek, caption: teks})
					} else if (argz[1].toLowerCase() === 'cuaca') {
						anu = await fetchJson(`http://leyscoders-api.herokuapp.com/api/cuaca?q=${argz[2]}&apikey=${apiKey}`)
						teks = `「 RESULT 」\n• Daerah: ${anu.result.Daerah}\n• Latitude: ${anu.result.Latitude}\n• Longitude: ${anu.result.Longitude}\n• Timezone: ${anu.result.TimeZone}\n• Temperature: ${anu.result.Temperature}\n• Tanggal: ${anu.result.Tanggal}\n• Waktu: ${anu.result.Cuaca}\n• Cuaca: ${anu.result.Cuaca}`
						client.sendMessage(from, teks, text, {quoted: mek})
					} else if (argz[1].toLowerCase() === 'hujan') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/cuaca/hujan?apikey=${apiKey}`)
						buff = await getBuffer(anu.result)
						client.sendMessage(from, buff, image, {quoted: mek})
					} else if (argz[1].toLowerCase() === 'tsunami') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/info-tsunami?apikey=${apiKey}`)
						teks = `「 RESULT 」\n• Wilayah: ${anu.result.Wilayah}\n• Kedalaman: ${anu.result.Kedalaman}\n• Waktu: ${anu.result.waktu}\n• Koordinat: ${anu.result.koordinat}\n• Magnitude: ${anu.result.magnitude}`
						client.sendMessage(from, teks, text, {quoted: mek})
					} else if (argz[1].toLowerCase() === 'loker') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/info-loker?apikey=${apiKey}`)
						teks = '=================\n'
						no = 0
						for (let v of anu.result) {
							no += 1
							teks += `HASIL KE -${no.toString()}\n• Title: ${v.title}\n• Perusahaan: ${v.perusahaan}\n• Locate: ${v.locate}\n• Gaji: ${v.gaji}\n=================\n`
						}
						reply(teks)
					} else if (argz[1].toLowerCase() === 'bola') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/jadwalbola?apikey=${apiKey}`)
						teks = '=================\n'
						no = 0
						for (let v of anu.result) {
							no += 1
							teks += `HASIL KE - ${no.toString()}\n• Channel: ${v.channel}\n• Waktu: ${v.waktu}\n• KickOff: ${v.kickoff}\n`
						}
						reply(teks)
					} else if (argz[1].toLowerCase() === 'hoax') {
						anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/infohoax?apikey=${apiKey}`)
						teks = '=================\n'
						no = 0
						for (let v of anu.result) {
							no += 1
							teks += `HASIL KE - ${no.toString()}\n• Title: ${v.title}\n• Desc: ${v.desc}\n• Tanggal: ${v.tanggal}\n• Url: ${v.url}\n• Thumb: ${v.img}\n=================\n`
						}
						reply(teks)
					}
					break
				case 'lk21':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/lk21?q=${q}&apikey=${apiKey}`)
					teks = `「 RESULT FOUND 」\n• Title: ${anu.result.judul}\n• Desc: ${anu.result.desc}\n• Url: ${anu.result.download.acefile}`
					client.sendMessage(from, teks, text, {quoted: mek})
					break
				case 'mediafire':
					anu = await fetchJson(`http://leyscoders-api.herokuapp.com/api/mediafire?url=${q}&apikey=${apiKey}`)
					teks = `「 RESULT FOUND 」\n• Title: ${anu.result.judul}\n• Size: ${anu.result.size}\n_Sedang mengirim_`
					buffer = await getBuffer(anu.result.download)
					reply(teks)
					client.sendMessage(from, buffer, MessageType.document, {quoted: mek})
					break
				case 'moddroid':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/moddroid?q=${q}&apikey=${apiKey}`)
					teks = '=================\n'
					no = 0
					for (let v of anu.result) {
						no += 1
						teks += `HASIL KE - ${no.toString()}\n• Title: ${v.title}\n• Url: ${v.url}\n• Thumb: ${v.img}\n=================\n`
					}
					break
				case 'apkpure':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/apkpure?q=${q}&apikey=${apiKey}`)
					teks = '=================\n'
					no = 0
					for (let v of anu.result) {
						no += 1
						teks += `HASIL KE - ${no.toString()}\n• Title: ${v.title}\n• Url: ${v.url}\n• Thumb: ${v.img}\n=================\n`
					}
					reply(teks)
					break
				case 'rexdl':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/rexdl-search?q=${q}&apikey=${apiKey}`)
					teks = '=================\n'
					no = 0
					for (let v of anu.result) {
						no += 1
						teks += `HASIL KE - ${no.toString()}\n• Title: ${v.title}\n• Desc: ${v.desc}\n• Last Update: ${v.update_on}\n• Url: ${v.url}\n=================\n`
					}
					reply(teks)
					break
				case 'fbdl':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/facebook-dl?url=${q}&apikey=${apiKey}`)
					stringTime = new Date(`${anu.result.upload}`);
					stringTime2 = stringTime.getDate() + "/" + (stringTime.getMonth() + 1) + "/" + stringTime.getFullYear();
					teks = `「 RESULT FOUND 」\n\n• Title: ${anu.result.title}\n• Upload: ${stringTime2}\n• Like: ${convertToString(anu.result.reaction.like)}\n• Url: ${anu.result.link}`
					buff = await getBuffer(anu.result.thumb)
					client.sendMessage(from, buff, image, {quoted: mek, caption: teks})
					break
				case 'togif':
					ger = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
					var imgbb = require('imgbb-uploader')
					owgi = await client.downloadAndSaveMediaMessage(ger)
					data = await imgbb("b0fc132474ca03ee7898fd5cac7275fe", owgi)
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/webp-mp4?url=${data.display_url}&apikey=${apiKey}`)
					result = await getBuffer(anu.result)
					client.sendMessage(from, result, video, {quoted: mek, caption: mess.success, mimetype: 'video/gif'})
					break
				/*
				* JIKA ERROR :
				* cannot read property 'toString'
				* Maka hapus ${convertToString(..)}
				* Cukup Panggil Json nya saja, jadi seperti, contoh :
				* ${data.view} < tidak perlu menggunakan func convertToString
				* Segitu Saja yahaha
				*/
				case 'ytmp3':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/ytdl?url=${q}&apikey=${apiKey}`)
					data = anu.result[0]
					teks = `• RESULT FOUND •\n\n• Title: ${data.title}\n• Durasi: ${data.duration}\n• View : ${convertToString(data.view)}\n• Publish: ${data.published}\n• Like: ${convertToString(data.like)}\n• Dislike: ${convertToString(data.unlike)}\n• Url : ${data.url_audio}`
					buff = await getBuffer(data.thumb)
					client.sendMessage(from, buff, image, {quoted: mek, caption: teks})
					break
				case 'ytmp4':
					anu = await fetchJson(`https://leyscoders-api.herokuapp.com/api/ytdl?url=${q}&apikey=${apiKey}`)
					data = anu.result[0]
					teks = `• RESULT FOUND •\n\n• Title: ${data.title}\n• Durasi: ${data.duration}\n• View : ${convertToString(data.view)}\n• Publish: ${data.published}\n• Like: ${convertToString(data.like)}\n• Dislike: ${convertToString(data.unlike)}\n• Url : ${data.url_video}`
					buff = await getBuffer(data.thumb)
					client.sendMessage(from, buff, image, {quoted: mek, caption: teks})
					break
				case 'info':
					me = client.user
					uptime = process.uptime()
					teks = `*Nama bot* : ${me.name}\n*Nomor Bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Total Block Contact* : ${blocked.length}\n*The bot is active on* : ${kyun(uptime)}`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
				case 'blocklist':
					teks = 'This is list of blocked number :\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
				case 'ocr':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Foto aja mas')
					}
					break
				case 'stiker':
				case 'sticker':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata('BOT', authorname)} ${ran} -o ${ran}`, async (error) => {
									if (error) return reply(mess.error.stick)
									client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)	
									fs.unlinkSync(ran)	
								})
								/*client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)*/
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata('BOT', authorname)} ${ran} -o ${ran}`, async (error) => {
									if (error) return reply(mess.error.stick)
									client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)
									fs.unlinkSync(ran)
								})
								/*client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)*/
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'Your-ApiKey'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								exec(`webpmux -set exif ${addMetadata('BOT', authorname)} ${ranw} -o ${ranw}`, async (error) => {
									if (error) return reply(mess.error.stick)
									client.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
									fs.unlinkSync(ranw)
								})
								//client.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
							})
						})
					/*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.on('start', function (cmd) {
								console.log('Started :', cmd)
							})
							.on('error', function (err) {
								fs.unlinkSync(media)
								console.log('Error :', err)
							})
							.on('end', function () {
								console.log('Finish')
								fs.unlinkSync(media)
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)*/
					} else {
						reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
					}
					break
				case 'gtts':
					if (args.length < 1) return client.sendMessage(from, 'Kode bahasanya mana om?', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Textnya mana om', text, {quoted: mek})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					dtt.length > 600
					? reply('Textnya kebanyakan om')
					: gtts.save(ranm, dtt, function() {
						client.sendMessage(from, fs.readFileSync(ranm), audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
						fs.unlinkSync(ranm)
					})
					break
				case 'meme':
					meme = await fetchJson('https://kagchi-api.glitch.me/meme/memes', { method: 'get' })
					buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break
				/*case 'memeindo':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://imgur.com/${memein.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break*/
				case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					setting.prefix = prefix
					fs.writeFileSync('./src/settings.json', JSON.stringify(setting, null, '\t'))
					reply(`Prefix berhasil di ubah menjadi : ${prefix}`)
					break
				case 'tagall':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `*#* @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
                                case 'tagall2':
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					reply(teks)
					break
                                case 'tagall3':
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ https://wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, teks, text, {detectLinks: false, quoted: mek})
					break
				case 'clearall':
					if (!isOwner) return reply('Kamu siapa?')
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply('Sukses delete all chat :)')
					break
				case 'bc':
					if (!isOwner) return reply('Kamu siapa?')
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `[ Ini Broadcast ]\n\n${body.slice(4)}`})
						}
						reply('Suksess broadcast')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[ Ini Broadcast ]\n\n${body.slice(4)}`)
						}
						reply('Suksess broadcast')
					}
					break
                                case 'promote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Berhasil Promote\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(from, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Berhasil Promote @${mentioned[0].split('@')[0]} Sebagai Admin Group!`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break
				case 'demote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Berhasil Demote\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Berhasil Demote @${mentioned[0].split('@')[0]} Menjadi Member Group!`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'add':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('Yang mau di add jin ya?')
					if (args[0].startsWith('08')) return reply('Gunakan kode negara mas')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Gagal menambahkan target, mungkin karena di private')
					}
					break
				case 'kick':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, mengeluarkan :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Perintah di terima, mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
				case 'listadmins':
					if (!isGroup) return reply(mess.only.group)
					teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
                case 'linkgroup':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    linkgc = await client.groupInviteCode(from)
                    reply('https://chat.whatsapp.com/'+linkgc)
                    break
                case 'leave':
                    if (!isGroup) return reply(mess.only.group)
                    if (isGroupAdmins || isOwner) {
                    	client.groupLeave(from)
                    } else {
                        reply(mess.only.admin)
                    }
                    break
				case 'toimg':
					if (!isQuotedSticker) return reply('❌ reply stickernya um ❌')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ Gagal, pada saat mengkonversi sticker ke gambar ❌')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '>//<'})
						fs.unlinkSync(ran)
					})
					break
				case 'simi':
					if (args.length < 1) return reply('Textnya mana um?')
					teks = body.slice(5)
					anu = await simih(teks) //fetchJson(`https://mhankbarbars.herokuapp.com/api/samisami?text=${teks}`, {method: 'get'})
					//if (anu.error) return reply('Simi ga tau kak')
					reply(anu)
					break
				case 'simih':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isSimi) return reply('Mode simi sudah aktif')
						samih.push(from)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('Sukses mengaktifkan mode simi di group ini ✔️')
					} else if (Number(args[0]) === 0) {
						samih.splice(from, 1)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('Sukes menonaktifkan mode simi di group ini ✔️')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
					break
				case 'welcome':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Udah aktif um')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Sukses mengaktifkan fitur welcome di group ini ✔️')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Sukses menonaktifkan fitur welcome di group ini ✔️')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
                                      break
				case 'clone':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Tag target yang ingin di clone')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply('Gagal om')
					}
					break
				case 'wait':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('Foto aja mas')
					}
					break
				default:
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						return //console.log(color('[WARN]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
