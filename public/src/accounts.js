function findAccountById(accounts=[], id="") {
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts=[]) {
  let sortbyLastname = accounts.sort((accountA, accountB) => {
    const lastNameA = accountA.name.last.toLowerCase()
    const lastNameB = accountB.name.last.toLowerCase()
   return  lastNameA < lastNameB ? -1 : 1

  })
  return sortbyLastname

}

function getTotalNumberOfBorrows(account={}, books=[]) {
  const { id } = account;
  return books.reduce((accumulator, book) => {
    const count = book.borrows.filter(borrow => borrow.id === id).length;
    return accumulator + count;
  }, 0);
}

function getBooksPossessedByAccount(account={}, books=[], authors=[]) {
  const checkedOutBooks = books.filter((book) => {
    const recentTransaction = book.borrows[0];
    return !recentTransaction.returned && recentTransaction.id === account.id;
  });
  return checkedOutBooks.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return { ...book, author };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
