from langchain.agents import SQLAgent
from langchain.llms import OpenAI
from langchain.sql_db import SQLDatabase

# Create a LangChain agent
agent = SQLAgent(
    llm=OpenAI(),
    db=SQLDatabase.from_uri("sqlite:///northwind.db")
)

# Define a function to handle user input
def handle_input(input_text):
    response = agent.execute(input_text)
    return response

# Test the agent
input_text = "List all artists."
print(handle_input(input_text))