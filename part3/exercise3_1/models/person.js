const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    validate: {
      isAsync: true,
      validator: function(value, isValid) {
        const self = this
        return self.constructor.findOne({ name: value })
          .exec(function(err, user) {
            if (err) {
              throw err
            } else if (user) {
              if (self.id === user.id) {
                return isValid(true)
              }
              return isValid(false)
            } else {
              return isValid(true)
            }
          })
      },
      message: 'This name is already taken'
    }
  },
  number: {
    type: String,
    minLength: 8,
    required: true
  } },
{ timestamps: true }
)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)