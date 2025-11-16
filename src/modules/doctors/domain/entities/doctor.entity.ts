import { randomUUID } from 'crypto';

interface DoctorProps {
  id?: string;
  userId: string;
  crm: string;
  bio?: string | null;
  city?: string | null;
  state: string;
  phone?: string | null;
  createdAt?: Date;
  updatedAt?: Date;

  name?: string;
  email?: string;
}

export class Doctor {
  public readonly id: string;
  public readonly userId: string;

  public crm: string;
  public bio: string | null;
  public city: string | null;
  public state: string;
  public phone: string | null;

  public name?: string;
  public email?: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: DoctorProps) {
    this.id = props.id ?? randomUUID();
    this.userId = props.userId;
    this.crm = props.crm;
    this.bio = props.bio ?? null;
    this.city = props.city ?? null;
    this.state = props.state;
    this.phone = props.phone ?? null;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.name = props.name;
    this.email = props.email;
  }

  update(
    data: Partial<
      Pick<
        Doctor,
        'crm' | 'bio' | 'city' | 'state' | 'phone' | 'email' | 'name'
      >
    >,
  ) {
    if (data.crm !== undefined) this.crm = data.crm;
    if (data.bio !== undefined) this.bio = data.bio;
    if (data.city !== undefined) this.city = data.city;
    if (data.state !== undefined) this.state = data.state;
    if (data.phone !== undefined) this.phone = data.phone;
    if (data.name !== undefined) this.name = data.name;
    if (data.email !== undefined) this.email = data.email;
  }
}
