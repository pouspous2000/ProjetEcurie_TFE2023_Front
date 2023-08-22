import { Button, Card } from 'react-bootstrap'
import { useDeleteAdditiveMutation } from '../../../API/additive.api'
import { ModalAddAdditive } from './ModalAddAdditve'
import useModal from '../../../shared/hooks/use-modal'

export const CardAdditive = props => {
	const { AdditiveId, AdditiveName, AdditivePrice } = props

	// _________DELETE_________
	const [deleteAdditive] = useDeleteAdditiveMutation()
	const handelDeleteAdditive = additiveId => {
		deleteAdditive({
			id: additiveId,
		})
	}
	const createModal = useModal()

	return (
		<Card className="col-7 col-sm-7" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '2rem' }}>
			<Card.Header>
				<Card.Title style={{ float: 'left' }}>{AdditiveName}</Card.Title>
				<Card.Title style={{ float: 'right' }}>{AdditivePrice}€</Card.Title>
			</Card.Header>
			<Card.Footer className="d-flex justify-content-center align-items-center">
				<Button
					style={{ marginRight: '5px', backgroundColor: 'grey', border: 'none' }}
					onClick={() => {
						createModal.openHandler()
					}}>
					<i style={{ fontSize: '2rem' }} className="bi bi-pencil" />
				</Button>
				{createModal.isVisible && (
					<ModalAddAdditive
						modal={createModal}
						status="Update"
						AdditiveId={AdditiveId}
						AdditiveName={AdditiveName}
						AdditivePrice={AdditivePrice}
					/>
				)}
				<Button
					style={{ marginLeft: '5px', backgroundColor: 'grey', border: 'none' }}
					onClick={() => handelDeleteAdditive(AdditiveId)}>
					<i style={{ fontSize: '2rem' }} className="bi bi-trash3" />
				</Button>
			</Card.Footer>
		</Card>
	)
}
