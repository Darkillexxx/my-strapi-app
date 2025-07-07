import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface EventItem {
    id: number;
    name?: string;
    description?: string;
    image?: any;
}

const EventListPage: React.FC = () => {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:1337/api/events?populate=*');
                setEvents(res.data.data || []);
            } catch (err) {
                console.error('Error loading events:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <p style={{ textAlign: 'center' }}>Loading events...</p>;
    if (!events || events.length === 0) return <p style={{ textAlign: 'center' }}>No events found.</p>;

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
            <h2>Events</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {events.map(event => (
                    <li
                        key={event.id}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '1rem',
                            marginBottom: '1rem',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                    >
                        <h3>{event.name || 'No Title'}</h3>
                        <p>{event.description || 'No description'}</p>
                        <Link to={`/event/${event.id}`}>Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventListPage;
