// src/routes/api/send-email/+server.js
import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';

// Load environment variables
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

export async function POST({ request }) {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
        return json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return json({ success: false, message: 'Invalid email address' }, { status: 400 });
    }

    // Create a transporter
    let transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465, // true for 465, false for other ports
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    try {
        // Send email
        await transporter.sendMail({
            from: `"Contact Form" <${SMTP_USER}>`,
            to: RECIPIENT_EMAIL,
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `<h2>New Contact Form Submission</h2>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <h3>Message:</h3>
                   <p>${message.replace(/\n/g, '<br>')}</p>`
        });

        return json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return json({ success: false, message: 'Failed to send message' }, { status: 500 });
    }
}