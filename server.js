const http = require('http')
const queue = require('./queue')

class server
{
	constructor(_nodity)
	{
		const requestService = (request, response) => {
			response.end("We get it!\nGo and drink coffee:))")
			if (request.method == 'POST') {
				let body = '';

				request.on('data', (data) => {
					body += data;
				})


				request.on('end', () => {
					try
					{
						let data = JSON.parse(body)
						new queue(_nodity, data)
					}
					catch(e)
					{
						console.error("JSON PARSE");
						console.log(e)
					}
				})
			}
		}

		const server = http.createServer(requestService)

		server.listen(_nodity.options.server.port, _nodity.options.server.host, (err) => {
			if (err) {
				return console.log(err)
			}
			console.log(`hook run in ${_nodity.options.server.host}:${_nodity.options.server.port}`)
		})
	}
}
module.exports = server