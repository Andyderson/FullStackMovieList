let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/movieData');

let db = mongoose.connection;

let movieSchema = mongoose.Schema({
    id: Number,
    title: {type: String, unique: true},
    description: String,
});

let Movie = mongoose.model('Movie', movieSchema);

module.exports.Movie = Movie;

// <<<<<<<<<<<<<<<<<<< Example >>>>>>>>>>>>>>>>>>>>>>>>>
// let stephMovie = new Movie({'id': 1, 'title': 'Steph\'s Cool', 'description': 'She gives me sushiritto'});
//     stephMovie.save((err, movie) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Save Succesful')
//         Movie.find((err, data) => {
//             if (err) {
//                 console.log('Find Failure');
//             } else {
//                 console.log('Find Success', data);
//             }
//         });
//     }
//   });