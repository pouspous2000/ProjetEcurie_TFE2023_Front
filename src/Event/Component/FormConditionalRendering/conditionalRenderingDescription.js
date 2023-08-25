import { Form } from 'react-bootstrap'
import moment from 'moment'
const currentDateTime = moment()

export const conditionalRenderingDescription = (dateStart, hourStart, type, descript, setDescription, descriptions, isAutor, category, setRemarkTask, remark, status) => {

    const conditionalRendering = () => {
        if (type === 'Add') {
            if (category === 'task' && status === 'PANDING') {
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Description de l'évènement </Form.Label>
                            <Form.Control
                                rows="3"
                                placeholder="Décrivez votre evènement"
                                defaultValue={type === 'Add' ? '' : descript}
                                onChange={event => setDescription(event.target.value)}
                                onInput={descriptions.inputHandler}
                                onBlur={descriptions.blurHandler}
                                isInvalid={descriptions.hasError}
                                disabled={true}
                                style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {descriptions.errorMessage}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Remarque sur la tâche</Form.Label>
                            <Form.Control
                                rows="3"
                                placeholder="Ajoutez une remarque"
                                defaultValue={type === 'Add' ? '' : remark}
                                onChange={event => setRemarkTask(event.target.value)}
                                onInput={descriptions.inputHandler}
                                onBlur={descriptions.blurHandler}
                                isInvalid={descriptions.hasError}
                                disabled={!isAutor}
                                style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {descriptions.errorMessage}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </>
                )

            }
            return (
                <>
                    <Form.Group className="mb-3">
                        <Form.Label>Description de l'évènement </Form.Label>
                        <Form.Control
                            rows="3"
                            placeholder="Décrivez votre evènement"
                            defaultValue={type === 'Add' ? '' : descript}
                            onChange={event => setDescription(event.target.value)}
                            onInput={descriptions.inputHandler}
                            onBlur={descriptions.blurHandler}
                            isInvalid={descriptions.hasError}
                            disabled={!isAutor}
                            style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {descriptions.errorMessage}
                        </Form.Control.Feedback>
                    </Form.Group>
                </>
            )
        }

        else if(moment(dateStart, 'DD/MM/YYYY').isSameOrBefore(currentDateTime, 'day') ||
                !isAutor) {
            return (
                <Form.Group className="mb-3">
                    <Form.Label>Description de l'évènement </Form.Label>
                    <Form.Control
                        rows="3"
                        placeholder="Décrivez votre evènement"
                        defaultValue={type === 'Add' ? '' : descript}
                        onChange={event => setDescription(event.target.value)}
                        onInput={descriptions.inputHandler}
                        onBlur={descriptions.blurHandler}
                        isInvalid={descriptions.hasError}
                        disabled={true}
                        style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {descriptions.errorMessage}
                    </Form.Control.Feedback>
                </Form.Group>
            )
        }
        else if (category === 'competition' || category === 'event') {
            return (
                <Form.Group className="mb-3">
                    <Form.Label>Description de l'évènement </Form.Label>
                    <Form.Control
                        rows="3"
                        placeholder="Décrivez votre evènement"
                        defaultValue={type === 'Add' ? '' : descript}
                        onChange={event => setDescription(event.target.value)}
                        onInput={descriptions.inputHandler}
                        onBlur={descriptions.blurHandler}
                        isInvalid={descriptions.hasError}
                        disabled={!isAutor}
                        style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {descriptions.errorMessage}
                    </Form.Control.Feedback>
                </Form.Group>
            )
        } else if (category === 'task' && status !== 'PANDING') {
            return (
                <>
                    <Form.Group className="mb-3">
                        <Form.Label>Description de l'évènement </Form.Label>
                        <Form.Control
                            rows="3"
                            placeholder="Décrivez votre evènement"
                            defaultValue={type === 'Add' ? '' : descript}
                            onChange={event => setDescription(event.target.value)}
                            onInput={descriptions.inputHandler}
                            onBlur={descriptions.blurHandler}
                            isInvalid={descriptions.hasError}
                            disabled={true}
                            style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {descriptions.errorMessage}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Remarque sur la tâche</Form.Label>
                        <Form.Control
                            rows="3"
                            placeholder="Ajoutez une remarque"
                            defaultValue={type === 'Add' ? '' : remark}
                            onChange={event => setRemarkTask(event.target.value)}
                            onInput={descriptions.inputHandler}
                            onBlur={descriptions.blurHandler}
                            isInvalid={descriptions.hasError}
                            disabled={true}
                            style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {descriptions.errorMessage}
                        </Form.Control.Feedback>
                    </Form.Group>
                </>
            )

        }
        return ''
    }
    return conditionalRendering()
}