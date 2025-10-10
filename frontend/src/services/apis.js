async function getRequest(url) {
    const res = await fetch(url, {
        credentials: 'include',
    });
    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Failed to fetch data');
    }
    return await res.json();
}

async function putRequest(url, data) {
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'something went wrong!');
    }
    return await res.json();
}

async function postRequest(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'something went wrong!');
    }
    return await res.json();
}

async function deleteRequest(url, data = null) {
    const options = {
        method: 'DELETE',
        credentials: 'include',
    };

    if (data !== null && data !== undefined) {
        options.headers = {
            'Content-Type': 'application/json',
        };
        options.body = JSON.stringify(data);
    }

    const res = await fetch(url, options);
    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Failed to Logout');
    }
    return await res.json();
}

export { getRequest, postRequest, putRequest, deleteRequest };
