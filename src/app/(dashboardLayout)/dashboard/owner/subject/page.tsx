import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { getAllSubject } from './_actions'
import SubjectTablePage from '@/components/modules/Dashboard/Owner/SubjectTable/SubjectTable'
import CreateSubjectButton from '@/components/modules/Dashboard/Owner/SubjectTable/CreateSubjectButton '


const SubjectPage = async () => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
            queryKey: ["subject"],
            queryFn: async () => await getAllSubject()
            
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
                <SubjectTablePage />
            </div>
        </HydrationBoundary>
    )
}

export default SubjectPage