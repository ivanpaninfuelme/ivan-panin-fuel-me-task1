import fetch from "node-fetch";

export async function fetchData<T>(url: string): Promise<T> {
    
    try {

        const response = await fetch(url);

        if(!response.ok) {
            throw new Error("Unsuccessful fetch from " + url  + "; Error code: " + response.status);
        }
        const data = await response.json();
        return data as T;

    } catch (err: any) {
        throw new Error("For: " + url + "} we got general fetch error: " + err.message);
    }
}