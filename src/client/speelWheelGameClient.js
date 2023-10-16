const FIREBASE_ENDPOINT = 'https://asiagame-48d9c-default-rtdb.europe-west1.firebasedatabase.app/';

 const fetchData = async (path) => {
    const response = await fetch(`${FIREBASE_ENDPOINT}${path}.json`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

 const postData = async (path, data) => {
    const response = await fetch(`${FIREBASE_ENDPOINT}${path}.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const updateData = async ({path, updateData}) => {
    const response = await fetch(`${FIREBASE_ENDPOINT}${path}.json`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const gameClient = {
    postData,
    fetchData,
    updateData,
}
