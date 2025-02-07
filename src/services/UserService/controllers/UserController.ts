import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prismaClient } from "../../../database/prismaClient";
import { Request, Response } from "express" 
import { singUpSchema } from "../../../validation";
import { badRequest, generationSuccess, internalServerError, ubadRequest, uInternalServerError } from "../../../helpers";
import { genData } from '../../../interfaces';

const SALT_ROUNDS = 10
const SECRET_KEY = process.env.SECRET_KEY || "leaked"

export class UserController {
    static async createUser(req: Request, res: Response) {
        const { username, email, password } = req.body;
        try {
            const usernameAlreadyExists = await prismaClient.user.findUnique({where: {username: username}})
            const emailAlreadyExists = await prismaClient.user.findUnique({where: {email: email}})

            if(usernameAlreadyExists || emailAlreadyExists)
                return res.status(400).json(ubadRequest("username or email already exists on database"))

            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
            const user = await prismaClient.user.create({
                data: {
                    username, 
                    email,
                    password: hashedPassword, 
                }
            })
            
            if(user == null) return res.status(400).json(ubadRequest("cannot find this user"))
            const token = jwt.sign(
                { userId: user.id },
                SECRET_KEY,
                { expiresIn: "1h" }
            )

            const response: genData = {
                data: {
                    token,
                    user, 
                }
            }
            return res.status(201).json(response)
        } catch(err) {
            if(err instanceof Error) return res.status(500).json(internalServerError(err))
        }
    }

    static async logUser(req: Request, res: Response) {
        const authFactor = req.body.email || req.body.username
        try {
            const user = await prismaClient.user.findFirst({
                where: {
                    OR: [
                        { email: authFactor },
                        { username: authFactor },
                    ]
                }
            })
            if(user == null) return res.status(400).json(ubadRequest("Cannot find user"))   
            const compare = await bcrypt.compare(req.body.password, user.password);
            if(!compare) return res.status(400).json(ubadRequest("Invalid password"))
                
            const token = jwt.sign(
                { userId: user.id },
                SECRET_KEY,
                { expiresIn: "1h" }
            )

            const response: genData = {
                data: {
                    token,
                    user
                }
            }

            return res.status(200).json(generationSuccess(response))
        } catch(err) {
            if(err instanceof Error) return res.status(500).json(internalServerError(err))
        }
    }

    static async updateUser(req: Request, res: Response) {
        const { username, email, password } = req.body;
        const { userId } = req.params;
    
        try {
            const user = await prismaClient.user.findUnique({ where: { id: userId } });
            if (!user) return res.status(404).json(ubadRequest("User not found"));
    
            const updatedData: Partial<{ username: string; email: string; password: string }> = {};
    
            if (username) updatedData.username = username;
            if (email) updatedData.email = email;
            if (password) updatedData.password = await bcrypt.hash(password, SALT_ROUNDS);
    
            const updatedUser = await prismaClient.user.update({
                where: { id: userId },
                data: updatedData,
            });
    
            if (!updatedUser) return res.status(400).json(ubadRequest("Failed to update user"));

    
            return res.status(200).json(updatedUser);
        } catch (err) {
            if (err instanceof Error) return res.status(500).json(internalServerError(err));
        }
    }
    
    static async deleteUser(req: Request, res: Response) {
        const { userId } = req.params;
    
        try {
            const user = await prismaClient.user.findUnique({ where: { id: userId } });
            if (!user) return res.status(404).json(ubadRequest("User not found"));
    
            await prismaClient.user.delete({ where: { id: userId } });
    
            return res.status(200).json("Success!");
        } catch (err) {
            if (err instanceof Error) return res.status(500).json(internalServerError(err));
        }
    }
    
    static async getUser(req: Request, res: Response) {
        const { userId } = req.params;
    
        try {
            const user = await prismaClient.user.findUnique({ where: { id: userId } });
            if (!user) return res.status(404).json(ubadRequest("User not found"))
    
            return res.status(200).json(user);
        } catch (err) {
            if (err instanceof Error) return res.status(500).json(internalServerError(err));
        }
    }
    
}
