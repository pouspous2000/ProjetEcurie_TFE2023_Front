// import SweetAlert from "./SweetAlert";
import ModalModifyPension from './ModalModifyPension'
import Swal from 'sweetalert2'
import styles from './card.module.css'
import { useDeletePensionMutation } from '../../../API/pension.api'
import { BaseSpinner } from '../../../shared/ui/BaseSpinner'
import { Stack } from 'react-bootstrap'

function CardPension({ NomPension, PrixPension, DescriptionPension, IdPension }) {
	const [deletePension, { isLoading, isSuccess, isError, errorMessage }] = useDeletePensionMutation()
	const deletePensionHandler = () => {
		deletePension({ id: IdPension })
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
				deletePensionHandler()
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
										<h4>{NomPension}</h4>
										<h5> Description : </h5>
										<div>{DescriptionPension}</div>
									</div>

									<div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-4 border-sm-start-none border-start border-warning ">
										<div className="d-flex flex-row align-items-center ">
											<h5 style={{ marginRight: 'auto', marginLeft: 'auto' }} className="">
												{PrixPension}€/mois
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
												data-bs-target={`#modalModifPension${IdPension}`}>
												<i
													style={{ fontSize: '2rem' }}
													class={`bi bi-pencil ${styles.modif}`}
												/>
											</button>
											<ModalModifyPension
												IdPension={IdPension}
												NomPension={NomPension}
												PrixPension={PrixPension}
												DescriptionPension={DescriptionPension}
											/>
											<button
												style={{ marginLeft: 'auto', marginRight: 'auto' }}
												data-toggle="tooltip"
												data-placement="top"
												title="Supprimer la pension"
												type="button"
												id={NomPension}
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
export default CardPension
