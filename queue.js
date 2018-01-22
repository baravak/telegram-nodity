const queue_catch = {}
module.exports = function (_request)
{
	let method, ID
	let request = {
		data  : _request,
		_self : this
	}
	for(method in _request)
	{
		if(['message', 'edited_message', 'channel_post', 'edited_channel_post', 'inline_query', 'chosen_inline_result', 'callback_query'].indexOf(method) !== -1)
		{
			request.method = method
			break
		}
	}
	switch(method)
	{
		case 'message':
		case 'edited_message':
		request.ID = ID = _request[method].from.id
		if(_request[method].forward_from)
		{
			request.isForward = true
		}
		if(_request[method].reply_to_message)
		{
			request.isReplay = true
		}
		if(_request[method].text)
		{
			request.isText = true
			request.text = _request[method].text
		}
		else
		{
			for(type in _request[method])
			{
				if(['audio', 'voice', 'video', 'document', 'photo'].indexOf(type) !== -1)
				{
					request.isFile = true
					request.text = _request[method].caption
					request.type = type
					break
				}
				else if(type == 'sticker')
				{
					request.type = 'sticker'
					request.isSticker = true
					break
				}
				else if(type == 'contact')
				{
					request.isContact = true
					break
				}
				else if(type == 'venue')
				{
					request.isVenue = true
					break
				}
			}

		}
	}
	if(!queue_catch[ID])
	{
		let time = (new Date()).getTime();
		queue_catch[ID] = {
			user_id : ID,
			lock    : false,
			ID      : time + Math.random(),
			time    : time,
			timeout : this.options.queue_timeout,
			queue   : []
		}
	}
	queue_catch[ID].queue.push(request)
	if(!queue_catch[ID].lock)
	{
		queue_catch[ID].lock = true
		this.trigger(method, null, new queue(queue_catch[ID]))
	}
}

class queue
{
	constructor(_track)
	{
		for (let name in _track.queue[0])
		{
			this[name] = _track.queue[0][name]
		}
		let _self = this
		_track._timeout = setTimeout(function()
		{
			console.error(`timeout for ${_track.user_id}`)
			_self.next(queue_catch[_track.ID])
		}, _track.timeout)
	}
	next(queue_id = null)
	{
		let last = queue_catch[this.ID]
		if(!last)
		{
			return
		}
		if(last.ID != queue_id && queue_id)
			return;

		clearTimeout(last._timeout)
		queue_catch[this.ID].queue.shift()
		if(queue_catch[this.ID].queue.length > 0)
		{
			let queue_track = queue_catch[this.ID]
			let time = (new Date()).getTime()
			queue_track.ID = time + Math.random()
			queue_track.time = time
			this._self.trigger(queue_track.queue[0].method, null, new queue(queue_track))
		}
		else
		{
			delete queue_catch[this.ID]
		}
	}
}