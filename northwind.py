from langchain.agents import create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.sql_database import SQLDatabase
from langchain.llms.openai import OpenAI
from langchain.agents import AgentExecutor
from langchain.agents.agent_types import AgentType
from langchain.chat_models import ChatOpenAI

import requests
import zipfile
import io
import sqlite3

# Northwind SQLite database

url = 'https://github.com/jpwhite3/northwind-SQLite3'
response = requests.get(url)

# Save the content of the response (which is the zip file) into a BytesIO object
zip_file = zipfile.ZipFile(io.BytesIO(response.content))

# Step 2: Extract the SQLite database file
zip_file.extractall()

# The name of the extracted SQLite database file
db_filename = 'northwind.db'

# Step 3: Connect to the SQLite database
conn = sqlite3.connect(northwind.db)
cursor = conn.cursor()

# Step 4: Verify by listing all tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print("Tables in the database:")
for table in tables:
    print(table[0])

# Close the connection
conn.close()
