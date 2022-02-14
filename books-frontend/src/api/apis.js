import axios from 'axios';

const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export function getBookList(callback) {
    client.get(  '/list')
        .then(res => {
            callback(true, res.data);
        }).catch(err => {
        callback(false, err)})
}

export function addBook(data, callback) {
    client.post("/",data)
        .then(res => {
            callback(true, res.data);
        }).catch(err => {
        callback(false, err)})
}

export function editBook(data, callback) {
    client.put( "/" ,data)
        .then(res => {
            callback(true, res.data);
        }).catch(err => {
        callback(false, err)})
}

export function removeBook(id, callback) {
    client.delete("/"+id)
        .then(res => {
            callback(true, res.data);
        }).catch(err => {
        callback(false, err)})
}

export function getBook(id, callback) {
    client.get( "/"+ id)
        .then(res => {
            callback(true, res.data);
        }).catch(err => {
        callback(false, err)})
}

export function pingServer(callback) {
    client.get('ping')
        .then(res => {
            callback(true, res.data);
        }).catch(err => {
        callback(false, err)})
}