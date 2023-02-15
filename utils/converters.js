export const hmsToSeconds = (time) => {
    const b = time.split(':');

    return b[0]*3600 + b[1]*60 + (+b[2] || 0);
}

export const secondsToHms = (seconds) => {
    function z(n) {
        return (n < 10 ? '0' : '' ) + n;
    }

    // const sign = seconds < 0 ? '-' : '';
    seconds = Math.abs(seconds);
    const timeObj = {
        hours: z(seconds/3600 |0),
        minutes: z((seconds%3600) / 60 |0),
        seconds: z(seconds%60)
    }
    return timeObj;
}