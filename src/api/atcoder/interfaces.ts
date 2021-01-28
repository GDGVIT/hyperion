export interface ContestResponseSchema {
    id: string;
    title: string;
    startTimeSeconds: number;
    durationSeconds: number;
    ratedRange: number;
}
export interface UpcomingContestResponse {
    result: Array<ContestResponseSchema>;
}
