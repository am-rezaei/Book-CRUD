import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ListItem from "./ListItem";
import '../style.scss'
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


export default  function List(props) {
    return (
        <TableContainer className="tableContainer" component={Paper}>
            <Table   sx={{minWidth: 650}} size="small" >
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Author</StyledTableCell>
                        <StyledTableCell>Year</StyledTableCell>
                        <StyledTableCell>ISBN</StyledTableCell>
                        <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row) => (
                        <ListItem key={row.id} removeAction ={props.removeAction} editAction={props.editAction} data={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}