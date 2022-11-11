export interface IAccounts {
    id: string;
    accountNumber: string;
    dpi: string;
    typeDeposit: 'RECURRING' | 'SAVINGS';
    balance: number;
    idUser: number;
    idCurrency: number;
    state: number;
}

export interface IUserAccount {
    id: number;
    accountNumber: string;
}