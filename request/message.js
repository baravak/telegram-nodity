const request = require('./')
class message extends request
{
	constructor(_method, _request, _nodity)
	{
		super(_method, _request, _nodity)
		this.type = 'message'
		this.ID = _request[this.type].from.id
		if(_request[this.type].forward_from)
		{
			this.isForward = true
		}
		if(_request[this.type].reply_to_message)
		{
			this.isReplay = true
		}

		if(_request[this.type].text)
		{
			this.isText = true
			this.text = _request[this.type].text
		}
		else
		{
			for(let type in _request[this.type])
			{
				if(['audio', 'voice', 'video', 'document', 'photo'].indexOf(type) !== -1)
				{
					this.isFile = true
					this.text = _request[this.type].caption
					this.type = type
					break
				}
				else if(['new_chat_members', 'left_chat_member', 'new_chat_title', 'new_chat_photo', 'delete_chat_photo', 'group_chat_created', 'supergroup_chat_created', 'channel_chat_created', 'pinned_message'].indexOf(type) !== -1)
				{
					this.isAction = true
					this.action = type
					break
				}
				else if(type == 'sticker')
				{
					this.type = 'sticker'
					this.isSticker = true
					break
				}
				else if(type == 'contact')
				{
					this.isContact = true
					break
				}
				else if(type == 'venue')
				{
					this.isVenue = true
					break
				}
			}
		}
	}

	// global
	getText()
	{
		return this.text
	}
	getMessage_id()
	{
		return this.request.message.message_id
	}
	getChat_id()
	{
		return this.request.message.chat.id
	}
	getUser_id()
	{
		return this.request.message.from.id
	}

	// forward
	getForward(_demand)
	{
		if(!this.isForward) return false
		switch(_demand)
		{
			case "user_id"    : return this.request.message.forward_from.id
			case "user"       : return this.request.message.forward_from
			case "chat_id"    : return this.request.message.forward_from_chat.id
			case "chat"       : return this.request.message.forward_from_chat
			case "message_id" : return this.request.message.forward_from_message_id
			case "date"       : return this.request.message.forward_date
		}
	}
	getForward_user_id()
	{
		return this.getForward('user_id')
	}
	getForward_user()
	{
		return this.getForward('user')
	}
	getForward_chat_id()
	{
		return this.getForward('chat_id')
	}
	getForward_chat()
	{
		return this.getForward('chat')
	}
	getForward_message_id()
	{
		return this.getForward('message_id')
	}
	getForward_date()
	{
		return this.getForward('date')
	}

	// reply
	getReply_message_id()
	{
		return this.request.message.reply_to_message.message_id
	}

}
module.exports = message