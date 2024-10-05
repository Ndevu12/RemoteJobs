function transformTime(timestamp: string | number | Date) {
    const currentTime = new Date();
    const targetTime = new Date(timestamp);

    if (isNaN(targetTime.getTime())) {
        throw new Error('Invalid timestamp');
    }

    const timeDifference = Math.floor((currentTime.getTime() - targetTime.getTime()) / 1000);

    if (timeDifference < 60) {
        return 'just now';
    } else if (timeDifference < 3600) {
        const minutes = Math.floor(timeDifference / 60);
        return minutes + (minutes === 1 ? ' min ago' : ' mins ago');
    } else if (timeDifference < 86400) {
        const hours = Math.floor(timeDifference / 3600);
        return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    } else if (timeDifference < 604800) {
        const days = Math.floor(timeDifference / 86400);
        return days + (days === 1 ? ' day ago' : ' days ago');
    } else if (timeDifference < 2592000) {
        const weeks = Math.floor(timeDifference / 604800);
        return weeks + (weeks === 1 ? ' week ago' : ' weeks ago');
    } else if (timeDifference < 31536000) {
        const months = Math.floor(timeDifference / 2592000);
        return months + (months === 1 ? ' month ago' : ' months ago');
    } else {
        const years = Math.floor(timeDifference / 31536000);
        return years + (years === 1 ? ' year ago' : ' years ago');
    }
}

export default transformTime;