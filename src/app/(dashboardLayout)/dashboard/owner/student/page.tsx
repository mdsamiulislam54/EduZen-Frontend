import { buildQueryString } from '@/lib/utils';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAllStudents } from './_actions';
import TableQueryController from '@/shared/Table/QueryController/TableQueryController';
import StudentTable from '@/components/modules/Dashboard/Owner/student/StudentTable';
import CreateStudentButton from '@/components/modules/Dashboard/Owner/student/CreateStudentButton';

const StudentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryParams = await searchParams;
  const queryString = buildQueryString(queryParams);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["student", queryString],
    queryFn: async () => await getAllStudents(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <div className='flex items-center justify-end p-2'>
        
           <CreateStudentButton/>
          
        </div>

        <TableQueryController
          searchKey="search"
          sortKey="sortOrder"
          filterKey="gender"
          filterOptions={[
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" },
          ]}
        />
        <StudentTable query={queryString} />

        
      </div>
    </HydrationBoundary>
  );
};

export default StudentPage;