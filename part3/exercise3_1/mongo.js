const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://test_user_01:${password}@cluster0-sophia.u8wdl.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 3) {
    console.log('phonebook:')
    // Note.find({}).then(result => {
    //     result.forEach(note => {
    //       console.log(note)
    //     })
    //     mongoose.connection.close()
    //   })
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length >= 3) {
    const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    date: new Date(),
    })

    person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
    })
}   

