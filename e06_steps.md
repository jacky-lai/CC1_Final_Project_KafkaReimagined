# The Story Telling App

On the landing page of the app, there will be randomly selected story displayed. The stories are *Reizwortgeschichten*. This means that for adding a story, the user is given three words, which then must be used in a story.

The app has three main pages:

1. The startpage (also called landing page), which shows a story and the words the story is using.
2. A page to add a story based on three randomly chosen words.
3. A page to add a new word to the database and to display all words

We save in a mongo database

* the words, and
* the stories.

## Setup

* `npm init`
* `npm install -s express`
* `npm install -s mongoose`
* `npm install -s body-parser`
* `npm install -s express-handlebars`
* `npm install -s mongoose-simple-random`
  
* Create the file `app.js`
  
* Run the app with `nodemon app.js`

## Base Structure

### Step 1

```js
// app.js

// TODO 1
// Import the needed modules 
// (which must be installed via npm)
const express = require('express');
// TODO 7
// TODO 17
// TODO 21a

// An express object to access all the module's magic
// such as requests, routes and views
const app = express();

// Have the app listen to port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on ${port}`));

// Static files, such as css and images (these
// are freely accessible for a client)
app.use(express.static('public'));

// TODO 8

// TODO 21b

// TODO 2
```

## Routes

In the following step we set up the base page structure (routes) of the app. In later steps we will add more sophisticated logic to the request methods, which are here only placeholders.

### Step 2

```js
// app.js

...

// TODO 2
// Routes, which are basically 
// the different sub-pages of the website
// CAREFUL: routes must be defined last 
// when all app configurations are done
app.use('/', require('./routes/index'));
app.use('/stories', require('./routes/stories'));
app.use('/words', require('./routes/words'));

```

Make sure to keep these at the end of `app.js`

### Step 3

Create in a new folder `routes` the files

* `/routes/index.js`
* `/routes/stories.js`
* `/routes/words.js`

### Step 4

```js
//index.js

let express = require('express');
let router = express.Router();

router.get('/', (req, res) => res.send('INDEX'));

module.exports = router;
```

### Step 5

```js
//stories.js

let express = require('express');
let router = express.Router();

router.get('/add', (req, res) => res.send('STORIES ADD'));
router.post('/add', (req, res) => res.send('STORIES ADD SUBMITTED'));

module.exports = router;
```

### Step 6

```js
// words.js

let express = require('express');
let router = express.Router();

router.get('/', (req, res) => res.send('WORDS'));
router.post('/', (req, res) => res.send('WORDS SUMBITTED'));

module.exports = router;
```

## Views

### Step 7

```js
// app.js

...

// TODO 7
const exphbs = require('express-handlebars');

...
```

### Step 8

```js
// app.js

...

// TODO 8
// Set the html template mechanism provided
// from express to use the handlebars module
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs());

...
```

### Step 9

Create in a new folder `views` the files

* `views/index.handlebars`
* `views/stories.handlebars`
* `views/words.handlebars`

Create inside of the `views` folder, the folder `views/layouts`. Inside of that folder create the file `main.handlebars`:

* `views/layouts/main.handlebars`

### Step 10

```html
{{!-- main.handlebars --}}

<!DOCTYPE html>

<head>
    <meta charset="UTF-8">

    <link rel="stylesheet" href="/css/style.css">

    <title>Stories of the World</title>
</head>

<body>
    <header>
        <h3><a href="/">Stories of the World</a></h3>
        <nav>
            <ul>
                <li>
                    <a href="/stories/add">Add A Story</a>
                </li>
                <li>
                    <a href="/words">The Words</a>
                </li>
            </ul>
        </nav>
    </header>

    <div class="container">
        {{{body}}}
    </div>

</body>

</html>
```

### Step 11

```html
{{!-- index.handlebars --}}

<section id="main" class="main-wrap">

    <h1>A Story For You:</h1>
    <p class="main-text">{{story}}</p>
    <p class="small">
        {{#each words}}
            {{word}}
        {{/each}}
    </p>
</section>
```

### Step 12

```html
{{!-- stories.handlebars --}}

<section id="main" class="main-wrap">

    <h1>Tell us Your Story:</h1>

    {{#each errors}}
        <p class="error">{{text}}</p>
    {{/each}}

    <p class="small">
        {{!-- With handlebars you can access  --}}
        {{!-- an element in an array with the .# notation --}} 
        You must include the words <b>{{words.0.word}}</b>, <b>{{words.1.word}}</b> and <b>{{words.2.word}}</b>.
    </p>


    <form action="/stories/add" method="POST">
        <textarea rows="10" cols="100" name="story" id="story" class="input", placeholder="Your Story...">{{story}}</textarea>

        {{!-- Sending also the words to save with the story. --}}
        <input type="hidden" id="word0" name="word0" value="{{words.0._id}}">
        <input type="hidden" id="word1" name="word1" value="{{words.1._id}}">
        <input type="hidden" id="word2" name="word2" value="{{words.2._id}}">

        <div class="btn-holder">
            <input type="submit" value="Add" class="btn wide">
        </div>
    </form>

</section>
```

### Step 13

```html
{{!-- words.handlebars --}}

<section id="main" class="main-wrap">

    <h1>Give us a Word:</h1>

    {{#each errors}}
        <p class="error">{{text}}</p>
    {{/each}}

    <form action="/words" method="POST">
        <input type="text" name="word" id="word" class="input" maxlength="24" placeholder="Your Word...">
        <input type="submit" value="Add" class="btn">
    </form>


    <div class="words">
    <p class="small gray">
        {{#each words}}
            {{word}}
        {{else}}
            <p>No words available</p>
        {{/each}}
    </p>
    </div>
</section>
```


## Models and Data

### Step 14

Create in a new folder 'config' the file `database.js` with the following content

### Step 15

```js
// database.js

const mongoose = require('mongoose');

// TODO 22
const dbUrl = 'mongodb+srv://admin:admin123@cluster0-hgrys.mongodb.net/storytelling?retryWrites=true&w=majority';

// Connecting
mongoose.connect(dbUrl,
                {useNewUrlParser: true, useUnifiedTopology: true}, 
                (err) => 
{
    if (err) return console.log('Unable to connect to the mongoDB server. Error:', err);
    else console.log('Connection established to', dbUrl);
});

module.exports = mongoose.connection;
```

### Step 16

You can keep the current dbUrl and work with my database, which contains some default data (as of Mon, 20th: the current data is not cleaned up yet, I will do so by We, 22nd). Feel free to add data but don't make it overflow with random test data.

If you rather want to work with your own database to be freer to add as much test data as you want, add your own database dbUrl under `// TODO 22`.

### Step 17

```js
// app.js

...

// TODO 17
// Import database connection (it is
// just in a different file)
const db = require('./config/database');

...
```

### Step 18

Create in a new folder 'models' the files

* `models/Story.js`
* `models/Word.js`

### Step 19

```js
//Story.js

let mongoose = require('mongoose');
let random = require('mongoose-simple-random'); // for retrieving a random document

let Schema = mongoose.Schema;

let StorySchema = new Schema({
    story: {type: String, required: true},
    words : [{ type: Schema.Types.ObjectId, ref: 'Word', required: true}]
});
StorySchema.plugin(random);

// Export model
module.exports = mongoose.model('Story', StorySchema);
```

### Step 20

```js
//Word.js

let mongoose = require('mongoose');
let random = require('mongoose-simple-random'); // for retrieving a random document

let Schema = mongoose.Schema;

let WordSchema = new Schema({
    word: {type: String, required: true},
});
WordSchema.plugin(random);

// Export model
module.exports = mongoose.model('Word', WordSchema);
```

## Retrieve and Save Data

### Step 21

For accessing the html form data from the request object, we use the bodyparser module.

```js
//app.js

//TODO 21a
const bodyParser = require('body-parser');

...

// TODO 21b
app.use(bodyParser.urlencoded({ extended: false }));

```

Now, we are adding more detailed logic to the routes and request methods.

### Step 22

Substitute everything in `index.js` with:

```js
//index.js

"use strict";

let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

// We need to access the stories and words
// in the database, therefore we need their
// mongoose model objects
const Story = require('../models/Story');
const Word = require('../models/Word');

// GET home page.
router.get('/', (req, res) => {

    Story.findOneRandom((err, result_story) => {
        if (err) return console.error(err);


        Word.find({ _id: result_story.words }, (err, result_word) => {
            if (err) return console.error(err);
            // console.log(result_word);

            res.render('index', { story: result_story.story, words: result_word });
        });

    });


});

module.exports = router;
```

### Step 23

Substitute everything in `words.js` with:

```js
//words.js

"use strict";

var express = require('express');
var router = express.Router();

const Word = require('../models/Word');


router.get('/', (req, res) => {

    // 'word -_id': get the field word and not the field _id
    Word.find({}, 'word -_id', (err, dataDb) => {
        if (err) return console.error(err);

        res.render('words', { words: dataDb});
    });
});

router.post('/', (req, res) => {

    let word = req.body.word.toLowerCase();
    
    // Storing all possible errors
    // from our checks
    let errors = [];

    // Error checks
    if (!word) {
        errors.push({ text: 'Empty word -  that makes no sense!' });
    } else if (word.length < 3) {
        errors.push({ text: 'Are you sure that this is a real word?! Words must have at least 3 characters.' });
    }

    // Errors occurred
    if (errors.length > 0)
    {
        // Retrieving all word objects from the database again
        // A bit of a workaround in order to be able to still 
        // display all words after an error is displayed.
        // 'word -_id': get the field word and not the field _id
        Word.find({}, 'word -_id', (err, dataDb) => {
            if (err) return console.error(err);
            res.render('words', { words: dataDb, errors});
        });
    }
    // All good, let's save the input
    // to the database
    else {
        let obj = new Word({ word });
        obj.save((err, element) => {
            if (err) return console.error(err);
            console.log('New word saved in db:', element);
        });

        res.redirect('/words');
    }


});

module.exports = router;
```

### Step 24

Substitute everything in `routes/stories.js` with:


```js
//stories.js

"use strict";

let express = require('express');
let router = express.Router();

const Story = require('../models/Story');
const Word = require('../models/Word');

// GET home page.
router.get('/add', (req, res) => {

    Word.findRandom({}, {}, {limit: 3}, (err, dataDb) => {
        if (err) return console.error(err);
        console.log(dataDb);
        
        res.render('stories', { words: dataDb });
    });
});

router.post('/add', (req, res) => {


    let { story, word0, word1, word2} = req.body;

    let errors = [];

    // Error checks
    if ((!story) || (story.length < 20)) {
        errors.push({ text: 'Your story is too simple... it needs at least 20 characters.' });
    }

    // Errors occurred
    if (errors.length > 0)
    {
        // Retrieving the word objects from the database again.
        // This is a bit of a workaround in order to still have access to valid word
        // objects after an error is displayed.
        Word.find({ _id: [word0, word1, word2] }, (err, result_word) => {
            if (err) return console.error(err);

            res.render('stories', { errors, story, words: result_word });
        });
    }
    // All good, let's save the input
    // to the database
    else {
        let data = new Story({
            story,
            words: [word0, word1, word2]
        });
        // console.log(tmp);

        data.save((err, element) => {
            if (err) return console.error(err);
            console.log('New element saved', element);
        });
        res.redirect('/stories/add');
    }

    
});

module.exports = router;
```