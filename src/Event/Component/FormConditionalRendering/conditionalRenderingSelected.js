import {Form } from 'react-bootstrap'

export const conditionalRenderingSelected = (selectedCategory, getContactByRoleCategoryData, selectedEmployee, handleEmployeeChange, isValid) => {


    return (

        <Form.Group className="mb-3">

            <Form.Label> {selectedCategory==='task'? 'Employé' : selectedCategory==='lesson'? 'Client' : ''} </Form.Label>
            <Form.Select disabled={isValid} defaultValue={selectedEmployee} onChange={handleEmployeeChange}>
                {getContactByRoleCategoryData &&
                    getContactByRoleCategoryData.map((value, index) => (
                        <option key={index} value={value.userId}>
                            {value.firstName}  {value.lastName}
                        </option>
                    ))}
            </Form.Select>
        </Form.Group>

    )

}
export default {
    conditionalRenderingSelected
}