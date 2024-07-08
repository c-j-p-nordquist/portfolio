export function load({ params }) {
    // In a real application, you would fetch the blog post data from a database or API
    // For now, we'll just return some dummy data
    return {
        post: {
            slug: params.slug,
            title: 'Sample Blog Post',
            date: '2023-12-01',
            topics: ['Sample', 'Test'],
            content: '<p>This is a sample blog post content. In a real application, this would be the full content of your blog post.</p>'
        }
    };
}