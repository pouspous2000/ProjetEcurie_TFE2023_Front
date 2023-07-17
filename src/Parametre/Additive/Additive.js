import { useGetAdditivesQuery } from '../../API/additive.api'
import CardAdditive from './Component/CardAdditive'
import { ModalAddAdditive } from './Component/ModalAddAdditve'

export const Additive = () => {
	const { data: additives, isLoading, isSuccess, isError, error } = useGetAdditivesQuery()

	return (
		<div>
			<h2 style={{ width: 'fit-content', marginLeft: '3rem', fontSize: '30px', color: '#CD853F' }}>
				Configurations
			</h2>
			<h3 style={{ margin: '35px' }}>
				Additifs
				<button
					data-toggle="tooltip"
					data-placement="top"
					title="Ajouter un additif"
					type="button"
					class="btn"
					data-bs-toggle="modal"
					data-bs-target="#modalAddAdditive"
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
			<ModalAddAdditive />

			{additives.map(additive => (
				<>
					<CardAdditive
						AdditiveName={additive.name}
						AdditivePrice={additive.price}
						AdditiveId={additive.id}
					/>
				</>
			))}
		</div>
	)
}
