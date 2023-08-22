import { Button, Card } from 'react-bootstrap'
import { useDeletePensionMutation } from '../../../API/pension.api'
import { ModalAddUpdatePension } from './ModalAddUpdatePension'
import useModal from '../../../shared/hooks/use-modal'

export const CardPension = props => {
	const { PensionName, PensionPrice, PensionId, PensionDescription } = props

	// _________DELETE_________
	const [deletePension] = useDeletePensionMutation()
	const handelDeletePension = PensionId => {
		deletePension({
			id: PensionId,
		})
	}
	const createModal = useModal()

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
						createModal.openHandler()
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
		</Card>
	)
}
