import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Entries from './components/Entries'
import {Provider} from 'react-redux'
import store from './stores/store'

class App extends Component {

	render() {
		return (
			<div>
				This is where text should show up 
				<Entries />
			</div>
			)
	}
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'))