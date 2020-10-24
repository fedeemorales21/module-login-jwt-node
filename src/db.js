const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

.then( db => console.log('db connected'))
.catch(err => console.log(err))