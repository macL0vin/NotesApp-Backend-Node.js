const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/notes-api', {
// });

const uri = "mongodb+srv://Cluster43002:S1xuQldMc3VG@cluster43002.ltard.mongodb.net/?retryWrites=true&w=majority&appName=Cluster43002";

mongoose.connect(uri, {
});