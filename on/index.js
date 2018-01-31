const request = require('../request')

class events {
	constructor(_nodity)
	{
		this.nodity           = _nodity
		this._events          = {}
	}

	on(_event, _condition, _fn = null)
	{
		if(!this._events[_event])
		{
			this._events[_event] = []
		}

		if(!_fn)
		{
			_fn        = _condition
			_condition = null
		}
		this._events[_event].push({
			condition : _condition,
			fn        : _fn
		})
	}

	trigger(_event, _condition, ..._arguments)
	{
		if(!this._events[_event])
		{
			_arguments[1].end()
			return false
		}
		if(_arguments.length === 0)
		{
			return false
		}

		let sub_event = [_event]
		const condition_obj = Object.keys(_arguments[0])
		for(let i = 0; i < condition_obj.length; i++)
		{
			if(condition_obj[i] == 'method')
			{
				continue
			}
			if(condition_obj[i].substr(0, 2) == 'is')
			{
				sub_event.push(condition_obj[i].substr(2).toLowerCase())
			}
			else if(typeof _arguments[0][condition_obj[i]] == 'string')
			{
				sub_event.push(`${condition_obj[i]}:${_arguments[0][condition_obj[i]]}`)
			}
		}
		console.log(sub_event)

		for (var i = 0; i < sub_event.length; i++) {
			if(this._events[sub_event[i]])
			{
				this._events[sub_event[i]].forEach((s_event) => {
					if(!s_event.condition)
					{
						s_event.fn.call(this.nodity, ..._arguments)
					}
				})
			}
		}
	}
}

module.exports = events