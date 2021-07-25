import _ from 'lodash';

const getEventGroups = dict => {
    const eventGroups = [];

    for (const key in dict) {
        eventGroups.push({
            events: dict[key],
            title: key
        });
    }

    return eventGroups;
}

export const getEventsByDay = events => {
    const eventsByDay = _.groupBy(events, e => {
        const date = new Date(e.start.dateTime);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    return getEventGroups(eventsByDay);
}

export const getEventsByWeek = events => {
    const eventsByWeek = _.groupBy(events, e => {
        const date = new Date(e.start.dateTime);
        const week = getWeekOfMonth(date);
        return `${date.getMonth() + 1}/Week ${week}`;
    });

    return getEventGroups(eventsByWeek);
}

const getWeekOfMonth = date => {
    const firstDayOfMonth = new Date(date);
    firstDayOfMonth.setDate(1);
    const offsetDate = date.getDate() + (firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1) - 1;
    return Math.floor(offsetDate / 7) + 1;
}
