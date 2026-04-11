import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { getAllSubject } from './_actions'
import SubjectTablePage from '@/components/modules/Dashboard/Owner/SubjectTable/SubjectTable'


const SubjectPage = async () => {
    const queryClient = new QueryClient()

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ["subject"],
            queryFn: async () => await getAllSubject(),
            staleTime: 1000 * 60 * 60,
            gcTime: 1000 * 60 * 6
        })
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div>
                <nav>
                    <Card className='m-0'>
                        <div className='flex items-center justify-between p-2'>
                            <p>All Subject List</p>
                            <Button>
                                <Link href={'/dashboard/owner/create-subject'}>Create Subject</Link>
                            </Button>
                        </div>
                    </Card>
                </nav>
                <SubjectTablePage/>
            </div>
        </HydrationBoundary>
    )
}

export default SubjectPage