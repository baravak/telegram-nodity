class response
{
	constructor(_track, _request, _nodity)
	{
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
		require('../queue').next(this.user_id, this.ID)
	}
	send(..._args)
	{
		this.nodity.tg(..._args)
	}
}
module.exports = response