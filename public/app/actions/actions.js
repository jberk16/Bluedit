import constants from '../constants/constants'

export default {

	entriesReceived: function(entries){
		return {
			type: constants.ENTRIES_RECEIVED,
			entries: entries
		}
	},

	entryUpdated: function(entry){
		return {
			type: constants.ENTRY_UPDATED,
			entry: entry
		}
	},

	entryCreated: function(entry){
		return {
			type: constants.ENTRY_CREATED,
			entry: entry
		}
	},	

	profilesReceived: function(profiles){
		return {
			type: constants.PROFILES_RECEIVED,
			profiles: profiles
		}
	},

	currentUserReceived: function(currentUser){
		return {
			type: constants.CURRENT_USER_RECEIVED,
			currentUser: currentUser
		}
	}

}