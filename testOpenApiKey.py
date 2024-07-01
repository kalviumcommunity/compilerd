import openai
import os

openai_api_key = os.getenv('OPENAI_API_KEY')
openai.api_key = str(openai_api_key)

def is_api_key_valid():
    try:
        response = openai.Completion.create(
            engine="davinci",
            prompt="This is a test.",
            max_tokens=5
        )
    except:
        return False
    else:
        return True

print("==> [Test OpenAI API KEY] Testing OpenAI API KEY .....")
api_key_valid = is_api_key_valid()
if(api_key_valid):
        print(f"-> [Test OpenAI API KEY] key is Invalid, key  : {openai_api_key}")
else:
        print(f"-> [Test OpenAI API KEY] key is Valid, key : {openai_api_key}")

