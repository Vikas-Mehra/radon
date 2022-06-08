const bookModel = require("../models/bookModel");
const authorModel = require("../models/authorModel");

// 1. Write create APIs for both books and authors ---> If author_id is not available then do not accept the entry(in neither the author collection nor the books collection). 
const createBook = async function (req, res) {
  let data = req.body;
  let savedData = await bookModel.create(data);
  res.send({ Book: savedData });
};

const enterAuthor = async function (req, res) {
  let data = req.body;
  let savedData = await authorModel.create(data);
  res.send({ Author: savedData });
};

// 2.List out the books written by "Chetan Bhagat".
const chetanBhagat = async function (req, res) {
  const aId = await authorModel.find({ author_name: "Chetan Bhagat" });
  let cB = aId[0].author_id;
  let booksByCB = await bookModel.find({ author_id: cB });
  res.send({ Author: booksByCB });
};

// 3.find the author of “Two states” and update the book price to 100;  Send back the author_name and updated price in response.
const twoStates = async function (req, res) {
  let priceOld = await bookModel.find({name: "Two states"}).select("price");
  await bookModel.findOneAndUpdate(
    { name: "Two states" },
    { $set: { price: 2222 } },
    { new: true }
  );
  let cost = await bookModel.find({name: "Two states"}).select("price");

  const bId = await bookModel.find({ name: "Two states" });
  let id = bId[0].author_id;
  let authr = await authorModel.find({ author_id: id });
  res.send({ Old_Price: priceOld ,  Updated_Price: cost ,  Author: authr });
};

// 4.Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books.
const between50_100 = async function (req, res) {
  let bookData = await bookModel.find({price: {$gte:50, $lte:100}}).select({author_id:1, _id:0});

  let authorData = await authorModel.find().select({author_id:1 , author_name:1, _id:0});

  let aName = [];
  for (let i=0; i < authorData.length; i++) {
    bookData.forEach(element => {
      if (element.author_id === authorData[i].author_id) {
        aName.push(authorData[i].author_name);
      }
    });
  }
  res.send({ Author: aName });
};


// 5. Write an api GET /books-by-authorid/<Author_Id> (for example /books/1 or /books/2 etc) that returns all the books written by the author with an id <Author_Id>. Only return the names of these books.
const booksByAuthorId = async function( req, res) {
  let author_id = req.params.AuthorId;
  let book = await bookModel.find({author_id}).select({ _id:0, name:1});
  res.send({ Books: book });
}


// 6. Find a list of authors whose are older than 50 years of age with at least one book that has a rating greater than 4. Only include the author’s names and their ages in the response for this api.
const authorAge = async function( req, res) {
  let book = await bookModel.find();
  let author = await authorModel.find();
  
  let ageName = [];
  for (let i=0; i < author.length; i++) {
    book.forEach(element => {
      if (element.author_id === author[i].author_id) {
        if ((author[i].age > 50) && (element.ratings > 4)) {
          if (element.name) {
            ageName.push([author[i].author_name, author[i].age]);
          }
        }
      }
    })  
  }
  res.send({ LastAPI: ageName });
}


module.exports.createBook = createBook;
module.exports.enterAuthor = enterAuthor;
module.exports.chetanBhagat = chetanBhagat;
module.exports.twoStates = twoStates;
module.exports.between50_100 = between50_100;
module.exports.booksByAuthorId = booksByAuthorId;
module.exports.authorAge = authorAge;
