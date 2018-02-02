class global_methods{
	getUser_id () {
		return this.request[this.method].from.id
	}
	getFrom_user_id () {
		return this.request[this.method].from.id
	}
	getFrom_username () {
		return this.request[this.method].from.username
	}
	getFrom_first_name () {
		return this.request[this.method].from.first_name
	}
	getFrom_last_name () {
		return this.request[this.method].from.last_name
	}
	getFrom_is_bot () {
		return this.request[this.method].from.is_bot
	}
	getFrom_language_code () {
		return this.request[this.method].from.language_code
	}
}
module.exports = global_methods