import { useGetContactByRoleCategoryQuery } from '../API/contact.api'
import { BaseSpinner } from '../shared/ui/BaseSpinner'
import { BaseErrorAlert } from '../shared/ui/BaseErrorAlert'
import { Button, ListGroup } from 'react-bootstrap'
import styles from './clientEmployeeView.module.css'
import { useState } from 'react'
import { ContactDetails } from './Client/Component/ContactDetails'

export const ClientView = () => {
	const roles = 'CLIENT'
	const {
		data: getContactByRoleCategoryData,
		isSuccess: isGetContactByRoleCategoryDataSucess,
		isLoading: isGetContactByRoleCategoryDataLoading,
		isError: isGetContactByRoleCategoryDataError,
		error: getContactByRoleCategoryDataError,
	} = useGetContactByRoleCategoryQuery(roles)

	const selectContactHandler = contactId => {
		setSelectedContact(getContactByRoleCategoryData.find(contact => contact.id === contactId))
	}
	const [selectedContact, setSelectedContact] = useState(undefined)

	const returnHandler = () => {
		setSelectedContact(undefined)
	}

	const conditionalRendering = () => {
		if (isGetContactByRoleCategoryDataLoading) {
			return <BaseSpinner />
		} else if (isGetContactByRoleCategoryDataError) {
			return <BaseErrorAlert message={getContactByRoleCategoryDataError} />
		} else if (isGetContactByRoleCategoryDataSucess) {
			if (selectedContact) {
				return <ContactDetails contact={selectedContact} returnHandler={returnHandler} roles={roles} />
			} else {
				return (
					<ListGroup className={`${styles.liste}`}>
						{getContactByRoleCategoryData.map(contact => (
							<>
								<ListGroup.Item style={{ marginTop: '10px', boderRadius: '10px' }}>
									{' '}
									{contact.firstName} {contact.lastName}
								</ListGroup.Item>
								<Button
									variant="secondary"
									className={`${styles.button}`}
									onClick={() => {
										selectContactHandler(contact.id)
									}}>
									{' '}
									<i class="bi bi-info-circle" />{' '}
								</Button>
								<Button variant="secondary" className={`${styles.button}`}>
									Cheval
								</Button>
							</>
						))}
					</ListGroup>
				)
			}
		}
	}

	return <div className={`${styles.square}`}>{conditionalRendering()}</div>
}
