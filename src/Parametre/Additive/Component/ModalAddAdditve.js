import React, { useState, useEffect, useCallback } from 'react'
import { useAddAdditiveMutation } from '../../../API/additive.api'
import useInput from '../../../shared/hooks/use-input'
import { BaseSpinner } from '../../../shared/ui/BaseSpinner'
import { Form } from 'react-bootstrap'
import { StableValidationError } from '../../../shared/Model'

export const ModalAddAdditive = () => {
	const [modalOpen, setModalOpen] = useState(false)
	const [addAdditive, { isLoading, isSuccess, errorMessage }] = useAddAdditiveMutation()

	const validateName = value => {
		const trimmedValue = value.trim()
		if (trimmedValue.length === 0 || trimmedValue.length > 255) {
			throw new StableValidationError("Le nom de l'additif doit contenir entre 1 et 255 caractères.")
		}
	}

	const validatePrice = value => {
		const price = value
		if (price === '' || price === 0) {
			throw new StableValidationError("Le prix de l'additif ne peut pas valoir 0.")
		}
	}

	const name = useInput(value => validateName(value), '')
	const price = useInput(value => validatePrice(value), '')

	const formResetHandler = useCallback(() => {
		price.reset()
		name.reset()
	}, [price, name])

	const isFormValid = name.isValid && price.isValid
	const isConfirmButtonDisabled = !isFormValid

	const addAdditiveHandler = () => {
		addAdditive({
			name: name.value,
			price: price.value,
		})

		formResetHandler()
	}

	return (
		<>
			<div
				style={{ color: '#271503' }}
				className={`modal fade ${modalOpen ? 'show' : ''}`}
				id="modalAddAdditive"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalCenterTitle"
				aria-hidden={!modalOpen}>
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h3
								className="modal-title"
								id="exampleModalLongTitle"
								style={{ color: '#271503', textAlign: 'center' }}>
								Ajouter un nouvel additif
							</h3>
							<i data-bs-dismiss="modal" style={{ fontSize: '30px' }} className="bi bi-x-circle-fill"></i>
						</div>
						<div className="modal-body">
							<form>
								<Form.Group className="mb-3">
									<Form.Label>Nom de l'additif </Form.Label>
									<Form.Control
										type="text"
										placeholder="Ex: Additive complète"
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
										Prix de l'additive
										<p
											style={{
												fontStyle: 'italic',
												float: 'right',
												color: 'lightgray',
												marginRight: '255px',
											}}>
											(En €)
										</p>
									</Form.Label>
									<Form.Control
										type="number"
										placeholder="Ex: 110"
										name="number"
										min="1"
										max="10000"
										value={price.value}
										onInput={price.inputHandler}
										onBlur={price.blurHandler}
										isInvalid={price.hasError}
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
									onClick={addAdditiveHandler}
									data-bs-toggle="modal"
									data-bs-target="modalAddAdditive">
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
