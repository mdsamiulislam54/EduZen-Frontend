import StudentTable from '@/components/modules/Dashboard/Owner/student/StudentTable'
import TableQueryController from '@/shared/Table/QueryController/TableQueryController'


const StudentPage = () => {
  return (
    <div className='pb-10'>
      <TableQueryController
        searchKey='search'
      />
      <StudentTable />
    </div>
  )
}

export default StudentPage