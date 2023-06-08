const todoLocales = {
	fr: {
		// validation
		todo_validation_userId: 'Le user Id doit être un entier >= 1',
		todo_validation_id: 'Le id doit etre un entier >= 1',
		todo_validation_title: 'Le titre doit contenir au minimum 5 caractères',
		todo_validation_completed: 'Le status completed doit être true ou false',

		//form
		todo_form_title_label: 'Titre',
		todo_form_title_placeholder: 'Ex: faire les courses',
		todo_form_completed_label: 'Achevé ?',
		todo_form_id_label: 'Id',
		todo_form_userId_label: 'UserId',

		//index pour la page
		todo_index_title: 'Tâches',
		todo_create: 'Créer',
		todo_column_id: 'Id',
		todo_column_title: 'Titre',
		todo_column_status: 'Status',
		todo_column_actions: 'Actions',
		todo_status_completed: 'Terminé',
		todo_status_not_completed: 'En cours',

		//create
		todo_createModal_title: 'Créer une nouvelle tâche',
		todo_createModal_close: 'Fermer',
		todo_createModal_confirm: 'Créer',

		//update
		todo_updateModal_title: 'Mettre à jour la tâche',
		todo_updateModal_close: 'Fermer',
		todo_updateModal_confirm: 'Valider',

		//delete
		todo_deleteModal_title: 'Supprimer la tâche',
		todo_deleteModal_text: 'Etes vous certain de vouloir supprimer cette tâche ?',
		todo_deleteModal_close: 'Annuler',
		todo_deleteModal_confirm: 'Supprimer',
	},
	en: {
		post_validation_userId: 'Error message validation post userId in english ',
	},
	nl: {
		post_validation_userId: 'Foutbericht voor validatie in het Nederlands',
	},
}

export default todoLocales
