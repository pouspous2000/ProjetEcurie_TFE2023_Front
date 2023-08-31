import { useGetContactByRoleCategoryQuery } from '../API/contact.api'
import { BaseSpinner } from '../shared/ui/BaseSpinner'
import { BaseErrorAlert } from '../shared/ui/BaseErrorAlert'
import { Button, ListGroup, Card } from 'react-bootstrap'
import styles from './clientEmployeeView.module.css'
import { useState, useEffect } from 'react'
import { ContactDetails } from './Client/Component/ContactDetails'

export const ClientEmployeeView = () => {
	const roles = 'EMPLOYEE'
	const {
		data: getContactByRoleCategoryData,
		isSuccess: isGetContactByRoleCategoryDataSucess,
		isLoading: isGetContactByRoleCategoryDataLoading,
		isError: isGetContactByRoleCategoryDataError,
		error: getContactByRoleCategoryDataError,
	} = useGetContactByRoleCategoryQuery(roles)

	const [searchTerm, setSearchTerm] = useState('')
	const [filteredContacts, setFilteredContacts] = useState('')
	const [selectedContact, setSelectedContact] = useState(undefined)

	const handleSearch = event => {
		const newSearchTerm = event.target.value
		setSearchTerm(newSearchTerm)

		const filtered = getContactByRoleCategoryData.filter(contact =>
			contact.firstName.toLowerCase().includes(newSearchTerm.toLowerCase())
		)
		setFilteredContacts(filtered)
	}
	useEffect(() => {
		if (isGetContactByRoleCategoryDataSucess) {
			const filtered = getContactByRoleCategoryData.filter(
				contact =>
					contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
					contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
			)
			setFilteredContacts(filtered)
		}
	}, [isGetContactByRoleCategoryDataSucess, getContactByRoleCategoryData, searchTerm])

	const selectContactHandler = contactId => {
		setSelectedContact(getContactByRoleCategoryData.find(contact => contact.id === contactId))
	}

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
				// return all contacts
				return (
					<>
						<input
							type="text"
							placeholder="Rechercher"
							value={searchTerm}
							onChange={handleSearch}
							className={`${styles.filter}`}
						/>
						<ListGroup className={`${styles.liste}`}>
							{filteredContacts &&
								filteredContacts.map(contact => (
									<>
										<Card style={{ marginTop: '10px' }}>
											<Card.Body style={{ textAlign: 'center', textSize: '40px' }}>
												{contact.firstName} {contact.lastName}
											</Card.Body>
											<Card.Footer className={`${styles.footer}`}>
												<Button
													variant="secondary"
													className={`${styles.button}`}
													onClick={() => {
														selectContactHandler(contact.id)
													}}>
													<i className={`bi bi-info-circle ${styles.bi}`} />
												</Button>
											</Card.Footer>
										</Card>
									</>
								))}
						</ListGroup>
					</>
				)
			}
		}
	}

	return (
		<div>
			<div className={`${styles.square}`}>{conditionalRendering()}</div>
		</div>
	)
}
