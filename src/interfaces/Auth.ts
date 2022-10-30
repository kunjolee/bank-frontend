import { IUser } from './User';

export interface IAuth {
    msg: string;
    ok: boolean;
    token: string;
    user?: IUser
}