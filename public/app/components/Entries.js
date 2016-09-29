import React, {Component} from 'react'
import APIManager from '../utils/APIManager'
import store from '../stores/store'
import actions from '../actions/actions'
import {connect} from 'react-redux'

import EntryPreview from '../components/EntryPreview'

class Entries extends Component {

	constructor(props, context) {
		super(props, context)
		this.updateNewEntry = this.updateNewEntry.bind(this) 
		this.addNewEntry = this.addNewEntry.bind(this)
		//I probably should bind upvote/downvote but I'm scared to break stuff lol
		this.state = {
			entries: [],
			newEntry: {
				title: '',
				url: ''
			}
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

	updateNewEntry(event) {
		var newEntry = Object.assign({}, this.state.newEntry)
		newEntry[event.target.id] = event.target.value
		this.setState({
			newEntry: newEntry
		})
		console.log(JSON.stringify(this.state.newEntry))
	}

	addNewEntry(event) {
		event.preventDefault()
		APIManager.handlePost('/api/entry', this.state.newEntry, function(err, response){
			if (err){
				alert('OOPS - '+err)
				return
			}

			console.log('Entry CREATED: '+JSON.stringify(response))
			store.dispatch(actions.entryCreated(response.result))
		})
	}

	upvote(entry){
		console.log('Upvote! :)')
		entry.score = entry.score + 1
		console.log('SCORE = ' + JSON.stringify(entry.score))
		APIManager.handlePut('/api/entry/'+entry._id, entry, function(err, response){
			if (err) {
				alert(err)
				return
			}
			store.dispatch(actions.entryUpdated(response.result))
		})
	}

	downvote(entry){
		console.log('Downvote! :(')
		entry.score = entry.score - 1
		console.log('SCORE = ' + JSON.stringify(entry.score))
		APIManager.handlePut('/api/entry/'+entry._id, entry, function(err, response){
			if (err) {
				alert(err)
				return
			}
			store.dispatch(actions.entryUpdated(response.result))
		})
	}

	render() {

		var entryList = this.props.entries.map(function(entry, i){
		//use arrow function because it passes the function instead of calling it automatically
		//value for onclick needs to be function and not function call. this.upvote(entry) by itself is call
		return (
			<div key={entry._id}>
				<EntryPreview entry={entry} upvote={() => this.upvote(entry)} downvote={() => this.downvote(entry)}/>
			</div>
			)
		}.bind(this) //bind entire map function to this- this fixes bug that stumped me for a week+
		)

		return (

			<div>
				<h2>Add New Entries</h2>
				<input onChange={this.updateNewEntry} type="text" id="title" placeholder='Title' /> <br/>
				<input onChange={this.updateNewEntry} type="text" id="url" placeholder='URL' /> <br/>
				<button onClick={this.addNewEntry}>Add Entry</button>

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