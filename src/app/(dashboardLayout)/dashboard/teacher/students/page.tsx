import StudentTable from '@/components/modules/Dashboard/Owner/student/StudentTable'
import TableQueryController from '@/shared/Table/QueryController/TableQueryController'


const StudentPage = () => {
  return (
    <div>
      <TableQueryController
        searchKey='search'
      />
      <StudentTable />
    </div>
  )
}

export default StudentPage