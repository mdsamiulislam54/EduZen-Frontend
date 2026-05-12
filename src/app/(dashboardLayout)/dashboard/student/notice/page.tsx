import NoticeTable from '@/components/modules/Dashboard/Owner/Notice/NoticeTable'
import { buildQueryString } from '@/lib/utils';
import { QueryClient } from '@tanstack/react-query';
import { getAllNotice } from '../../owner/notice/_actions';
import TableQueryController from '@/shared/Table/QueryController/TableQueryController';

const NoticePage = async ({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const queryParams = await searchParams;

    const queryString = buildQueryString(queryParams);
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["notice", queryString],
        queryFn: () => getAllNotice(queryString)

    })
    return (
        <div>

            <TableQueryController
                searchKey='search'
            />
            <NoticeTable queryString={queryString} />
        </div>
    )
}

export default NoticePage