# Telegram Bot API for Node.js

A clean and robust Node.js module to interact with official [Telegram Bot API](https://core.telegram.org/bots/api "Telegram Bot API").

## Install

```bash
npm install --save telegram-nodity
```
```js
const telegram_nodity = require('telegram-nodity')

const tg = new telegram_nodity({
	method : 'update', // update => run in getUpdates, hook => run in webhook
	api : {
		token : "BOT_TOKEN",
		id : "BOT_NAME"
	},
	response : {
		parse_mode : "Markdown"
	},
})

tg.on('message', (request, response) =>
{
	response.reply(request.getText(), (_err, _res) =>
		response.end()
	)
})
```
### telegram_nodity(_options_)
#### method
> string

__hook__: run in `127.0.0.2:3313` and listen for webhook request _(default)_

__update__: run a task and check getUpdates every `1000ms`

#### server
> object

##### host
> string

if `method` is `hook` server run in this host _(default is `127.0.0.2`)_

##### port
> nubmer

if `method` is `hook` server run in this port _(default is `3313`)_

#### update_listen_timeout
> number

if `method` is `update` this property is `request.timeout` for getUpdates _(default is `2000ms`)_

#### update_listen_time
> number

if `method` is `update` this property is send request every `update_listen_time` in getUpdates _(default is `1000ms`)_

#### queue_timeout
> number

if don't use `response.end()` in every reques, end request after `queue_timeout` _(default is `3000ms`)_

### events
telegram send nine event to bot _(message, edited_message, channel_post, edited_channel_post, inline_query, chosen_inline_result, callback_query, shipping_query, pre_checkout_query)_; `telegram-nodity` send every event to custom router

```js
tg.on('message', (request, response) => {})
tg.on('edited_message', (request, response) => {})
tg.on('channel_post', (request, response) => {})
tg.on('edited_channel_post', (request, response) => {})
tg.on('inline_query', (request, response) => {})
tg.on('chosen_inline_result', (request, response) => {})
tg.on('callback_query', (request, response) => {})
tg.on('shipping_query', (request, response) => {})
tg.on('pre_checkout_query', (request, response) => {})

tg.on('text', (request, response) => {})
tg.on('type:photo', (request, response) => {})
tg.on('file', (request, response) => {})
tg.on('forward', (request, response) => {})
tg.on('reply', (request, response) => {})


```

#### message, edited_message, channel_post, edited_channel_post(request, response)

##### request

###### getText()

return `message.text` or `message.caption`

```js
tg.on('message', (request, response) => {
	console.log(request.getText())
    response.end()
})
```

###### getMessage_id()

return message `message_id`

```js
tg.on('message', (request, response) => {
	console.log(request.getMessage_id())
    response.end()
})
```

###### getChat_id()

return message `message.chat.id`

```js
tg.on('message', (request, response) => {
	console.log(request.getChat_id())
    response.end()
})
```

###### getUser_id()

return message `user.id`

```js
tg.on('message', (request, response) => {
	console.log(request.getUser_id())
    response.end()
})
```

###### getEdit_date()

return `message.edit_date`

###### getForward(_demand)

return message `get forward properties`

###### getForward_user_id()

return message `message.forward_from.id`

###### getForward_user()

return message `message.forward_from`

###### getForward_chat_id()

return message `message.forward_from_chat.id`

###### getForward_chat()

return message `message.forward_from_chat`

###### getForward_message_id()

return message `message.forward_from_message_id`

###### getForward_date()

return message `message.forward_date`

###### getReply_message_id()

return message `message.reply_to_message.message_id`

###### type

return `text | photo | audio | voice | video | document | photo | sticker | contact | venue`

###### ID

return `message.from.id`

###### isText

return true if `type` is `text`

###### text

return

###### isFile

return true if `type` is send file

###### isAction

return true if send group or channel action

###### action

return `action type` if `isAction` is true

###### isSticker

return true if `type` is `sticker`

###### isContact

return true if `type` is `contact`

###### isVenue

return true if `type` is `venue`

__... and other methods and properties__

##### response

###### end()

end this request, if don't use this, request ended after `tg.queue_timeout`

###### send(_method, _parameters, _callback = null)

send `_method` with `_parameters` to telegram and call `_callback(err, response)` after end request

###### reply(_parameters, _callback = null)

reply to `request.message.message_id` with `_parameters` and call `_callback(err, response)` after end request

```js
tg.on('message', (request, response) => {
	response.reply('Hello', (err, resp) => {
    	response.end()
    })
})
```

```js
tg.on('message', (request, response) => {
	response.reply({text: 'hello'}, (err, resp) => {
    	response.end()
    })
})
```

###### message(_parameters, _callback = null)

`sendMessage` to `message.chat.id` with `_parameters` and call `_callback(err, response)` after end request

###### pv(_parameters, _callback = null)

`sendMessage` to `message.user.id` with `_parameters` and call `_callback(err, response)` after end request

###### forward_from(_parameters, _callback = null)

forward message from `_parameters` to `message.user.id` and call `_callback(err, response)` after end request

###### forward_to(_parameters, _callback = null)

forward `message.message_id` to `_parameters` and call `_callback(err, response)` after end request

#### callback_query(request, response)

##### request

###### getUser_id ()

###### getCallback_id ()

###### getData ()

###### getChat_instance ()

###### getInline_message_id ()

##### response

> message response + =>

###### answer()

#### inline_query(request, response)

##### request

###### getInline_id ()

###### getLocation ()

###### getQuery ()

###### getOffset ()

##### response

> message response + =>

###### answer()

#### chosen_inline_result(request, response)

##### request

###### getResult_id ()

###### getLocation ()

###### getQuery ()

##### response

> message response + =>
