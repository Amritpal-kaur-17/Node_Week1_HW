const { response } = require("express");
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes-with-id.json");
const quotes = require("./quotes.json");


// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


const getAllQuotesFun = (req , res) => {
  res.send(quotes);
}
const getSingleQuotesFun = (req , res) => {
  res.send(pickFromArray(quotes));
}


const findWordfun =(req, res) =>{
  const searchWord = req.query.term;
  console.log(searchWord);
  const search = quotes.filter((q) =>
  q.quotes.toLowerCase().includes(searchWord.toLowerCase()));
  res.send(search);

}

app.get("/quotes", getAllQuotesFun);
app.get("/quotes/random", getSingleQuotesFun);
app.get("/quotes/search", findWordfun);
app.get("/one", function(req, response){
response.send("You asked for route /one");
});

//app.get("/", function(req,response){
 /// response.send("You asked for route /two");

//})
const deleteQuoteById= (req,res) => {
  const   quotesId = parseInt(req.params.id);
  const removeQuote = quotes.find((q) =>q.id ===id);
  if(removeQuote){
    res.send();
  }else{
    
  }

};
const getQuoteById = (req, res) => {
  const   getQuote = parseInt(req.params.id);
  const quote = quotes.find(a => a.id === quotesId);
  console.log(quotesId);
  if(quote){
    res.send(quote);
   }else{
     res.status(404).send("Error");
   }
};

const updateQuotes = (req,res) =>{
  const id = parseInt(request.params.id);
  const find = quotes.find((q) =>q.id ===id);
  find.author = request.body.author;
  find.quote = request.body.quote;
  res.send(find);
};



app.put('/', (req, res) => {
  res.send("PUT Request Called")
})

app.get("/quotes/:id", getQuoteById);
app.get("/quotes/:id", updateQuotes);
//Start our server so that it listens for HTTP requests!
let port = 6000;

app.listen( port, function () {
  console.log("Your app is listening on port " + port);
});
