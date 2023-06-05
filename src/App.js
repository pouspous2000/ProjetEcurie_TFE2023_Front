import { useState } from 'react'
import { Post } from './Post/Post'
import i18n from './i18n'

import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

import { EditForm } from './Post/EditForm'
import { CreateForm } from './Post/CreateForm'

function App() {
	const [form, setForm] = useState('update')

	const changeFormHandler = formToShow => {
		setForm(formToShow)
	}
	const formToDisplayRender = () => {
		return form === 'update' ? <EditForm post={myPost} /> : <CreateForm />
	}

	const changeLngHandler = lng => {
		i18n.changeLanguage(lng)
	}

	const myPost = new Post('1', '2', 'my awesome post title', 'Lorem ipsum lorem ipsum lorem ipsum')

	return (
		<Container>
			<Row>
				<button onClick={() => changeLngHandler('en')}>Click to change lang from fr to en</button>
			</Row>
			<Row className="justify-content-md-center">
				<Col xs={12} md={3}>
					<Button onClick={() => changeFormHandler('update')}>Update Form</Button>
				</Col>
				<Col xs={12} md={3}>
					<Button onClick={() => changeFormHandler('create')}>Create Form</Button>
				</Col>
			</Row>

			<Row className="justify-content-md-center">
				<Col xs={12} md={8}>
					{formToDisplayRender()}
				</Col>
			</Row>
		</Container>
	)
}

export default App
