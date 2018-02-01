const response = require("./")
const tg = require("../tg")

class callback_query extends response
{
	constructor(_track, _request, _nodity)
	{
		super(_track, _request, _nodity)
	}
	answer(_parameters, _callback = null)
	{
		const parameters = {
			callback_query_id : this.request.getCallback_id(),
		}
		if(typeof _parameters != 'object')
		{
			_parameters = {
				'text' : _parameters
			}
		}
		Object.assign(parameters, _parameters)
		this.nodity.tg('answerCallbackQuery', parameters, _callback)
	}
}
module.exports = callback_query