import React, {Component} from 'react'
import APIManager from '../utils/APIManager'
import store from '../stores/store'
import actions from '../actions/actions'
import {connect} from 'react-redux'

import EntryPreview from '../components/EntryPreview'

class Entries extends Component {

	constructor(props, context) {
		super(props, context)
		this.state = {
			entries: []
		}
	}

	componentDidMount(){
		var _this = this
		APIManager.handleGet('/api/entry', null, function(err, response){
			if (err) {
				alert(err)
				return
			}
			store.dispatch(actions.entriesReceived(response.results))
		})
	}

	upvote(){
		console.log('Upvote! :)')
	}

	downvote(){
		console.log('Downvote! :(')
	}



	render() {


		var entryList = this.props.entries.map(function(entry, i){ //todo: make it not crash on initial load due to 0 entries
		return (
			<div>
				<EntryPreview key={entry._id} entry={entry} upvote={this.upvote.bind(this)} />
				<button onClick={this.upvote.bind(this)}>Upvote!</button>
			</div>
			)
		})

		return (

			<div> 
				<h2>Entries</h2>
				{entryList}
			</div>

		)
	}
}

const stateToProps = function(state) {
	return {
		entries: state.entriesReducer.entriesArray
		}
}

export default connect(stateToProps)(Entries)