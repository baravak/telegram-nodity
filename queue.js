const colors = require('colors')
const rq_methods = {
	message              : require("./request/message"),
	callback_query       : require("./request/callback_query"),
	edited_message       : require("./request/edited_message"),
	channel_post         : require("./request/channel_post"),
	edited_channel_post  : require("./request/edited_channel_post"),
	inline_query         : require("./request/inline_query"),
	chosen_inline_result : require("./request/chosen_inline_result"),
}
const rs_methods = {
	message              : require("./response/message"),
	callback_query       : require("./response/callback_query"),
	edited_message       : require("./response/edited_message"),
	channel_post         : require("./response/channel_post"),
	edited_channel_post  : require("./response/edited_channel_post"),
	inline_query         : require("./response/inline_query"),
	chosen_inline_result : require("./response/chosen_inline_result"),
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
		if(!rq_methods[method])
		{
			console.log(`this version doesn't support \`${method}\` evenet`)
			return false
		}
		const rq = new rq_methods[method](method, _request, _nodity)
		ID       = rq.ID
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
			queue.next(ID, queue_catch[ID].ID, true)
		}
	}
	static next(_user_id, _id, _start = false)
	{
		let last = queue_catch[_user_id]
		if(!last)
		{
			return
		}
		if(last.ID != _id)
		{
			return;
		}
		if(!_start)
		{
			clearTimeout(last._timeout)
			queue_catch[_user_id].queue.shift()
		}
		if(queue_catch[_user_id].queue.length > 0)
		{
			(async ()=>{
				let queue_track                = queue_catch[_user_id]
				if(nodity.options.onRequest)
				{
					let onRequest = await nodity.options.onRequest(queue_track.queue[0])
					if(onRequest === false)
					{
						queue.next(_user_id, _id)
						return false
					}
				}
				let time                       = (new Date()).getTime()
				queue_track.ID                 = time + Math.random()
				queue_track.time               = time
				queue_catch[_user_id]._timeout = setTimeout(function()
				{
					console.error(`timeout for ${queue_catch[_user_id].user_id}`.yellow)
					queue.next(queue_catch[_user_id].user_id, queue_catch[_user_id].ID)
				}, queue_catch[_user_id].timeout)
				nodity.trigger(queue_track.queue[0].method, null, queue_track.queue[0], new rs_methods[queue_track.queue[0].method](queue_track, queue_track.queue[0], nodity))
			})()
		}
		else
		{
			delete queue_catch[_user_id]
		}
	}
}
module.exports = queue