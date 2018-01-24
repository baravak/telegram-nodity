const response = require("./")
const tg = require("../tg")

class message extends response
{
	constructor(_track, _request, _nodity)
	{
		super(_track, _request, _nodity)
	}
	reply(_parameters, _callback = null)
	{
		const parameters = {
			reply_to_message_id : this.request.getMessage_id(),
			chat_id : this.request.getChat_id()
		}
		if(typeof _parameters == 'string')
		{
			_parameters = {
				'text' : _parameters
			}
		}
		Object.assign(parameters, _parameters)
		this.nodity.tg('sendMessage', parameters, _callback)
	}
	message(_parameters, _callback = null)
	{
		const parameters = {
			chat_id : this.request.getChat_id()
		}
		if(typeof _parameters == 'string')
		{
			_parameters = {
				'text' : _parameters
			}
		}
		Object.assign(parameters, _parameters)
		this.nodity.tg('sendMessage', parameters, _callback)
	}
	pv(_parameters, _callback = null)
	{
		const parameters = {
			chat_id : this.request.getUser_id()
		}
		if(typeof _parameters == 'string')
		{
			_parameters = {
				'text' : _parameters
			}
		}
		Object.assign(parameters, _parameters)
		this.nodity.tg('sendMessage', parameters, _callback)
	}
}
module.exports = message