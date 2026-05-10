import { buildQueryString } from "@/lib/utils";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAllNotice } from "./_actions";
import NoticeTable from "@/components/modules/Dashboard/Owner/Notice/NoticeTable";
import { Card } from "@/components/ui/card";
import TableQueryController from "@/shared/Table/QueryController/TableQueryController";


const NoticePage = async ({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {

    const queryParams = await searchParams;

    const queryString = buildQueryString(queryParams)
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["notice", queryString],
        queryFn: () => getAllNotice(queryString)

    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div>
                <Card className='p-0 mb-4'>
                    <div className='m-0'>
                        <div className='flex items-center justify-end p-2'>

                            {/* <CreateSubjectButton /> */}
                        </div>
                    </div>
                </Card>

                <TableQueryController
                    searchKey='search'
                />
                <NoticeTable queryString={queryString} />
            </div>
        </HydrationBoundary>
    )
}

export default NoticePage