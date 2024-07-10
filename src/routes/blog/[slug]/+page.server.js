import fs from 'fs';
import path from 'path';
import { error } from '@sveltejs/kit';

function extractMetadata(content) {
    const match = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (match && match[1]) {
        try {
            return JSON.parse(match[1]);
        } catch (e) {
            console.error('Error parsing metadata:', e);
        }
    }
    return {};
}

export function load({ params }) {
    const { slug } = params;
    const postsDirectory = path.join(process.cwd(), 'src/lib/data/posts');
    const fullPath = path.join(postsDirectory, `${slug}.html`);

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const metadata = extractMetadata(fileContents);
        const content = fileContents.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');

        return {
            post: {
                slug,
                content,
                ...metadata
            }
        };
    } catch (err) {
        throw error(404, `Could not find post ${slug}`);
    }
}