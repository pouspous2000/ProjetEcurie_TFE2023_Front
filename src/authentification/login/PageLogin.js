import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { roleCategories } from '../../constants/constants'
import { authenticationActions } from '../../shared/store/authentication-slice'
import { Form, Button } from 'react-bootstrap'
import useInput from '../../shared/hooks/use-input'
import { User } from '../../models/User'
import { useTranslation } from 'react-i18next'
import { baseUrl } from '../../constants/baseUrl'
import { BaseErrorAlert } from '../../shared/ui/BaseErrorAlert'
import { Error } from '../../error/Error'

export const PageLogin = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	// TO DO add me
	// const auth = useSelector(state => state.authentication)
	// const isLoggedIn = useSelector(state => !!(state.authentication.token && state.authentication.refreshToken && state.authentication.roleCategory))
	// TO DO rm
	const isLoggedIn = roleCategories.ADMIN
	// console.log('auth : ', auth)
	// console.log('isLoggedIn : ', isLoggedIn)

	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const [error, setError] = useState('')
	const [criticalError, setCriticalError] = useState(undefined)

	const email = useInput(value => User.validate('email', value))
	const password = useInput(value => User.validate('password', value))

	const isFormValid = email.isValid && password.isValid
	const isConfirmButtonDisabled = !isFormValid

	const loginHandler = async () => {
		try {
			const response = await fetch(`${baseUrl}/authentication/login`, {
				method: 'POST',
				body: JSON.stringify({
					email: email.value,
					password: password.value,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const data = await response.json()
			if (response.status !== 200) {
				setError(data.message)
			} else {
				dispatch(
					authenticationActions.setAuthentication({
						token: data.token,
						refreshToken: data.refreshToken,
						roleCategory: data.roleCategory,
					})
				)
				navigate('/')
			}
		} catch (error) {
			setCriticalError(error)
		}
	}

	const logoutHandler = () => {
		dispatch(authenticationActions.logout())
		window.location.reload()
	}

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(prevState => !prevState)
	}

	if (criticalError) {
		return <Error />
	} else {
		return (
			<>
				<header className="my-5">
					<h2>{t('authentication_login_title')}</h2>
				</header>
				{error && <BaseErrorAlert message={error} />}
				<Form.Group className="mb-3">
					<Form.Label>{t('authentication_fields_email_label')}</Form.Label>
					<Form.Control
						type="text"
						placeholder={t('authentication_fields_email_placeholder')}
						name="email"
						value={email.value}
						onInput={email.inputHandler}
						onBlur={email.blurHandler}
						isInvalid={email.hasError}
					/>
					<Form.Control.Feedback type="invalid">{t(email.errorMessage)}</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>{t('authentication_fields_password_label')}</Form.Label>
					<Form.Control
						type={isPasswordVisible ? 'text' : 'password'}
						placeholder={t('authentication_fields_password_placeholder')}
						name="password"
						value={password.value}
						onInput={password.inputHandler}
						onBlur={password.blurHandler}
						isInvalid={password.hasError}
					/>
					<Form.Text className="text-muted">
						<Button variant="link" className="p-0" onClick={togglePasswordVisibility}>
							{isPasswordVisible ? t('authentication_login_hide') : t('authentication_login_show')}
						</Button>
					</Form.Text>
					<Form.Control.Feedback type="invalid">{t(password.errorMessage)}</Form.Control.Feedback>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						variant="primary"
						onClick={loginHandler}
						disabled={isConfirmButtonDisabled}
						className="mx-2">
						{t('authentication_login_login')}
					</Button>
					<Button variant="danger" onClick={logoutHandler} disabled={!isLoggedIn}>
						{t('authentication_login_logout')}
					</Button>
				</div>
			</>
		)
	}
}
