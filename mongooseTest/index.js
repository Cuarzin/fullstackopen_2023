const mongoose = require('mongoose')
const [name, number] = process.argv.length > 4 ? [process.argv[3], process.argv[4]] : [null, null]

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://chitolsp:${password}@phonebook.kbvcxc9.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Phone = mongoose.model('Phone', phoneSchema)

const phone = new Phone({
	name: name,
	number: number
})

if(name !== null){
	phone.save().then(result => {
		console.log(`added ${result.name}, number: ${result.number} to phonebook `)
		mongoose.connection.close()
	})
	
} else {
	Phone.find({}).then(result => {
		if(result.length === 0){
			console.log('There is no entry on database')
		} else{
			result.forEach(phone => {
				console.log(`${phone.name} ${phone.number}`)
			})
		}
		mongoose.connection.close()
	})
}




/*
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
*/