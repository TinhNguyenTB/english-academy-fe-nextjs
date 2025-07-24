import { useEffect, useState } from 'react';

/**
 * Returns true if the component has been mounted (client-side).
 */
export function useHasMounted(): boolean {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
}
