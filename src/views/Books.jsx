import React, { useState, useEffect } from "react";
import moment from 'moment';
import { fetchApi } from "../Functions";
moment.locale('nl');

const Books = () => {
    const currentyear = new Date().getFullYear();
    const [year, setYear] = useState(currentyear);
    const [readingYears, setReadingYears] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [books, setBooks] = useState([]);

    const getData = async () => {
        const getYears = await fetchApi('GET', 'books/years');
        const getBooksOfYear = await fetchApi('GET', `books/get/${year}`);

        setReadingYears(getYears);
        setBooks(getBooksOfYear);
    }

    const addNewBook = async (event) => {
        event.preventDefault();

        const bookname = event.target.book.value;
        const author = event.target.author.value;
        const genre = event.target.genre.value;
        const readedMonth = event.target.readed.value;
        const rating = event.target.rating.value;
        const language = event.target.language.value;

        const readedDate = `${year}-${readedMonth}-01`;

        await fetchApi('POST', `books/insert`, {year: year}, {
            name: bookname, author: author, genre: genre, readed: readedDate, rating: rating, en: language
        });

        setShowModal(false);
        await getData();
    }

    useEffect(() => {
        getData();
      }, [year]);

    return (
        <React.Fragment>
            <div className='header'>
                <div className="btn btn-new" onClick={() => setShowModal(true)}><i className="fa-solid fa-plus"></i> Niew boek</div>
                
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
                <div className="bookslist">
                    <div className="row">
                        <div className="col-md-12">
                            <table id="DataTable" className="display" width="100%">
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
                                <tbody className="table-content">
                                    {books.map(book => {
                                        return (
                                            <tr key={book.id}>
                                                <td className="name">
                                                    <div style={{ color: "#333", fontWeight: "400" }}>{book.name}</div>
                                                    <div style={{ color: "#666" }}>{book.author}</div>
                                                    <div className="genre-mobile">
                                                        <div className="catColor" style={{ background: book.genre === 'Thriller' ? "rgb(62,69,113)" : (book.genre === "Roman" ? "rgb(16, 115, 95)" : (book.genre === "Non-fictie" ? "rgb(220,116,105)" : "rgb(146,48,67)")) }}>{book.genre}</div>
                                                    </div>
                                                </td>
                                                <td className="genre-desktop"><div className="catColor" style={{ background: book.genre === 'Thriller' ? "rgb(62,69,113)" : (book.genre === "Roman" ? "rgb(16, 115, 95)" : (book.genre === "Non-fictie" ? "rgb(220,116,105)" : "rgb(146,48,67)")) }}>{book.genre}</div></td>
                                                <td>{moment(book.readed).format("MMMM")}</td>
                                                <td className="rating"><i className="fa-solid fa-star text-yellow-500"></i>{book.rating}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {showModal && (
                    <div className="modal" style={{ display: "block" }} tabindex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title">Boek toevoegen</h3>
                                    <button type="button" onClick={() => setShowModal(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form method="POST" id="addbook" onSubmit={(event) => addNewBook(event)}>
                                        <div className="mb-3">
                                            <label for="book" className="form-label">Boek</label>
                                            <input type="text" className="form-control" name="book" id="book" required/>
                                        </div>
                                        <div className="mb-3">
                                            <label for="author" className="form-label">Schrijver</label>
                                            <input type="text" className="form-control" name="author" id="author" required/>
                                        </div>
                                        <div className="mb-3">
                                            <label for="genre" className="form-label">Genre</label>
                                            <select className="form-control" name="genre" id="genre" required>
                                                <option value="Thriller">Thriller</option>
                                                <option value="Roman">Roman</option>
                                                <option value="Non-fictie">Non-fictie</option>
                                                <option value="Young Adult">Young Adult</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label for="readed" className="form-label">Maand</label>
                                            <select className="form-control" name="readed" id="readed" required>
                                                <option value="01">Januari</option>
                                                <option value="02">Februari</option>
                                                <option value="03">Maart</option>
                                                <option value="04">April</option>
                                                <option value="05">Mei</option>
                                                <option value="06">Juni</option>
                                                <option value="07">Juli</option>
                                                <option value="08">Augustus</option>
                                                <option value="09">September</option>
                                                <option value="10">Oktober</option>
                                                <option value="11">November</option>
                                                <option value="12">December</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label for="rating" className="form-label">Aantal sterren</label>
                                            <select className="form-control" name="rating" id="rating" required>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label for="en" className="form-label">Taal</label>
                                            <select className="form-control" name="language" id="language" required>
                                                <option value="0">Nederlands</option>
                                                <option value="1">English</option>
                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-green">Toevoegen</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}

export default Books;