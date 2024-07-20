package io.github.binaryyouchien.ensokukaido.service

import com.mongodb.client.MongoCollection
import com.mongodb.client.model.Filters
import io.github.binaryyouchien.ensokukaido.Database
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapScheme
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.bson.Document
import org.bson.types.ObjectId

class RoadmapService(database: Database) {
  private var collection: MongoCollection<Document>

  init {
    database.createCollection("roadmap")
    collection = database.getCollection("roadmap")
  }

  suspend fun create(roadmapScheme: RoadmapScheme): String = withContext(Dispatchers.IO) {
    val doc = roadmapScheme.toDocument()
    collection.insertOne(doc)
    doc["_id"].toString()
  }

  suspend fun read(id: String): RoadmapScheme? = withContext(Dispatchers.IO) {
    collection.find(Filters.eq("_id", ObjectId(id))).first()?.let(RoadmapScheme.Companion::fromDocument)
  }

  suspend fun update(id: String, roadmapScheme: RoadmapScheme): Document? = withContext(Dispatchers.IO) {
    collection.findOneAndReplace(Filters.eq("_id", ObjectId(id)), roadmapScheme.toDocument())
  }

  suspend fun delete(id: String): Document? = withContext(Dispatchers.IO) {
    collection.findOneAndDelete(Filters.eq("_id", ObjectId(id)))
  }
}

