/**
 * Converts a given timestamp (ISO string or Unix epoch) into a friendly,
 * relative time string (e.g., "5 minutes ago", "2 weeks ago").
 * * @param {string | number} date - The timestamp to compare against the current time.
 * @returns {string} The formatted relative time string.
 */
export const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 0) {
        return "just now";
    }

    let interval = Math.floor(seconds / 31536000); // 365 * 24 * 60 * 60

    if (interval >= 1) {
        return interval + (interval === 1 ? " year ago" : " years ago");
    }
    
    interval = Math.floor(seconds / 2592000); // 30 * 24 * 60 * 60
    if (interval >= 1) {
        return interval + (interval === 1 ? " month ago" : " months ago");
    }

    interval = Math.floor(seconds / 604800); // 7 * 24 * 60 * 60
    if (interval >= 1) {
        return interval + (interval === 1 ? " week ago" : " weeks ago");
    }

    interval = Math.floor(seconds / 86400); // 24 * 60 * 60
    if (interval >= 1) {
        return interval + (interval === 1 ? " day ago" : " days ago");
    }

    interval = Math.floor(seconds / 3600); // 60 * 60
    if (interval >= 1) {
        return interval + (interval === 1 ? " hour ago" : " hrs ago");
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval + (interval === 1 ? " minute ago" : " min ago");
    }

    return Math.floor(seconds) + (seconds <= 10 ? " secs ago" : " secs ago");
};
