const express = require('express');


const exphbs = require('express-handlebars');

const app = express();

// Have the app listen to port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on ${port}`));

app.use(express.static('public'));

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs());

app.get('/', function(_req, res){
    res.render('index');
});

//  Routes
app.use('/', require('./routes/index'));
app.use('/project', require('./routes/project'));

