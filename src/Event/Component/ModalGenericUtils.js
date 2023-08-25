import moment from 'moment'

export const getFormattedDateTime = (date, time) => {
    const formattedTime = moment(time, 'HH:mm').subtract(2, 'hours').format('HH:mm:ss')
    return `${date}T${formattedTime}.000Z`
}



export default {

    getFormattedDateTime,

}