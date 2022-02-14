import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {Button} from "@mui/material";
import '../style.scss'
import {styled} from "@mui/material/styles";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default  function ListItem(props) {
    return (
        <StyledTableRow
            className="row"
            key={props.data.name}
        >
            <StyledTableCell component="th" scope="row">
                {props.data.id}
            </StyledTableCell>
            <StyledTableCell> {props.data.name}</StyledTableCell>
            <StyledTableCell> {props.data.author}</StyledTableCell>
            <StyledTableCell> {props.data.year}</StyledTableCell>
            <StyledTableCell> {props.data.ISBN}</StyledTableCell>
            <StyledTableCell>
                <Button onClick={()=>{props.editAction(props.data.id)}} size="small"  variant="outlined"> Edit </Button>

                <Button onClick={()=>{props.removeAction(props.data.id)}} style={{marginLeft:'5px'}} size="small" variant="outlined" color="error"> Remove </Button>
            </StyledTableCell>

        </StyledTableRow>
    );
}