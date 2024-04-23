import express from "express";
const router = express.Router()

router.get('/questions', (req, res) => {

})

// get one quiz question
router.get('/questions/:id', (req, res) => {

})

// create one quiz question
router.post('/questions', (req, res) => {

})

// update one quiz question
router.put('/questions/:id', (req, res) => {

})

// delete one quiz question
router.delete('/questions/:id', (req, res) => {

})

// this one is just a test
router.get('/', (req, res) => {
    res.send('H3ll0 W0RlD')
})
module.exports = router