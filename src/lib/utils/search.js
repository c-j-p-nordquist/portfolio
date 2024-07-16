import FlexSearch from 'flexsearch';

let postsIndex;
let posts;
let indexCreated = false;

export function createPostsIndex(data) {
    postsIndex = new FlexSearch.Index({ tokenize: 'forward' });
    data.forEach((post, i) => {
        postsIndex.add(i, `${post.title} ${post.description || ''}`);
    });
    posts = data;
    indexCreated = true;
}

export function searchPostsIndex(searchTerm) {
    if (!indexCreated) {
        console.warn('Search index not created. Call createPostsIndex first.');
        return [];
    }
    const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const results = postsIndex.search(match);
    return results
        .map((index) => posts[index])
        .map(({ slug, title, description }) => ({
            slug,
            title: replaceTextWithMarker(title, match),
            description: description ? getMatches(description, match) : '',
        }));
}

export function isIndexCreated() {
    return indexCreated;
}

function replaceTextWithMarker(text, match) {
    const regex = new RegExp(match, 'gi');
    return text.replace(regex, (match) => `<mark>${match}</mark>`);
}

function getMatches(text, searchTerm, limit = 1) {
    const regex = new RegExp(searchTerm, 'gi');
    const indexes = [];
    let matches = 0;
    let match;
    while ((match = regex.exec(text)) !== null && matches < limit) {
        indexes.push(match.index);
        matches++;
    }
    return indexes.map((index) => {
        const start = Math.max(index - 20, 0);
        const end = Math.min(index + 80, text.length);
        const excerpt = text.substring(start, end).trim();
        return `...${replaceTextWithMarker(excerpt, searchTerm)}...`;
    });
}