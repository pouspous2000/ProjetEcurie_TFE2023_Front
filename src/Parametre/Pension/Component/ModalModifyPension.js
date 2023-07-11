import { useUpdatePensionMutation } from '../../../API/pension.api'
import { useState, useEffect } from 'react'
import { BaseSpinner } from '../../../shared/ui/BaseSpinner'
function ModalModifyPension({ NomPension, PrixPension, DescriptionPension, IdPension }) {
	const [name, setName] = useState(NomPension)
	const [monthlyPrice, setMonthlyPrice] = useState(PrixPension)
	const [description, setDescription] = useState(DescriptionPension)
	const [updatePension, { isLoading, isSuccess, isError, error: errorMessage }] = useUpdatePensionMutation()
	const [isNameValid, setIsNameValid] = useState(true)
	const [isPriceValid, setIsPriceValid] = useState(true)
	let isFormValid = isNameValid && isPriceValid

	const handleInputBlurName = () => {
		setIsNameValid(name.trim() !== '')
	}

	const handleInputBlurPrice = () => {
		setIsPriceValid(monthlyPrice !== '0')
	}
	const updatePensionHandler = () => {
		if (!isNameValid || !isPriceValid || monthlyPrice === '') {
			// ne pas fermer le modal
		} else {
			updatePension({
				name: name,
				monthlyPrice: monthlyPrice,
				description: description,
				id: IdPension,
			})
		}
	}

	const resetForm = () => {
		setName('')
		setMonthlyPrice('')
		setDescription('')
	}

	useEffect(() => {
		if (isSuccess || isError) {
			resetForm()
		}
	}, [isSuccess, isError])

	const conditionalRendering = () => {
		if (isLoading) {
			return <BaseSpinner />
		} else {
			return (
				<>
					<div
						style={{ color: '#271503' }}
						class="modal fade"
						id={`modalModifPension${IdPension}`}
						tabindex="-1"
						role="dialog"
						aria-labelledby="exampleModalCenterTitle"
						aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h3
										class="modal-title"
										id="exampleModalLongTitle"
										style={{ color: '#271503', textAlign: 'center' }}>
										Ajouter une nouvelle formule de pension
									</h3>
									<i
										data-bs-dismiss="modal"
										style={{ fontSize: '30px' }}
										class="bi bi-x-circle-fill"></i>
								</div>
								<div class="modal-body">
									<form>
										<div class="form-group" style={{ marginTop: '20px', marginBottom: '20px' }}>
											<h5>Nom de la pension</h5>
											<input
												onBlur={handleInputBlurName}
												onChange={event => setName(event.target.value)}
												className={`${!isNameValid ? 'invalid' : ''} form-control `}
												name="name"
												required
												type="text"
												id="name"
												placeholder="Ex: Pension Complète"
												defaultValue={name}
											/>
											{!isNameValid && (
												<p style={{ color: 'red' }}>
													Veuillez entrer un nom de pension valide.
												</p>
											)}
										</div>
										<div class="form-group" style={{ marginTop: '20px', marginBottom: '20px' }}>
											<h5>
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
											</h5>
											<input
												onBlur={handleInputBlurPrice}
												onChange={event => setMonthlyPrice(event.target.value)}
												className={`${!isPriceValid ? 'invalid' : ''} form-control `}
												name="monthlyPrice"
												required
												type="number"
												id="monthlyPrice"
												min="0"
												max="10000"
												placeholder="Ex: 110"
												defaultValue={monthlyPrice}
											/>
											{!isPriceValid && (
												<p style={{ color: 'red' }}>
													Veuillez entrer un nombre différent de 0.
												</p>
											)}
										</div>

										<div className="form-group" style={{ marginTop: '20px', marginBottom: '20px' }}>
											<h5>Description de la pension </h5>
											<textarea
												onChange={event => setDescription(event.target.value)}
												name="description"
												className="form-control"
												id="description"
												rows="3"
												placeholder="Décrivez ce que propose votre pension"
												defaultValue={description}></textarea>
										</div>
									</form>
									<div class="modal-footer">
										<button
											style={{
												borderRadius: '10px',
												backgroundColor: '#af8d68',
												borderColor: '#af8d68',
												color: '#F5F5DC',
											}}
											data-bs-dismiss="modal"
											onClick={updatePensionHandler}>
											Modifier
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)
		}
	}
	return conditionalRendering()
}

export default ModalModifyPension
