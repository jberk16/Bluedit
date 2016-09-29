import React, {Component} from 'react'

class EntryPreview extends Component {

	constructor(props,context){
		super(props, context)
	}

	//TODO: Fix links
	render() {
		return (
			<div>
			Title: {this.props.entry.title} <br/>
			<a style={{textDecoration:'none'}} target="_blank" href={this.props.entry.url}>{this.props.entry.url}</a> <br />
			<button onClick={this.props.upvote}>Upvote!</button>
			<button onClick={this.props.downvote}>Downvote!</button>
			<p>Score: {this.props.entry.score}</p>
			</div>
			)
	}
}

export default EntryPreview