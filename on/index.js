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

		for (var i = 0; i < this._events[_event].length; i++) {
			let track = this._events[_event][i];
			if(!track.condition)
			{
				track.fn.call(this.nodity, ..._arguments)
			}
		}
	}
}

module.exports = events