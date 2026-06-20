CircuitIQ
AI-Powered Semiconductor Supply Chain Intelligence Platform
CircuitIQ is an enterprise-focused AI platform designed for semiconductor and electronics companies to improve supply chain visibility, supplier intelligence, inventory decisions, and compliance operations.
The platform combines specialized AI agents, hybrid RAG architecture, enterprise security features, and real-time monitoring into a unified supply chain intelligence system.
________________________________________
Overview
Modern semiconductor supply chains depend on accurate supplier data, inventory planning, risk detection, and regulatory compliance.
CircuitIQ addresses these challenges through an AI-powered multi-agent system where each agent specializes in a specific supply chain domain.
AI Agents
Procurement Agent
Handles procurement intelligence including:
•	Purchase order analysis
•	Supplier performance evaluation
•	Vendor insights
•	Lead time analysis
Inventory Agent
Focuses on inventory optimization:
•	Material analysis
•	Stock classification
•	Safety stock insights
•	Availability monitoring
Risk Agent
Monitors supply chain risks:
•	Supplier health analysis
•	Disruption monitoring
•	Geopolitical risk signals
•	Supply continuity insights
Compliance Agent
Supports compliance workflows:
•	Export regulation checks
•	Audit assistance
•	Compliance tracking
•	Documentation analysis
________________________________________
Key Features
Multi-Agent AI System
CircuitIQ uses specialized AI agents that work independently across procurement, inventory, risk, and compliance workflows.
Each agent uses domain-specific instructions and tools to provide focused business insights.
________________________________________
Hybrid RAG Architecture
CircuitIQ uses multiple retrieval systems depending on the type of information being processed.
Supported vector technologies:
•	FAISS for local similarity search
•	ChromaDB for persistent document storage
•	pgvector for PostgreSQL-based vector queries
•	Qdrant for scalable cloud vector search
The retrieval layer combines these sources to provide accurate context before generating AI responses.
________________________________________
Enterprise Architecture
Frontend
Built with:
•	React 18
•	TypeScript
•	Tailwind CSS
•	React Router
•	Recharts
The frontend provides:
•	Multi-tenant dashboard
•	Agent interaction interface
•	Supply chain analytics
•	System monitoring views
________________________________________
Backend
Built using:
•	FastAPI
•	Python 3.11+
•	Supabase PostgreSQL
•	Async API architecture
Backend responsibilities include:
•	Agent orchestration
•	Authentication handling
•	Data processing
•	API management
________________________________________
AI Layer
Powered by:
•	Gemini AI
•	Retrieval-Augmented Generation
•	Agent-based workflows
The AI layer provides contextual answers using company data and supply chain knowledge.
________________________________________
Enterprise Features
Multi-Tenancy
Supports isolated environments for different organizations with tenant-level data separation.
Role-Based Access Control
Available roles:
•	Admin
•	Procurement User
•	Viewer
Audit Logging
Tracks:
•	User activity
•	Agent interactions
•	System events
•	API requests
Security
Includes:
•	Environment-based configuration
•	Permission validation
•	Secure API communication
________________________________________
SAP-Inspired Data Modeling
CircuitIQ follows semiconductor supply chain structures inspired by SAP workflows.
Supported concepts:
•	Material master data
•	Purchase orders
•	Supplier records
•	Inventory information
Inspired by SAP Materials Management (MM) processes.
________________________________________
Monitoring and Observability
CircuitIQ includes production-style monitoring features:
•	Health checks
•	Request tracking
•	Error monitoring
•	Service status reporting
Infrastructure support:
•	Docker
•	Kubernetes-ready deployment
•	Prometheus metrics
•	Grafana dashboards
________________________________________
Technology Stack
Frontend
•	React
•	TypeScript
•	Tailwind CSS
•	Recharts
Backend
•	FastAPI
•	Python
•	Supabase
•	PostgreSQL
AI
•	Gemini API
•	Multi-agent architecture
•	RAG pipeline
Vector Databases
•	FAISS
•	ChromaDB
•	pgvector
•	Qdrant
DevOps
•	Docker
•	GitHub Actions
•	Render
•	Vercel
________________________________________
API Endpoints
Health Check
GET /api/health
Returns application health and service status.
________________________________________
Material Data
GET /api/materials/{tenant_id}
Retrieves material information for a specific tenant.
________________________________________
Agent Chat
POST /api/chat
Example request:
{
  "agentInstruction": "Act as a procurement analyst",
  "userInput": "Analyze supplier lead time risk"
}
________________________________________
Installation
Requirements
•	Python 3.11+
•	Node.js 18+
•	Supabase account
•	Gemini API key
________________________________________
Backend Setup
Clone the repository:
git clone <repository-url>

cd circuitiq
Create virtual environment:
python -m venv .venv
Activate environment:
Windows:
.venv\Scripts\activate
Linux/Mac:
source .venv/bin/activate
Install dependencies:
cd backend

pip install -r requirements.txt
Configure environment variables:
cp .env.example .env
Required values:
SUPABASE_URL=
SUPABASE_KEY=
GEMINI_API_KEY=
Start backend:
uvicorn main:app --reload --port 8000
________________________________________
Frontend Setup
cd frontend

npm install

npm run dev
________________________________________
Testing
Backend:
pytest tests/
Frontend:
npm test
________________________________________
Deployment
CircuitIQ can be deployed using:
Backend:
•	Docker
•	Render
•	Kubernetes
Frontend:
•	Vercel
•	Static hosting platforms
________________________________________
Future Improvements
Planned improvements:
•	Advanced supply forecasting
•	Automated supplier scoring
•	More autonomous workflows
•	Real-time external data integrations
•	Expanded analytics capabilities
________________________________________
License
This project is built for demonstration and educational purposes.
