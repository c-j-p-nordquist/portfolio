import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

const patterns = {
    script: /<script.*?<\/script>/gs,
    tags: /<[^>]*>/g,
};

function stripHtml(html) {
    for (const pattern in patterns) {
        html = html.replace(patterns[pattern], '');
    }
    return html.trim();
}

export const prerender = true;

export async function GET() {
    const postsDirectory = path.join(process.cwd(), 'src/lib/data/posts');
    const fileNames = fs.readdirSync(postsDirectory);

    const posts = fileNames
        .map(fileName => {
            const slug = fileName.replace(/\.html$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const content = fs.readFileSync(fullPath, 'utf8');

            const metadataMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
            let metadata = {};
            if (metadataMatch && metadataMatch[1]) {
                try {
                    metadata = JSON.parse(metadataMatch[1]);
                } catch (e) {
                    console.error(`Error parsing metadata for ${slug}:`, e);
                }
            }

            if (metadata.draft) {
                return null;
            }

            return {
                title: metadata.title || 'Untitled',
                slug,
                content: stripHtml(content),
            };
        })
        .filter(Boolean);

    return json(posts);
}