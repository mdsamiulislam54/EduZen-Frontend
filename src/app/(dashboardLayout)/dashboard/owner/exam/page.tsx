import { QueryClient } from "@tanstack/react-query"
import { createExam, getAllExam } from "./_actions"
import { buildQueryString } from "@/lib/utils";


const ExamPage = async ({ params }: { params: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const queryParams = await params;
    const queryString = buildQueryString(queryParams);

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["exam"],
        queryFn: async () => await getAllExam(queryString)
    })

    return (
        <div>ExamPage</div>
    )
}

export default ExamPage