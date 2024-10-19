
const express = require('express');
const app = express();
const fs = require('fs');

require('./db/mongoose')

const Note = require('./models/note')

app.use(express.json())

// app.get('/notes', (request, result) => {
// 	// fs.readFile(__dirname + '/' + "notes.json", 'utf-8', (err, data) => {
// 	// 	if (err) {
// 	// 		return console.log(err)
// 	// 	}
// 	// 	result
// 	// 		.status(200)
// 	// 		.send(data)
// 	// } )
// })


app.get('/notes', async (request, result) => {
	try {
		const notes = await Note.find({})
		result.send(notes)
	}
	catch (err) {
		result.send(notes)
	}
})

app.post('/notes', async (request, result) => {
	const note = new Note(request.body)

	try {
		await note.save()
		result
			.status(201)
			.send(note)
	}
	catch (err) {
		result
			.status(400)
			.send(err)
	}
})

app.patch('/notes/:id', async (request, result) => {
	try {
		const notes = await Note.findById(request.params.id)
		notes.note = request.body.note

		if (!notes) {
			return result.status(404).send()
		}

		await notes.save()

		result
			.status(200)
			.send(notes)
	}
	catch (err) {
		result
			.status(400)
			.send(err)
	}
})

app.delete('/notes/:id', async (request, result) => {
	try {
		const notes = await Note.findByIdAndDelete(request.params.id)

		if (!notes) {
			return result.status(404).send()
		}

		result.status(200).send("${request.params.id} was deleted")
	} catch (err) {
		result.status(400).send(err)
	}
})

// app.post('/notes', (request, result) => {
// 	const note = new Note(request.body)

// 	note
// 		.save()
// 		.then(() => {
// 			result.status(200).send(note)
// 		})
// 		.catch((err) => {
// 			result.status(500).send(err)
// 		})
// })

app.listen(3000, () => {
	console.log('Server is running on port 3000')
})