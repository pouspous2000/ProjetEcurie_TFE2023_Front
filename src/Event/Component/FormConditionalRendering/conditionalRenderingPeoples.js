import { Form } from "react-bootstrap"
export const conditionalRenderingPeople = (creator, participants, category, client, employee) => {
    const RoleDisplayByType= ()=>{
        if (category === 'competition' || category === 'event') {
            if (participants.length === 0) {
                return (
                    <div>Il n'y a pas encore de participants pour cet évènement</div>
                )
            }
            return (
                <>
                    {participants.map(participant => (
                        <div key={participant.userId}>
                            <p>
                                - {participant.firstName} {participant.lastName}
                            </p>
                        </div>
                    ))}
                </>
            );
        } else if (category === 'lesson') {
            return (
                <div key={client.id}>
                    <p>
                        - {client.firstName} {client.lastName}
                    </p>
                </div>
            )

        } else if (category === 'task') {
            return (
                <div key={employee.userId}>
                    <p>
                        - {employee.firstName} {employee.lastName}
                    </p>
                </div>
            )

        }
    }
        return (

            <Form.Group>
                <Form.Label style={{ textDecoration: 'underline' }}> Créateur : </Form.Label>
                <div>
                    <p>
                        {creator.firstName} {creator.lastName}
                    </p>
                </div>

                <Form.Label style={{ textDecoration: 'underline' }}> Participants : </Form.Label>
                {RoleDisplayByType()}
            </Form.Group>

        )
}

export default {
    conditionalRenderingPeople
}
