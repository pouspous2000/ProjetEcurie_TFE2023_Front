import styles from '../client.module.css'
import { useGetHorsesQuery } from '../../../API/horse.api'
import { BaseSpinner } from '../../../shared/ui/BaseSpinner'
import { BaseErrorAlert } from '../../../shared/ui/BaseErrorAlert'

export const ContactDetails = props => {
	const { data: horses, isSuccess, isLoading, isError, error } = useGetHorsesQuery()

	const conditionalRendering = () => {
		if (isLoading) {
			return <BaseSpinner />
		} else if (isError) {
			return <BaseErrorAlert message={error} />
		} else if (isSuccess) {
			return (
				<>
					<button onClick={props.returnHandler}>Retour</button>
					<article className={`${styles.square}`}>
						<div className={`${styles.user}`}>
							{props.contact.firstName} {props.contact.lastName}{' '}
						</div>
						<div className={`${styles.squareBis}`}>
							<div className={`${styles.title}`}> Informations :</div>
							<div className={`${styles.infoTitle}`}>Numéro de téléphone mobile :</div>
							<div className={`${styles.infoValue}`}>{props.contact.mobile}</div>
							<div className={`${styles.infoTitle}`}>Numéro de téléphone :</div>
							<div className={`${styles.infoValue}`}>{props.contact.phone}</div>
							<div className={`${styles.infoTitle}`}>Adresse :</div>
							<div className={`${styles.infoValue}`}>{props.contact.address}</div>
							{props.roles === 'CLIENT' ? (
								<>
									<div className={`${styles.infoTitle}`}>Adresse de facturation :</div>
									<div className={`${styles.infoValue}`}>{props.contact.invoicingAddress}</div>

									<div className={`${styles.title}`}> Propriétaire de :</div>
									<div>
										{horses &&
											horses
												.filter(horse => horse.owner.userId === props.contact.userId)
												.map(horse => <div key={horse.id}>- {horse.name}</div>)}
									</div>
								</>
							) : (
								''
							)}
						</div>
					</article>
				</>
			)
		}
	}

	return <>{conditionalRendering()}</>
}
