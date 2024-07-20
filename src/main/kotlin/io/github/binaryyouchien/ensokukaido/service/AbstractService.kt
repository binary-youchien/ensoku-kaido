package io.github.binaryyouchien.ensokukaido.service

import com.mongodb.client.MongoCollection
import com.mongodb.client.model.Filters
import io.github.binaryyouchien.ensokukaido.Database
import io.github.binaryyouchien.ensokukaido.scheme.Scheme
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.bson.Document
import org.bson.types.ObjectId

abstract class AbstractService<T : Scheme>(
  schemeName: String,
  database: Database,
) {
  private var collection: MongoCollection<Document>

  init {
    database.createCollection(schemeName)
    collection = database.getCollection(schemeName)
  }

  suspend fun create(scheme: T): String = withContext(Dispatchers.IO) {
    val doc = scheme.toDocument()
    collection.insertOne(doc)
    doc["_id"].toString()
  }

  suspend fun read(id: String): Scheme? = withContext(Dispatchers.IO) {
    collection.find(Filters.eq("_id", ObjectId(id))).first()?.let { createInstance(it) }
  }

  suspend fun update(id: String, scheme: Scheme): Document? = withContext(Dispatchers.IO) {
    collection.findOneAndReplace(Filters.eq("_id", ObjectId(id)), scheme.toDocument())
  }

  suspend fun delete(id: String): Document? = withContext(Dispatchers.IO) {
    collection.findOneAndDelete(Filters.eq("_id", ObjectId(id)))
  }

  protected abstract fun createInstance(document: Document): T
}