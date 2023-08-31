import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'

const baseSuccessAlertPropType = {
	message: PropTypes.string,
}

export const BaseSuccessAlert = props => {
	return <Alert variant="success">{props.message}</Alert>
}

BaseSuccessAlert.propTypes = baseSuccessAlertPropType
