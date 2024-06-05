
import { Expose } from 'class-transformer'
import { TableField } from '@/airpower/decorator/TableField';
import { AirEntity } from '@/airpower/dto/AirEntity';
import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter';

export class BaseEntity extends AirEntity {

    @TableField({
        label: '创建时间',
        hide: true,
        width: 170,
        dateFormatter: AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss
    })
    @Expose() createdTime?: number

    @TableField({
        label: '创建人',
        hide: true
    })
    @Expose() createdBy?: string

}