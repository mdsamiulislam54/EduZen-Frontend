export interface IStudentDashboardData {
    profile: {
        name: string;
        roll: string;
        status: string;
        image: string | null
    };

    performance: {
        totalExams: number;
        totalMarks: number;
        avgMarks: number;
    };

    attendance: {
        total: number;
        present: number;
        percent: string;
    };

    fees: {
        totalFee: number;
        paidFee: number;
        dueFee: number;
    };

    batches: {
        id: string;
        name: string;
        total: number;
    }[];
}

export interface IStudentDashboardResponse {
    success: boolean;
    message: string;
    data: IStudentDashboardData;
}