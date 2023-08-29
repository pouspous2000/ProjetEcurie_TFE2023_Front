import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

export const PageNotFound = props => {
	const { t } = useTranslation()

	return (
		<Container>
			<Row className="justify-content-center align-items-center vh-100">
				<Col xs={12} md={8}>
					<section className="text-center">
						<h1>{t('notFound_page_error_title')}</h1>
						<div>{t(props && props.message ? props.message : 'notFound_page_error_content')}</div>
						<Link to="/">{t('common_page_error_redirection')}</Link>
					</section>
				</Col>
			</Row>
		</Container>
	)
}
