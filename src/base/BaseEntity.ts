
import { Expose } from 'class-transformer'
import { TableField } from '@/airpower/decorator/TableField';
import { AirEntity } from '@/airpower/dto/AirEntity';

export class BaseEntity extends AirEntity {

    @TableField({
        label: '创建时间',
        hide: true
    })
    @Expose() createdTime?: string

    @TableField({
        label: '创建人',
        hide: true
    })
    @Expose() createdBy?: string

}