export interface IClient {
  id?: number
  code: string
  phone: string
  phone_secondary: string
  address: string
  cep: string
  city: string
  neighborhood: string
  uf: string
  email: string
  contract: string
}

export interface IPhysicalPerson extends IClient {
  name: string
  birthdate: string
  cpf: string
  rg: string
  rg_emissor: string
  rg_emissor_uf: string
}

export interface ILegalPerson extends IClient {
  fantasy_name: string
  cnpj: string
  social_reason: string
  type: string
  size: string
  representatives: string[]
}

export type Client = IPhysicalPerson | ILegalPerson
