import React, { useState, useEffect, useCallback } from 'react'
import { useAddAdditiveMutation, useUpdateAdditiveMutation } from '../../../API/additive.api'
import useInput from '../../../shared/hooks/use-input'
import { Form, Modal, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import ValidationConstantes from './ValidationConstantes'

const createModalProptypes = {
	modal: PropTypes.shape({
		isVisible: PropTypes.bool,
		openHandler: PropTypes.func,
		closeHandler: PropTypes.func,
		confirmHandler: PropTypes.func,
	}),
}

export const ModalAddAdditive = props => {
	const { status, AdditiveName, AdditivePrice, AdditiveId } = props

	const [nameAdditif, setNameAdditif] = useState('')
	const [priceAdditif, setPriceAdditif] = useState('')

	// ---------Validation des inputs---------
	const { validateName, validatePrice } = ValidationConstantes

	const name = useInput(value => validateName(value), '')
	const price = useInput(value => validatePrice(value), '')

	const isFormValid = !(name.hasError || price.hasError)

	const formResetHandler = useCallback(() => {
		price.reset()
		name.reset()
	}, [price, name])

	// ________ADD___________
	const [addAdditive, { isSuccess: isAddAdditiveSuccess }] = useAddAdditiveMutation()

	const addAdditiveHandler = () => {
		addAdditive({
			name: name.value,
			price: price.value,
		})
	}
	useEffect(() => {
		if (isAddAdditiveSuccess) {
			props.modal.closeHandler()
			formResetHandler()
		}
	}, [isAddAdditiveSuccess, formResetHandler, props])

	// ________UPDATE___________

	const [updateAditive, { isSuccess: isUpdateAdditiveSuccess }] = useUpdateAdditiveMutation()

	const updateAdditiveHandler = () => {
		updateAditive({
			name: name.value === '' ? AdditiveName : nameAdditif,
			price: price.value === '' ? AdditivePrice : priceAdditif,
			id: AdditiveId,
		})
	}

	useEffect(() => {
		if (isUpdateAdditiveSuccess) {
			props.modal.closeHandler()
		}
	}, [isUpdateAdditiveSuccess, props])

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
						<Form.Label>Nom de l'additif </Form.Label>
						<Form.Control
							type="text"
							placeholder="Ex: Additive complète"
							name="name"
							defaultValue={AdditiveName}
							onInput={name.inputHandler}
							onBlur={name.blurHandler}
							isInvalid={name.hasError}
							onChange={nameAdditif => setNameAdditif(nameAdditif.target.value)}
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
							defaultValue={AdditivePrice}
							onInput={price.inputHandler}
							onBlur={price.blurHandler}
							isInvalid={price.hasError}
							onChange={priceAdditif => setPriceAdditif(priceAdditif.target.value)}
						/>
						<Form.Control.Feedback type="invalid">{price.errorMessage}</Form.Control.Feedback>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				{status === '' ? (
					<Button variant="secondary" disabled={!isFormValid} onClick={addAdditiveHandler}>
						Ajouter
					</Button>
				) : (
					<Button variant="secondary" disabled={!isFormValid} onClick={updateAdditiveHandler}>
						Enregistrer
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	)
}
ModalAddAdditive.propTypes = createModalProptypes

ModalAddAdditive.defaultProps = {
	status: '',
	AdditiveName: '',
	AdditivePrice: '',
}
