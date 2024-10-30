const webLocalStorage = {
    set<T>(key: string, rawValue: T): void {
        localStorage.setItem(key, JSON.stringify(rawValue));
    },

    get<T>(key: string): T | null {
        const rawData = localStorage.getItem(key);
        return rawData ? (JSON.parse(rawData) as T) : null;
    },

    remove(key: string): void {
        localStorage.removeItem(key);
    },
};

export default webLocalStorage;
