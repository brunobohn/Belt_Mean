// Requirements:

let express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    path        = require('path'),
    session     = require('express-session'),
    body_parser = require('body-parser');

app.use(body_parser.json());
app.use(express.static( __dirname + '/client/dist' ));
app.use(express.static(path.join(__dirname, "static")));
app.use(session({
    secret: 'brunobohn@gmail.com',
    proxy: true,
    resave: false,
    saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let server = app.listen(8000, () => {
  console.log("listening on port 8000");
});


// Database:

mongoose.connect('mongodb://localhost/restaurant_db');
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;

// DB Schema & Validations:

let RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Restaurant Name Required'],
    minlength: [3, 'Name should be at least three characters long'],
    trim: true
  },
  cuisine: {
    type: String,
    required: [true, 'Restaurant Cuisine Required'],
    minlength: [3, 'Name should be at least three characters long'],
    trim: true
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, {timestamps: true})

let ReviewSchema = new mongoose.Schema({
  _restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  name: {
    type: String,
    required: [true, 'Name Required'],
    minlength: [3, 'Name should be at least three characters long'],
    trim: true
  },
  star: {
    type: Number,
    default: 1,
    min: [1, 'Evaluation should be between 1-5 Stars'],
    max: [5, 'Evaluation should be between 1-5 Stars']
  },
  content: {
    type: String,
    required: [true, 'Review is required'],
    minlength: [5, 'Review should be at least 5 characters'],
    trim: true
  }
}, {timestamps: true})



// Creating app routing func//

mongoose.model('Restaurant', RestaurantSchema);
mongoose.model('Review', ReviewSchema);

let Restaurant = mongoose.model('Restaurant');
let Review = mongoose.model('Review');

app.get('/restaurants', (req, res) => {
  let restaurants = Restaurant.find({}, (err, restaurants) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json({message: 'Success', data: restaurants});
    }
  })
})

// [Attention] For Black Belt Sort Descending // -- Remember to include it here.

app.get('/restaurants/:id', (req, res) => {
  Restaurant.findOne({_id: req.params.id})
  .populate({path: 'reviews', options: {sort:{"star": "descending"}}})
  .exec( (err, restaurant) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json({message: 'Success', data: restaurant});
    }
  })
})

app.post('/restaurants', (req, res) => {
  const restaurant = new Restaurant(req.body);

  Restaurant.findOne({name: req.body.name}, (error, response) => {
    if (response) {
      res.status(400).json({message: 'It seems this restaurante was already added - Please Check the current list or add a new one'});
    } else {
      restaurant.save((err) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.json({message: 'Success', data: restaurant});
        }
      })
    }
  })
})

app.post('/restaurants/:id', (req, res) => {
  Restaurant.findOne({_id: req.params.id}, (err, restaurant) => {
    const review = new Review(req.body);
    review._restaurant = restaurant._id;
    restaurant.reviews.push(review);
    review.save( (error) => {
      restaurant.save( (e) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.json({message: 'Success', data: review});
        }
      })
    })
  })
})

app.put('/restaurants/:id', (req, res) => {
  const restaurant = Restaurant.findOne({_id: req.params.id}, (err, restaurant) => {
    if (err) {
      res.status(400).json(err);
    } else {
      restaurant.name = req.body.name;
      restaurant.cuisine = req.body.cuisine;
      restaurant.save( (error) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.json({message: 'Success', data: restaurant});
        }
      })
    }
  })
})

app.put('/reviews/:id', (req, res) => {
  const review = Review.findOne({_id: req.params.id}, (err, review) => {
    if (err) {
      res.status(400).json(err);
    } else {
      review.name = req.body.name;
      review.content = req.body.content;
      review.star = req.body.star;
      review.save( (error) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.json({message: 'Success', data: review});
        }
      })
    }
  })
})

app.delete('/restaurants/:id', (req, res) => {
  Restaurant.remove({_id: req.params.id}, (err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json({message: 'Successfully deleted'});
    }
  })
})

app.delete('/reviews/:id', (req, res) => {
  Review.remove({_id: req.params.id}, (err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json({message: 'Successfully deleted'});
    }
  })
})

app.all('*', (req, res, next) => {
  res.sendFile(path.resolve('./client/dist/restaurants.html'));
})

