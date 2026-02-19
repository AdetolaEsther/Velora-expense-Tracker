export interface Transaction {
    id: string | number;
    name: string;
    category: string;
    date: string;
    amount: string;
    type: "income" | "expense";
    icon: string;
}

export interface TransactionTableProps {
    transactions: Transaction[];
    isFetching: boolean;
}
