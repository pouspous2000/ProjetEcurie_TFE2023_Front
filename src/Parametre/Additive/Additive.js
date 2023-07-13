import { useGetAdditivesQuery } from '../../API/additive.api'

export const Additive = () => {
	const { data: additives, isLoading, isSuccess, isError, error } = useGetAdditivesQuery()

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
			{/* <ModalAddPension /> */}

			{additives.map(additive => (
				<>
					{/* <CardPension
						NomPension={additive.name}
						PrixPension={additive.monthlyPrice}
						DescriptionPension={additive.description}
						IdPension={additive.id}
					/> */}
					<div> {additive.name} </div>
				</>
			))}
		</div>
	)
}
