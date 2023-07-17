import React, { useState, useEffect, useCallback } from 'react'
import { useUpdateAdditiveMutation } from '../../../API/additive.api'
import useInput from '../../../shared/hooks/use-input'
// import { BaseSpinner } from '../../../shared/ui/BaseSpinner'
import { Form } from 'react-bootstrap'
import { StableValidationError } from '../../../shared/Model'
// import Swal from 'sweetalert2'

function ModalModifyAdditive({ AdditiveName, AdditivePrice, AdditiveId }) {
	const [modalOpen, setModalOpen] = useState(false)
	const [updateAdditive, { isLoading, isSuccess, isError, error: errorMessage }] = useUpdateAdditiveMutation()

	const validateName = value => {
		const trimmedValue = value.trim()
		if (trimmedValue.length === 0 || trimmedValue.length > 255) {
			throw new StableValidationError("Le nom de l'additif doit contenir entre 1 et 255 caractères.")
		}
	}

	const validatePrice = value => {
		const price = value
		if (price === '' || price === 0) {
			throw new StableValidationError('Le prix de la pension ne peut pas valoir 0.')
		}
	}

	const name = useInput(value => validateName(value), AdditiveName)
	const price = useInput(value => validatePrice(value), AdditivePrice)

	const updateAdditiveHandler = () => {
		updateAdditive({
			name: name.value,
			price: price.value,
			id: AdditiveId,
		})

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
				id={`modalModifAdditive${AdditiveId}`}
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
									<Form.Label>Nom de l'additif</Form.Label>
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
										Prix de l'additif
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
									<Form.Control.Feedback type="invalid">{price.errorMessage}</Form.Control.Feedback>
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
									disabled={!name.isValid || !price.isValid}
									onClick={updateAdditiveHandler}
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

export default ModalModifyAdditive
