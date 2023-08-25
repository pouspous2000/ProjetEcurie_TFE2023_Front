import { getFormattedDateTime } from "../ModalGenericUtils";
export const addHandler = (getContactByRoleCategoryData, selectedCategory, addEvent, addTask, addCompetition, addLesson, name, description, startDate, startTime, endDate, endTime, remarkTask, selectedEmployee ) => {

    if (selectedCategory === 'event') {
        addEvent({
            name: name,
            description: description,
            startingAt: getFormattedDateTime(startDate, startTime),
            endingAt: getFormattedDateTime(endDate, endTime),
            participants: []
        });

    } else if (selectedCategory === 'task') {
        const getIdEmploee = getContactByRoleCategoryData && getContactByRoleCategoryData.find(employee => `${employee.firstName} ${employee.lastName}` === selectedEmployee)
        addTask({
            employeeId: getIdEmploee.id,
            name: name,
            description: description,
            startingAt: getFormattedDateTime(startDate, startTime),
            endingAt: getFormattedDateTime(endDate, endTime),
            remark: remarkTask,
        })

    } else if (selectedCategory === 'competition') {
        addCompetition({
            name: name,
            description: description,
            startingAt: getFormattedDateTime(startDate, startTime),
            endingAt: getFormattedDateTime(endDate, endTime),
            participants: [],
        })

    } else if (selectedCategory === 'lesson') {
        const getIdEmploee = getContactByRoleCategoryData && getContactByRoleCategoryData.find(employee => `${employee.firstName} ${employee.lastName}` === selectedEmployee)
        addLesson({
            clientId: getIdEmploee.id,
            startingAt: getFormattedDateTime(startDate, startTime),
            endingAt: getFormattedDateTime(endDate, endTime),
        })
    }
}

export default{
    addHandler

}
