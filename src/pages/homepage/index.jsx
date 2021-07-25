import React, { useEffect, useState } from 'react';

import { Loader } from '../../common';
import { Modes } from '../../const';
import { GoogleApi } from '../../services';
import { getEventsByDay, getEventsByWeek } from '../../utils';
import { EventsCard, Header } from './components';

import './homepage.scss';

export const Homepage = ({ isGapiLoaded }) => {
    const [eventGroups, setEventGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mode, setMode] = useState(Modes.WEEK);

    const getEventGroups = events => {
        switch (mode) {
            case Modes.DAY:
                return [{
                    events,
                    title: "Today"
                }];
            case Modes.WEEK:
                return getEventsByDay(events);
            case Modes.MONTH:
                return getEventsByWeek(events);
            default:
                return [{
                    events,
                    title: ""
                }];
        }
    }

    const getEvents = async dayRange => {
        try {
            const events = await GoogleApi.getEvents(dayRange);
            setEventGroups(getEventGroups(events));
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const onEventDelete = async eventId => {
        try {
            setIsLoading(true);
            await GoogleApi.deleteEvent(eventId);
            getEvents(mode);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isGapiLoaded)
            getEvents(mode);
    }, [isGapiLoaded, mode]);

    return (
        <div className="page">
            <Header
                mode={mode}
                onModeChange={setMode}
            />
            {isLoading
                ? <Loader />
                :
                <>
                    {eventGroups.map(eventGroup =>
                        <EventsCard
                            events={eventGroup.events}
                            key={eventGroup.title}
                            title={eventGroup.title}
                            onEventDelete={onEventDelete}
                        />
                    )}
                </>
            }
        </div>
    );
}
