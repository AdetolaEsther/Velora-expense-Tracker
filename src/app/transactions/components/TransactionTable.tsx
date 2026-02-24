"use client";

import { FC } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Button,
    Skeleton,
} from "@mui/material";
import dayjs from "dayjs";
import { TransactionTableProps } from "@/src/interface/transaction-types";
import { Icon } from "@iconify/react";




export const TransactionTable: FC<TransactionTableProps> = ({
    isFetching,
    transactions,
}) => {
    const tableHeaders = ["ID", "Name", "Category", "Date", "Amount", "Type"];

    return (
        <TableContainer
            component={Paper}
            sx={{ maxHeight: "60vh", borderRadius: "12px" }}
        >
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
                        // <EmptyTableRows noOfColumns={tableHeaders.length} />
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
                        <EmptyTableRows noOfColumns={tableHeaders.length} />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );

};
const TableRowSkeletonLoader: FC<{ noOfColumns: number; noOfRows: number }> = ({
    noOfColumns,
    noOfRows,
}) => {
    return (
        <>
            {Array.from({ length: noOfRows }).map((_, rowIdx) => (
                <TableRow key={rowIdx}>
                    {Array.from({ length: noOfColumns }).map((_, colIdx) => (
                        <TableCell key={colIdx}>
                            <Skeleton variant="text" height={30} />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
};
const EmptyTableRows: FC<{ noOfColumns: number }> = ({ noOfColumns }) => (
    <TableRow>
        <TableCell colSpan={noOfColumns} align="center" sx={{ py: 8 }}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
            >
                <Icon
                    icon="mdi:receipt-outline"
                    width={60}
                    height={60}
                    className="text-[#127173] opacity-60"
                />

                <Box>
                    <Box
                        component="p"
                        sx={{
                            fontSize: 18,
                            fontWeight: 600,
                            mb: 0.5,
                        }}
                    >
                        No transactions yet
                    </Box>
                    <Box
                        component="p"
                        sx={{
                            fontSize: 14,
                            color: "#888",
                        }}
                    >
                        Once you add transactions, they will appear here.
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    sx={{
                        mt: 2,
                        backgroundColor: "#127173",
                        "&:hover": { backgroundColor: "#0e5b5d" },
                        borderRadius: "8px",
                        textTransform: "none",
                    }}
                >
                    Add Transaction
                </Button>
            </Box>
        </TableCell>
    </TableRow>
);