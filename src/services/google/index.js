import { CLIENT_ID, DISCOVERY_DOCS, SCOPE } from "../../const";

export const createEvent = async event => {
    if (!(await isUserSignedIn()))
        window.location.assign('/');

    return window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        ...event
    });
}

export const deleteEvent = async eventId => {
    if (!(await isUserSignedIn()))
        window.location.assign('/');

    return window.gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId
    });
}

export const getEvent = async eventId => {
    if (!(await isUserSignedIn()))
        window.location.assign('/');

    const response = await window.gapi.client.calendar.events.get({
        calendarId: 'primary',
        eventId
    });

    return response.result;
}

export const getEvents = async dayRange => {
    if (!(await isUserSignedIn()))
        window.location.assign('/');

    const timeMin = new Date();
    timeMin.setHours(0, 0, 0, 0);
    const timeMax = new Date();
    timeMax.setDate(timeMin.getDate() + dayRange);
    timeMax.setHours(0, 0, 0, 0);

    const response = await window.gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime'
    });

    return response.result.items;
}

export const init = isLoaded => {
    window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPE,
        })
        .then(() => isLoaded(true))
        .catch(error => console.error("Error loading GAPI client for API", error));
    });
}

export const isUserSignedIn = async () => {
    try {
        const auth = await window.gapi.auth2.getAuthInstance();
        return auth.isSignedIn.get();
    } catch {
        return false;
    }
}

export const updateEvent = async (event, eventId) => {
    if (!(await isUserSignedIn()))
        window.location.assign('/');

    return window.gapi.client.calendar.events.update({
        calendarId: 'primary',
        eventId,
        ...event
    });
}
