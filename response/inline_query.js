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
			inline_query_id : this.request.getInline_id(),
		}
		Object.assign(parameters, _parameters)
		this.nodity.tg('answerInlineQuery', parameters, _callback)
	}
}
module.exports = callback_query