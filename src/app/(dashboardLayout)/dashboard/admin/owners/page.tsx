import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { getAllOwners } from "./_actions"
import OwnerProfileCard from "@/components/modules/Dashboard/admin/OwnerProfileCard"



const OwnerPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['owners'],
    queryFn: () => getAllOwners(),
    staleTime: 0,
     // Set staleTime to 0 to ensure data is always fresh
  })
    queryClient.invalidateQueries({ queryKey: ['owners'] })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OwnerProfileCard />
    </HydrationBoundary>
  )
}

export default OwnerPage