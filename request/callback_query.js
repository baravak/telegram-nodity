const request        = require('./')
class callback_query extends request
{
	constructor(_method, _request, _nodity)
	{
		super(_method, _request, _nodity)
		this.ID = _request.callback_query.from.id
	}

	getCallback_id()
	{
		return this.request.callback_query.id
	}

	getData()
	{
		return this.request.callback_query.data
	}

	getChat_instance()
	{
		return this.request.callback_query.chat_instance
	}

	getInline_message_id()
	{
		return this.request.callback_query.inline_message_id
	}
}
module.exports = callback_query