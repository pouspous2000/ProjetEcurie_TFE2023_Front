import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const PageRgpd = () => {
	const { t } = useTranslation()

	return (
		<Container>
			<Row className="justify-content-center align-items-center vh-100">
				<Col xs={12} md={8}>
					<section className="text-center">
						<h1>{t('rgpd_title')}</h1>
						<div>{t('rgpd_content')}</div>
						<Link to="/authentication">{t('rgpd_redirection')}</Link>
					</section>
				</Col>
			</Row>
		</Container>
	)
}
