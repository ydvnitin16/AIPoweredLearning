import { useState } from 'react';
import { toast } from 'react-hot-toast';

export const useClipboard = () => {
    const [copied, setCopied] = useState(false);

    const copy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            toast.success('Copied to Clipboard share this and import');
            setTimeout(() => setCopied(false), 10000);
        } catch (err) {
            toast.error('Failed to copy');
        }
    };

    return { copied, copy };
};
