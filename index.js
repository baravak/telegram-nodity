const server = require('./server')
const update = require('./update')
const tg     = require('./tg')
const on     = require('./on')

class telegram_nodity
{
	constructor(_options)
	{
		const defalut_options = {
			method : 'hook',
			server : {
				port : 3313,
				host : '127.0.0.2'
			},
			response : {},
			update_listen_timeout : 2000,
			update_listen_time : 1000,
			queue_timeout : 3000
		}
		this.options  = Object.assign(defalut_options, _options)
		this.events   = new on(this)
		this._tg = new tg(this)

		if(typeof this.options.api !== 'object')
		{
			console.error("Telegram api config not set")
			return
		}
		if(!this.options.api.token)
		{
			console.error("Telegram api token not set")
			return
		}
		if(this.options.method == 'update')
		{
			new update(this)
		}else if(this.options.method)
		{
			new server(this)
		}
	}
	on()
	{
		return this.events.on(...arguments)
	}
	trigger()
	{
		return this.events.trigger(...arguments)
	}
	tg()
	{
		return this._tg.send(...arguments)
	}
}
module.exports = telegram_nodity