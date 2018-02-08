class response
{
	constructor(_track, _request, _nodity)
	{
		this.ended = false
		this.nodity = _nodity
		for (let name in _track)
		{
			if(name == 'queue')
			{
				this.request = _request
			}
			else
			{
				this[name] = _track[name]
			}
		}
	}
	end()
	{
		if(this.ended)
		{
			return
		}
		this.ended = true
		require('../queue').next(this.user_id, this.ID)
	}
	send(..._args)
	{
		this.nodity.tg(..._args)
	}
	reply(_parameters, _callback = null)
	{
		const parameters = {
			reply_to_message_id : this.request.getMessage_id(),
			chat_id : this.request.getChat_id()
		}
		if(typeof _parameters != 'object')
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
		if(typeof _parameters != 'object')
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
	forward_from(_parameters, _callback = null)
	{
		const parameters = {
			chat_id : this.request.getUser_id()
		}
		Object.assign(parameters, _parameters)
		this.nodity.tg('forwardMessage', parameters, _callback)
	}
	forward_to(_parameters, _callback = null)
	{
		const parameters = {
			from_chat_id : this.request.getUser_id(),
			message_id   : this.request.getMessage_id()
		}
		if(typeof _parameters == 'string' || typeof _parameters == 'number')
		{
			_parameters = {
				'chat_id' : _parameters
			}
		}
		Object.assign(parameters, _parameters)
		this.nodity.tg('forwardMessage', parameters, _callback)
	}
}
module.exports = response