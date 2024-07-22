package io.github.binaryyouchien.ensokukaido.plugins

import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase
import org.bson.Document

class Database(
  user: String?, password: String?, host: String, port: String, maxPoolSize: Int, databaseName: String,
) : AutoCloseable {
  private val mongoClient: MongoClient
  private var mongoDatabase: MongoDatabase

  init {
    val credentials = user?.let { userVal -> password?.let { passwordVal -> "$userVal:$passwordVal@" } }.orEmpty()
    val uri = "mongodb://$credentials$host:$port/?maxPoolSize=$maxPoolSize&w=majority"
    mongoClient = MongoClients.create(uri)
    mongoDatabase = mongoClient.getDatabase(databaseName)
  }

  override fun close() {
    mongoClient.close()
  }

  fun createCollection(s: String) = mongoDatabase.createCollection(s)

  fun getCollection(s: String): MongoCollection<Document> = mongoDatabase.getCollection(s)

}