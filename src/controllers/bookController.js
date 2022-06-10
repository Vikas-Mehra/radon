const authorModel = require("../models/authorModel");
const bookModel = require("../models/bookModel");
const publisherModel = require("../models/publisherModel");

// 3. Write a POST api that creates a book from the details in the request body. The api takes both the author and publisher from the request body.
const createBook = async function (req, res) {
  let book = req.body;

  if (!book.author) {
    res.send("ERROR: AUTHOR ID ABSENT. Please enter it.");
    return;
  }

  if (!book.publisher) {
    res.send("ERROR: PUBLISHER ID ABSENT. Please enter it.");
    return;
  }

  let flagAuthor = 0;
  let flagPublisher = 0;

  let author = await authorModel.find();
  let publisher = await publisherModel.find();

  for (let i = 0; i < author.length; i++) {
    if (book.author == author[i]._id) {
      flagAuthor++;
    }
  }
  for (let j = 0; j < publisher.length; j++) {
    if (book.publisher == publisher[j]._id) {
      flagPublisher++;
    }
  }

  if (!flagAuthor) {
    res.send(
      "ERROR: INVALID AUTHOR ID . Author ID not present in Author's Collection."
    );
    return;
  }

  if (!flagPublisher) {
    res.send(
      "ERROR: INVALID PUBLISHER ID . Publisher ID not present in Publisher's Collection."
    );
    return;
  }

  if (flagAuthor && flagPublisher) {
    let bookCreated = await bookModel.create(book);
    res.send({ BookCreated: bookCreated });
    return;
  }
};

// 4. Write a GET api that fetches all the books along with their author details as well the publisher details (you have to populate for this).
const getPopulatedBooks = async function (req, res) {
  let books = await bookModel.find().populate("author").populate("publisher");
  res.send({ Books: books });
};


// 5. Create a new PUT API /books and perform the following two operations: 
// (a) For the books published by 'Penguin' and 'HarperCollins', update this key to true.
const books = async function (req,res){
  const update = await bookModel.updateMany({$or: [{"publisher":"61951bfa4d9fe0d34da84523" },{"publisher": "62a1e8126db4bd6181d6826a"}]},{"isHardCover" : true},{new:true});
   res.send({ PUT_API: update });
}


//(b)For the books written by authors having a rating greater than 3.5, update the books price by 10 (eg. if old price for such a book is 50, new will be 60).
const incRating = async function(req,res){
  const updatePrice = await bookModel.updateMany({ratings:{$gt:3.5}},{$inc:{price: 10}},{new:true});
  res.send({ PUT_Rating: updatePrice});
}


module.exports.createBook = createBook;
module.exports.getPopulatedBooks = getPopulatedBooks;
module.exports.books = books;
module.exports.incRating = incRating;
