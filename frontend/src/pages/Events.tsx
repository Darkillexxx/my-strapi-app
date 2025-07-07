import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Events: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:1337/api/events?populate=*')
            .then(res => setEvents(res.data.data))
            .catch(err => console.error('Error loading events:', err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p style={{ textAlign: 'center' }}>Loading...</p>;
    }

    if (!events.length) {
        return <p style={{ textAlign: 'center' }}>No events found.</p>;
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
            <h2>Events</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {events.map((event) => (
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
                        <h3>{event.attributes?.name || 'No Title'}</h3>
                        <p>{event.attributes?.description || 'No description'}</p>
                        <Link to={`/event/${event.id}`}>Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Events;
