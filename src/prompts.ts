export const generateProblemPrompt = `
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
`