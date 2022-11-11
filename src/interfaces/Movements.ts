  export interface IMovement {
    description: string;
    type: 'EXPENSES' | 'INCOME',
    amount: number,
    myDate: string,
    idCategory: number,
    idAccount: number,
}