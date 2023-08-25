import {Form } from 'react-bootstrap'
export const conditionalRenderingTaskStatus =  (creatorId, employeeId, type, status,handelStatusChange)  => {
    if (creatorId === 1 && type !== 'Add') {

        return (
            <Form.Group className="mb-3">
                <Form.Label>Status : </Form.Label>
                <Form.Select defaultValue={status} onChange={handelStatusChange}>
                    <option key={5} value={status}>
                        {status}
                    </option>
                    <option key={6} value='CANCELLED'>
                        CANCELLED
                    </option>
                </Form.Select>
            </Form.Group>
        )

    } else if (employeeId === 3) {
        if (status === 'PENDING') {
            return (
                <Form.Group className="mb-3">
                    <Form.Label>Status : </Form.Label>
                    <Form.Select defaultValue={status} onChange={handelStatusChange}>
                        <option key={5} value={status}>
                            {status}
                        </option>
                        <option key={6} value='CONFIRMED'>
                            CONFIRMED
                        </option>
                    </Form.Select>
                </Form.Group>
            )
        } else if (status === 'CONFIRMED') {
            return (
                <Form.Group className="mb-3">
                    <Form.Label>Status : </Form.Label>
                    <Form.Select defaultValue={status} onChange={handelStatusChange}>
                        <option key={5} value={status}>
                            {status}
                        </option>
                        <option key={6} value='IN PROGRESS'>
                            IN PROGRESS
                        </option>
                        <option key={7} value='BLOCKED'>
                            BLOCKED
                        </option>
                    </Form.Select>
                </Form.Group>

            )
        } else if (status === 'IN PROGRESS') {
            return (
                <Form.Group className="mb-3">
                    <Form.Label>Status : </Form.Label>
                    <Form.Select defaultValue={status} onChange={handelStatusChange}>
                        <option key={5} value={status}>
                            {status}
                        </option>
                        <option key={6} value='IN PROGRESS'>
                            IN PROGRESS
                        </option>
                        <option key={7} value='BLOCKED'>
                            BLOCKED
                        </option>
                    </Form.Select>
                </Form.Group>

            )
        } else if (status === 'BLOCKED') {
            return (
                <Form.Group className="mb-3">
                    <Form.Label>Status : </Form.Label>
                    <Form.Select defaultValue={status} onChange={handelStatusChange}>
                        <option key={5} value={status}>
                            {status}
                        </option>
                        <option key={6} value='COMPLETED'>
                            COMPLETED
                        </option>

                    </Form.Select>
                </Form.Group>

            )
        }
    }
}
export default {

    conditionalRenderingTaskStatus
}
