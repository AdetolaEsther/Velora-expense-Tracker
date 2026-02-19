"use client";

import { FC } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
} from "@mui/material";
import dayjs from "dayjs";
import { TransactionTableProps } from "@/src/interface/transaction-types";




export const TransactionTable: FC<TransactionTableProps> = ({
    isFetching,
    transactions,
}) => {
    const tableHeaders = ["ID", "Name", "Category", "Date", "Amount", "Type"];

    return (
        <TableContainer component={Paper} sx={{ maxHeight: "60vh" }}>
            <Table stickyHeader sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        {tableHeaders.map((header) => (
                            <TableCell key={header} sx={{ fontWeight: "bold" }}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {isFetching ? (
                        <TableRowSkeletonLoader
                            noOfColumns={tableHeaders.length}
                            noOfRows={5}
                        />
                    ) : transactions.length ? (
                        transactions.map((tx) => (
                            <TableRow key={tx.id} hover>
                                <TableCell>{tx.id}</TableCell>
                                <TableCell>{tx.name}</TableCell>
                                <TableCell>{tx.category}</TableCell>
                                <TableCell>
                                    {dayjs(tx.date).format(
                                        "DD/MM/YYYY, hh:mm A",
                                    )}
                                </TableCell>
                                <TableCell>{tx.amount}</TableCell>
                                <TableCell
                                    sx={{
                                        color:
                                            tx.type === "income"
                                                ? "#39FF14"
                                                : "#FF4D4D",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {tx.type}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <EmptyTableRows
                            noOfColumns={tableHeaders.length}
                            text="No transactions to display."
                        />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );

};
// Optional skeleton loader placeholder
const TableRowSkeletonLoader: FC<{ noOfColumns: number; noOfRows: number }> = ({
    noOfColumns,
    noOfRows,
}) => {
    return (
        <>
            {Array.from({ length: noOfRows }).map((_, rowIdx) => (
                <TableRow key={rowIdx}>
                    {Array.from({ length: noOfColumns }).map((_, colIdx) => (
                        <TableCell
                            key={colIdx}
                            sx={{ backgroundColor: "#333", height: 30 }}
                        />
                    ))}
                </TableRow>
            ))}
        </>
    );
};

// Optional empty state
const EmptyTableRows: FC<{ noOfColumns: number; text: string }> = ({
    noOfColumns,
    text,
}) => (
    <TableRow>
        <TableCell
            colSpan={noOfColumns}
            align="center"
            sx={{ py: 5, color: "#888" }}
        >
            {text}
        </TableCell>
    </TableRow>
);