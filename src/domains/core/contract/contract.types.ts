import { ApiProperty } from '@nestjs/swagger'
import { ILegalPerson, IPhysicalPerson } from '../../customer/common/customer.types'
import { IMove } from '../move/move.types'
import { IRenew } from '../renew/renew.types'

export class IContract {
  @ApiProperty()
  id?: number

  @ApiProperty()
  policy: string

  @ApiProperty()
  size: string

  @ApiProperty()
  type: string

  @ApiProperty()
  version: number

  @ApiProperty()
  number_of_lives: number

  @ApiProperty()
  validity_start: string

  @ApiProperty()
  validity_end: string

  @ApiProperty()
  validity_time: number

  @ApiProperty()
  inclusion_period: string

  @ApiProperty()
  cutoff_date: string

  @ApiProperty()
  email_on_insurancy: string

  @ApiProperty()
  phone_on_insurancy: string

  @ApiProperty()
  copay: boolean

  @ApiProperty()
  adhesion: boolean

  @ApiProperty()
  copay_perc: number

  @ApiProperty()
  contributor_perc: number

  @ApiProperty()
  copay_details: string

  @ApiProperty()
  cost: number

  @ApiProperty()
  invoice_amount: number

  @ApiProperty()
  total_contract_value: number

  @ApiProperty()
  first_invoice_date: string

  @ApiProperty()
  renew?: IRenew

  @ApiProperty()
  move?: IMove

  @ApiProperty()
  legal_person?: ILegalPerson

  @ApiProperty()
  physical_person?: IPhysicalPerson
}