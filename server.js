const express = require('express')
const fs = require ('fs')
const app = express()

//create a view engine to show user more detail 
app.engine('myFirstViewEngine', (filePath, options, callBack) => {
    fs.readFile(filePath, (err,data) => {
        //if file is not found(error)
        if (err) return callBack(err)
        //if no errors
        const rendered = data.toString()
        .replace('#title#', '<title>' + options.title + '</title>')
        .replace('#message','<h1>' + options.message + '</h1>')
        .replace ('#content', '<div>' + options.content + '</div>')

        return callBack(null, rendered)

    })
})

app.set('view engine', 'myFirstViewEngine')
app.set('views', './views')

app.get('/', (req,res) => {
    res.render('home', {
        title: 'Welcome',
        message: 'Express Lab',
        content: 'woop woop'
    })
})
app.get ('/greeting/:name', (req,res) => {
    res.send(`hi ${req.params.name}`) })

app.get('/tip/:total/:tipPercentage', (request, response) => {
        const total = request.params.total;
        const tipPercentage = request.params.tipPercentage;
    
        const tip = Number('.' + tipPercentage) * total;
    
        response.send(`${tip}`);
    });
    
    app.get('/magic/:question', (req, res) => {
        const eightBall = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely","You may rely on it", "As I see it yes", "Most likely", "Outlook good","Yes", "Signs point to yes", "Reply hazy try again", "Ask again later","Better not tell you now", "Cannot predict now", "Concentrate and ask again","Don't count on it", "My reply is no", "My sources say no","Outlook not so good", "Very doubtful"]
        
        const randomNumber = Math.floor(Math.random() * eightBall.length);
    
        const answer = eightBall[randomNumber];
    
        const question = request.params.question;
    
        response.send(`You asked: ${question}? Magic 8 ball answered: ${answer}.`);
    });
    
    app.get ('/:number_of_bottles', (req,res) => {
        let beer = 99;
        while (beer > 0) {
          let verse = `${beer} bottles of beer on the wall,
          ${beer} bottles of beer!
          Take one down, pass it around
          ${beer-1} bottles of beer on the wall`;

        }
        res.send(verse) })

    app.get ('/fibonacci', (req,res) => {
            if (isSquare(5*(num*num)-4) || isSquare(5*(num*num)+4)) {
               res.send('Very good. It is Fibonacci');
            } else { res.send('I can tell this is not a fibonacci number.'); }})
        

app.listen(4000, () => {
        console.log('beep...')
})