import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDeletePensionMutation } from '../../../API/pension.api';
import { ModalAddUpdatePension } from './ModalAddUpdatePension';
import useModal from '../../../shared/hooks/use-modal';
import { ModalError } from '../../../shared/hooks/ModalError';

export const CardPension = props => {
	const { PensionName, PensionPrice, PensionId, PensionDescription } = props;
	const [error, setError] = useState('');
	const [isDeletePensionError, setIsDeletePensionError] = useState(false);
	const [deletePensionError, setDeletePensionError] = useState(null);


	const createModal = useModal();
	const errorModal = useModal()

	// _________DELETE_________
	const [deletePension, { isError: isDeletePensionErrors, error: deletePensionErrors }] = useDeletePensionMutation();

	const handelDeletePension = PensionId => {
		deletePension({
			id: PensionId,
		});
	};
	useEffect(() => {
		if (isDeletePensionErrors) {
		errorModal.openHandler()
		setError(deletePensionErrors.data.message )
		
		}
	  }, [isDeletePensionErrors]);

	return (
		<Card className="col-7 col-sm-7" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '2rem' }}>
			<Card.Header>
				<Card.Title style={{ float: 'left' }}>{PensionName}</Card.Title>
				<Card.Title style={{ float: 'right' }}>{PensionPrice}€</Card.Title>
			</Card.Header>
			<Card.Body>
				<p>{PensionDescription}</p>
			</Card.Body>
			<Card.Footer className="d-flex justify-content-center align-items-center">
				<Button
					style={{ marginRight: '5px', backgroundColor: 'grey', border: 'none' }}
					onClick={() => {
						createModal.openHandler();
					}}>
					<i style={{ fontSize: '2rem' }} className="bi bi-pencil" />
				</Button>
				{createModal.isVisible && (
					<ModalAddUpdatePension
						modal={createModal}
						status="Update"
						PensionId={PensionId}
						PensionName={PensionName}
						PensionPrice={PensionPrice}
						PensionDescription={PensionDescription}
					/>
				)}
				<Button
					style={{ marginLeft: '5px', backgroundColor: 'grey', border: 'none' }}
					onClick={() => handelDeletePension(PensionId)}>
					<i style={{ fontSize: '2rem' }} className="bi bi-trash3" />
				</Button>

			</Card.Footer>
			{errorModal.isVisible && (
				<ModalError
					modal={errorModal}
					errorMessage={error}
				/>
			)}
		</Card>
	);
};
