import { useGetContactByRoleCategoryQuery } from '../API/contact.api'
import { BaseSpinner } from '../shared/ui/BaseSpinner'
import { BaseErrorAlert } from '../shared/ui/BaseErrorAlert'
import { Button, ListGroup } from 'react-bootstrap';
import styles from './ClientView.module.css'


export const ClientView = () => {

    const {
        data: getContactByRoleCategoryData,
        isSuccess: isGetContactByRoleCategoryDataSucess,
        isLoading: isGetContactByRoleCategoryDataLoading,
        isError: isGetContactByRoleCategoryDataError,
        error: getContactByRoleCategoryDataError

    } = useGetContactByRoleCategoryQuery('CLIENT');

    const conditionalRendering = () => {
        if (isGetContactByRoleCategoryDataLoading) {
            return <BaseSpinner />
        } else if (isGetContactByRoleCategoryDataError) {
            return <BaseErrorAlert message={getContactByRoleCategoryDataError} />
        } else if (isGetContactByRoleCategoryDataSucess) {
            return (

                <ListGroup className={`${styles.liste}`}>
                    {
                        getContactByRoleCategoryData.map(role =>
                            <>

                            <ListGroup.Item style={{marginTop:'10px', boderRadius : '10px'}}> {role.firstName}</ListGroup.Item>
                            <Button> <i class="bi bi-info-circle"/> </Button>
                            <Button> <i class="bi bi-file-earmark-fill"/></Button>
                            <Button></Button>

                            </>
                        )
                    }
                </ListGroup>

            )
        }
    }

    return (
        <div className={`${styles.square}`}>
            {conditionalRendering()}
        </div>

    )
}