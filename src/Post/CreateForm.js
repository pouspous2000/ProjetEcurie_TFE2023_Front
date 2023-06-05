import useInput from '../shared/hooks/use-input'

import { Post } from './Post'

import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { PostForm } from './Form/PostForm'

export const CreateForm = () => {
	const title = useInput(value => Post.validate('title', value))
	const body = useInput(value => Post.validate('body', value))
	const id = useInput(value => Post.validate('id', value))
	const userId = useInput(value => Post.validate('userId', value))

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
