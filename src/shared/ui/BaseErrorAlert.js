import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'

const baseErrorAlertPropType = {
	message: PropTypes.string,
}

export const BaseErrorAlert = props => {
	return <Alert variant="danger">{props.message}</Alert>
}

BaseErrorAlert.propTypes = baseErrorAlertPropType
