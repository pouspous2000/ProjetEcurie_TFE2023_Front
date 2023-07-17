import React, { useState, useEffect, useCallback } from 'react'
import { useUpdatePensionMutation } from '../../../API/pension.api'
import useInput from '../../../shared/hooks/use-input'
// import { BaseSpinner } from '../../../shared/ui/BaseSpinner'
import { Form } from 'react-bootstrap'
import { StableValidationError } from '../../../shared/Model'
// import Swal from 'sweetalert2'

function ModalModifyPension({ NomPension, PrixPension, DescriptionPension, IdPension }) {
	const [modalOpen, setModalOpen] = useState(false)
	const [updatePension, { isLoading, isSuccess, isError, error: errorMessage }] = useUpdatePensionMutation()

	const validateName = value => {
		const trimmedValue = value.trim()
		if (trimmedValue.length === 0 || trimmedValue.length > 255) {
			throw new StableValidationError('Le nom de la pension doit contenir entre 1 et 255 caractères.')
		}
	}

	const validateMonthlyPrice = value => {
		const price = value
		if (price === '' || price === 0) {
			throw new StableValidationError('Le prix de la pension ne peut pas valoir 0.')
		}
	}

	const name = useInput(value => validateName(value), NomPension)
	const monthlyPrice = useInput(value => validateMonthlyPrice(value), PrixPension)
	const [description, setDescription] = useState(DescriptionPension)

	const updatePensionHandler = () => {
		updatePension({
			name: name.value,
			monthlyPrice: monthlyPrice.value,
			description: description,
			id: IdPension,
		})
		setDescription(DescriptionPension)

		// Gestion des erreurs en décalé ?

		// if (isError){
		// 	Swal.fire({
		// 		icon: 'error',
		// 		title: 'Oops...',
		// 		text: 'Il semblerait que cette pension existe déjà !',
		// 	  })
		// }
	}

	return (
		<>
			<div
				style={{ color: '#271503' }}
				className={`modal fade ${modalOpen ? 'show' : ''}`}
				id={`modalModifPension${IdPension}`}
				tabIndex="-1"
				role="dialog">
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
									<Form.Label>Nom de la pension</Form.Label>
									<Form.Control
										type="text"
										placeholder="Ex: Pension complète"
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
										Prix de la pension
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
										value={monthlyPrice.value}
										onInput={monthlyPrice.inputHandler}
										onBlur={monthlyPrice.blurHandler}
										isInvalid={monthlyPrice.hasError}
									/>
									<Form.Control.Feedback type="invalid">
										{monthlyPrice.errorMessage}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>Description de la pension</Form.Label>
									<Form.Control
										rows="3"
										placeholder="Décrivez ce que propose votre pension"
										value={description}
										onChange={event => setDescription(event.target.value)}
									/>
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
									disabled={!name.isValid || !monthlyPrice.isValid}
									onClick={updatePensionHandler}
									data-bs-dismiss="modal">
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

export default ModalModifyPension
