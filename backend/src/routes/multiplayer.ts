import express from 'express'

export const mRouter = express.Router();

mRouter.get('/user', async (req, res) => {
    res.send(req.user ? req.user : {} );
}) 
