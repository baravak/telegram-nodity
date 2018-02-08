const request        = require('./')
class chosen_inline_result extends request
{
	constructor(_method, _request, _nodity)
	{
		super(_method, _request, _nodity)
		this.ID = _request.chosen_inline_result.from.id
	}

	getResult_id()
	{
		return this.request.inline_query.result_id
	}

	getLocation()
	{
		return this.request.inline_query.location
	}

	getQuery()
	{
		return this.request.inline_query.query
	}

	getInline_message_id()
	{
		return this.request.inline_query.inline_message_id
	}
}
module.exports = chosen_inline_result