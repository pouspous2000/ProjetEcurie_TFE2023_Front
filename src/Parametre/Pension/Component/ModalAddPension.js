import React, { useState, useEffect } from 'react'
import { useAddPensionMutation } from '../../../API/pension.api'
import { BaseSpinner } from '../../../shared/ui/BaseSpinner'

function ModalAddPension() {
	const [name, setName] = useState('')
	const [monthlyPrice, setMonthlyPrice] = useState('')
	const [description, setDescription] = useState('')
	const [addPension, { isLoading, isSuccess }] = useAddPensionMutation()
	const [isNameValid, setIsNameValid] = useState(false)
	const [isPriceValid, setIsPriceValid] = useState(true)

	const handleInputBlurName = () => {
		setIsNameValid(name.trim() !== '')
	}

	const handleInputBlurPrice = () => {
		setIsPriceValid(monthlyPrice !== '0')
	}

	const addPensionHandler = () => {
		if (!isNameValid || !isPriceValid || monthlyPrice === '') {
			// ne pas fermer le modal
		} else {
			addPension({
				name: name,
				monthlyPrice: monthlyPrice,
				description: description,
			})

			setName('')
			setMonthlyPrice('')
			setDescription('')
		}
	}

	useEffect(() => {
		setIsNameValid(name.trim() !== '')
	}, [name])

	useEffect(() => {
		if (isSuccess) {
			setName('')
			setMonthlyPrice('')
			setDescription('')
		}
	}, [isSuccess])

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
								<div className="form-group" style={{ marginTop: '20px', marginBottom: '20px' }}>
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
										<p style={{ color: 'red' }}>Veuillez entrer un nom de pension valide.</p>
									)}
								</div>

								<div className="form-group" style={{ marginTop: '20px', marginBottom: '20px' }}>
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
										value={monthlyPrice}
									/>
									{!isPriceValid && (
										<p style={{ color: 'red' }}>Veuillez entrer un nombre différent de 0.</p>
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
										value={description}></textarea>
								</div>
							</form>
							<div className="modal-footer">
								<button
									style={{
										borderRadius: '10px',
										backgroundColor: '#af8d68',
										borderColor: '#af8d68',
										color: '#F5F5DC',
									}}
									data-bs-dismiss="modal"
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
