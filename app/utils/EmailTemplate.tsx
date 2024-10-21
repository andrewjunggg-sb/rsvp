import React from 'react';

interface EmailTemplateProps {
    recipientName: string;
    eventName: string;
    eventDate: string;
    eventLocation: string;
    guestNumber: number;
    url: string;
}

// HTML template for the email
const EmailTemplate: React.FC<EmailTemplateProps> = ({ recipientName, eventName, eventDate, eventLocation, guestNumber, url }) => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
            <h2>Hello {recipientName}, party of {guestNumber}</h2>
            <p>
                You are invited to the <strong>{eventName}</strong>!
            </p>
            <p>
                <strong>Date:</strong> {eventDate}
            </p>
            <p>
                <strong>Location:</strong> {eventLocation}
            </p>
            <p>
                Please access the link below to confirm if you can attend: <br />
                {url}
            </p>
            <p>Best regards,</p>
            <p>Your Event Team</p>
        </div>
    );
};

export default EmailTemplate;
