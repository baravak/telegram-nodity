# Telegram Bot API for Node.js

A clean and robust Node.js module to interact with official [Telegram Bot API](https://core.telegram.org/bots/api "Telegram Bot API").

## Install

```bash
npm install --save telegram-nodity
```
```js
const telegram_nodity = require('telegram-nodity')

const tg = new telegram_nodity({
	method : 'update', // update => run in getUpdates, server => run in webhook
	api : {
		token : "BOT_TOKEN",
		id : "BOT_NAME"
	},
	response : {
		parse_mode : "Markdown"
	},
})

tg.on('message', function(request, response)
{
	response.reply(request.getText(), (_err, _res) =>
		response.end()
	)
})
```