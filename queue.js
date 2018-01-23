const colors = require('colors')
const rq_methods = {
	message : require("./request/message")
}
const rs_methods = {
	message : require("./response/message")
}
let queue_catch = {}
let nodity
class queue
{
	constructor(_nodity, _request)
	{
		let method, ID
		nodity   = _nodity
		for(method in _request)
		{
			if(['message', 'edited_message', 'channel_post', 'edited_channel_post', 'inline_query', 'chosen_inline_result', 'callback_query'].indexOf(method) !== -1)
			{
				method = method
				break
			}
		}
		const rq = new rq_methods[method](method, _request, _nodity)
		ID       = rq._request.ID
		method   = rq.method
		if(!queue_catch[ID])
		{
			let time = (new Date()).getTime();
			queue_catch[ID] = {
				user_id : ID,
				lock    : false,
				ID      : time + Math.random(),
				time    : time,
				timeout : _nodity.options.queue_timeout,
				queue   : []
			}
		}
		queue_catch[ID].queue.push(rq)
		if(!queue_catch[ID].lock)
		{
			queue_catch[ID].lock = true
			queue_catch[ID]._timeout = setTimeout(function()
			{
				console.error(`timeout for ${queue_catch[ID].user_id}`.yellow)
				queue.next(queue_catch[ID].user_id, queue_catch[ID].ID)
			}, queue_catch[ID].timeout)
			_nodity.trigger(method, null, rq, new rs_methods[method](queue_catch[ID], rq, _nodity))
		}
	}
	static next(_user_id, _id)
	{
		let last = queue_catch[_user_id]
		if(!last)
		{
			return
		}
		if(last.ID != _id)
			return;

		clearTimeout(last._timeout)

		queue_catch[_user_id].queue.shift()
		if(queue_catch[_user_id].queue.length > 0)
		{
			let queue_track                = queue_catch[_user_id]
			let time                       = (new Date()).getTime()
			queue_track.ID                 = time + Math.random()
			queue_track.time               = time
			queue_catch[_user_id]._timeout = setTimeout(function()
			{
				console.error(`timeout for ${queue_catch[_user_id].user_id}`.yellow)
				queue.next(queue_catch[_user_id].user_id, queue_catch[_user_id].ID)
			}, queue_catch[_user_id].timeout)
			nodity.trigger(queue_track.queue[0].method, null, queue_track.queue[0], new rs_methods[queue_track.queue[0].method](queue_track, queue_track.queue[0], nodity))
		}
		else
		{
			delete queue_catch[_user_id]
		}
	}
}
module.exports = queue