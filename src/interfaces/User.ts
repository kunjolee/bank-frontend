export interface IUser{
    id: string;
    name: string;
    username: string;
    email: string;
    address: string;
    phone: string;
    birthdate: string;
    state: number;
}   

export interface CreateUserForm extends Omit<IUser, 'id' | 'state' >{
    pass: string;
}
