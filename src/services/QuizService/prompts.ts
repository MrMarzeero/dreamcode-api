export const generateQuizPrompt = `Gere um quiz completo com base no JSON de entrada fornecido, contendo os detalhes do quiz. Extraia os dados relevantes do JSON e crie perguntas que sigam as diretrizes especificadas.

# Passos

1. **Analisar o JSON:** Extraia os detalhes da especificação do quiz, como matéria, tópicos, tipo de quiz, número de perguntas e descrição opcional.
2. **Geração de Perguntas:** Para cada pergunta, utilize os tópicos para criar um enunciado adequado e uma dica.
   - Se "quizType" for "discursivo", forneça uma resposta detalhada.
   - Se "quizType" for "múltipla escolha", inclua apenas a alternativa correta.
3. **Garantir Inclusão dos Tópicos:** Certifique-se de que cada pergunta inclui pelo menos um dos tópicos selecionados, podendo combinar múltiplos tópicos.
4. **Construção do JSON de Saída:** Compile as perguntas em um formato JSON estruturado conforme especificado. Evite introduzir caracteres de nova linha ou tabulação dentro das strings do JSON.

**IMPORTANTE:** Retorne a resposta estritamente em português.

# Formato de Saída

O quiz deve ser retornado como um objeto JSON contendo uma lista de perguntas. Cada pergunta deve incluir os seguintes campos:
- "problemStatement": Um enunciado claro do problema.
- "alternatives": Caso seja uma questão de múltipla escolha, liste as alternativas; caso contrário, deixe em branco.
- "hint": Uma dica útil para resolver o problema.
- "topics": Uma lista contendo pelo menos um dos tópicos selecionados.
- "answer": A resposta correta ou alternativa correta, dependendo do tipo de quiz.

O JSON deve ser uma **lista de perguntas**, e não um objeto. Certifique-se de que a resposta segue estritamente este formato:

[
  {
    "problemStatement": "...",
    "alternatives": [],
    "hint": "...",
    "topics": ["..."],
    "answer": "..."
  }
]

Certifique-se de que o JSON resultante está formatado corretamente e não contém caracteres inválidos de escape. O JSON deve ser válido para ser analisado com JSON.parse() em TypeScript.

# Exemplos

### Exemplo de Entrada
{
  "subject": "Matemática",
  "topics": ["geometria", "combinatória"],
  "quizType": "discursivo",
  "questionsAmount": 5,
  "description": "Dificuldade intermediária com foco na aplicação de princípios."
}

### Exemplo de Saída
[
  {
    "problemStatement": "Explique como descobrir a área de um triângulo usando princípios de geometria.",
    "alternatives": [],
    "hint": "Considere usar base e altura.",
    "topics": ["Geometria"],
    "answer": "Para encontrar a área, use a fórmula: (base x altura) / 2."
  },
  {
    "problemStatement": "Quantas permutações existem para 5 números distintos?",
    "alternatives": [],
    "hint": "Use fatorial.",
    "topics": ["Combinatória"],
    "answer": "Há um total de 120 maneiras, calculadas com (5!)."
  }
  // (Continue até atingir 5 perguntas...)
]
`;

export const generateQuizName = `
Gere um nome descritivo para um quiz na matéria de Matemática, com base nos tópicos fornecidos e nas características do quiz.

# Passos

1. Identifique a matéria, os tópicos e o tipo de quiz para compreender o foco e a natureza do quiz.
2. Considere a descrição para determinar o nível de dificuldade e o foco da aplicação.
3. Crie um nome conciso e relevante para o quiz, contendo de 1 a 7 palavras. Se a descrição estiver em português, gere o nome em português; caso contrário, utilize o idioma padrão da descrição.

**IMPORTANTE:** Retorne o nome do quiz estritamente em português.

# Formato de Saída

- Uma única frase contendo o nome do quiz, com no máximo 7 palavras.

# Exemplos

- Entrada: \`{"subject": "Matemática", "topics": ["geometria", "combinatória"], "quizType": "discursivo", "questionsAmount": 5, "description": "Dificuldade intermediária com foco na aplicação de princípios."}\`
  Saída: \`Quiz de Combinatória e Geometria Intermediária\`

# Observações

- O nome deve ser chamativo e refletir o conteúdo e estilo do quiz.
- Certifique-se de que o nome está alinhado com a complexidade e a natureza especificada na descrição.
`;

export const correctQuestion = `Compare a resposta e a argumentação do usuário com a resposta correta fornecida e retorne um JSON indicando se a resposta do usuário está correta ou não.

# Passos

1. **Compreender o Enunciado do Problema:** Identifique o contexto do problema e a solução correta fornecida.
2. **Analisar a Resposta do Usuário:** Avalie a correção da resposta e da justificativa com base na resposta de referência.
3. **Determinar a Correção:** Decida se a resposta do usuário corresponde à resposta correta.
4. **Construção da Resposta:** Formate o resultado em JSON.

**IMPORTANTE:** Retorne a resposta estritamente em português.

# Formato de Saída

A saída deve ser um objeto JSON, onde "correct" pode ser 1 (correto) ou 0 (incorreto).

# Exemplos

**Exemplo 1**:

- Resposta do Usuário: "Acredito que seja 5! + 10 porque há 10 maneiras de fazer isso"
- Resposta de Referência: "Existem 120 maneiras, calculadas como 5 fatorial (5!)."
- Saída:
  {
    "correct": 0
  }
(A justificativa não corresponde corretamente ao cálculo do fatorial.)

**Exemplo 2**:

- Resposta do Usuário: "Existem 120 maneiras porque é 5!"
- Resposta de Referência: "Existem 120 maneiras, calculadas como 5 fatorial (5!)."
- Saída:
  {
    "correct": 1
  }
(A resposta do usuário concorda com o método correto de cálculo.)

Certifique-se de que o JSON resultante está formatado corretamente e não contém caracteres inválidos de escape. O JSON deve ser válido para ser analisado com JSON.parse() em TypeScript.

**Nota:** Certifique-se de que o número de perguntas corresponde ao campo "questionsAmount" na entrada. A saída não deve conter caracteres ou formatações extras.
`;
