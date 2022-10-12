import { ApiProperty } from '@nestjs/swagger'
import { IContract } from 'domains/core/contract/contract.types'

export class ConsultCompany {
  @ApiProperty()
  id?: number

  @ApiProperty()
  code?: string

  @ApiProperty()
  fantasy_name: string

  @ApiProperty()
  cnpj: string
}

export class ICompany extends ConsultCompany {
  @ApiProperty()
  phone: string

  @ApiProperty()
  phone_secondary?: string

  @ApiProperty()
  address: string

  @ApiProperty()
  cep: string

  @ApiProperty()
  city: string

  @ApiProperty()
  neighborhood: string

  @ApiProperty()
  uf: string

  @ApiProperty()
  email: string

  @ApiProperty()
  social_reason: string

  @ApiProperty()
  type: string

  @ApiProperty()
  size: string

  @ApiProperty()
  representatives?: string

  @ApiProperty()
  contracts?: IContract[]
}
