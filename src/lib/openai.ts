import OpenAI from 'openai';

const key = "sk-m8eBdfATx5maT8riA3NX0CqM6vYbhNwqkwmfosf4hqT3BlbkFJ96Q7e9DMjQpLG4dYSZx73YvXS8LRywKgyPG9eFJjMA"

const openai = new OpenAI({
  apiKey: key,
});

export default openai;
