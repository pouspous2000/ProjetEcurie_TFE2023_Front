import { Modal } from "react-bootstrap"
import PropTypes from 'prop-types'

const errorModalProptypes = {
    modal: PropTypes.shape({
        isVisible: PropTypes.bool,
        openHandler: PropTypes.func,
        closeHandler: PropTypes.func,
        confirmHandler: PropTypes.func,
    }),
}

export const ModalError = props => {
    const {errorMessage} = props
    return (

        <Modal show={props.modal.isVisible} onHide={props.modal.closeHandler}>
            <Modal.Header>
                <Modal.Title as={'header'} className="d-flex justify-content-between align-items-center w-100">
                    <p style={{ float: 'right' }}></p>
                    <i
                        data-bs-dismiss="modal"
                        style={{ fontSize: '30px', float: 'right' }}
                        className="bi bi-x-circle-fill"
                        onClick={props.modal.closeHandler}
                        
                    ></i>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {errorMessage}
            </Modal.Body>

        </Modal>
    )
}
ModalError.propTypes = errorModalProptypes
