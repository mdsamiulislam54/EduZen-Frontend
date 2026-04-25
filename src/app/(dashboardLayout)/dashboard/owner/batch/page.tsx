import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getAllBatch } from "./_actions"
import BatchTablePage from "@/components/modules/Dashboard/Owner/Batch/BatchTable"

import CreateBatchButton from "@/components/modules/Dashboard/Owner/Batch/CreateBatchButton"
import { Card } from "@/components/ui/card"
import TableQueryController from "@/shared/Table/QueryController/TableQueryController"
import { unknown } from "zod"
import { buildQueryString } from "@/lib/utils"


const BatchPage = async ({ params }: { params: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const queryParams = await params;
    const queryString = buildQueryString(queryParams);
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["batch", queryString],
        queryFn: async () => await getAllBatch(queryString)
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)} >
            <div>
                <Card className='p-0 mb-4'>
                    <div className='m-0'>
                        <div className='flex items-center justify-end p-2'>
                            <CreateBatchButton />
                        </div>
                    </div>
                </Card>
                <TableQueryController
                    searchKey="search"
                    sortKey="sortOrder"
                />

                <BatchTablePage query={queryString} />
            </div>
        </HydrationBoundary>
    )
}

export default BatchPage