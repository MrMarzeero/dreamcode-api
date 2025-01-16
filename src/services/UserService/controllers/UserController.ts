import bcrypt from 'bcrypt'
import { prismaClient } from "../../../database/prismaClient";
import { Request, Response } from "express" 
import { singUpSchema } from "../../../validation";
import { badRequest } from "../../../helpers";

const SALT_ROUNDS = 10

export class UserController {
    static async createUser(req: Request, res: Response) {
        const { username, email, password } = req.body;
        try {
            singUpSchema.parse(req.body);
        } catch(err) {
            if(err instanceof Error) return res.status(400).json(badRequest(err))
        }


        try {
            const usernameAlreadyExists = await prismaClient.user.findUnique({where: username})
            const emailAlreadyExists = await prismaClient.user.findUnique({where: email})

            if(usernameAlreadyExists || emailAlreadyExists)
                return res.status(400).json(badRequest())

            const hashedPassword = bcrypt.hash(password, SALT_ROUNDS)
            const createUser = await prismaClient.user.create({
                data: {
                    username, 
                    email,
                    password, 
                }
            })
        }
        



    }
}