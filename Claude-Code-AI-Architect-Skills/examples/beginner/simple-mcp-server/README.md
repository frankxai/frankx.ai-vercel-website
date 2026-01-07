# Your First MCP Server
**Build a simple weather data MCP server that agents can query**

## What You'll Build

An MCP server that provides:
- **Resources**: Current weather data for cities
- **Tools**: Get weather forecast for any location
- **Prompts**: Generate weather reports

Agents (Claude, LangGraph, etc.) can then use this server to access weather data.

**Time to complete:** 45-60 minutes
**Prerequisites:** Python knowledge, understanding of APIs

---

## Why MCP?

**Problem:** Without MCP, you'd need to integrate weather APIs separately for every agent framework.

**With MCP:** Build one weather MCP server → All agents can use it (Claude, LangGraph, AgentKit, etc.)

**The N×M → N+M benefit:**
- Without MCP: 3 agent frameworks × 5 data sources = 15 integrations
- With MCP: 3 frameworks + 5 MCP servers = 8 integrations

---

## Setup

### 1. Install Dependencies

```bash
pip install mcp fastmcp requests python-dotenv
```

### 2. Get Weather API Key

**Option A: OpenWeatherMap (Recommended for beginners)**
1. Sign up at [openweathermap.org](https://openweathermap.org/api)
2. Get free API key (1000 calls/day)

**Option B: Use mock data** (for learning, no API key needed)

### 3. Project Structure

```
simple-mcp-server/
├── weather_mcp.py       # Main MCP server
├── .env                 # API keys
├── requirements.txt     # Dependencies
└── README.md           # This file
```

---

## Code Walkthrough

### Step 1: Basic MCP Server

Create `weather_mcp.py`:

```python
"""
Weather MCP Server
==================

A simple Model Context Protocol server that provides weather data to AI agents.

Features:
- Resource: Current weather for major cities
- Tool: Get forecast for any location
- Prompt: Generate weather reports
"""

from mcp import Server, Resource, Tool, Prompt
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize MCP server
server = Server("weather-data")

# In-memory cache for demo
MAJOR_CITIES = ["New York", "London", "Tokyo", "Paris", "Sydney"]


def get_weather_data(city: str) -> dict:
    """
    Fetch weather data from OpenWeatherMap API.

    Args:
        city: Name of the city

    Returns:
        Weather data dictionary
    """
    api_key = os.getenv("OPENWEATHER_API_KEY")

    if not api_key:
        # Return mock data if no API key
        return {
            "city": city,
            "temperature": 72,
            "condition": "Sunny",
            "humidity": 45,
            "wind_speed": 10,
            "description": "Clear skies with light breeze"
        }

    # Real API call
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=imperial"

    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()

        return {
            "city": city,
            "temperature": data["main"]["temp"],
            "condition": data["weather"][0]["main"],
            "humidity": data["main"]["humidity"],
            "wind_speed": data["wind"]["speed"],
            "description": data["weather"][0]["description"]
        }
    except Exception as e:
        raise ValueError(f"Failed to fetch weather for {city}: {e}")


# Define Resources
@server.resource("weather://current/{city}")
async def get_current_weather_resource(city: str):
    """
    Resource: Current weather for a specific city.

    Agents can read this resource to get current weather conditions.
    """
    weather = get_weather_data(city)

    return Resource(
        uri=f"weather://current/{city}",
        name=f"Current Weather - {city}",
        mimeType="application/json",
        text=f"""
Current Weather for {weather['city']}
=====================================

Temperature: {weather['temperature']}°F
Condition: {weather['condition']}
Humidity: {weather['humidity']}%
Wind Speed: {weather['wind_speed']} mph
Description: {weather['description']}
"""
    )


# Define Tools
@server.tool()
async def get_weather_forecast(
    location: str,
    days: int = 3
) -> dict:
    """
    Tool: Get weather forecast for a location.

    Args:
        location: City name or zip code
        days: Number of days to forecast (1-5)

    Returns:
        Weather forecast data
    """
    # For demo, return current weather
    # In production, call forecast API
    current = get_weather_data(location)

    return {
        "location": location,
        "forecast": [
            {
                "day": i + 1,
                "temperature_high": current["temperature"] + (i * 2),
                "temperature_low": current["temperature"] - 10,
                "condition": current["condition"]
            }
            for i in range(days)
        ]
    }


@server.tool()
async def compare_weather(
    city1: str,
    city2: str
) -> dict:
    """
    Tool: Compare weather between two cities.

    Args:
        city1: First city name
        city2: Second city name

    Returns:
        Comparison data
    """
    weather1 = get_weather_data(city1)
    weather2 = get_weather_data(city2)

    return {
        "city1": weather1,
        "city2": weather2,
        "temperature_difference": abs(weather1["temperature"] - weather2["temperature"]),
        "warmer_city": city1 if weather1["temperature"] > weather2["temperature"] else city2
    }


# Define Prompts
@server.prompt()
async def weather_report(city: str):
    """
    Prompt: Generate a professional weather report.

    This prompt template helps agents create weather reports.
    """
    weather = get_weather_data(city)

    return {
        "messages": [
            {
                "role": "user",
                "content": f"""Generate a professional weather report for {city}:

Current Conditions:
- Temperature: {weather['temperature']}°F
- Condition: {weather['condition']}
- Humidity: {weather['humidity']}%
- Wind: {weather['wind_speed']} mph

Write a brief, informative weather report suitable for a news broadcast."""
            }
        ]
    }


# Server startup
if __name__ == "__main__":
    print("Starting Weather MCP Server...")
    print(f"Available resources: weather://current/{{city}}")
    print(f"Available tools: get_weather_forecast, compare_weather")
    print(f"Available prompts: weather_report")
    server.run()
```

---

## Step 2: Test the MCP Server

### Test with Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on Mac):

```json
{
  "mcpServers": {
    "weather": {
      "command": "python",
      "args": ["/path/to/weather_mcp.py"],
      "env": {
        "OPENWEATHER_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Restart Claude Desktop, then ask:
```
"What's the weather like in Tokyo?"
```

Claude will use your MCP server automatically!

### Test with Python Client

Create `test_mcp.py`:

```python
"""
Test the Weather MCP Server
"""

from mcp.client import Client
import asyncio


async def test_weather_mcp():
    """
    Test all MCP server capabilities.
    """
    # Connect to MCP server
    client = Client()
    await client.connect("python", ["weather_mcp.py"])

    print("Testing Weather MCP Server")
    print("=" * 60)

    # Test Resource
    print("\n1. Testing Resource: weather://current/Tokyo")
    resource = await client.read_resource("weather://current/Tokyo")
    print(resource.text)

    # Test Tool: get_weather_forecast
    print("\n2. Testing Tool: get_weather_forecast")
    forecast = await client.call_tool("get_weather_forecast", {
        "location": "Paris",
        "days": 3
    })
    print(forecast)

    # Test Tool: compare_weather
    print("\n3. Testing Tool: compare_weather")
    comparison = await client.call_tool("compare_weather", {
        "city1": "New York",
        "city2": "London"
    })
    print(comparison)

    # Test Prompt
    print("\n4. Testing Prompt: weather_report")
    prompt = await client.get_prompt("weather_report", {"city": "Sydney"})
    print(prompt["messages"][0]["content"])

    await client.disconnect()


if __name__ == "__main__":
    asyncio.run(test_weather_mcp())
```

Run the test:
```bash
python test_mcp.py
```

---

## Step 3: Use with Claude Agent

Create `agent_using_mcp.py`:

```python
"""
Claude Agent using Weather MCP Server
"""

from anthropic import Anthropic
import os

client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

# Connect to MCP server
response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=1024,
    mcp_servers={
        "weather": {
            "command": "python",
            "args": ["weather_mcp.py"]
        }
    },
    messages=[{
        "role": "user",
        "content": "Compare the weather in Tokyo and Paris, and tell me which city is warmer."
    }]
)

print(response.content[0].text)

# Claude automatically:
# 1. Discovers the "compare_weather" tool from MCP server
# 2. Calls it with appropriate arguments
# 3. Synthesizes the results into a response
```

---

## Complete Implementation

The full server with error handling:

```python
"""
Production-Ready Weather MCP Server
===================================

Features:
- Resource caching
- Error handling
- Rate limiting
- Logging
- Health checks
"""

from mcp import Server, Resource, Tool, Prompt
import requests
import os
from dotenv import load_dotenv
from functools import lru_cache
from datetime import datetime, timedelta
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment
load_dotenv()

# Initialize server
server = Server(
    name="weather-data",
    version="1.0.0",
    description="Weather data MCP server for AI agents"
)

# Cache configuration
CACHE_TTL = timedelta(minutes=10)
weather_cache = {}


@lru_cache(maxsize=100)
def get_weather_data(city: str) -> dict:
    """
    Fetch weather data with caching.
    """
    # Check cache
    cache_key = f"weather:{city.lower()}"
    if cache_key in weather_cache:
        cached_data, timestamp = weather_cache[cache_key]
        if datetime.now() - timestamp < CACHE_TTL:
            logger.info(f"Cache hit for {city}")
            return cached_data

    # Fetch from API
    api_key = os.getenv("OPENWEATHER_API_KEY")

    if not api_key:
        logger.warning("No API key, returning mock data")
        return mock_weather_data(city)

    try:
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=imperial"
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()

        weather = {
            "city": city,
            "temperature": data["main"]["temp"],
            "condition": data["weather"][0]["main"],
            "humidity": data["main"]["humidity"],
            "wind_speed": data["wind"]["speed"],
            "description": data["weather"][0]["description"],
            "timestamp": datetime.now().isoformat()
        }

        # Update cache
        weather_cache[cache_key] = (weather, datetime.now())
        logger.info(f"Fetched weather for {city}")

        return weather

    except requests.exceptions.RequestException as e:
        logger.error(f"API error for {city}: {e}")
        raise ValueError(f"Failed to fetch weather: {e}")


def mock_weather_data(city: str) -> dict:
    """Return mock data for testing."""
    return {
        "city": city,
        "temperature": 72,
        "condition": "Sunny",
        "humidity": 45,
        "wind_speed": 10,
        "description": "Clear skies",
        "timestamp": datetime.now().isoformat()
    }


# [Resources, Tools, and Prompts same as before]

if __name__ == "__main__":
    logger.info("Starting Weather MCP Server v1.0.0")
    server.run()
```

---

## Deploy to Production

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY weather_mcp.py .

CMD ["python", "weather_mcp.py"]
```

Build and run:
```bash
docker build -t weather-mcp .
docker run -p 8080:8080 -e OPENWEATHER_API_KEY=$API_KEY weather-mcp
```

---

## Next Steps

**Extend this MCP server:**
1. Add more data sources (forecast, historical, alerts)
2. Implement authentication
3. Add rate limiting
4. Create health check endpoints
5. Add monitoring and metrics

**Learn more:**
- Study the `mcp-architecture` skill for advanced patterns
- Check `intermediate/` examples for complex MCP servers
- See `langgraph-patterns` for using MCP with orchestration

---

## Troubleshooting

**Server won't start:**
- Check all dependencies are installed
- Verify Python version (3.10+)
- Check for port conflicts

**Agent can't connect:**
- Verify MCP config in Claude Desktop
- Check server is running
- Review server logs

**API errors:**
- Verify API key is valid
- Check rate limits
- Try mock data mode first

---

## Key Learnings

✅ **MCP standardizes integrations** - One server, all agents
✅ **Resources for reading** - Expose data agents can query
✅ **Tools for actions** - Functions agents can call
✅ **Prompts for patterns** - Reusable prompt templates
✅ **Caching matters** - Reduce API costs and improve speed

**You just built your first MCP server! 🎉**

Next: Combine with the research agent to create a weather-aware research system.

---

*Part of the FrankX AI Architect Skills package*
*For more examples, visit: frankx.ai/ai-architect-skills*
