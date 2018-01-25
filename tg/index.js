const https  = require('https')
const colors = require('colors')
class request
{
	constructor(_nodity)
	{
		this.nodity = _nodity
	}
	send(_method, _parameters, _callback)
	{
		let parameters = {}
		Object.assign(parameters, this.nodity.options.response, _parameters)
		const options = {
			host             : 'api.telegram.org',
			path             : `/bot${this.nodity.options.api.token}/${_method}`,
			method           : "POST",
			headers          : {
				'Content-Type'   : 'application/json',
				'Content-Length' : JSON.stringify(parameters).length
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
module.exports = request