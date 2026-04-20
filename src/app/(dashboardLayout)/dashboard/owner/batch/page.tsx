import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getAllBatch } from "./_actions"
import BatchTablePage from "@/components/modules/Dashboard/Owner/Batch/BatchTable"

import CreateBatchButton from "@/components/modules/Dashboard/Owner/Batch/CreateBatchButton"
import { Card } from "@/components/ui/card"
import TableQueryController from "@/shared/Table/QueryController/TableQueryController"


const BatchPage = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["batch"],
        queryFn: async () => await getAllBatch()
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
                    searchKey='search'
                    sortKey="sortOrder"
                />
                <BatchTablePage />
            </div>
        </HydrationBoundary>
    )
}

export default BatchPage