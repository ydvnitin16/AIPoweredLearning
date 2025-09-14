async function fetchData(url) {
    const res = await fetch(url, {
        credentials: 'include',
    });
    if (!res.ok) {
        const { message } = await res.json();
        console.log(message);
        throw new Error(message || 'Failed to fetch data');
    }
    return await res.json();
}

async function publicToggle(formatted) {
    const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/subjects/public`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formatted),
        }
    );
    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Failed to toggle Public');
    }
    return await res.json();
}

async function createSubject(data) {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/subjects`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Failed to create subject');
    }
    return await res.json();
}

async function updateProfile(data) {
    const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/update-profile`,
        {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    );
    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Failed to Update Profile');
    }
    return await res.json();
}
async function importSubject(data) {
    const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/subjects/import`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        }
    );
    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Failed to Import Subject');
    }
    return await res.json();
}

async function generateTopic(data) {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/topics`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Failed to Import Subject');
    }
    return await res.json();
}

async function logoutUser() {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Failed to Logout');
    }
    return await res.json();
}

async function generateSuggestions(data){
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/subjects/suggestions`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Failed to Generate Suggestions');
    }
    return await res.json();
}

export {
    fetchData,
    publicToggle,
    createSubject,
    updateProfile,
    importSubject,
    generateTopic,
    logoutUser,
    generateSuggestions
};
