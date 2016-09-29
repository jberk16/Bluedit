import constants from '../constants/constants'

var initialState = {
	entries: {},
	entriesArray: []
}

export default function(state = initialState, action){
	switch (action.type) {

		case constants.ENTRIES_RECEIVED:
			console.log('ENTRIES_RECEIVED: '+JSON.stringify(action.entries))
			var newState = Object.assign({}, state)
			newState['entriesArray'] = action.entries
			
			return newState

		case constants.ENTRY_UPDATED:
			console.log('ENTRY_UPDATED: '+JSON.stringify(action.entry))
			var entryId = action.entry._id
			var index = state.entriesArray.findIndex(x => x._id == entryId)
			//use arrow function because it uses entriesArray as this

			var newArray = Object.assign([], state.entriesArray)
			newArray[index] = action.entry
			var newState = Object.assign({}, state, {
				entriesArray: newArray
			})
			//Above 4 lines are to avoid directly mutating state!!
			//Directly modifying newState.entriesArray[index] counts as directly modifying entriesArray
			//So make a new instance of entriesArray first, and make a newState with newArray in it

			return newState

		case constants.ENTRY_CREATED:
			var newState = Object.assign({}, state)
			var array = Object.assign([], newState.entriesArray)
			array.push(action.entry)
			newState['entriesArray'] = array

			return newState


		default:
			return state
	}

}