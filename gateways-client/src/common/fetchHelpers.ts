export const fetchPost = async (url: string, body: any) => {
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    });
};

export const fetchGet = async (url: string) => {
    return await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
};

export const fetchPut = async (url: string, body: any) => {
    return await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    });
};