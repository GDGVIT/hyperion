export interface UpcomingContestResponseSchema {
    id: number;
    name: string;
    type: string;
    phase: string;
    frozen: boolean;
    durationSeconds: number;
    startTimeSeconds: number;
    relativeTimeSeconds: number;
}
export interface UpcomingContestResponse {
    result: Array<UpcomingContestResponseSchema>;
}
