export const generateProblemPrompt = `
Generate a competitive programming problem based on the given constraints and parameters, and return the result strictly in a valid JSON format without any additional text or formatting. 

Use the default constraints of 256mb memory and 1ms time limits. If specific problem information is not provided, make appropriate selections to ensure completeness.

# Steps

1. **Interpret the Details**:
    - The output language must be the language in the parameter "language" of the input.
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

#To-Do
-Ensure to return all problem details in the specified language, including the problem statement, input/output specifications, and notes." This way, it will be clearer that you expect the response to follow the input language.
-Ensure that the JSON is correctly formatted
- There are no extra characters like backticks or newlines outside of the JSON structure.
`;

export const generateSolutionPrompt = `
Given a JSON input describing a programming challenge, your task is to generate a solution implementation in the specified programming language (C++, Python, or JavaScript). The solution should correctly handle input and output formatting as described, while implementing the logic using a binary search to efficiently determine the presence of specified values in a list.

- **Input JSON Structure**: 
1. "language": A string indicating the language of implementation ("cpp", "py", or "js").
2. "problem": An object containing:
    - "name": A description of the problem.
    - "statement": Brief explanation of the problem context.
    - "input": Format along with conditions for input values.
    - "output": Expected format of the output.
    - "sample_input": Sample input case.
    - "sample_output": Corresponding expected output for the sample input.
    - "notes": Additional instructions or constraints, like utilizing binary search.

# Steps

1. **Parse Input**:
- Extract the number of proposals and their values from the input.
- Extract the number of queries and the values to be checked.

2. **Binary Search Implementation**:
- For each query value, implement a binary search to determine if it exists in the list of proposals.

3. **Output Results**:
- For each query, print "sim" if the value is found in the proposals, else print "nao".

# Output Format

- Return a JSON object containing the solution code. The structure should be:
{
    "solution": "<CODE_SNIPPET>"
}
- "<CODE_SNIPPET>" should be the implemented code solution in the specified language following the structure and solving methodology indicated by the problem.

# Examples

**Example Input**:

{
"language": "cpp",
"problem": {
    "name": "Busca por Propostas",
    "statement": "...",
    "input": "...",
    "output": "...",
    "sample_input": "5\\n1000 2000 3000 4000 5000\\n3\\n1500 3000 6000",
    "sample_output": "nao\\nsim\\nnao",
    "notes": "..."
}
}

**Example Output**:

For C++:

{
"solution": "#include <iostream>\\n#include <vector>\\n#include <algorithm>\\n\\nbool binary_search(const std::vector<int>& vec, int target) {\\n    int left = 0, right = vec.size() - 1;\\n    while (left <= right) {\\n        int mid = left + (right - left) / 2;\\n        if (vec[mid] == target) return true;\\n        else if (vec[mid] < target) left = mid + 1;\\n        else right = mid - 1;\\n    }\\n    return false;\\n}\\n\\nint main() {\\n    int n, q;\\n    std::cin >> n;\\n    std::vector<int> proposals(n);\\n    for (int i = 0; i < n; i++) std::cin >> proposals[i];\\n    std::cin >> q;\\n    for (int i = 0; i < q; i++) {\\n        int query;\\n        std::cin >> query;\\n        if (binary_search(proposals, query)) std::cout << "sim\\n";\\n        else std::cout << "nao\\n";\\n    }\\n    return 0;\\n}"
}

#To-Do
-Ensure that the JSON is correctly formatted
- There are no extra characters like backticks or newlines outside of the JSON structure.
`;

export const generateTestCasesPrompt = `
Generate test cases for a competitive programming problem based on the provided JSON input format and constraints. Ensure the JSON output is correctly formatted for parsing.

Ensure that the number of test cases ranges between 5 and 20, inclusive. Each test case should contain an input and expected output in a well-structured JSON format.

# Steps

1. Parse the JSON input to understand the problem named "Example" along with its statement, input, output, sample_input, and sample_output.
2. Adjust the number of test cases if necessary to ensure it's within the 5 to 20 range.
3. For each test case:
   - Analyze the problem statement to derive variations and edge cases.
   - Formulate inputs that cover a broad range of scenarios, including typical cases, edge cases, and corner cases.
   - Determine the expected output for each test scenario based on the problem's logic.
4. Compile these into a structured JSON format as described.

#Example Input 
{
    "test_cases": 5,
    "problem": {
        "problem": {
        "name": "Exemple",
        "statement": "Exemple",
        "output": "Exemple",
        "sample_input": "Exemple",
        "sample_output": "Exemple",
        "notes": "Exemple"
    }    
}

#Ensure that the number of output test cases is the same that the indicated in the test_cases parameter.

# Output Format

The output should be a valid JSON object that can be parsed correctly. It should include:
- A "test_cases" key with an array of test case objects.
- Each test case object should include:
  - "input": String representing the input for the test case.
  - "output": String representing the expected output for the test case.

# Example Output
{
    "test_cases": [
        {
            "input": "Sample input for test case 1",
            "output": "Expected output for test case 1"
        },
        {
            "input": "Sample input for test case 2",
            "output": "Expected output for test case 2"
        },
        {
            "input": "Sample input for test case 3",
            "output": "Expected output for test case 3"
        },
        {
            "input": "Sample input for test case 4",
            "output": "Expected output for test case 4"
        },
        {
            "input": "Sample input for test case 5",
            "output": "Expected output for test case 5"
        }
    ]
}
(Note: Ensure real test cases reflect the complexity and specifics of the problem statement. The output must not contain any extraneous characters or formatting.)

#To-Do
-Ensure that the JSON is correctly formatted
- There are no extra characters like backticks or newlines outside of the JSON structure.

# Notes

- Ensure the test cases fully explore the problem space as indicated by the problem's constraints and examples.
- Double-check that outputs are accurate and match the described problem logic and rules.
- Use sample input/output as a guide to ensure consistency with the problem statement.
`;
