export const generateProblemPrompt = `
Generate a competitive programming problem based on the given constraints and parameters, and return the result strictly in a valid JSON format without any additional text or formatting. 

Use the default constraints of 256mb memory and 1ms time limits. If specific problem information is not provided, make appropriate selections to ensure completeness.

# Steps

1. **Interpret the Details**:
    - O idioma de saída deve ser estritamente o português, conforme o parâmetro "language" do input.
    - Desenvolva uma ideia de problema se uma não for fornecida.
    - Selecione os tópicos relevantes do problema com base em tipos gerais de problemas de programação, se nenhum for especificado.
    - Determine o nível de dificuldade com base na complexidade do problema, se não for pré-definido.

2. **Criação do Enunciado do Problema**:
   - Escreva um enunciado claro e conciso que explique a tarefa a ser realizada pelo usuário.
   - Inclua informações contextuais ou de fundo necessárias para a compreensão do problema.

3. **Definir Especificações de Entrada e Saída**:
   - Especifique claramente o formato de entrada, incluindo restrições e casos especiais.
   - Descreva o formato de saída esperado, garantindo clareza sobre o que é necessário.

4. **Criar Exemplos de Entrada e Saída**:
   - Forneça um exemplo prático com valores de entrada e a saída esperada para ilustrar o que a solução deve produzir.

5. **Incluir Notas ou Explicações**:
   - Adicione esclarecimentos ou insights adicionais relevantes para a resolução do problema, se necessário.

# Formato de Saída

Retorne as informações estritamente no seguinte formato JSON, sem nenhum texto adicional ao redor:

{
    "name": "<Nome do problema>",
    "statement": "<Descrição do problema>",
    "input": "<Especificações detalhadas da entrada>",
    "output": "<Descrição da saída esperada>",
    "sample_input": "<Exemplo de entrada>",
    "sample_output": "<Correspondente exemplo de saída>",
    "notes": "<Notas adicionais ou explicações>"
}

Certifique-se de incluir valores válidos que correspondam às restrições especificadas e não inclua caracteres ou formatações adicionais que tornem o JSON inválido.

# To-Do
- Certifique-se de que a resposta esteja totalmente em português, incluindo enunciado, entrada, saída e notas.
- Garantir que o JSON esteja formatado corretamente.
- Não incluir caracteres extras como backticks ou quebras de linha fora da estrutura JSON.
`;

export const generateSolutionPrompt = `
Dado um JSON que descreve um problema de programação, gere uma solução na linguagem especificada (C++, Python ou JavaScript). A solução deve tratar corretamente a entrada e a saída conforme descrito e implementar a lógica utilizando busca binária para determinar a presença de valores em uma lista de forma eficiente.

- **Estrutura do JSON de Entrada**: 
1. "language": Uma string indicando a linguagem de implementação ("cpp", "py" ou "js").
2. "problem": Um objeto contendo:
    - "name": O nome do problema.
    - "statement": Enunciado do problema.
    - "input": Especificação da entrada.
    - "output": Especificação da saída.
    - "sample_input": Exemplo de entrada.
    - "sample_output": Exemplo correspondente de saída.
    - "notes": Instruções adicionais ou restrições.

# Passos

1. **Analisar a Entrada**:
   - Extraia o número de elementos e os valores da lista.
   - Extraia o número de consultas e os valores a serem verificados.

2. **Implementar a Busca Binária**:
   - Para cada valor de consulta, utilize busca binária para verificar se ele existe na lista.

3. **Gerar a Saída**:
   - Para cada consulta, imprima "sim" se o valor for encontrado, caso contrário, imprima "não".

# Formato de Saída

Retorne um JSON contendo o código da solução. A estrutura deve ser:

{
    "solution": "<TRECHO_CODIGO>"
}

O campo "<TRECHO_CODIGO>" deve conter o código da solução na linguagem especificada, garantindo que siga a estrutura e metodologia indicadas pelo problema.

# To-Do
- Certifique-se de que todos os comentários e mensagens dentro do código estejam em português.
- Garantir que o JSON esteja formatado corretamente.
- Não incluir caracteres extras como backticks ou quebras de linha fora da estrutura JSON.
`;

export const generateTestCasesPrompt = `
Gere casos de teste para um problema de programação competitiva baseado no formato JSON de entrada fornecido. Certifique-se de que a saída JSON seja corretamente formatada para parsing.

# Passos

1. Analise o JSON de entrada para entender o problema, incluindo enunciado, entrada, saída e exemplos.
2. Gere a quantidade exata de casos de teste conforme o parâmetro "test_cases".
3. Para cada caso de teste:
   - Considere variações e casos extremos do problema.
   - Formule entradas que cobrem uma ampla gama de cenários.
   - Determine a saída esperada para cada entrada, garantindo consistência com a lógica do problema.
4. Compile as informações no formato JSON estruturado abaixo.

# Formato de Saída

A saída deve ser um JSON válido e parseável. Deve incluir:
- Uma chave "test_cases" contendo um array de objetos de caso de teste.
- Cada objeto de caso de teste deve incluir:
  - "input": String representando a entrada do caso de teste.
  - "output": String representando a saída esperada.

# Exemplo de Saída

{
    "test_cases": [
        {
            "input": "Entrada de exemplo para o caso 1",
            "output": "Saída esperada para o caso 1"
        },
        {
            "input": "Entrada de exemplo para o caso 2",
            "output": "Saída esperada para o caso 2"
        }
    ]
}

# Notas

- Certifique-se de que os casos de teste cobrem todo o espaço de entrada possível dentro das restrições do problema.
- Verifique se as saídas estão corretas e seguem a lógica do problema.
- Use os exemplos de entrada/saída como referência para garantir a consistência.
- Todos os textos, inclusive as descrições dos testes, devem estar em português.
`;
