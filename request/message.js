const request = require('./')
class message extends request
{
	constructor(_method, _request, _nodity)
	{
		super(_method, _request, _nodity)
		this.addMethod('getUser_id', 'getFrom_user_id', 'getFrom_username', 'getFrom_first_name', 'getFrom_last_name', 'getFrom_is_bot', 'getFrom_language_code')
		this.type = 'text'
		this.ID = _request[_method].from.id
		if(_request[_method].forward_from)
		{
			this.isForward = true
		}
		if(_request[_method].reply_to_message)
		{
			this.isReply = true
		}

		if(_request[_method].text)
		{
			this.isText = true
			this.text = _request[_method].text
		}
		else
		{
			for(let type in _request[_method])
			{
				if(['audio', 'voice', 'video', 'document', 'photo'].indexOf(type) !== -1)
				{
					this.isFile = true
					this.text = _request[_method].caption
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
		return this.request[this.method].message_id
	}
	getChat_id()
	{
		return this.request[this.method].chat.id
	}

	// forward
	getForward(_demand)
	{
		if(!this.isForward) return false
		switch(_demand)
		{
			case "user_id"    : return this.request[this.method].forward_from.id
			case "user"       : return this.request[this.method].forward_from
			case "chat_id"    : return this.request[this.method].forward_from_chat.id
			case "chat"       : return this.request[this.method].forward_from_chat
			case "message_id" : return this.request[this.method].forward_from_message_id
			case "date"       : return this.request[this.method].forward_date
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
		return this.request[this.method].reply_to_message.message_id
	}

}
module.exports = message