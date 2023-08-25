import {Form } from 'react-bootstrap'

export const conditionalRenderingLessonStatus = (status, handelStatusChange) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Status : </Form.Label>
            <Form.Select defaultValue={status} onChange={handelStatusChange}>
                <option key={1} value='CONFIRMED'>
                    CONFIRMED
                </option>
                <option key={2} value='DONE'>
                    DONE
                </option>
                <option key={3} value='CANCELLED'>
                    CANCELLED
                </option>
                <option key={4} value='ABSENCE'>
                    ABSENCE
                </option>
            </Form.Select>
        </Form.Group>
    )
}
export default{
    conditionalRenderingLessonStatus
}