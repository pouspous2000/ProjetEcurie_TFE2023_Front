// import SweetAlert from "./SweetAlert";
import ModalModifyAdditive from './ModalModifyAdditive'
import Swal from 'sweetalert2'
import styles from './card.module.css'
import { useDeleteAdditiveMutation } from '../../../API/additive.api'
import { BaseSpinner } from '../../../shared/ui/BaseSpinner'

function CardAdditive({ AdditiveName, AdditivePrice, AdditiveId }) {
	const [deleteAdditive, { isLoading, isSuccess, isError, error: errorMessage }] = useDeleteAdditiveMutation()
	const deleteAdditiveHandler = () => {
		deleteAdditive({ id: AdditiveId })
	}
	function supprimer(e) {
		Swal.fire({
			title: '',
			text: 'Etes vous sur de vouloir supprimer :' + e + '?',
			icon: 'question',
			showDenyButton: 'true',
			confirmButtonText: 'Oui',
			denyButtonText: 'Non',
		}).then(result => {
			if (result.isConfirmed) {
				deleteAdditiveHandler()
			}
		})
	}

	const conditionalRendering = () => {
		if (isLoading) {
			return <BaseSpinner />
		} else {
			return (
				<>
					<div class="row">
						<div style={{ width: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
							<div class="card  " style={{ marginTop: '2rem', backgroundColor: '#F5F7FA' }}>
								<div class="card-body row  shadow-0 border rounded-3">
									<div className="col-xl-10 col-lg-9 col-md-9 col-sm-8 col-7">
										<h4>{AdditiveName}</h4>
									</div>

									<div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-4 border-sm-start-none border-start border-warning ">
										<div className="d-flex flex-row align-items-center ">
											<h5 style={{ marginRight: 'auto', marginLeft: 'auto' }} className="">
												{AdditivePrice}€/mois
											</h5>
										</div>
										<div
											className={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
											}}>
											<button
												style={{ marginLeft: 'auto', marginRight: 'auto' }}
												data-toggle="tooltip"
												data-placement="top"
												title="Modifier la formule"
												type="button"
												class="btn"
												data-bs-toggle="modal"
												data-bs-target={`#modalModifAdditive${AdditiveId}`}>
												<i
													style={{ fontSize: '2rem' }}
													class={`bi bi-pencil ${styles.modif}`}
												/>
											</button>
											<ModalModifyAdditive
												AdditiveId={AdditiveId}
												AdditiveName={AdditiveName}
												AdditivePrice={AdditivePrice}
											/>
											<button
												style={{ marginLeft: 'auto', marginRight: 'auto' }}
												data-toggle="tooltip"
												data-placement="top"
												title="Supprimer l'additif'"
												type="button"
												id={AdditiveName}
												class="btn"
												onClick={e => supprimer(e.currentTarget.id)}>
												<i
													style={{ fontSize: '2rem' }}
													className={`bi bi-trash3 ${styles.poubelle}`}
												/>
											</button>
										</div>
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
export default CardAdditive
