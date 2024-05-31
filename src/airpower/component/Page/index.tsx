import { AirResponse } from '@/airpower/dto/AirResponse'
import './index.scss'
import { Pagination } from 'antd'
import { AirEntity } from '@/airpower/dto/AirEntity'
import { AirPage } from '@/airpower/dto/AirPage'

interface PagePropTypes {
    pageData: AirResponse<AirEntity>
    onChange: (_: AirPage) => void
}


const Page: React.FC<PagePropTypes> = ({ pageData, ...props }) => {
    return (
        <Pagination
            current={pageData.currentPage}
            pageSize={pageData.currentPageSize}
            total={pageData.total}
            showSizeChanger
            showQuickJumper
            showTotal={total => `共 ${total} 条`}
            onChange={(page: number, pageSize: number) => props.onChange(new AirPage().setCurrentPage(page).setCurrentPageSize(pageSize))}
        />
    )
}

export default Page