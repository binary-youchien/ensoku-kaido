package io.github.binaryyouchien.ensokukaido.dummy

import com.mongodb.client.model.Filters
import io.github.binaryyouchien.ensokukaido.plugins.Database
import io.github.binaryyouchien.ensokukaido.scheme.Scheme
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.bson.Document
import org.bson.types.ObjectId

abstract class AbstractDummies<T : Scheme>(
  schemeName: String,
  database: Database,
) {
  private var collection = let {
    database.createCollection(schemeName)
    database.getCollection(schemeName)
  }

  suspend fun suspendCreate(scheme: T): String = withContext(Dispatchers.IO) {
    create(scheme)
  }

  fun create(scheme: T): String {
    val doc = scheme.toDocument()
    collection.insertOne(doc)
    return doc["_id"].toString()
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