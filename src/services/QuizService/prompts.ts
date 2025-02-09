export const generateQuizPrompt = `
Generate a complete quiz based on the provided JSON input containing quiz details. Extract relevant data from the JSON and create questions adhering to the specified guidelines.

# Steps

1. **Parse the JSON:** Extract the quiz specification details, such as subject, topics, quiz type, number of questions, and optional description.
2. **Question Generation:** For each question, use the topics to create a suitable problem statement and hint.
   - If "quizType" is "discursive", provide a detailed answer.
   - If "quizType" is "multiple choice", include only the correct alternative.
3. **Ensure Topic Inclusion:** Make sure each question includes at least one of the selected topics, possibly combining multiple topics.
4. **Construct JSON Output:** Compile the questions into a structured JSON format as specified. Avoid introducing newline or tab characters within JSON strings.

# Output Format

Output the quiz as a JSON object containing a list of questions. Each question should include the following fields:
- "problemStatement": A clear statement of the problem.
- "alternatives": If it is a multiple choice return its alternatives, else, leave it blank.
- "hint": A helpful hint for solving the problem.
- "topics": A list including at least one of the selected topics.
- "answer": The correct answer or alternative based on the quiz type.

Ensure the resulting JSON is formatted correctly and does not contain invalid escape characters.
Ensure that the answer is proper to parse in JSON.parse(answer) in TS.

# Examples

### Example Input
{
  "subject": "Math",
  "topics": ["geometry", "combinatorics"],
  "quizType": "discursive",
  "questionsAmount": 5,
  "description": "Intermediate difficulty focusing on application of principles."
}

### Example Output
[
  {
    "problemStatement": "Explain how to find the area of a triangle using geometry principles.",
    "alternatives": [],
    "hint": "Consider using base and height.",
    "topics": ["geometry"],
    "answer": "To find the area, use the formula: (base * height) / 2."
  },
  {
    "problemStatement": "How many ways can you arrange 5 books?",
    "alternatives": [],
    "hint": "Use factorials.",
    "topics": ["combinatorics"],
    "answer": "There are 120 ways, calculated as 5 factorial (5!)."
  }
  // (Continue until 5 questions...)
]

Ensure that it return a proper JSON to parse in TS using JSON.parse(content)
For multiple choice quizzes, return a field "options", which is an array of 4 strings, the options.
(Note: Ensure the number of questions matches the "questionsAmount" field in the input. The output must not contain any extraneous characters or formatting.)`;


export const generateQuizName = `
Generate a descriptive name for a quiz in the subject of Math, based on the provided topics and quiz characteristics.

# Steps

1. Identify the subject, topics, and quiz type to understand the focus and nature of the quiz.
2. Consider the description to determine the difficulty level and application focus.
3. Create a concise and relevant name for the quiz, ranging from 1 to 7 words. If the description is in a specific language, generate the name in that language; otherwise, default to English.

# Output Format

- A single sentence or phrase containing the quiz name that spans 1 to 7 words.

# Examples

- Input: \`{"subject": "Math", "topics": ["geometry", "combinatorics"], "quizType": "discursive", "questionsAmount": 5, "description": "Intermediate difficulty focusing on application of principles."}\`
  Output: \`Intermediate Geometric Combinatorics Quiz\`

# Notes

- The name should be catchy and reflective of the quiz content and style.
- Ensure the name aligns with the complexity and nature specified in the description.
`;

export const correctQuestion = `Compare the user's answer and argumentation against the provided correct answer, then return a JSON indicating whether the user's answer is correct or not.

# Steps

1. **Understand the Problem Statement**: Identify the context of the problem and the correct solution provided.
2. **Analyze the User's Answer**: Evaluate the correctness of the user's response and rationale based on the reference answer.
3. **Determine Correctness**: Decide if the user's answer matches the correct answer.
4. **Response Construction**: Format the result in JSON.

# Output Format

The output should be a JSON object, with "correct" being either 1 or 0.

# Examples

**Example 1**:

- User Input: "I think it is 5!+10 because you have 10 ways to do that"
- Reference Answer: "There are 120 ways, calculated as 5 factorial (5!)."
- Output: 
  {
    "correct": 0
  }
(The reasoning doesn't match the factorial calculation correctly.)

**Example 2**:

- User Input: "There are 120 ways because it's 5!"
- Reference Answer: "There are 120 ways, calculated as 5 factorial (5!)."
- Output: 
  {
    "correct": 1
  }
  The output must be strictly like it looks above, no extra characters
  (The user's answer agrees with the correct calculation method.)
Ensure the resulting JSON is formatted correctly and does not contain invalid escape characters.
Ensure that the answer is proper to parse in JSON.parse(answer) in TS.
(Note: Ensure the number of questions matches the "questionsAmount" field in the input. The output must not contain any extraneous characters or formatting.)`;
