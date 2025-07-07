import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

interface ImageFormat {
    url: string;
}

interface ImageItem {
    id: number;
    url: string;
    formats?: {
        medium?: ImageFormat;
        small?: ImageFormat;
        thumbnail?: ImageFormat;
    };
}

interface EventData {
    id: number;
    name?: string;
    title?: string;
    description?: string;
    eventType?: string;
    language?: string;
    start?: string;
    end?: string;
    capacity?: number;
    website?: string;
    image?: ImageItem[];
}

const EventDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`http://localhost:1337/api/events?filters[id][$eq]=${id}&populate=*`);
                if (res.data.data && res.data.data.length > 0) {
                    setEvent(res.data.data[0]);
                } else {
                    setEvent(null);
                }
            } catch (err) {
                console.error('Error loading event:', err);
                setEvent(null);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) return <p style={{ textAlign: 'center' }}>Loading event...</p>;
    if (!event) return <p style={{ textAlign: 'center' }}>Event not found.</p>;

    const title = event.name || event.title || 'No Title';
    const description = event.description || 'No description';

    // Получаем URL изображения
    const imageUrl = event.image && event.image.length > 0
        ? `http://localhost:1337${event.image[0].url}`
        : null;

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
            <h2>{title}</h2>

            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={title}
                    style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
                />
            )}

            <p>{description}</p>

            <p><strong>Type:</strong> {event.eventType || 'N/A'}</p>
            <p><strong>Language:</strong> {event.language || 'N/A'}</p>
            <p><strong>Start:</strong> {event.start ? new Date(event.start).toLocaleString() : 'N/A'}</p>
            <p><strong>End:</strong> {event.end ? new Date(event.end).toLocaleString() : 'N/A'}</p>

            {event.website && (
                <p>
                    <strong>Website:</strong>{' '}
                    <a href={event.website} target="_blank" rel="noopener noreferrer">
                        {event.website}
                    </a>
                </p>
            )}

            <Link to="/events">Back to Events</Link>
        </div>
    );
};

export default EventDetailPage;
