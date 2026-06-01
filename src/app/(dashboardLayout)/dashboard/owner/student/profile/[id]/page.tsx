import { dehydrate, HydrationBoundary, QueryClient, } from "@tanstack/react-query";
import { getStudentById } from "../../_actions";
import StudentProfile from "@/components/modules/Dashboard/Owner/student/StudentProfile";
type PageProps = {
  params: Promise<{
    id: string;
  }>;
};
export const dynamic = "force-dynamic";
const StudentProfilePage = async ({ params }: PageProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["student", id],
    queryFn: async () => await getStudentById(id),
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StudentProfile id={id} />
    </HydrationBoundary>
  )
}

export default StudentProfilePage