var express		=	require('express');
var path		=	require('path');
var bodyParser	=	require('body-parser');
var mongoose	=	require('mongoose');
var cors        =   require('cors');

var passport    = require('passport');

require('./config/passport')(passport);

//- Load configs
var config = require('./config/database');

//- Mongoose connection
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
	console.log('Connected to database' +config.database);
});

var app		= 	express();
var port 	=	3000;

//- Body parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Passport
app.use(passport.initialize());
app.use(passport.session());

// parse application/json
app.use(bodyParser.json())

// CORS Middleware
app.use(cors());

//- Set static folder
app.use(express.static(path.join(__dirname, 'public')));
//- Routes
var voters 	= 	require('./routes/voters');
var authCandidates = require('./routes/auth/auth-candidates');
var authVoters	=	require('./routes/auth/auth-voters');

//- Voter Route
app.use('/voter', voters);
//- Auth Routes
app.use('/auth/candidate', authCandidates);
app.use('/auth/voter', authVoters);



//- Index route
app.get('/', (req, res) => {
	res.send('Index route');
});


app.listen(port, () => {
	console.log('server started on port' +port);
});