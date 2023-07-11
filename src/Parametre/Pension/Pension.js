import ModalAddPension from './Component/ModalAddPension'
import CardPension from './Component/CardPension'

import { useGetPensionsQuery } from '../../API/pension.api'

export const Pension = () => {
	const { data: pensions, isLoading, isSuccess, isError, error } = useGetPensionsQuery()

	return (
		<div>
			<h2 style={{ width: 'fit-content', marginLeft: '3rem', fontSize: '30px', color: '#CD853F' }}>
				{' '}
				Configurations{' '}
			</h2>

			<h3 style={{ margin: '35px' }}>
				{' '}
				Pensions
				<button
					data-toggle="tooltip"
					data-placement="top"
					title="Ajouter une pension"
					type="button"
					class="btn"
					data-bs-toggle="modal"
					data-bs-target="#modalAjouterPension"
					style={{
						backgroundColor: 'transparent',
						borderColor: 'transparent',
						width: 'fit-content',
						fontSize: '2rem',
						marginRight: '5rem',
					}}>
					<i class="bi bi-plus-circle" />
				</button>
			</h3>
			<ModalAddPension />

			{pensions.map(pension => (
				<>
					<CardPension
						NomPension={pension.name}
						PrixPension={pension.monthlyPrice}
						DescriptionPension={pension.description}
						IdPension={pension.id}
					/>
				</>
			))}
		</div>
	)
}
