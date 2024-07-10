import fs from 'fs';
import path from 'path';

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

export function load() {
    const postsDirectory = path.join(process.cwd(), 'src/lib/data/posts');
    const fileNames = fs.readdirSync(postsDirectory);

    const posts = fileNames.map(fileName => {
        const slug = fileName.replace(/\.html$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const metadata = extractMetadata(fileContents);

        return {
            slug,
            ...metadata
        };
    });

    return {
        posts: posts.sort((a, b) => new Date(b.date) - new Date(a.date))
    };
}