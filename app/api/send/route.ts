import { NextRequest, NextResponse } from 'next/server';
import EmailTemplate from '@/app/utils/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXTJS_RESENT_API);

export async function POST(req: NextRequest) {
  try {
    const { id, name, email, guestNumber } = await req.json();

    // Pick the first word from the right side of the name as last name, the remaining as first name
    const [firstName, lastName] = name.split(' ').reverse();

    // Create the email content using the template
    const emailHtml = EmailTemplate({
        recipientName: name, 
        eventName: 'Event Name', 
        eventDate: 'Event Date', 
        eventLocation: 'Event Location',
        guestNumber,
        url: `localhost:3000/invitation/${id}`,
    });

    // Create a new domain
    resend.domains.create({ name: 'betterattendance.com' });

    // Send the email
    const { data, error } = await resend.emails.send({
      from: 'noreply@betterattendance.com', // Replace with your verified domain email
      to: email,
      subject: 'You are invited!',
      react: emailHtml, // If EmailTemplate returns React JSX, adjust this accordingly
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully', data });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
