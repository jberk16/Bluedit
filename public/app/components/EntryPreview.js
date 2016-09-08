import React, {Component} from 'react'

class EntryPreview extends Component {

	render() {
		return (
			<div>
			Title: {this.props.entry.title} <br/>
			<a style={{textDecoration:'none'}} target="_blank" href={this.props.entry.url}>{this.props.entry.url}</a> <br />
			</div>
			)
	}
}

export default EntryPreview