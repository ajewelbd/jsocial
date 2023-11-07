export const timeFromNow = (sentAt: string) => {
    if (sentAt) {
        const dbTime: any = new Date(sentAt)
        const currentTime = new Date().getTime();
        const difference = currentTime - dbTime;
        const totalInSeconds = Math.floor(difference / 1000);

        console.log(totalInSeconds)
        if(totalInSeconds === 0) return `a moment`;

        if (totalInSeconds < 60) {
            return `${totalInSeconds} seconds${totalInSeconds > 1 ? "s": ""}`;
        } else if(totalInSeconds >= 60 && totalInSeconds < 3600) {
            const minutes = Math.round(totalInSeconds / 60);
            return `${minutes} minute${minutes > 1 ? "s": ""}`;
        } else if (totalInSeconds >= 3600) {
            const hours = Math.round(totalInSeconds / 3600);
            if (hours <= 24) {
                return `${hours} hour${hours > 1 ? "s": ""}`;
            } else if (hours > 24) {
                const days = Math.round(hours / 24);
                if ( days < 7) {
                    return `${days} day${days > 1 ? "s": ""}`;
                } else if (days >= 7 && days < 30) {
                    const weeks = Math.round(days / 7);
                    return `${weeks} week${weeks > 1 ? "s": ""}`;
                } else if(days >= 30 && days < 365) {
                    const months = Math.round(days / 30);
                    return `${months} month${months > 1 ? "s": ""}`;
                } else {
                    const years = Math.round(days / 365);
                    return `${years} year${years > 1 ? "s": ""}`;
                }
            } else {
                console.log({hours})
            }
        }
    }
    return sentAt;
}
