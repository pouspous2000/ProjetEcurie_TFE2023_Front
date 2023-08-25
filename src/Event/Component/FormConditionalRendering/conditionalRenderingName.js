import { Form } from 'react-bootstrap'
import moment from 'moment'
const currentDateTime = moment()

export const conditionalRenderingName = (name, title, status, category, setNames, type, dateStart, hourStart, isAutor) => {
    const conditionalRendering = () => {
        if (
            (moment(dateStart, 'DD/MM/YYYY').isSameOrBefore(currentDateTime, 'day') ||
                !isAutor) || (category === 'task' && status !== 'PENDING')) {
                   
            return (
                <Form.Group className="mb-3">
                    <Form.Label>Nom de l'évènement </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ex: Additive complète"
                        name="name"
                        defaultValue={type === 'Add' ? '' : title}
                        onChange={event => setNames(event.target.value)}
                        onInput={name.inputHandler}
                        onBlur={name.blurHandler}
                        isInvalid={name.hasError}
                        disabled={true}
                        style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
                    />
                    <Form.Control.Feedback type="invalid">{name.errorMessage}</Form.Control.Feedback>
                </Form.Group>
            )
        } else if ((category === 'event' || category === 'competition') || (category === 'task' && status === 'PENDING') || type === 'Add') {
            return (
                <Form.Group className="mb-3">
                    <Form.Label>Nom de l'évènement </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ex: Additive complète"
                        name="name"
                        defaultValue={type === 'Add' ? '' : title}
                        onChange={event => setNames(event.target.value)}
                        onInput={name.inputHandler}
                        onBlur={name.blurHandler}
                        isInvalid={name.hasError}
                        disabled={!isAutor}
                        style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
                    />
                    <Form.Control.Feedback type="invalid">{name.errorMessage}</Form.Control.Feedback>
                </Form.Group>

            )
        }
        return
    }

    return conditionalRendering()
}