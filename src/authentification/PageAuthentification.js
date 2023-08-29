import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { PageLogin } from './login/PageLogin'
import { PageRegister } from './register/PageRegister'

export const PageAuthentication = () => {
	const { t } = useTranslation()
	return (
		<Container>
			<Row className="justify-content-center">
				<Col xs={12} md={8} className="px-5 mt-5" style={{ maxWidth: '900px' }}>
					<Tabs defaultActiveKey="pageLogin" className="mb-3">
						<Tab eventKey="pageLogin" title={t('authentication_authentication_login')}>
							<PageLogin />
						</Tab>
						<Tab eventKey="pageRegister" title={t('authentication_authentication_register')}>
							<PageRegister />
						</Tab>
					</Tabs>
				</Col>
			</Row>
		</Container>
	)
}
