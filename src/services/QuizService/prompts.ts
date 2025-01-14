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

For multiple choice quizzes, return a field "options", which is an array of 4 strings, the options.
(Note: Ensure the number of questions matches the "questionsAmount" field in the input. The output must not contain any extraneous characters or formatting.)`;
