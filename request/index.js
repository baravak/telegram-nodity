const global_methods = require('./global_methods')
const gb             = new global_methods()
class request
{
	constructor(_method, _request, _nodity, _options = {})
	{
		this.request = _request
		this.method = _method
		this.nodity = _nodity
		this.ID = _request[_method].from.id
	}
	addMethod(...methods)
	{
		for (var i = 0; i < methods.length; i++) {
			this[methods[i]] = gb[methods[i]]
		}
	}
	getUser_id () {
		return this.getFrom_user_id()
	}
	getFrom_user_id () {
		return this.request[this.method].from.id
	}
	getFrom_username () {
		return this.request[this.method].from.username
	}
	getFrom_first_name () {
		return this.request[this.method].from.first_name
	}
	getFrom_last_name () {
		return this.request[this.method].from.last_name
	}
	getFrom_is_bot () {
		return this.request[this.method].from.is_bot
	}
	getFrom_language_code () {
		return this.request[this.method].from.language_code
	}
}

module.exports = request