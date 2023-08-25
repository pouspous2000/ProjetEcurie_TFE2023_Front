import { Form } from 'react-bootstrap'
import moment from 'moment'
const currentDateTime = moment()

export const conditionalRenderingDateTime = (
    dateStart,
    startDates,
    startTimes,
    endTimes,
    handleEndTimeChange,
    hourEnd,
    handleEndDateChange,
    endDates,
    dateEnd,
    isAutor,
    handleStartDateChange,
    setSelectedDate,
    hourStart,
    type,
    handleStartTimeChange,
    setSelectedTime,
    status,
    category
) => {
    const conditionalRendering = () => {

        if (
            (moment(dateStart, 'DD/MM/YYYY').isSameOrBefore(currentDateTime, 'day') ||
                !isAutor)
            ||
            (category === 'task' && status !== 'IN PROGRESS')

        ) {
            return (
                <>
                    <Form.Group className="mb-3">
                        <Form.Label> Début de l'évènement : </Form.Label>
                        <br />
                        <Form.Label> Date </Form.Label>
                        <Form.Control
                            min={moment().format('YYYY-MM-DD')}
                            type="date"
                            defaultValue={type === 'Add' ? '' : moment(dateStart, 'DD/MM/YYYY').format('YYYY-MM-DD')}
                            onChange={e => {
                                handleStartDateChange(e)
                                setSelectedDate(e.target.value)
                            }}
                            onInput={startDates.inputHandler}
                            onBlur={startDates.blurHandler}
                            isInvalid={startDates.hasError}
                            disabled={true}
                            style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
                        />
                        <Form.Control.Feedback type="invalid">{startDates.errorMessage}</Form.Control.Feedback>

                        <Form.Label>Heure </Form.Label>
                        <Form.Control
                            type="time"
                            defaultValue={type === 'Add' ? '' : hourStart}
                            onChange={e => {
                                handleStartTimeChange(e)
                                setSelectedTime(e.target.value)
                            }}
                            onInput={startTimes.inputHandler}
                            onBlur={startTimes.blurHandler}
                            isInvalid={startTimes.hasError}
                            disabled={true}
                            style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
                        />
                        <Form.Control.Feedback type="invalid">{startTimes.errorMessage}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Fin de l'évènement : </Form.Label>
                        <br />

                        <Form.Label> Date </Form.Label>
                        <Form.Control
                            min={moment().format('YYYY-MM-DD')}
                            type="date"
                            defaultValue={type === 'Add' ? '' : moment(dateEnd, 'DD/MM/YYYY').format('YYYY-MM-DD')}
                            onChange={e => {
                                handleEndDateChange(e)
                                setSelectedDate(e.target.value)
                            }}
                            onInput={endDates.inputHandler}
                            onBlur={endDates.blurHandler}
                            isInvalid={endDates.hasError}
                            disabled={true}
                            style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
                        />
                        <Form.Control.Feedback type="invalid">{endDates.errorMessage}</Form.Control.Feedback>

                        <Form.Label>Heure </Form.Label>
                        <Form.Control
                            disabled={true}
                            type="time"
                            defaultValue={type === 'Add' ? '' : hourEnd}
                            onChange={e => {
                                handleEndTimeChange(e)
                                setSelectedTime(e.target.value)
                            }}
                            onInput={endTimes.inputHandler}
                            onBlur={endTimes.blurHandler}
                            isInvalid={endTimes.hasError}
                            style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
                        />
                        <Form.Control.Feedback type="invalid">{endTimes.errorMessage}</Form.Control.Feedback>
                    </Form.Group>
                </>
            )
        }

        return (
            <>
                <Form.Group className="mb-3">
                    <Form.Label> Début de l'évènement : </Form.Label>
                    <br />
                    <Form.Label> Date </Form.Label>
                    <Form.Control
                        min={moment().format('YYYY-MM-DD')}
                        type="date"
                        defaultValue={type === 'Add' ? '' : moment(dateStart, 'DD/MM/YYYY').format('YYYY-MM-DD')}
                        onChange={e => {
                            handleStartDateChange(e)
                            setSelectedDate(e.target.value)
                        }}
                        onInput={startDates.inputHandler}
                        onBlur={startDates.blurHandler}
                        isInvalid={startDates.hasError}
                        disabled={!isAutor}
                        style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
                    />
                    <Form.Control.Feedback type="invalid">{startDates.errorMessage}</Form.Control.Feedback>

                    <Form.Label>Heure </Form.Label>
                    <Form.Control
                        type="time"
                        defaultValue={type === 'Add' ? '' : hourStart}
                        onChange={e => {
                            handleStartTimeChange(e)
                            setSelectedTime(e.target.value)
                        }}
                        onInput={startTimes.inputHandler}
                        onBlur={startTimes.blurHandler}
                        isInvalid={startTimes.hasError}
                        disabled={!isAutor}
                        style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
                    />
                    <Form.Control.Feedback type="invalid">{startTimes.errorMessage}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Fin de l'évènement : </Form.Label>
                    <br />

                    <Form.Label> Date </Form.Label>
                    <Form.Control
                        min={moment().format('YYYY-MM-DD')}
                        type="date"
                        defaultValue={type === 'Add' ? '' : moment(dateEnd, 'DD/MM/YYYY').format('YYYY-MM-DD')}
                        onChange={e => {
                            handleEndDateChange(e)
                            setSelectedDate(e.target.value)
                        }}
                        onInput={endDates.inputHandler}
                        onBlur={endDates.blurHandler}
                        isInvalid={endDates.hasError}
                        disabled={!isAutor}
                        style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
                    />
                    <Form.Control.Feedback type="invalid">{endDates.errorMessage}</Form.Control.Feedback>

                    <Form.Label>Heure </Form.Label>
                    <Form.Control
                        disabled={!isAutor}
                        type="time"
                        defaultValue={type === 'Add' ? '' : hourEnd}
                        onChange={e => {
                            handleEndTimeChange(e)
                            setSelectedTime(e.target.value)
                        }}
                        onInput={endTimes.inputHandler}
                        onBlur={endTimes.blurHandler}
                        isInvalid={endTimes.hasError}
                        style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
                    />
                    <Form.Control.Feedback type="invalid">{endTimes.errorMessage}</Form.Control.Feedback>
                </Form.Group>
            </>

        )
    }

    return conditionalRendering()
}
