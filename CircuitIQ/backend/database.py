from supabase import create_client, Client
import os
from dotenv import load_dotenv
from pathlib import Path

# Load .env from the same folder as this script
env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path)

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or not key:
    print("⚠️  Missing Supabase credentials. Using mock data fallback.")
    supabase = None
else:
    supabase: Client = create_client(url, key)
    print("✅ Supabase connected")

def get_db():
    return supabase