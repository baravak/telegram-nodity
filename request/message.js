const request = require('./')
class message extends request
{
	constructor(_method, _request, _nodity)
	{
		super(_method, _request, _nodity)
		this.type = 'message'
		this._request = {}
		this._request.ID = _request[this.type].from.id
		if(_request[this.type].forward_from)
		{
			this._request.isForward = true
		}
		if(_request[this.type].reply_to_message)
		{
			this._request.isReplay = true
		}

		if(_request[this.type].text)
		{
			this._request.isText = true
			this._request.text = _request[this.type].text
		}
		else
		{
			for(let type in _request[this.type])
			{
				if(['audio', 'voice', 'video', 'document', 'photo'].indexOf(type) !== -1)
				{
					this._request.isFile = true
					this._request.text = _request[this.type].caption
					this._request.type = type
					break
				}
				else if(['new_chat_members', 'left_chat_member', 'new_chat_title', 'new_chat_photo', 'delete_chat_photo', 'group_chat_created', 'supergroup_chat_created', 'channel_chat_created', 'pinned_message'].indexOf(type) !== -1)
				{
					this._request.isAction = true
					this._request.action = type
					break
				}
				else if(type == 'sticker')
				{
					this._request.type = 'sticker'
					this._request.isSticker = true
					break
				}
				else if(type == 'contact')
				{
					this._request.isContact = true
					break
				}
				else if(type == 'venue')
				{
					this._request.isVenue = true
					break
				}
			}
		}
	}
	getText()
	{
		return this._request.text
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
}
module.exports = message