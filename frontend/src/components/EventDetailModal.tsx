import React from 'react';

interface EventDetailModalProps {
    event: any;
    onClose: () => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
    if (!event) return null;

    const imageSrc = event.image || '';
    const title = event.title || event.name || 'No Title';
    const description = event.description || 'No description';
    const eventType = event.eventType || 'N/A';
    const language = event.language || 'N/A';
    const start = event.start ? new Date(event.start).toLocaleString() : 'N/A';
    const end = event.end ? new Date(event.end).toLocaleString() : 'N/A';
    const venue = event.location || 'N/A';
    const capacity = event.capacity || 'N/A';
    const website = event.website || '';

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>

                {imageSrc && (
                    <img src={imageSrc} alt={title} className="modal-image" />
                )}

                <p>{description}</p>

                <p><strong>Event Type:</strong> {eventType}</p>
                <p><strong>Language:</strong> {language}</p>
                <p><strong>Start Time:</strong> {start}</p>
                <p><strong>End Time:</strong> {end}</p>

                <h4>Location</h4>
                <p><strong>Venue:</strong> {venue}</p>
                <p><strong>Capacity:</strong> {capacity}</p>
                {website && (
                    <p>
                        <strong>Website:</strong>{' '}
                        <a href={website} target="_blank" rel="noreferrer">{website}</a>
                    </p>
                )}

                <h4>Accessibility Needs</h4>
                <div className="accessibility-icons">
                    {event.accessibilityNeeds?.length > 0 ? (
                        event.accessibilityNeeds.map((need: any, index: number) => (
                            <div key={index} className="access-item">
                                <img src={need.icon} alt={need.label} />
                                <span>{need.label}</span>
                            </div>
                        ))
                    ) : (
                        <p>No Accessibility Needs</p>
                    )}
                </div>

                <button onClick={onClose}>CLOSE</button>
            </div>
        </div>
    );
};

export default EventDetailModal;
