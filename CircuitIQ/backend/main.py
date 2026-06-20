from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import supabase
import os
import httpx
from dotenv import load_dotenv
from pathlib import Path

# Load .env from the same folder as this script
env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path)

app = FastAPI(title="SemiChain AI API")

# Define request model for chat
class ChatRequest(BaseModel):
    agentInstruction: str
    history: list
    userInput: str

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "SemiChain AI API running"}

@app.get("/api/health")
def health():
    return {"status": "healthy", "service": "backend"}

# Get materials for a tenant
@app.get("/api/materials/{tenant_id}")
async def get_materials(tenant_id: str):
    if not supabase:
        return get_mock_materials(tenant_id)
    
    try:
        response = supabase.table("sap_materials").select("*").eq("tenant_id", tenant_id).execute()
        if hasattr(response, 'data'):
            return response.data
        return []
    except Exception as e:
        print(f"Error: {e}")
        return get_mock_materials(tenant_id)

# Chat endpoint - handles Gemini API calls
@app.post("/api/chat")
async def chat(request: ChatRequest):
    print(f"✅ Chat endpoint called with: {request.userInput}")
    
    # Get API key from environment
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("❌ GEMINI_API_KEY not set")
        return {"text": "Error: GEMINI_API_KEY not configured on server"}
    
    # Use correct model name from your list
    model = "gemini-3-pro-preview"
    print(f"📡 Using model: {model}")
    
    # Build the conversation
    contents = []
    
    # Add system instruction as first user message
    contents.append({
        "role": "user",
        "parts": [{"text": f"{request.agentInstruction}\n\n{request.userInput}"}]
    })
    
    # Add history
    for msg in request.history:
        contents.append({
            "role": "user" if msg["role"] == "user" else "model",
            "parts": [{"text": msg["content"]}]
        })
    
    print(f"📤 Sending to Gemini API: {len(contents)} messages")
    
    # Call Gemini API from backend
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
                params={"key": api_key},
                json={
                    "contents": contents, 
                    "generationConfig": {
                        "temperature": 0.7,
                        "maxOutputTokens": 1024
                    }
                },
                timeout=30.0
            )
            
            print(f"📥 Gemini API response status: {response.status_code}")
            
            if response.status_code != 200:
                error_text = await response.text()
                print(f"❌ Gemini API error: {error_text}")
                return {"text": f"Error from Gemini API: {response.status_code}"}
            
            data = response.json()
            
            # Extract text from response with safe navigation
            try:
                # Navigate the nested structure safely
                if not isinstance(data, dict):
                    return {"text": f"Unexpected response type: {type(data)}"}
                
                candidates = data.get("candidates", [])
                if not candidates or not isinstance(candidates, list):
                    return {"text": "No candidates in response"}
                
                candidate = candidates[0]
                if not isinstance(candidate, dict):
                    return {"text": "Invalid candidate format"}
                
                content = candidate.get("content", {})
                if not isinstance(content, dict):
                    return {"text": "Invalid content format"}
                
                parts = content.get("parts", [])
                if not parts or not isinstance(parts, list):
                    return {"text": "No parts in response"}
                
                part = parts[0]
                if not isinstance(part, dict):
                    return {"text": "Invalid part format"}
                
                text = part.get("text", "")
                if not text:
                    return {"text": "Empty response text"}
                
                print(f"✅ Successfully got response: {text[:50]}...")
                return {"text": text}
                
            except Exception as e:
                print(f"❌ Error parsing response: {e}")
                print(f"Response data: {data}")
                return {"text": f"Error parsing response: {str(e)}"}
                
    except Exception as e:
        print(f"❌ Exception during API call: {e}")
        return {"text": f"Error: {str(e)}"}

# Mock data fallback
def get_mock_materials(tenant_id: str):
    mock_data = {
        "global-semi-01": [
            {"matnr": "MAT-7701", "name": "ASML NXE:3400C Mask", "category": "Lithography", "stock_level": 4, "safety_stock": 2, "lead_time": 180, "supplier": "ASML", "abc_class": "A", "unit": "Units"},
            {"matnr": "MAT-1205", "name": "EUV Photoresist (Type-B)", "category": "Chemicals", "stock_level": 850, "safety_stock": 200, "lead_time": 30, "supplier": "JSR Corp", "abc_class": "A", "unit": "Liters"},
            {"matnr": "MAT-9920", "name": "Silicon Wafer 300mm", "category": "Substrate", "stock_level": 5400, "safety_stock": 1000, "lead_time": 45, "supplier": "Sumco", "abc_class": "B", "unit": "Wafers"},
        ],
        "litho-tech-solutions": [
            {"matnr": "MAT-4412", "name": "Palladium Sputtering Target", "category": "Metals", "stock_level": 12, "safety_stock": 5, "lead_time": 90, "supplier": "Heraeus", "abc_class": "A", "unit": "Kg"},
        ],
        "nano-foundry-ops": [
            {"matnr": "MAT-3301", "name": "HBM3 Memory Die (8GB)", "category": "Component", "stock_level": 12000, "safety_stock": 3000, "lead_time": 60, "supplier": "SK Hynix", "abc_class": "A", "unit": "Die"},
        ]
    }
    return mock_data.get(tenant_id, [])

print("✅ Server startup complete - endpoints registered:")
print("   - GET  /")
print("   - GET  /api/health")
print("   - GET  /api/materials/{tenant_id}")
print("   - POST /api/chat")