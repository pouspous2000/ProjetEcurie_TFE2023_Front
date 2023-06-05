import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Form } from 'react-bootstrap'

const FieldPropTypes = PropTypes.shape({
	value: PropTypes.string.isRequired,
	isValid: PropTypes.bool.isRequired,
	hasError: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string.isRequired,
	inputHandler: PropTypes.func.isRequired,
	blurHandler: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired,
})

export const PostForm = props => {
	const { t } = useTranslation()
	return (
		<>
			<Form.Group className="mb-3">
				<Form.Label>Title</Form.Label>
				<Form.Control
					type="text"
					placeholder="title placeholder"
					name="title"
					value={props.title.value}
					onInput={props.title.inputHandler}
					onBlur={props.title.blurHandler}
					isInvalid={props.title.hasError}
				/>
				<Form.Control.Feedback type="invalid">{t(props.title.errorMessage)}</Form.Control.Feedback>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Body</Form.Label>
				<Form.Control
					as="textarea"
					placeholder="Body placeholder"
					value={props.body.value}
					onInput={props.body.inputHandler}
					onBlur={props.body.inputHandler}
					isInvalid={props.body.hasError}
				/>
				<Form.Control.Feedback type="invalid">{t(props.body.errorMessage)}</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>Id</Form.Label>
				<Form.Control
					type="number"
					placeholder="123"
					value={props.id.value}
					onInput={props.id.inputHandler}
					onBlur={props.id.blurHandler}
					isInvalid={props.id.hasError}
				/>
				<Form.Control.Feedback type="invalid">{t(props.id.errorMessage)}</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>UserId</Form.Label>
				<Form.Control
					type="number"
					placeholder="123"
					value={props.userId.value}
					onInput={props.userId.inputHandler}
					onBlur={props.userId.blurHandler}
					isInvalid={props.userId.hasError}
				/>
				<Form.Control.Feedback type="invalid">{t(props.userId.errorMessage)}</Form.Control.Feedback>
			</Form.Group>
		</>
	)
}

PostForm.propTypes = {
	title: FieldPropTypes,
	body: FieldPropTypes,
	id: FieldPropTypes,
	userId: FieldPropTypes,
}
