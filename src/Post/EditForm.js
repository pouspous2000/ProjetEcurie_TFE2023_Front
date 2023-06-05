import PropTypes from 'prop-types'

import useInput from '../shared/hooks/use-input'

import { Post } from './Post'

import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { PostForm } from './Form/PostForm'

const EditFormPropTypes = {
	post: PropTypes.instanceOf(Post),
}

export const EditForm = props => {
	const title = useInput(value => (props.post.title = value), props.post.title)
	const body = useInput(value => (props.post.body = value), props.post.body)
	const id = useInput(value => (props.post.id = value), props.post.id)
	const userId = useInput(value => (props.post.userId = value), props.post.userId)

	const isFormValid = title.isValid && body.isValid && id.isValid && userId.isValid
	const isSubmitDisabled = !isFormValid

	const editSubmitHandler = event => {
		event.preventDefault()
		if (isFormValid) {
			console.log(title.reset)
			console.log(body.reset)
			console.log(id.reset)
			console.log(userId.reset)
		}
	}

	return (
		<Form onSubmit={editSubmitHandler}>
			<PostForm title={title} body={body} id={id} userId={userId} />
			<Button variant="primary" type="submit" disabled={isSubmitDisabled}>
				Submit
			</Button>
		</Form>
	)
}

EditForm.propTypes = EditFormPropTypes
