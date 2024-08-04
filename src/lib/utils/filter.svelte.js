import { goto } from '$app/navigation';

let selectedTopics = $state([]);
let selectedType = $state('all');
let allTopics = $state([]);
let items = $state([]);
let filteredItems = $derived(applyFilters(items, selectedTopics, selectedType));

function initializeFilters(posts, urlParams) {
    items = posts;
    selectedType = urlParams.get('type') || 'all';
    selectedTopics = urlParams.getAll('topic');
    allTopics = [...new Set(posts.flatMap((item) => item.topics || []))];
}

function applyFilters(items, topics, type) {
    return items.filter((item) => {
        const topicMatch =
            topics.length === 0 ||
            (item.topics && item.topics.some((topic) => topics.includes(topic)));
        const typeMatch = type === 'all' || item.type === type;
        return topicMatch && typeMatch;
    });
}

function toggleTopic(topic) {
    selectedTopics = selectedTopics.includes(topic)
        ? selectedTopics.filter((t) => t !== topic)
        : [...selectedTopics, topic];
    updateUrl();
}

function toggleType(type) {
    selectedType = type === selectedType ? 'all' : type;
    updateUrl();
}

function clearFilters() {
    selectedTopics = [];
    selectedType = 'all';
    updateUrl();
}

function updateUrl() {
    const params = new URLSearchParams();
    if (selectedType !== 'all') params.append('type', selectedType);
    selectedTopics.forEach((t) => params.append('topic', t));
    goto(`?${params.toString()}`, { replaceState: true, noscroll: true, keepfocus: true });
}

// Getter functions for state
function getSelectedTopics() {
    return selectedTopics;
}

function getSelectedType() {
    return selectedType;
}

function getAllTopics() {
    return allTopics;
}

function getFilteredItems() {
    return filteredItems;
}

export {
    initializeFilters,
    toggleTopic,
    toggleType,
    clearFilters,
    getSelectedTopics,
    getSelectedType,
    getAllTopics,
    getFilteredItems
};