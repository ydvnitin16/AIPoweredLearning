import { useState } from 'react';
import { toggleMarkAsDone } from '../services/apis';

export function useMarkAsDone() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const markAsDone = async (data) => {
        setLoading(true);
        setError(null);

        try {
            console.log('sending');
            const resData = await toggleMarkAsDone(data)
            console.log(resData);
            return resData.progress; // updated progress object
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { markAsDone, loading, error };
}
