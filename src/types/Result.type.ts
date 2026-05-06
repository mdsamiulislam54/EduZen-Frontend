export interface IResult {
    student: {
        id: string;
        name: string;
        rollNumber: string | null;
    };
    results: {
        id: string;
        mark: number;
        exam: {
            name: string;
            examDate: Date;
            subject: {
                id: string;
                name: string;
            };
        };
        student: {
            id: string;
            name: string;
            rollNumber: string | null;
        };
        grade: string | null;
    }[];
}