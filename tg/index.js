const https  = require('https')
const colors = require('colors')
const QUEUE = {
	cache     : [],
	listen    : null,
	last_time : 0
}
let nodity
class tg
{
	constructor(_nodity)
	{
		this.nodity = nodity = _nodity
		listen_queue.call(this)
	}
	send(_method, _parameters, _callback)
	{
		if(['sendmessage', 'forwardmessage', 'sendphoto', 'sendaudio', 'senddocument', 'sendvideo', 'sendvoice', 'sendvideoNote', 'sendmediaGroup', 'sendlocation', 'editmessageliveLocation', 'sendvenue', 'sendcontact', 'editmessagetext', 'editmessagecaption', 'editmessagereplymarkup'
			].indexOf(_method.toLowerCase()) !== -1 && !_parameters.disable_queue)
		{
			QUEUE.cache.push({
				user_id    : _parameters.chat_id,
				method     : _method,
				parameters : _parameters,
				callback   : _callback
			})
			if(!QUEUE.listen)
			{
				listen_queue.call(this)
			}
			return
		}
		if(_parameters.disable_queue)
		{
			delete _parameters.disable_queue
		}
		let parameters = {}
		Object.assign(parameters, this.nodity.options.response, _parameters)
		const options = {
			host             : 'api.telegram.org',
			path             : `/bot${this.nodity.options.api.token}/${_method}`,
			method           : "POST",
			headers          : {
				'Content-Type'   : 'application/json; charset=utf-8',
			}
		}
		const request = https.request(options, (response) => {
			var body = ''
			response.on('data', (chunk) => {
				body += chunk
			})
			response.on('end', () => {
				try
				{
					let data = JSON.parse(body)
					if(!data.ok)
					{
						console.log(`${data.description} : ${data.error_code}`.red)
						_callback(data, null)
					}
					if(_callback)
					{
						_callback(null, data)
					}
				}
				catch(e)
				{
					console.error("JSON PARSE");
					if(_callback)
					{
						_callback(e, body)
					}
				}
			})
		})
		request.write(JSON.stringify(parameters))
		request.end()
	}
}

function listen_queue(_force)
{
	if(QUEUE.listen && !_force)
	{
		return
	}
	if(QUEUE.length == 0)
	{
		return
	}
	else if((new Date()).getTime() - QUEUE.last_time < 1000)
	{
		QUEUE.listen = null
		setTimeout(listen_queue.bind(this, true), 1000 - ((new Date()).getTime() - QUEUE.last_time))
	}
	else
	{
		QUEUE.listen = true
		let count = 0
		const users = []
		for (let i in QUEUE.cache) {
			if(users.indexOf(QUEUE.cache[i].user_id) !== -1)
			{
				continue
			}
			count++
			const onQueue = QUEUE.cache.splice(i, 1)[0]
			users.push(onQueue.user_id)
			onQueue.parameters.disable_queue = true
			this.send(onQueue.method, onQueue.parameters, onQueue.callback)
			if(count == 30)
			{
				break
			}
		}
		QUEUE.last_time = (new Date()).getTime()
		if(QUEUE.cache)
		{
			setTimeout(listen_queue.bind(this, true), 900)
		}
		else
		{
			QUEUE.listen = null
		}
	}
}
module.exports = tg