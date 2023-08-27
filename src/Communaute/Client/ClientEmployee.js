import { useGetContactQuery } from '../../API/contact.api'
import { useGetHorsesQuery } from '../../API/horse.api'
import { BaseSpinner } from '../../shared/ui/BaseSpinner'
import { BaseErrorAlert } from '../../shared/ui/BaseErrorAlert'
import styles from './clientEmployee.module.css'

export const Client = () => {
    // TO DO : récupérer id choisi.
    const idUser = 2
    const status = 'EMPLOYEE'
    
    // ––––––Get-–––––
    const {
        data: contact,
        isSuccess: isContactSuccess,
        isLoading: isContactLoading,
        isError: isContactError,
        error: contactError,
    } = useGetContactQuery({ id: idUser })

    const {
        data: horses,
    } = useGetHorsesQuery()


    const conditionalRendering = () => {
        if (isContactLoading) {
            return <BaseSpinner />
        } else if (isContactError) {
            return <BaseErrorAlert message={contactError} />
        } else if (isContactSuccess && contact) {
            return (
                <div className={`${styles.square}`}>
                    <div className={`${styles.user}`} >{contact.firstName} {contact.lastName} </div>
                    <div className={`${styles.squareBis}`}>
                        <div className={`${styles.title}`}> Informations :</div>
                        <div className={`${styles.infoTitle}`}>Numéro de téléphone mobile :</div>
                        <div className={`${styles.infoValue}`}>{contact.mobile}</div>
                        <div className={`${styles.infoTitle}`}>Numéro de téléphone :</div>
                        <div className={`${styles.infoValue}`}>{contact.phone}</div>
                        <div className={`${styles.infoTitle}`}>Adresse :</div>
                        <div className={`${styles.infoValue}`}>{contact.address}</div>
                        {
                            status === 'CLIENT' ?
                                <>
                                    <div className={`${styles.infoTitle}`}>Adresse de facturation :</div>
                                    <div className={`${styles.infoValue}`}>{contact.invoicingAddress}</div>

                                    <div className={`${styles.title}`}> Propriétaire de :</div>
                                    <div>
                                        {horses &&
                                            horses
                                                // TODO : Changer l'id 
                                                .filter(horse => horse.owner.userId === 19)
                                                .map(horse => (
                                                    <div key={horse.id}>- {horse.name}</div>
                                                ))}
                                    </div>
                                </>
                            : ''
                        }
                    </div>

                </div >
            )

        } else {
            return <p>Pas bon ... </p>
        }
    }
    return conditionalRendering()
}