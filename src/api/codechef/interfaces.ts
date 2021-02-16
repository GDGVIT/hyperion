
export interface ContestResponseSchema {
    name: string;
    code: string;
    startDate: number;
    endDate: number;
}
export interface UpcomingContestResponse {
    result: Array<ContestResponseSchema>;
}
