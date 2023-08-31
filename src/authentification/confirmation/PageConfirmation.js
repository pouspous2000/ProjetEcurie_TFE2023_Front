import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BaseErrorAlert } from '../../shared/ui/BaseErrorAlert'
import { useState } from 'react'
import useInput from '../../shared/hooks/use-input'
import { User } from '../../models/User'
import { baseUrl } from '../../constants/baseUrl'
import { Link } from 'react-router-dom'
import { Error } from '../../error/Error'
import { BaseSuccessAlert } from '../../shared/ui/BaseSussessAlert'

export const PageConfirmation = () => {
	const { t } = useTranslation()
	const [error, setError] = useState('')
	const [criticalError, setCriticalError] = useState(undefined)
	const [isSuccess, setIsSuccess] = useState(false)

	const confirmationCode = useInput(value => User.validate('confirmationCode', value))

	const isConfirmButtonDisabled = !confirmationCode.isValid || error || isSuccess

	const confirmHandler = async () => {
		setError('')
		try {
			const response = await fetch(`${baseUrl}/authentication/confirm`, {
				method: 'POST',
				body: JSON.stringify({
					confirmationCode: confirmationCode.value,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const data = await response.json()
			if (response.status !== 200) {
				setError(data.message)
			} else {
				setIsSuccess(true)
				setError('')
			}
		} catch (error) {
			setCriticalError(error)
		}
	}

	if (criticalError) {
		return <Error />
	} else {
		return (
			<Container fluid>
				<Row>
					<Col xs={12} md={8} className="min-vh-100 position-relative mx-auto">
						<header className="my-5">
							<h2>{t('authentication_confirmation_title')}</h2>
						</header>
						{error && <BaseErrorAlert message={error} />}
						{isSuccess && <BaseSuccessAlert message={t('authentication_confirmation_success')} />}
						{isSuccess && <Link to="/authentication">{t('authentication_confirmation_redirection')}</Link>}
						<Form.Group className="mb-3">
							<Form.Label>{t('authentication_confirmation_label')}</Form.Label>
							<Form.Control
								type="text"
								placeholder={t('authentication_fields_email_placeholder')}
								name="confirmationCode"
								value={confirmationCode.value}
								onInput={confirmationCode.inputHandler}
								onBlur={confirmationCode.blurHandler}
								isInvalid={confirmationCode.hasError}
							/>
							<Form.Control.Feedback type="invalid">
								{t(confirmationCode.errorMessage)}
							</Form.Control.Feedback>
						</Form.Group>

						<div className="d-flex justify-content-end">
							<Button variant="success" onClick={confirmHandler} disabled={isConfirmButtonDisabled}>
								{t('authentication_confirmation_submit')}
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
		)
	}
}
