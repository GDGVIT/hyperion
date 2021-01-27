export interface ContestResponseSchema {
    code: string;
    name: string;
    href: string;
    startTime: number ;
    startDate: string;
    endTime: number;
    endDate: string;
}
export interface UpcomingContestResponse {
    result: Array<ContestResponseSchema>;
}
