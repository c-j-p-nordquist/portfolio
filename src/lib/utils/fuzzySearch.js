export function fuzzySearch(items, query, keys) {
    const fuse = new FuzzySearch(items, keys);
    return fuse.search(query);
}

class FuzzySearch {
    constructor(items, keys) {
        this.items = items;
        this.keys = keys;
    }

    search(query) {
        if (!query) return this.items.map(item => ({ item, matches: [] }));

        const words = query.toLowerCase().split(/\s+/).filter(word => word.length > 1);

        return this.items
            .map(item => {
                const matches = this.keys.flatMap(key => {
                    const value = item[key];
                    if (Array.isArray(value)) {
                        return value.flatMap(v => this.findMatches(v, words, key));
                    }
                    return this.findMatches(value, words, key);
                });
                return { item, matches, score: this.calculateScore(matches, words) };
            })
            .filter(({ score }) => score > 0.5) // Adjust this threshold as needed
            .sort((a, b) => b.score - a.score);
    }

    findMatches(text, words, key) {
        if (typeof text !== 'string') return [];

        const lowercaseText = text.toLowerCase();
        let matches = [];

        words.forEach(word => {
            let lastIndex = 0;
            while (true) {
                const index = lowercaseText.indexOf(word, lastIndex);
                if (index === -1) break;

                if (index > lastIndex) {
                    matches.push({ text: text.slice(lastIndex, index), matches: false, key });
                }
                matches.push({ text: text.slice(index, index + word.length), matches: true, key });
                lastIndex = index + word.length;
            }
            if (lastIndex < text.length) {
                matches.push({ text: text.slice(lastIndex), matches: false, key });
            }
        });

        // Merge adjacent matches
        matches = matches.reduce((acc, curr) => {
            if (acc.length === 0 || acc[acc.length - 1].matches !== curr.matches) {
                acc.push(curr);
            } else {
                acc[acc.length - 1].text += curr.text;
            }
            return acc;
        }, []);

        return matches;
    }

    calculateScore(matches, words) {
        const matchedChars = matches.filter(m => m.matches).reduce((sum, m) => sum + m.text.length, 0);
        const totalChars = words.join('').length;
        return matchedChars / totalChars;
    }
}