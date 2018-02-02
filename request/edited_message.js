const message = require('./message')

class edited_message extends message
{
	constructor()
	{
		super(...arguments)
	}
	getEdit_date()
	{
		return this.request.edited_message.edit_date
	}
}
module.exports = edited_message