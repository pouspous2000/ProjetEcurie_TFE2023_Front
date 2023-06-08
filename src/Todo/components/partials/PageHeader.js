import { useTranslation } from 'react-i18next'

import { Button } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { RoleSelect } from '../../../shared/roles/RoleSelect'

import PropTypes from 'prop-types'

const pageHeaderProptypes = {
	openCreateModal: PropTypes.func.isRequired,
}

export const PageHeader = props => {
	const { t } = useTranslation()

	return (
		<>
			<Row>
				<Col xs md="10">
					<h1>{t('todo_index_title')}</h1>
				</Col>
				<Col xs md="2">
					<Button
						onClick={() => {
							props.openCreateModal()
						}}>
						{t('todo_create')}
					</Button>
				</Col>
			</Row>
			<Row>
				<Col xs md={4}>
					<RoleSelect />
				</Col>
			</Row>
		</>
	)
}

PageHeader.propTypes = pageHeaderProptypes
