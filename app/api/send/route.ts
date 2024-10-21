import { NextRequest, NextResponse } from 'next/server';
import EmailTemplate from '@/app/utils/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXTJS_RESENT_API);

export async function POST(req: NextRequest) {
  try {
    const { id, name, email, guestNumber } = await req.json();

    // Create the email content using the template
    const emailHtml = EmailTemplate({
        recipientName: name, 
        eventName: 'Event Name', 
        eventDate: 'Event Date', 
        eventLocation: 'Event Location',
        guestNumber,
        url: `localhost:3000/invitation/${id}`,
    });

    const { data, error } = await resend.emails.send({
      from: 'Event Team <onboarding@resend.dev>',
      to: email,
      subject: 'You are invited!',
      react: emailHtml,
    });

    if (error) {
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
