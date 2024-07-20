export function createFilter() {
    let isOpen = $state(false);
    let selectedTopics = $state([]);

    function toggleTopic(topic) {
        if (selectedTopics.includes(topic)) {
            selectedTopics = selectedTopics.filter(t => t !== topic);
        } else {
            selectedTopics = [...selectedTopics, topic];
        }
    }

    function clearFilters() {
        selectedTopics = [];
    }

    return {
        isOpen,
        selectedTopics,
        toggleTopic,
        clearFilters,
        toggleOpen: () => isOpen = !isOpen
    };
}