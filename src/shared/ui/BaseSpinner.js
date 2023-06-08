import { useTranslation } from 'react-i18next'
import { Spinner } from 'react-bootstrap'

export const BaseSpinner = () => {
	const { t } = useTranslation()
	return (
		<Spinner animation="border" role="status">
			<span className="visually-hidden">{t('loading')}</span>
		</Spinner>
	)
}
