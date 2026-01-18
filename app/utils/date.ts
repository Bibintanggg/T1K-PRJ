function getDaysSince(startDate: string) {
    const start = new Date(startDate);
    const now = new Date();

    start.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffTime = now.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}
export { getDaysSince };
