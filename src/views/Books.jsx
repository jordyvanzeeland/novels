import React, { useState, useEffect } from "react";
import moment from 'moment';
import withAuth from "../components/WithAuth";
import { fetchApi } from "../Functions";
import AddBookModal from "../components/AddBookModal";
moment.locale('nl');

const Books = () => {
    const currentyear = new Date().getFullYear();
    const [year, setYear] = useState(currentyear);
    const [readingYears, setReadingYears] = useState([]);
    const [books, setBooks] = useState([]);

    const getData = async () => {
        const getYears = await fetchApi('GET', 'books/years');
        const getBooksOfYear = await fetchApi('GET', `books/get/${year}`);

        setReadingYears(getYears);
        setBooks(getBooksOfYear);
    }

    useEffect(() => {
        getData();
      }, [year]);

    return (
        <React.Fragment>
            <div className='header'>
                <div className="logo">
                    <img src="/logo-white.png" />
                </div>
            </div>
            <div className="subheader">
                <div className="container">
                    <div className="chooseYear">
                        <i className="fas fa-calendar-alt"></i>
                        <select className="yearselector" value={year ? year : currentyear} onChange={(event) => setYear(event.target.value)}>
                            {readingYears.map((data, i) => {
                                return (<option key={i} value={data.year}>{data.year}</option>)
                            })}
                        </select>
                    </div>
                </div>
            </div>
    
            <div className="container">
                <div class="bookslist">
                    <div className="row">
                        <div className="col-md-12">
                            <table id="DataTable" class="display" width="100%">
                                <thead>
                                    <tr>
                                        <th>Boek</th>
                                        <th>Schrijver</th>
                                        <th>Genre</th>
                                        <th>Gelezen</th>
                                        <th>Rating</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody class="table-content">
                                    {books.map(book => {
                                        return (
                                            <tr key={book.id}>
                                                <td className="name">
                                                    <div style={{ color: "#333", fontWeight: "400" }}>{book.name}</div>
                                                    <div style={{ color: "#666" }}>{book.author}</div>
                                                    <div className="genre-mobile">
                                                        <div class="catColor" style={{ background: book.genre === 'Thriller' ? "rgb(62,69,113)" : (book.genre === "Roman" ? "rgb(16, 115, 95)" : (book.genre === "Non-fictie" ? "rgb(220,116,105)" : "rgb(146,48,67)")) }}>{book.genre}</div>
                                                    </div>
                                                </td>
                                                <td className="genre-desktop"><div className="catColor" style={{ background: book.genre === 'Thriller' ? "rgb(62,69,113)" : (book.genre === "Roman" ? "rgb(16, 115, 95)" : (book.genre === "Non-fictie" ? "rgb(220,116,105)" : "rgb(146,48,67)")) }}>{book.genre}</div></td>
                                                <td>{moment(book.readed).format("MMMM")}</td>
                                                <td class="rating"><i className="fa-solid fa-star text-yellow-500"></i>{book.rating}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <AddBookModal year={year}/>
            </div>
        </React.Fragment>
    )
}

export default withAuth(Books)