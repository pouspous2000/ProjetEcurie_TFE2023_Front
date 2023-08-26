import { useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import styles from './Cheval.module.css'
import { useGetHorsesQuery } from '../../API/horse.api'
import { useGetContactQuery } from '../../API/contact.api'
import { BaseSpinner } from '../../shared/ui/BaseSpinner'
import { BaseErrorAlert } from '../../shared/ui/BaseErrorAlert'

export const Cheval = () => {

    const {
        data: horses,
    } = useGetHorsesQuery()

    const {
        data: contact,
        isSuccess: isContactSuccess,
        isLoading: isContactLoading,
        isError: isContactError,
        error: contactError,
    } = useGetContactQuery({ id: 19 })

    const [key, setKey] = useState('home');

    const renderHorseInfo = (horse) => (
        <div className={`${styles.content} ${styles.whiteText}`}>
            <div className={`${styles.infoTitle}`}>Nom :</div>
            <div className={`${styles.infoValue}`}> {horse.name}</div>
            <div className={`${styles.infoTitle}`}>Propriétaire : </div>
            <div className={`${styles.infoValue}`}>{horse.owner.firstName} {horse.owner.lastName}</div>
            <div className={`${styles.infoTitle}`}> Pension : </div>
            <div className={`${styles.infoValue}`}> {horse.pension.name}({horse.pension.monthlyPrice}€)</div>
            <div className={`${styles.infoTitle}`}> Additif : </div>
            {horse.additiveDatas
                .filter(additive => additive.status === 'ACTIVE')
                .map((additive, index) => (
                    <div key={index}>{additive.name} ({additive.price}€)</div>
                ))}
            <div className={`${styles.infoTitle}`}> Intervenants : </div>
            {
                horse.horseContributorHorseContributorJobs.length === 0 ? <div>Ce cheval n'a pas encore d'intervenants </div> :
                    <>
                        {horse.horseContributorHorseContributorJobs.map((hchcj, index) => (
                            <div key={index} style={{ fontWeight: 'bolder' }}>
                                - {hchcj.horseContributorJob.name} : {hchcj.horseContributor.firstName} {hchcj.horseContributor.lastName}
                            </div>
                        ))}
                    </>
            }
            <div className={`${styles.infoTitle}`}> Commentaire</div>
            <div>{horse.comment.length === 0 ? <div>Ce cheval n'a pas encore de commentaires </div> : horse.comment}</div>
        </div>


    );
    const conditionalRenderingOwner = () => {
        if (isContactLoading) {
            return <BaseSpinner />
        } else if (isContactError) {
            return <BaseErrorAlert message={contactError} />
        } else if (isContactSuccess && contact) {
            return (
                <div className={`${styles.user}`}>
                    {contact.firstName} {contact.lastName}
                </div>
            )

        }
    }
    console.log(key)
    console.log()

    return (
        <div className={`${styles.square}`}>
            <div className={`${styles.content}`}>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className={`${styles.customTabs}`}
                >
                    {horses &&
                        horses
                            // TODO : Changer l'id 
                            .filter(horse => horse.owner.userId === 19)
                            .map(horse => (
                                <Tab eventKey={horse.id} title={horse.name} key={horse.id}>
                                    {console.log(horse.id)}
                                    {renderHorseInfo(horse)}
                                </Tab>
                            ))}
                </Tabs>
            </div>
        </div>
    )
}