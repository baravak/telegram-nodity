const global_methods = require('./global_methods')
const gb             = new global_methods()
class request
{
	constructor(_method, _request, _nodity, _options = {})
	{
		this.request = _request
		this.method = _method
		this.nodity = _nodity
	}
	addMethod(...methods)
	{
		for (var i = 0; i < methods.length; i++) {
			this[methods[i]] = gb[methods[i]]
		}
	}
}

module.exports = request