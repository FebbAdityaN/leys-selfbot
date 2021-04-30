const fetch = require('node-fetch')
const fs = require('fs')
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))

const getEmoji = async(emoji, type) => new Promise(async (resolve, reject) => {
	arrtype = ["apple", "google", "samsung", "microsoft", "whatsapp", "twitter", "facebook", "joypixel", "openemoji", "emojidex", "messenger", "ig", "htc", "mozilla"]
	if (!arrtype.includes(type)) return reject(`Type yang kamu input tidak terdaftar dalam list\nList Type:\napple, google, samsung, microsoft, whatsapp, twitter, facebook, joypixel, openemoji, emojidex, messenger, ig, htc, mozilla`)
	try {
		switch(type) {
			case "apple":
				fetch(`https://leyscoders-api.herokuapp.com/api/emoji-pngv2?emoji=${encodeURIComponent(emoji)}&apikey=${setting.apiKey}`)
				.then(pel => pel.json())
				.then(pel => resolve(pel.result.apple))
				break
			case 'google':
				fetch(`https://leyscoders-api.herokuapp.com/api/emoji-pngv2?emoji=${encodeURIComponent(emoji)}&apikey=${setting.apiKey}`)
				.then(pel => pel.json())
				.then(pel => resolve(pel.result.google))
				break
			case 'samsung':
				fetch(`https://leyscoders-api.herokuapp.com/api/emoji-pngv2?emoji=${encodeURIComponent(emoji)}&apikey=${setting.apiKey}`)
				.then(pel => pel.json())
				.then(pel => resolve(pel.result.samsung))
				break
			case 'microsoft':
				fetch(`https://leyscoders-api.herokuapp.com/api/emoji-pngv2?emoji=${encodeURIComponent(emoji)}&apikey=${setting.apiKey}`)
				.then(pel => pel.json())
				.then(pel => resolve(pel.result.miscrosoft))
				break
			case 'whatsapp':
				fetch(`https://leyscoders-api.herokuapp.com/api/emoji-pngv2?emoji=${encodeURIComponent(emoji)}&apikey=${setting.apiKey}`)
				.then(pel => pel.json())
				.then(pel => resolve(pel.result.whatsapp))
				break
			case 'twitter':
				fetch(`https://leyscoders-api.herokuapp.com/api/emoji-pngv2?emoji=${encodeURIComponent(emoji)}&apikey=${setting.apiKey}`)
				.then(pel => pel.json())
				.then(pel => resolve(pel.result.twitter))
				break
			case 'facebook':
				fetch(`https://leyscoders-api.herokuapp.com/api/emoji-pngv2?emoji=${encodeURIComponent(emoji)}&apikey=${setting.apiKey}`)
				.then(pel => pel.json())
				.then(pel => resolve(pel.result.facebook))
				break
			case 'joypixel':
				fetch(`https://leyscoders-api.herokuapp.com/api/emoji-pngv2?emoji=${encodeURIComponent(emoji)}&apikey=${setting.apiKey}`)
				.then(pel => pel.json())
				.then(pel => resolve(pel.result.joypixel))
				break
			case 'openemoji':
				fetch(`https://leyscoders-api.herokuapp.com/api/emoji-pngv2?emoji=${encodeURIComponent(emoji)}&apikey=${setting.apiKey}`)
				.then(pel => pel.json())
				.then(pel => resolve(pel.result.openemoji))
				break
			case 'emojidex':
				fetch(`https://leyscoders-api.herokuapp.com/api/emoji-pngv2?emoji=${encodeURIComponent(emoji)}&apikey=${setting.apiKey}`)
				.then(pel => pel.json())
				.then(pel => resolve(pel.result.emojidex))
				break
			case 'messenger':
				fetch(`https://leyscoders-api.herokuapp.com/api/emoji-pngv2?emoji=${encodeURIComponent(emoji)}&apikey=${setting.apiKey}`)
				.then(pel => pel.json())
				.then(pel => resolve(pel.result.messenger))
				break
			case 'ig':
				fetch(`https://leyscoders-api.herokuapp.com/api/emoji-pngv2?emoji=${encodeURIComponent(emoji)}&apikey=${setting.apiKey}`)
				.then(pel => pel.json())
				.then(pel => resolve(pel.result.Ig))
				break
			case 'htc':
				fetch(`https://leyscoders-api.herokuapp.com/api/emoji-pngv2?emoji=${encodeURIComponent(emoji)}&apikey=${setting.apiKey}`)
				.then(pel => pel.json())
				.then(pel => resolve(pel.result.htc))
				break
			case 'mozilla':
				fetch(`https://leyscoders-api.herokuapp.com/api/emoji-pngv2?emoji=${encodeURIComponent(emoji)}&apikey=${setting.apiKey}`)
				.then(pel => pel.json())
				.then(pel => resolve(pel.result.mozilla))
				break
		}
	} catch (e) { reject(e) }
})

module.exports = getEmoji
