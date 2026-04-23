import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getAllTeacher } from './_actions'
import TableQueryController from '@/shared/Table/QueryController/TableQueryController'


import TeacherTable from '@/components/modules/Dashboard/Owner/teacher/TeacherTable'
import { buildQueryString } from '@/lib/utils'
import CreateTeacherButton from '@/components/modules/Dashboard/Owner/teacher/CreateTeacherButton'

const TeacherPage = async ({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const queryParams = await searchParams;

    const queryString = buildQueryString(queryParams)


    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["teacher", queryString],
        queryFn: async () => await getAllTeacher(queryString)
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>

            <div className='m-0'>
                <div className='flex items-center justify-end p-2'>
                    <CreateTeacherButton />
                </div>
            </div>


            <TableQueryController
                searchKey='search'
                sortKey='sortOrder'
                filterKey="gender"
                filterOptions={
                    [
                       
                        { label: "Male", value: "MALE" },
                        { label: "Female", value: "FEMALE" },
                    ]
                }
            />
            <TeacherTable queryString={queryString} />
        </HydrationBoundary>
    )
}

export default TeacherPage