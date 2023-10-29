FROM python:3.11-bookworm
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
EXPOSE 80

RUN python3 -m pip install poetry
WORKDIR /backend 
COPY ./poetry.lock ./pyproject.toml ./
RUN poetry config virtualenvs.in-project true --local
RUN poetry install --no-dev
COPY . .
ENTRYPOINT poetry run uvicorn app:app --host 0.0.0.0 --log-config /backend/config.json --port 80 --proxy-headers

