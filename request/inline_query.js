const request        = require('./')
class callback_query extends request
{
	constructor(_method, _request, _nodity)
	{
		super(_method, _request, _nodity)
		this.addMethod('getUser_id', 'getFrom_user_id', 'getFrom_username', 'getFrom_first_name', 'getFrom_last_name', 'getFrom_is_bot', 'getFrom_language_code')
		this.ID = _request.callback_query.from.id
	}

	getInline_id()
	{
		return this.request.inline_query.id
	}

	getLocation()
	{
		return this.request.inline_query.location
	}

	getQuery()
	{
		return this.request.inline_query.query
	}

	getOffset()
	{
		return this.request.inline_query.offset
	}
}
module.exports = callback_query