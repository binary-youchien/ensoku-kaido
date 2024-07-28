package io.github.binaryyouchien.ensokukaido.scheme

import com.mongodb.client.MongoCollection
import com.mongodb.client.model.Filters
import io.github.binaryyouchien.ensokukaido.plugins.Database
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json
import org.bson.Document
import org.bson.types.ObjectId

abstract class AbstractService<T : Scheme>(
  schemeName: String,
  database: Database,
) {
  protected var collection: MongoCollection<Document>

  companion object {
    @JvmStatic
    protected val json = Json { ignoreUnknownKeys = true }
  }

  init {
    database.createCollection(schemeName)
    collection = database.getCollection(schemeName)
  }

  suspend fun create(scheme: T): T = withContext(Dispatchers.IO) {
    val doc = scheme.toDocument()
    collection.insertOne(doc)
    createInstance(doc)
  }

  suspend fun read(id: String): T? = withContext(Dispatchers.IO) {
    collection
      .find(Filters.eq("_id", ObjectId(id)))
      .first().also { println(it) }
      ?.let { createInstance(it) }
  }

  suspend fun update(id: String, scheme: T): T? = withContext(Dispatchers.IO) {
    collection.findOneAndReplace(Filters.eq("_id", ObjectId(id)), scheme.toDocument())
      ?.let { createInstance(it) }
  }

  suspend fun delete(id: String): Document? = withContext(Dispatchers.IO) {
    collection.findOneAndDelete(Filters.eq("_id", ObjectId(id)))
  }

  protected abstract fun Json.decoder(json: String): T
  protected fun createInstance(document: Document): T =
    json.decoder(document.toJson()).apply {
      id = document.getObjectId("_id").toString()
    }

}