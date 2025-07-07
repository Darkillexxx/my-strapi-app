import React from 'react';

interface EventCardProps {
    event: any;
    onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
    return (
        <div className="event-card" onClick={onClick}>
            <img src={event.image} alt={event.title} className="event-image" />
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <button className="details-button">DETAILS</button>
        </div>
    );
};

export default EventCard;
