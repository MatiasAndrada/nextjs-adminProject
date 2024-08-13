// lib/cache.ts

let cachedCommit: { author: string; date: string } | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos en milisegundos

export async function fetchLastCommit() {
    if (cachedCommit && lastFetchTime && Date.now() - lastFetchTime < CACHE_DURATION) {
        return cachedCommit;
    }

    try {
        const response = await fetch(
            "https://api.github.com/repos/matiasandrada/nextjs-adminProject/commits/master"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const commitData = {
            author: data.commit.author.name,
            date: data.commit.author.date,
        };

        cachedCommit = commitData;
        lastFetchTime = Date.now();

        return commitData;
    } catch (error) {
        console.error(error);
        return null;
    }
}
