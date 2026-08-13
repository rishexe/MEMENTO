from fastapi import FastAPI

app = FastAPI(title="Sikkim Gamified Tourism API")


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "backend"}
