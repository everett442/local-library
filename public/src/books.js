function findAuthorById(authors = [], id = 0) {
  return authors.find((author) => author.id === id);
}

function findBookById(books = [], id = "") {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books = []) {
  const borrowed = [];
  const returned = [];
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    let latestTransaction = book.borrows[0];
    if (!latestTransaction.returned) {
      borrowed.push(book);
    } else {
      returned.push(book);
    }
  }
  return [borrowed, returned];
}

function getBorrowersForBook(book = {}, accounts = []) {
  const { borrows } = book;
  const result = [];

  borrows.forEach((borrowsObj) => {
    let foundAccount = undefined;
    accounts.forEach((accountObj) => {
      if (accountObj.id === borrowsObj.id) {
        foundAccount = accountObj;
        foundAccount.returned = borrowsObj.returned;
      }
    });
    if (result.length < 10) {
      result.push(foundAccount);
    }
  });
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
