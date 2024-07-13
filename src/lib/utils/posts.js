import fs from 'fs';
import path from 'path';

export function getAllPosts() {
    const postsDirectory = path.join(process.cwd(), 'src/lib/data/posts');
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames
        .map(fileName => {
            const slug = fileName.replace(/\.html$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            const metadata = extractMetadata(fileContents);
            const content = stripHtml(fileContents);

            if (metadata.draft) {
                return null;
            }

            return {
                slug,
                title: metadata.title || 'Untitled',
                content: content.trim(),
                date: metadata.date,
                topics: metadata.topics,
                excerpt: metadata.excerpt || content.substring(0, 150) + '...'
            };
        })
        .filter(Boolean)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

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

function stripHtml(html) {
    return html.replace(/<script.*?<\/script>/gs, '')
        .replace(/<[^>]*>/g, '')
        .trim();
}