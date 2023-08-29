import { useCallback, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import useInput from '../../shared/hooks/use-input'
import { User } from '../../models/User'
import { useTranslation } from 'react-i18next'

export const PageRegister = () => {
	const { t } = useTranslation()
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState(false)

	const email = useInput(value => User.validate('email', value))
	const password = useInput(value => User.validate('password', value))
	const passwordConfirm = useInput(value => User.validatePasswordConfirm(value, password.value))

	const isFormValid = email.isValid && password.isValid && passwordConfirm.isValid
	const isConfirmButtonDisabled = !isFormValid

	const resetFormHandler = useCallback(() => {
		;[email, password, passwordConfirm].forEach(field => {
			field.reset()
		})
	}, [email, password, passwordConfirm])

	const registerHandler = () => {
		// TODO implement me
	}

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(prevState => !prevState)
	}

	const togglePasswordConfirmVisibility = () => {
		setIsPasswordConfirmVisible(prevState => !prevState)
	}

	return (
		<>
			<header className="my-5">
				<h2>{t('authentication_register_title')}</h2>
			</header>

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
						{isPasswordVisible
							? t('authentication_register_password_hide')
							: t('authentication_register_password_show')}
					</Button>
				</Form.Text>
				<Form.Control.Feedback type="invalid">{t(password.errorMessage)}</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>{t('authentication_fields_passwordConfirm_label')}</Form.Label>
				<Form.Control
					type={isPasswordConfirmVisible ? 'text' : 'password'}
					placeholder={t('authentication_fields_passwordConfirm_placeholder')}
					name="password"
					value={passwordConfirm.value}
					onInput={passwordConfirm.inputHandler}
					onBlur={passwordConfirm.blurHandler}
					isInvalid={passwordConfirm.hasError}
				/>
				<Form.Text className="text-muted">
					<Button variant="link" className="p-0" onClick={togglePasswordConfirmVisibility}>
						{isPasswordConfirmVisible
							? t('authentication_register_passwordConfirm_hide')
							: t('authentication_register_passwordConfirm_show')}
					</Button>
				</Form.Text>
				<Form.Control.Feedback type="invalid">{t(passwordConfirm.errorMessage)}</Form.Control.Feedback>
			</Form.Group>

			<div className="d-flex justify-content-end">
				<Button variant="primary" onClick={registerHandler} disabled={isConfirmButtonDisabled}>
					{t('authentication_register_register')}
				</Button>
			</div>
		</>
	)
}
