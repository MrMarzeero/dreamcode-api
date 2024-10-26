import { Request, Response } from 'express';
import openai from '../lib/openai';

export class ProblemController {
    static async generateProblem(req: Request, res: Response) {
        try {
            const { language, context, topics, level } = req.body;
            if (!language || !context || !topics || !level) 
                return res.status(400).json({ error: 'Bad Request: Missing Informations (language, context, topics or level)' });

            const prompt = `
                Generate a competitive programming problem based on the given constraints and parameters, and return the result strictly in a valid JSON format without any additional text or formatting. 

                Use the default constraints of 256mb memory and 1ms time limits. If specific problem information is not provided, make appropriate selections to ensure completeness.

                # Steps

                1. **Interpret the Details**:
                   - If a language is not specified, use English by default.
                   - Develop a problem idea if one is not provided.
                   - Select the relevant problem topics based on general programming problem types if none are specified.
                   - Determine the difficulty level based on problem complexity if not pre-defined.

                2. **Create a Problem Statement**:
                   - Write a concise and clear problem statement that explains the task the user must perform.
                   - Include necessary background or contextual information pertinent to the problem.

                3. **Define Input and Output Specifications**:
                   - Clearly specify the input format, including constraints and any special cases.
                   - Outline the desired output format, ensuring clarity on what is expected as a solution.

                4. **Construct Sample Inputs and Outputs**:
                   - Create an example scenario with both input values and expected output to provide clarity on what the solution should entail.

                5. **Include Notes or Explanations**:
                   - Offer additional clarifications or insights relevant to solving the problem, if useful for understanding.

                # Output Format

                Return the information structured strictly in the following JSON format, without any surrounding text:

                {
                    "name": "<Name of the problem>",
                    "statement": "<Problem statement description>",
                    "input": "<Detailed input specifications>",
                    "output": "<Description of expected output>",
                    "sample_input": "<Example of input values>",
                    "sample_output": "<Corresponding example output>",
                    "notes": "<Additional notes or explanations>"
                }

                Make sure to include valid values that match the specified constraints, and do not include any additional characters or formatting that would make the JSON invalid.
            `;

            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: prompt },
                    { role: "user", content: `Language: ${language}, Context: ${context}, Topics: ${topics}, Level: ${level}` },
                ]
            });

            const messageContent = completion.choices[0].message.content;

            if(messageContent != null) {
                const jsonResponse = JSON.parse(messageContent);
                return res.status(201).json(jsonResponse);
            }
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
