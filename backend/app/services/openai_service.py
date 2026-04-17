import json
from openai import OpenAI
from app.core.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

class OpenAIService:
    @staticmethod
    def analyze_content(content: str):
        prompt = f"""
        Analyze the following content for cybersecurity threats (phishing, malware, social engineering, scams).
        CONTENT:
        {content}
        
        Provide the result in the following JSON format:
        {{
            "category": "String (e.g. Phishing, Safe, Malware, Social Engineering)",
            "severity": "String (Low, Medium, High)",
            "confidence": "Float (0.0 to 1.1)",
            "explanation": "String (Detailed explanation in plain English)",
            "indicators": ["List of strings (red flags detected)"],
            "recommendations": ["List of strings (actionable advice)"]
        }}
        """
        
        try:
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {{"role": "system", "content": "You are an expert cybersecurity analyst specialized in identifying threats for non-technical users."}},
                    {{"role": "user", "content": prompt}}
                ],
                response_format={ "type": "json_object" }
            )
            
            result = json.loads(response.choices[0].message.content)
            return result
        except Exception as e:
            # Fallback for demo if API fails
            print(f"OpenAI Error: {e}")
            return {
                "category": "Analysis Failed",
                "severity": "Unknown",
                "confidence": 0,
                "explanation": f"Something went wrong while analyzing the content. Error: {str(e)}",
                "indicators": [],
                "recommendations": ["Try again later."]
            }

openai_service = OpenAIService()
