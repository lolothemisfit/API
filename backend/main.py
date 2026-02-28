from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()

class WebhookPayload(BaseModel):
    data: str

@app.post("/webhook")
def webhook(payload: WebhookPayload):
    chars = [ c for c in payload.data if c != " "]

    chars.sort(key=str.lower)

    return {"word" : chars}

