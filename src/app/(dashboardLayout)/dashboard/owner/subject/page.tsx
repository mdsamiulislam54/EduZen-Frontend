import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { getAllSubject } from './_actions'
import SubjectTablePage from '@/components/modules/Dashboard/Owner/SubjectTable/SubjectTable'
import CreateSubjectButton from '@/components/modules/Dashboard/Owner/SubjectTable/CreateSubjectButton '
import TableQueryController from '@/shared/Table/QueryController/TableQueryController'
import { buildQueryString } from '@/lib/utils'


const SubjectPage = async ({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const queryParams = await searchParams;

    const queryString = buildQueryString(queryParams)
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["subject", queryString],
        queryFn: async () => await getAllSubject(queryString)

    })


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div>
                <Card className='p-0 mb-4'>
                    <div className='m-0'>
                        <div className='flex items-center justify-end p-2'>

                            <CreateSubjectButton />
                        </div>
                    </div>
                </Card>

                <TableQueryController
                    searchKey='search'
                    sortKey='sortOrder'
                    filterKey="filter"

                />
                <SubjectTablePage queryString={queryString} />
            </div>
        </HydrationBoundary>
    )
}

export default SubjectPage