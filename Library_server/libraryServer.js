import express from "express";
import cors from "cors";
import jwt, { verify } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
import bcrypt from 'bcryptjs'

const server = express()


server.use(cors({
    origin: '*',
}))

server.use('/books', express.static('./books'));
server.use(express.json());
server.listen(8000, () => {
    console.log('Server is running')
})


let collectionBooks = '';
let collectionCategories = '';
let collectionUsers = '';
let collectionGivedBooks = '';
let collectionArchiveOfBooksGivenToStudents = '';
let collectionFeedbackMessages = '';
let collectionRemovedFeedbackMessages = '';

const mongoClient = new MongoClient("mongodb://localhost:27017/");

(async function () {

    await mongoClient.connect(function (err, client) {

        const cleanup = () => {
            client.close()
            process.exit()
        }

        process.on('SIGINT', cleanup)
        process.on('SIGTERM', cleanup)

        const db = client.db("mongo");
        collectionCategories = db.collection("ganres");
        collectionBooks = db.collection("books")
        collectionUsers = db.collection('users')
        collectionGivedBooks = db.collection('givedBooks')
        collectionArchiveOfBooksGivenToStudents = db.collection('archiveOfBooksGivenToStudents')
        collectionFeedbackMessages = db.collection('feedbackMessages')
        collectionRemovedFeedbackMessages = db.collection('removedFeedbackMessages')
    });
})()

function getTokens(data) {

    const signatureAccess = 'MyVeryHardSecretAccess'
    const accessToken = jwt.sign({ data }, signatureAccess, { expiresIn: '3d' })

    return accessToken
}

server.get('/api/booksnumber', async (req, res) => {
    try {
        await collectionBooks.stats().then(resp => res.json(resp.count))
    } catch (err) {
        console.log(err)
    }
})

server.get('/api/books', async (req, res) => {
    if (req.query.type) {
        try {
            await collectionBooks.find(req.query).toArray()
                .then(resp => res.json(resp))
        }
        catch (err) {
            console.log(err)
        };
    } else {
        res.json('Empty')
    }
})

server.get('/api/categories', (req, res) => {
    try {
        collectionCategories.find().toArray()
            .then(resp => res.json(resp))
    } catch (err) {
        console.log(err)
    }
})

server.get('/api/aboutcategories', async (req, res) => {
    if (req.query.type) {
        const aboutCategoriesData = await collectionCategories.findOne(req.query);
        res.json(aboutCategoriesData);
    } else {
        res.json('Error')
    }
})

server.get('/api/searchBooks', async (req, res) => {
    if (req.query.dataForSearchBooks) {
        await collectionBooks.find({ name: { $regex: `${req.query.dataForSearchBooks}`, $options: "i" } })
            .toArray()
            .then(resp => res.json(resp))
    } else {
        res.json([])
    }
})

server.post('/api/setfavoritebook', verifyAuthorizationMiddleware, async (req, res) => {
    const { _id, img, name, author, description } = req.body.dataForFavoriteBook

    const searchedFavoriteBook = await collectionUsers.find({ favoriteBooks: { $elemMatch: { id: _id } } }).toArray()
    if (searchedFavoriteBook.length) {
        return res.sendStatus(400)
    }
    await collectionUsers.updateOne({ email: req.user.data }, {
        $push: {
            favoriteBooks: {
                id: _id,
                img: img,
                name: name,
                author: author,
                description: description
            }
        }
    })
    res.sendStatus(200)
})

server.post('/api/createbook', async (req, res) => {
    const { img, type, name, author, description, pathForDownload, language, dataEdition, bookCode, barCode } = req.body.valuesForCreate
    await collectionBooks.insertOne({
        img,
        type,
        name,
        author,
        description,
        pathForDownload,
        language,
        dataEdition,
        bookCode,
        barCode
    })
        .then(resp => res.json({ ...req.body, resp }))
}
)

server.put('/api/updatebook', async (req, res) => {
    const { img, type, newNameForUpdate, author, description, id, pathForDownload, language, dataEdition, bookCode, barCode } = req.body.valuesForUpdate
    await collectionBooks.updateOne({ '_id': ObjectId(id) }, {
        $set:
        {
            pathForDownload,
            img,
            type,
            name: newNameForUpdate,
            author,
            description,
            language,
            dataEdition,
            bookCode,
            barCode
        }
    }).then(() => res.json('Tarmacvac e')).catch(err => res.json('Arajacel e xndir'))
})

server.delete('/api/deletebook', async (req, res) => {
    const { idForDeleteBook } = req.body
    await collectionBooks.deleteOne({ '_id': ObjectId(idForDeleteBook) }).then(() => { res.json('Jnjvac e') })
})



server.post('/api/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, group, passport, userQrCode } = req.body
        const searchUser = await collectionUsers.findOne({ email: email })
        if (searchUser) {
            return res.sendStatus(400)
        }

        const hashPassword = bcrypt.hashSync(password, 10)

        await collectionUsers.insertOne({
            firstName,
            lastName,
            email,
            hashPassword,
            group,
            passport,
            favoriteBooks: [],
            userQrCode
        })

        res.sendStatus(200)

    } catch (err) {
        console.log(err)
    }
})


server.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await collectionUsers.findOne({ email: email })

        if (!user) {
            return res.sendStatus(401)
        }

        const validPassword = bcrypt.compareSync(password, user.hashPassword)

        if (!validPassword) {
            return res.sendStatus(401)
        }

        const tokensForLogin = getTokens(email)
        res.send({
            accessToken: tokensForLogin,
        })

    } catch (err) {
        console.log(err)
    }
})


function verifyAuthorizationMiddleware(req, res, next) {

    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : ''

    if (!token) {
        return res.sendStatus(401)
    }

    try {
        const decoded = jwt.verify(token, 'MyVeryHardSecretAccess')
        req.user = decoded
        return next()
    } catch (err) {
        res.sendStatus(401)
    }

}

server.get('/api/profile', verifyAuthorizationMiddleware, async (req, res) => {
    collectionUsers.findOne({ email: req.user.data })
        .then(resp => res.json(resp))
})

server.post('/api/changename', verifyAuthorizationMiddleware, async (req, res) => {
    collectionUsers.updateOne({ email: req.user.data }, { $set: { firstName: req.body.newName } })
})

server.get('/api/downloadbook', async (req, res) => {
    const { bookidfordownload } = req.query
    const book = await collectionBooks.findOne({ '_id': ObjectId(bookidfordownload) })
    if (book.pathForDownload) {
        res.send(book.pathForDownload), err => {
            console.log(err)
        }
    } else {
        res.sendStatus(404)
    }

})

server.get('/api/getfavoritebooks', verifyAuthorizationMiddleware, async (req, res) => {
    await collectionUsers.findOne({ email: req.user.data })
        .then(resp => res.json(resp.favoriteBooks))
})

server.delete('/api/removefavoritebook', verifyAuthorizationMiddleware, async (req, res) => {
    const { idForRemove } = req.body
    await collectionUsers.updateOne({ email: req.user.data }, { $pull: { favoriteBooks: { id: idForRemove } } })
        .then(resp => res.sendStatus(200))

})

server.get('/api/allbooks', async (req, res) => {
    await collectionBooks.find().toArray()
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

server.post('/api/createcategorie', async (req, res) => {
    const { title, img, aboutGenre, type } = req.body.valuesForCreateCategorie
    await collectionCategories.insertOne({
        title,
        img,
        aboutGenre,
        type
    }).then(e => res.sendStatus(200))
})

server.put('/api/updatecategorie', async (req, res) => {
    const { id, title, img, aboutGenre, type } = req.body.valuesForUpdateCategorie
    await collectionCategories.updateOne({ '_id': ObjectId(id) }, {
        $set: {
            title,
            img,
            aboutGenre,
            type
        }
    }).then(resp => res.sendStatus(200))
})

server.delete('/api/deletecategorie', async (req, res) => {
    const { idForDeleteCategorie } = req.body
    await collectionCategories.deleteOne({ '_id': ObjectId(idForDeleteCategorie) }).then(resp => res.sendStatus(200))
})

server.post('/api/senddataforgivebook', async (req, res) => {
    const { dataForGiveBookArg } = req.body
    const user = await collectionUsers.findOne({ userQrCode: dataForGiveBookArg.qrCode })
    if (!user) {
        return res.sendStatus(404)
    }

    const book = await collectionBooks.findOne({ barCode: dataForGiveBookArg.barCode })
    if (!book) {
        return res.sendStatus(404)
    }

    await collectionGivedBooks.insertOne({
        firstName: user.firstName,
        lastName: user.lastName,
        group: user.group,
        bookName: book.name,
        bookAuthor: book.author,
    })
    res.sendStatus(200)
    await collectionArchiveOfBooksGivenToStudents.insertOne({
        firstName: user.firstName,
        lastName: user.lastName,
        group: user.group,
        bookName: book.name,
        bookAuthor: book.author,
        createdAt: `${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()}`
    })
})

server.get('/api/givedbooks', async (req, res) => {
    await collectionGivedBooks.find().toArray().then(givedBooks => res.json(givedBooks))
})

server.delete('/api/deletegivedbooks', async (req, res) => {
    const { id } = req.query;
    await collectionGivedBooks.deleteOne({ _id: ObjectId(id) }).then(resp => res.sendStatus(200))
})

server.get('/api/archiveofbooksgiventostudents', async (req, res) => {
    await collectionArchiveOfBooksGivenToStudents.find().toArray().then(resp => res.json(resp))
})

server.post('/api/sendfeedbackmessage', verifyAuthorizationMiddleware, async (req, res) => {
    const { theme, text } = req.body.feedbackMessage.values;
    const { firstName, lastName, email, group } = req.body.feedbackMessage.profileData;
    await collectionFeedbackMessages.insertOne({
        firstName,
        lastName,
        email,
        group,
        theme,
        text,
        createdAt: `${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()} | ${new Date().getHours()} : ${new Date().getMinutes()}`
    }).then(() => res.sendStatus(200))
})

server.get('/api/getfeedbackmessages', verifyAuthorizationMiddleware, async (req, res) => {
    await collectionFeedbackMessages.find().toArray().then(resp => res.json(resp))
})

server.delete('/api/deletefeedbackmessage', verifyAuthorizationMiddleware, async (req, res) => {
    const { id } = req.query
    const feedbackMessage = await collectionFeedbackMessages.findOne({ _id: ObjectId(id) })
    await collectionRemovedFeedbackMessages.insertOne(feedbackMessage)
    await collectionFeedbackMessages.deleteOne({ _id: ObjectId(id) }).then(res.sendStatus(200))
})

server.get('/api/removedfeedbackmessages', verifyAuthorizationMiddleware, async (req, res) => {
    await collectionRemovedFeedbackMessages.find().toArray().then(resp => res.json(resp))
})