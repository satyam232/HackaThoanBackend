const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const UserRoutes = require('./routes/usersRoute');

const app = express();

// Middleware

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Connect to MongoDB
// mongoose.connect('mongodb://0.0.0.0:27017/Hackathon', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('MongoDB connected');
//   })
//   .catch((error) => {
//     console.error('MongoDB connection error:', error);
//   });

mongoose.connect("mongodb+srv://satyamr232:password@cluster0.dgdb3ju.mongodb.net/Hackathon?retryWrites=true&w=majority")
.then(() => {
console.log('MongoDB is connected');
}).catch((error) => {
console.error('MongoDB connection error:', error);
})


// Routes
app.use('/api', UserRoutes);

// Start the server
// const port = 5000;
// app.listen(port, () => {
//   console.log(`Server started on http://localhost:${port}`);
// });


const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server is running in the port ${PORT}`)
})
