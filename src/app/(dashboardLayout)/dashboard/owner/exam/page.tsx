import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getAllExam } from "./_actions"
import { buildQueryString } from "@/lib/utils";
import ExamTablePage from "@/components/modules/Dashboard/Owner/Exam/ExamTable";
import { Card } from "@/components/ui/card";
import TableQueryController from "@/shared/Table/QueryController/TableQueryController";
import CreateExamButton from "@/components/modules/Dashboard/Owner/Exam/CreateExamButton";



const ExamPage = async ({ searchParams }: {
    searchParams: Promise<{[key: string]: string | string[] | undefined;}>}) => {

    const queryString = buildQueryString(await searchParams);

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["exam", queryString],
        queryFn: () => getAllExam(queryString)
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Card className='p-0 mb-4'>
                <div className='m-0'>
                    <div className='flex items-center justify-end p-2'>

                        <CreateExamButton />
                    </div>
                </div>
            </Card>

            <TableQueryController
                searchKey='search'

            />
            <ExamTablePage queryString={queryString} />
        </HydrationBoundary>
    )
}

export default ExamPage