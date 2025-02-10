import openai from '../../../lib/openai';
import { Request, Response } from 'express';
import { correctQuestion, generateQuizName, generateQuizPrompt } from '../prompts';
import { genQuizSchema } from '../../../validation';
import { badRequest, internalServerError, generationSuccess, uInternalServerError, ubadRequest } from '../../../helpers';
import { prismaClient } from '../../../database/prismaClient';

export class QuizController {
    static async generateQuiz(req: Request, res: Response) {
        try {
            genQuizSchema.parse(req.body);
          } catch (err) {
            if (err instanceof Error) return res.status(400).json(badRequest(err));
          }
          try {
            const completion = await openai.chat.completions.create({
              model: 'gpt-4o-mini',
              messages: [
                { role: 'system', content: generateQuizPrompt },
                { role: 'user', content: JSON.stringify(req.body) },
              ],
            });
      
            const messageContent = completion.choices[0].message.content;
            if(messageContent == null) return res.status(500).json(uInternalServerError("'messageContent' is null"))
            const parsed = JSON.parse(messageContent)
            console.log(parsed)

              const completionName = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                  { role: 'system', content: generateQuizName },
                  { role: 'user', content: JSON.stringify(req.body) },
                ],
              })
              const quizName = completionName.choices[0].message.content;
              if(quizName == null)
                  return res.status(500).json(uInternalServerError("Cannot generate quiz name"))

              const user = await prismaClient.user.findUnique({where: {id: req.params.userId}})
              if(user == null)
                  return res.status(400).json(ubadRequest("Cannot find user"))
              const quiz = await prismaClient.quiz.create({
                data: {
                  name: quizName,
                  topics: req.body.topics,
                  questionsAmount: req.body.questionsAmount,
                  author: {
                    connect: {
                      id: user.id
                    },
                  },
                  questions: {
                    create: parsed.map((question: any) => ({
                      statement: question.problemStatement,
                      options: question.alternatives,
                      hint: question.hint,
                      topics: question.topics,
                      answer: question.answer
                    })),
                  }
                }
              })
              return res.status(201).json(quiz)
            } catch (err) {
            if (err instanceof Error) return res.status(500).json(internalServerError(err));
          }
      }

    static async getQuiz(req: Request, res: Response) {      
      try {
        const quiz = await prismaClient.quiz.findUnique({ where: {id: req.params.id}})
        if(quiz == null)
            return res.status(403).json(ubadRequest("Invalid Quiz"))
        
        if(quiz.authorId != req.params.userId) 
            return res.status(401).json({error: "Access Denied"})
        const questions = await prismaClient.question.findMany({where: {quizId: req.params.id}})

        const response = {
          quiz,
          questions,
        }
        return res.status(200).json(response)

      } catch(err) {
        if(err instanceof Error) return res.status(500).json(internalServerError(err))
      }
    }

    static async updateQuiz(req: Request, res: Response) {
      try {
        const name = req.body.name;
        const quiz = await prismaClient.quiz.findUnique({where: {id: req.params.id}})
        if(quiz == null) 
            return res.status(403).json(ubadRequest("Invalid Quiz"))
        if(quiz.authorId != req.params.userId)
            return res.status(401).json({error: "Access Denied"})

        const update = await prismaClient.quiz.update({
          where: {
            id: quiz.id
          },
          data: {
            name: name,
          }
        })
        return res.status(204).json("Success!")
      } catch(err) {
        if(err instanceof Error) return res.status(500).json(internalServerError(err))
      }
    }
    static async deleteQuiz(req: Request, res: Response) {
      try {
        const quiz = await prismaClient.quiz.findUnique({where: {id: req.params.id}})
        if(quiz == null) 
            return res.status(403).json(ubadRequest("Invalid Quiz"))
        if(quiz.authorId != req.params.userId)
            return res.status(401).json({error: "Access Denied"})

        const deleteQuiz = await prismaClient.quiz.delete({where: {id: req.params.id}})
        return res.status(200).json("Success!")
      } catch(err) {
        if(err instanceof Error) return res.status(500).json(internalServerError(err))
      }
    }
    static async correctQuest(req: Request, res: Response) {
      try {
        const question = await prismaClient.question.findUnique({where: {id: req.params.id}})
        if(question == null)
            return res.status(403).json(ubadRequest("Invalid Question"))
        const quiz = await prismaClient.quiz.findUnique({where: {id: question.quizId}})
        if(quiz == null) 
            return res.status(403).json(ubadRequest("Invalid Quiz"))
        if(quiz.authorId != req.params.userId)
            return res.status(401).json({error: "Acess Denied"})

        const combined = {...req.body, ...question}

        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: correctQuestion},
            { role: 'user', content: JSON.stringify(combined) },
          ],
        });
        const correctedQuest = completion.choices[0].message.content;
        if(correctedQuest == null)
            return res.status(500).json(uInternalServerError("Cannot correct the question"))
        return res.status(201).json(JSON.parse(correctedQuest))

      } catch(err) {
        if(err instanceof Error) return res.status(500).json(internalServerError(err)) 
      }
    }
}