import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const { name, email, message } = await request.json();

        // Here you would typically send an email or save to a database
        // For this example, we'll just log the data
        console.log('Contact form submission:', { name, email, message });

        // TODO: Add your email sending or database saving logic here

        return json({ success: true, message: 'Message sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error processing contact form:', error);
        return json({ success: false, message: 'Failed to send message' }, { status: 500 });
    }
}