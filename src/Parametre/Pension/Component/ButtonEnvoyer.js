// import ToastAlert from "./ToastAlert";
import Swal from 'sweetalert2'

function BoutonEnvoyer({ Text }) {
	function supprimer() {
		const Toast = Swal.mixin({
			toast: true,
			position: 'bottom-right',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: toast => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			},
		})

		Toast.fire({
			icon: 'success',
			title: 'Vos données ont bien été enregistrés',
		})
	}

	return (
		<button
			style={{ borderRadius: '10px', backgroundColor: '#af8d68', borderColor: '#af8d68', color: '#F5F5DC' }}
			data-bs-dismiss="modal"
			onClick={supprimer}>
			{Text}
		</button>
	)
}
export default BoutonEnvoyer
