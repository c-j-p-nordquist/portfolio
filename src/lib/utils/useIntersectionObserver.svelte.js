export const useIntersectionObserver = (options = { threshold: 0.5 }) => {
    let ref = $state();
    let observed = $state(false);
    let observer = $state(null);

    $effect(() => {
        if (ref) {
            observer = new IntersectionObserver(([entry]) => {
                observed = entry.isIntersecting;
            }, options);

            observer.observe(ref);

            return () => {
                if (observer) observer.disconnect();
            };
        }
    });

    return {
        get observed() {
            return observed;
        },
        get ref() {
            return ref;
        },
        set ref(element) {
            ref = element;
        },
    };
};
