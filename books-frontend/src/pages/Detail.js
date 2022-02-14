import React, {useEffect, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useNavigate, useParams} from "react-router-dom";
import {addBook, editBook, getBook} from "../api/apis";
import '../style.scss'

export default function Detail({createNew}) {
    let {id} = useParams();
    let [bookInfo, setBookInfo] = useState({name: '', ISBN: '', year: '',author:''});
    let Space = <div><br/></div>
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== undefined) {
            //fetch book info
            getBook(id, (stat, res) => {
                setBookInfo(res);
            })
        }
    }, [])

    useEffect(() => {
        console.log(bookInfo)
    }, [bookInfo])

    const onFieldChange = (e) => {
        setBookInfo({...bookInfo, [e.target.id]: e.target.value})
    }

    const onCancel = (e) => {
        navigate('/');
    }

    const onSubmit = (e) => {
        if (createNew) {
            addBook(bookInfo, (stat, res) => {
                navigate('/');
            })
        } else {
            editBook(bookInfo, (stat, res) => {
                navigate('/');
            })
        }
    }

    return (
        <Paper className="content">
            {createNew && <h1>Add Your Book</h1>}
            {!createNew && <h1>Edit Book</h1>}

            <Grid container spacing={2}>

                {!createNew && <Grid item xs={12}>
                    <TextField
                        className="text"
                        label="ID"
                        disabled={true}
                        id="id"
                        value={bookInfo.id}
                        variant="outlined"
                    />
                </Grid>}

                <Grid item xs={12}>
                    <TextField
                        className="text"
                        label="Name"
                        onChange={onFieldChange}
                        id="name"
                        value={bookInfo.name}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        className="text"
                        label="Author"
                        onChange={onFieldChange}
                        id="author"
                        value={bookInfo.author}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        className="text"
                        label="Publish Year"
                        onChange={onFieldChange}
                        id="year"
                        value={bookInfo.year}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        className="text"
                        style={{width:'100%'}}
                        label="ISBN"
                        onChange={onFieldChange}
                        id="ISBN"
                        value={bookInfo.ISBN}
                        variant="outlined"
                    />
                </Grid>
            </Grid>

            <Button className="button" onClick={onCancel} variant="contained" color="error">
                Cancel
            </Button>
            <Button className="button" onClick={onSubmit} variant="contained" color="success">
                Save
            </Button>
        </Paper>
    );
}