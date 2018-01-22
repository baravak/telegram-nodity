const https       = require('https')
const path        = require('path')
const fs          = require('fs')
const queue       = require('./queue')

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
			host   : 'api.telegram.org',
			path   : `/bot${_nodity.options.api.token}/getUpdates${offset}`,
			method : "GET"
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
					for (var i = 0; i < data.result.length; i++) {
						if(offset !== '' && i === 0 ) continue
						queue.call(_nodity, data.result[i])
					}
					if(config.offset !== data.result[i-1].update_id)
					{
						config.offset = data.result[i-1].update_id
						fs.writeFileSync(config_path, JSON.stringify(config))
					}
					setTimeout(function()
					{
						new update(_nodity)
					}, 500)
				}
				catch(e)
				{
					console.error("JSON PARSE");
					console.log(e)
				}
			})
		})

		request.on('error', (e) => {
			console.error(`problem with request: ${e.message}`);
		});

		request.end()
	}
}
module.exports = update