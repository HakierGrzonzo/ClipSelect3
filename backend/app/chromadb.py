from logging import getLogger, log
import string
from chromadb import PersistentClient
from os import environ
from chromadb.utils.embedding_functions import OpenAIEmbeddingFunction

from app.models import Media, Series 

EMBEDDING_MODEL = "text-embedding-ada-002"
OPEN_AI_KEY = environ["OPENAI_KEY"]

logger = getLogger(__name__)

client = PersistentClient(path="./chroma")
embedding_function = OpenAIEmbeddingFunction(api_key=OPEN_AI_KEY, model_name=EMBEDDING_MODEL)

def get_id_for_series_name(name: str):
    name_l = [x for x in name if x.lower() in string.ascii_lowercase]

    return "".join(name_l)[:20]

def enroll_episode(episode: Media, series_name: str, season_ordinal: int):
    collection_id = get_id_for_series_name(series_name)
    logger.info(f"Enrolling {episode.name} in {collection_id}")
    collection = client.get_or_create_collection(collection_id, embedding_function=embedding_function)
    ids = [f"{season_ordinal}-{episode.ordinal}-{i}" for i, _ in enumerate(episode.captions)]
    documents = [caption.text for caption in episode.captions]
    metadatas = [{
        "episode": episode.ordinal,
        "season": season_ordinal,
        "series_name": series_name,
        "caption": i,
        "start": caption.start,
        "stop": caption.stop,
        "file": episode.file_path,
        "audio": episode.meta.audio_track_index,
        "subtitle": episode.meta.subtitle_track_index,
        } for i, caption in enumerate(episode.captions)]
    collection.add(
        documents=documents, ids=ids, metadatas=metadatas
            )

def query_series(series_name: str, query: str):
    logger.info(f"Quering {series_name} with {query}")
    collection = client.get_collection(get_id_for_series_name(series_name), embedding_function=embedding_function) 
    return collection.query(query_texts=query)

