
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAllExam } from "../../owner/exam/_actions";
import MarksNavbarPage from "@/components/modules/Dashboard/Teacher/Marks/MarksNavbar";

const MarksPage = async () => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["exam"],
        queryFn: async () => await getAllExam()
    })

    return (
       <HydrationBoundary state={dehydrate(queryClient)}>
        <MarksNavbarPage/>
       </HydrationBoundary>
    )
}

export default MarksPage