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

export const FormCreate = props => {
	const { t } = useTranslation()
	return (
		<>
			<Form.Group className="mb-3">
				<Form.Label>{t('todo_form_title_label')}</Form.Label>
				<Form.Control
					type="text"
					placeholder={t('todo_form_title_placeholder')}
					name="title"
					value={props.title.value}
					onInput={props.title.inputHandler}
					onBlur={props.title.blurHandler}
					isInvalid={props.title.hasError}
				/>
				<Form.Control.Feedback type="invalid">{t(props.title.errorMessage)}</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>{t('todo_form_completed_label')}</Form.Label>
				<Form.Check
					type="checkbox"
					checked={props.completed.isChecked}
					onChange={props.completed.changeHandler}
					isInvalid={props.completed.hasError}
				/>
				<Form.Control.Feedback type="invalid">{t(props.completed.errorMessage)}</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>{t('todo_form_id_label')}</Form.Label>
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
				<Form.Label>{t('todo_form_userId_label')}</Form.Label>
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

FormCreate.propTypes = {
	title: FieldPropTypes,
	completed: PropTypes.shape({
		isChecked: PropTypes.bool.isRequired,
		isValid: PropTypes.bool.isRequired,
		hasError: PropTypes.bool.isRequired,
		errorMessage: PropTypes.string.isRequired,
		changeHandler: PropTypes.func.isRequired,
		reset: PropTypes.func.isRequired,
	}),
	id: FieldPropTypes,
	userId: FieldPropTypes,
}
