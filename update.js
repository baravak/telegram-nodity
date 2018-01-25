const https  = require('https')
const colors = require('colors')
const path   = require('path')
const fs     = require('fs')
const queue  = require('./queue')

const main_path   = path.dirname(require.main.filename)
const config_path = path.join(main_path, 'config.json')
if(!fs.existsSync(config_path))
{
	fs.writeFileSync(config_path, '{}', {
		encoding : 'utf8',
	})
}
const config = require(config_path)

class update
{
	constructor(_nodity)
	{
		const offset = config.offset ? `?offset=${config.offset}` : ''
		const options = {
			host    : 'api.telegram.org',
			path    : `/bot${_nodity.options.api.token}/getUpdates${offset}`,
			method  : "GET",
		}
		console.log('send request for getUpdates'.bold.cyan)
		const request = https.request(options, (response) => {
			var body = ''
			response.on('data', (chunk) => {
				body += chunk
			})
			response.on('end', () => {
				try
				{
					let data = JSON.parse(body)
					console.log(`get ${data.result.length-1} result`.cyan)
					for (var i = 0; i < data.result.length; i++) {
						if(config.offset == data.result[i].update_id) continue
						new queue(_nodity, data.result[i])
					}
					if(data.result.length && config.offset !== data.result[i-1].update_id)
					{
						config.offset = data.result[i-1].update_id
						fs.writeFileSync(config_path, JSON.stringify(config))
					}
					setTimeout(function()
					{
						new update(_nodity)
					}, _nodity.options.update_listen_time)
				}
				catch(e)
				{
					setTimeout(function()
					{
						new update(_nodity)
					}, _nodity.options.update_listen_time)
					console.log(`JSON PARSE: ${e.message}`.red);
					console.log(e)
				}
			})
		})
		request.on('socket', (socket) => {
			socket.setTimeout(_nodity.options.update_listen_timeout)
			socket.on('timeout', () => {
				request.abort()
			})
		})
		request.on('error', (e) => {
			console.log(`problem with request: ${e.message}`.bold.red);
			new update(_nodity)
		});

		request.end()
	}
}

process.on('uncaughtException', function (err) {
	console.log(err);
});
module.exports = update