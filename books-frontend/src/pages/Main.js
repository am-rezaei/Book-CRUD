import React, {useEffect, useState} from "react";
import List from "../components/List";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import {getBookList, removeBook} from "../api/apis";
import '../style.scss'

export default function Main() {
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([]);
    const [bookToRemoveID, setBookToRemoveID] = React.useState(-1);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        handleGetList();
    }, []);

    useEffect(() => {
        if (bookToRemoveID !== -1) {
            setOpen(true);
        }
    }, [bookToRemoveID]);

    const removeAction = (id) => {
        setBookToRemoveID(id);
    };

    const editAction = (id) => {
        navigate("/edit/" + id);
    };

    const handleRemoveBook = () => {
        setOpen(false);
        removeBook(bookToRemoveID, (stat,res)=>{
            handleGetList();
        })
    };

    const handleGetList = () =>{
        getBookList((stat, result) => {
            if (stat) {
                setBookList(result);
            }
        })
    }

    const handleClose = () => {
        setOpen(false);
        setBookToRemoveID(-1)
    };

    const handleNew = () => {
        navigate('/create');
    };

    let ConfirmDialog = <Dialog
        open={open}
        onClose={handleClose}
    >
        <DialogTitle id="alert-dialog-title">
            {"Are you sure to delete this book?"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                By removing this valuable book you will inhibit others having access to the book information, it
                is  highly recommend not to remove any book
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleRemoveBook} autoFocus>
                Yes, Im sure
            </Button>
        </DialogActions>
    </Dialog>;

    return (
        <div className="content">
            <h1>Welcome to Book List</h1>
            <h3>{process.env.REACT_APP_SECRET_NAME}</h3>
            <Button onClick={handleNew} variant="contained" color="success">
                ADD YOUR BOOK
            </Button>

            <List data={bookList} removeAction={removeAction} editAction={editAction}></List>

            {ConfirmDialog}
        </div>
    );
}