import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import EventDetailModal from '../components/EventDetailModal';
import './EventsPage.css';

const EventsPage: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/events?populate=*');
                const formattedEvents = response.data.data.map((item: any) => ({
                    id: item.id,
                    title: item.attributes?.name || 'No Title',
                    description: item.attributes?.description || 'No description',
                    image: item.attributes?.image?.data?.attributes?.url
                        ? `http://localhost:1337${item.attributes.image.data.attributes.url}`
                        : 'https://via.placeholder.com/300x200',
                    eventType: item.attributes?.eventType || 'N/A',
                    language: item.attributes?.language || 'N/A',
                    start: item.attributes?.start || '',
                    end: item.attributes?.end || '',
                    location: item.attributes?.location || 'N/A',
                    capacity: item.attributes?.capacity || 'N/A',
                    website: item.attributes?.website || '',
                    accessibilityNeeds: item.attributes?.accessibility_needs || [],
                }));
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Error loading events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <p className="loading-text">Loading events...</p>;
    }

    if (!events.length) {
        return <p className="no-events-text">No events found.</p>;
    }

    return (
        <div className="events-page">
            <h2>Events</h2>
            <div className="events-grid">
                {events.map(event => (
                    <EventCard
                        key={event.id}
                        event={event}
                        onClick={() => setSelectedEvent(event)}
                    />
                ))}
            </div>

            {selectedEvent && (
                <EventDetailModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
};

export default EventsPage;
