function getTotalBooksCount(books = []) {
  return books.length;
}

function getTotalAccountsCount(accounts = []) {
  return accounts.length;
}

function getBooksBorrowedCount(books = []) {
  return books.reduce((accumulator, book) => {
    const borrowed = book.borrows.some((borrow) => !borrow.returned);
    return accumulator + (borrowed ? 1 : 0);
  }, 0);
}

function helperSortAndSliceArrayByCount(array, countProperty, limit) {
  // Sort array by the count property in descending order
  array.sort((a, b) => b[countProperty] - a[countProperty]);

  // Return the limit of  objects in the sorted array
  return array.slice(0, limit);
}

function getMostCommonGenres(books = []) {
  const lookup = {};
  books.forEach((book) => {
    //Destructuring book for genre
    const {genre} = book
    if (lookup[genre]) {
      lookup[genre]++;
    } else {
      lookup[genre] = 1;
    }
  });
  const result = helperSortAndSliceArrayByCount(
    Object.keys(lookup).map((genre) => {
      return { name: genre, count: lookup[genre] };
    }),
    "count",
    5
  );
  return result;
}

function getMostPopularBooks(books = []) {
  const bookCounts = {};
  books.forEach((book) => {
    bookCounts[book.title] = book.borrows.length;
  });

  const result = helperSortAndSliceArrayByCount(
    Object.keys(bookCounts).map((title) => {
      return { name: title, count: bookCounts[title] };
    }),
    "count",
    5
  );
  return result;
}

function getMostPopularAuthors(books = [], authors = []) {
  const authorBorrows = {};

  books.forEach((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    // Destructuring Author id and name
    const {id, name: {first, last}} = author

    if (!authorBorrows[id]) {
      authorBorrows[id] = {
        name: `${first} ${last}`,
        count: 0,
      };
    }
    authorBorrows[id].count += book.borrows.length;
  });
  const result = helperSortAndSliceArrayByCount(
    Object.values(authorBorrows),
    "count",
    5
  );

  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
