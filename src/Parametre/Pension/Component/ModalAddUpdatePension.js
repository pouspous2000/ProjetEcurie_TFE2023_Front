import React, { useState, useEffect, useCallback } from 'react'
import { useAddPensionMutation, useUpdatePensionMutation } from '../../../API/pension.api'
import useInput from '../../../shared/hooks/use-input'
import { Form, Modal, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import ValidationConstantes from './ValidationConstantes'
import useModal from '../../../shared/hooks/use-modal'
import { ModalError } from '../../../shared/hooks/ModalError';

const createModalProptypes = {
	modal: PropTypes.shape({
		isVisible: PropTypes.bool,
		openHandler: PropTypes.func,
		closeHandler: PropTypes.func,
		confirmHandler: PropTypes.func,
	}),
}


export const ModalAddUpdatePension = props => {
	const errorModal = useModal()
	const { status, PensionDescription, PensionPrice, PensionName, PensionId } = props

	const [namePension, setNamePension] = useState('')
	const [pricePension, setPricePension] = useState('')
	const [descriptionPension, setDescriptionPension] = useState('')

	// ---------Validation des inputs---------
	const { validateName, validatePrice, validateDescription } = ValidationConstantes

	const name = useInput(value => validateName(value), '')
	const price = useInput(value => validatePrice(value), '')
	const description = useInput(value => validateDescription(value), '')

	const isFormValid = !(name.hasError || price.hasError || description.hasError)

	const formResetHandler = useCallback(() => {
		price.reset()
		name.reset()
		description.reset()
	}, [price, name, description])

	// ________ADD___________
	const [addPension, { isSuccess: isAddPensionSuccess, isError: isAddPensionError, error: addPenssionError }] = useAddPensionMutation()
	const [error, setError] = useState('');
	const addPensionHandler = () => {
		addPension({
			name: name.value,
			monthlyPrice: price.value,
			description: description.value,
		})
	}
	useEffect(() => {
		if (isAddPensionSuccess) {
			props.modal.closeHandler()
			formResetHandler()
		}
	}, [isAddPensionSuccess, formResetHandler, props])

	useEffect(()=>{
		if (isAddPensionError){
			errorModal.openHandler()
			setError(addPenssionError.data.message)
		}

	}, [isAddPensionError]);


	// ________UPDATE___________

	const [updatePension, { isSuccess: isUpdatePensionSuccess }] = useUpdatePensionMutation()

	const updatePensionHandler = () => {
		updatePension({
			name: name.value === '' ? PensionName : namePension,
			monthlyPrice: price.value === '' ? PensionPrice : pricePension,
			description: description.value === '' ? PensionDescription : descriptionPension,
			id: PensionId,
		})
	}
	useEffect(() => {
		if (isUpdatePensionSuccess) {
			props.modal.closeHandler()
		}
	}, [isUpdatePensionSuccess, props])

	return (
		<Modal show={props.modal.isVisible} onHide={props.modal.closeHandler}>
			<Modal.Header>
				<Modal.Title as={'header'} className="d-flex justify-content-between align-items-center w-100">
					<p style={{ float: 'right' }}></p>
					<i
						data-bs-dismiss="modal"
						style={{ fontSize: '30px', float: 'right' }}
						className="bi bi-x-circle-fill"
						onClick={() => {
							props.modal.closeHandler && props.modal.closeHandler()
							formResetHandler()
						}}></i>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>Nom de la pension </Form.Label>
						<Form.Control
							type="text"
							placeholder="Ex: Pension complète"
							name="name"
							defaultValue={PensionName}
							onInput={name.inputHandler}
							onBlur={name.blurHandler}
							isInvalid={name.hasError}
							onChange={namePension => setNamePension(namePension.target.value)}
						/>
						<Form.Control.Feedback type="invalid">{name.errorMessage}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>
							Prix de la Pension
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
							defaultValue={PensionPrice}
							onInput={price.inputHandler}
							onBlur={price.blurHandler}
							isInvalid={price.hasError}
							onChange={pricePension => setPricePension(pricePension.target.value)}
						/>
						<Form.Control.Feedback type="invalid">{price.errorMessage}</Form.Control.Feedback>
					</Form.Group>
				</Form>
				<Form.Group className="mb-3">
					<Form.Label>
						Description de la pension
						<p
							style={{
								fontStyle: 'italic',
								float: 'right',
								color: 'lightgray',
								marginRight: '255px',
							}}></p>
					</Form.Label>
					<Form.Control
						type="texte"
						placeholder="Ex: décrivez la formule de votre pension"
						name="description"
						min="1"
						max="10000"
						defaultValue={PensionDescription}
						onInput={description.inputHandler}
						onBlur={description.blurHandler}
						isInvalid={description.hasError}
						onChange={descriptionPension => setDescriptionPension(descriptionPension.target.value)}
					/>
					<Form.Control.Feedback type="invalid">{description.errorMessage}</Form.Control.Feedback>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				{status === '' ? (
					<Button variant="secondary" disabled={!isFormValid} onClick={addPensionHandler}>
						Ajouter
					</Button>
				) : (
					<Button variant="secondary" disabled={!isFormValid} onClick={updatePensionHandler}>
						Enregistrer
					</Button>
				)}
			</Modal.Footer>
			{errorModal.isVisible && (
				<ModalError
					modal={errorModal}
					errorMessage={error}
				/>
			)}
		</Modal>
	)
}

ModalAddUpdatePension.propTypes = createModalProptypes

ModalAddUpdatePension.defaultProps = {
	status: '',
	PensionName: '',
	PensionPrice: '',
	PensionDescription: '',
}
