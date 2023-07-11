import React, { useState, useEffect } from 'react'
import { useAddPensionMutation } from '../../../API/pension.api'
import useInput from '../../../shared/hooks/use-input'
import { BaseSpinner } from '../../../shared/ui/BaseSpinner'
import { Form } from 'react-bootstrap'
import { useCallback } from 'react'
import { StableValidationError } from '../../../shared/Model'

function ModalAddPension() {
	const [addPension, { isLoading, isSuccess }] = useAddPensionMutation()

	const validateName = value => {
		const trimmedValue = value.trim()
		if (trimmedValue.length === 0 || trimmedValue.length > 255) {
			throw new StableValidationError('Le nom de la pension doit contenir entre 1 et 255 caractères ')
		}
	}

	const validateMonthlyPrice = value => {
		const Price = value
		if (Price === '0') {
			throw new StableValidationError('Le prix de la pension ne peut pas valoir 0 ')
		}
	}

	const name = useInput(value => validateName(value), '')
	const monthlyPrice = useInput(value => validateMonthlyPrice(value), '')
	const [description, setDescription] = useState('')

	const formResetHandler = useCallback(() => {
		monthlyPrice.reset() // Réinitialiser le champ monthlyPrice
		name.reset() // Réinitialiser le champ name
	}, [monthlyPrice, name])

	const isFormValid = name.isValid && monthlyPrice
	const isConfirmButtonDisabled = !isFormValid

	useEffect(() => {
		if (isSuccess) {
			setDescription('')
			formResetHandler()
		}
	}, [formResetHandler, isSuccess, description])

	const addPensionHandler = () => {
		addPension({
			name: name.value,
			monthlyPrice: monthlyPrice.value,
			description: description,
		})
	}

	return (
		<>
			<div
				style={{ color: '#271503' }}
				className="modal fade"
				id="modalAjouterPension"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalCenterTitle"
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h3
								className="modal-title"
								id="exampleModalLongTitle"
								style={{ color: '#271503', textAlign: 'center' }}>
								Ajouter une nouvelle formule de pension
							</h3>
							<i data-bs-dismiss="modal" style={{ fontSize: '30px' }} className="bi bi-x-circle-fill"></i>
						</div>
						<div className="modal-body">
							<form>
								<Form.Group className="mb-3">
									<Form.Label>Nom de la pension </Form.Label>
									<Form.Control
										type="text"
										placeholder="placeholder"
										name="name"
										value={name.value}
										onInput={name.inputHandler}
										onBlur={name.blurHandler}
										isInvalid={name.hasError}
									/>
									<Form.Control.Feedback type="invalid">{name.errorMessage}</Form.Control.Feedback>
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>
										{' '}
										Prix de la pension{' '}
										<p
											style={{
												fontStyle: 'italic',
												float: 'right',
												color: 'lightgray',
												marginRight: '255px',
											}}>
											(En €)
										</p>{' '}
									</Form.Label>
									<Form.Control
										type="number"
										placeholder="Ex: 110"
										name="number"
										min="1"
										max="10000"
										value={monthlyPrice.value}
										onInput={monthlyPrice.inputHandler}
										onBlur={monthlyPrice.blurHandler}
										isInvalid={monthlyPrice.hasError}
									/>
									<Form.Control.Feedback type="invalid">{name.errorMessage}</Form.Control.Feedback>
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>Description de la pension</Form.Label>
									<Form.Control
										rows="3"
										placeholder="Décrivez ce que propose votre pension"
										value={description}
										onChange={event => setDescription(event.target.value)}
									/>
									<Form.Control.Feedback type="invalid">{name.errorMessage}</Form.Control.Feedback>
								</Form.Group>
							</form>
							<div className="modal-footer">
								<button
									style={{
										borderRadius: '10px',
										backgroundColor: '#af8d68',
										borderColor: '#af8d68',
										color: '#F5F5DC',
									}}
									disabled={isConfirmButtonDisabled}
									onClick={addPensionHandler}>
									Envoyer
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ModalAddPension
