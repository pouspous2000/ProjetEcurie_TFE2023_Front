import { useGetTodosQuery } from '../api'
import { useTranslation } from 'react-i18next'
import useModal from '../../shared/hooks/use-modal'
import { useState } from 'react'

import { Container } from 'react-bootstrap'
import { PageHeader } from '../components/partials/PageHeader'
import { CreateModal } from '../components/CreateModal'
import { DeleteModal } from '../components/DeleteModal'
import { Table, Button } from 'react-bootstrap'
import { BaseSpinner } from '../../shared/ui/BaseSpinner'
import { BaseErrorAlert } from '../../shared/ui/BaseErrorAlert'
import { UpdateModal } from '../components/UpdateModal'

export const TodoList = () => {
	const { t } = useTranslation()

	const [deleteId, setDeleteId] = useState(undefined)
	const [updateTodo, setUpdateTodo] = useState(undefined)

	const { data: todos, isLoading, isSuccess, isError, error } = useGetTodosQuery()

	const createModal = useModal()
	const updateModal = useModal(
		false,
		todo => {
			setUpdateTodo(todo)
		},
		() => {
			setUpdateTodo(null)
		}
	)

	const deleteModal = useModal(
		false,
		id => {
			setDeleteId(id)
		},
		() => {
			setDeleteId(null)
		}
	)

	//const updateModal = useModal()

	const conditionalRender = () => {
		if (isLoading) {
			return <BaseSpinner />
		} else if (isError) {
			return <BaseErrorAlert message={error} />
		} else if (isSuccess) {
			return (
				<Table className="mb-4">
					<thead>
						<tr>
							<th scope="col">{t('todo_column_id')}</th>
							<th scope="col">{t('todo_column_title')}</th>
							<th scope="col">{t('todo_column_status')}</th>
							<th scope="col">{t('todo_column_actions')}</th>
						</tr>
					</thead>
					<tbody>
						{todos.map(todo => (
							<tr key={todo.id}>
								<td>{todo.id}</td>
								<td>{todo.title}</td>
								<td>{todo.completed ? t('todo_status_completed') : t('todo_status_not_completed')}</td>
								<td>
									<Button
										variant="success"
										onClick={() => {
											updateModal.openHandler(todo)
										}}>
										Update
									</Button>
									<Button
										variant="danger"
										onClick={() => {
											deleteModal.openHandler(todo.id)
										}}>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)
		}
	}
	return (
		<main>
			<Container>
				<PageHeader openCreateModal={createModal.openHandler} />
				{conditionalRender()}

				{createModal.isVisible && (
					<CreateModal isVisible={createModal.isVisible} close={createModal.closeHandler} />
				)}
				<DeleteModal isVisible={deleteModal.isVisible} close={deleteModal.closeHandler} id={deleteId} />

				{updateModal.isVisible && (
					<UpdateModal isVisible={updateModal.isVisible} close={updateModal.closeHandler} todo={updateTodo} />
				)}
			</Container>
		</main>
	)
}
