import React, { useState } from "react";

const AddBookModal = (props) => {

    const addNewBook = async (event) => {
        event.preventDefault();

        const bookname = event.target.book.value;
        const author = event.target.author.value;
        const genre = event.target.genre.value;
        const readedMonth = event.target.readed.value;
        const rating = event.target.rating.value;
        const en = event.target.en.checked == true ? 1 : 0;

        const readedDate = `${props.year}-${readedMonth}-01`;

        await fetchApi('POST', `books/insert`, {year: props.year}, {
            name: bookname, author: author, genre: genre, readed: readedDate, rating: rating, en: en
        });
    }

    return (
        <React.Fragment>
            <div class="modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title">Boek toevoegen</h3>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form method="POST" id="addbook" onSubmit={(event) => addNewBook(event)}>
                                <div class="mb-3">
                                    <label for="book" class="form-label">Boek</label>
                                    <input type="text" class="form-control" name="book" id="book" required/>
                                </div>
                                <div class="mb-3">
                                    <label for="author" class="form-label">Schrijver</label>
                                    <input type="text" class="form-control" name="author" id="author" required/>
                                </div>
                                <div class="mb-3">
                                    <label for="genre" class="form-label">Genre</label>
                                    <select class="form-control" name="genre" id="genre" required>
                                        <option value="Thriller">Thriller</option>
                                        <option value="Roman">Roman</option>
                                        <option value="Non-fictie">Non-fictie</option>
                                        <option value="Young Adult">Young Adult</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="readed" class="form-label">Maand</label>
                                    <select class="form-control" name="readed" id="readed" required>
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
                                <div class="mb-3">
                                    <label for="rating" class="form-label">Aantal sterren</label>
                                    <select class="form-control" name="rating" id="rating" required>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="en" class="form-label">Engels</label>
                                    <input type="checkbox" name="en" id="en" required/>
                                </div>
                                <button type="submit" class="btn btn-green">Toevoegen</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddBookModal;