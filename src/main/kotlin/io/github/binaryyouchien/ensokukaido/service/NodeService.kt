package io.github.binaryyouchien.ensokukaido.service

import io.github.binaryyouchien.ensokukaido.plugins.Database
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapNodeScheme
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapScheme
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.bson.Document

import com.mongodb.client.model.Filters.eq

class NodeService(database: Database) : AbstractService<RoadmapNodeScheme>("node", database) {
  override fun createInstance(document: Document): RoadmapNodeScheme = RoadmapNodeScheme.fromDocument(document)

  suspend fun getAllNodes(roadmapId : String): List<RoadmapNodeScheme> = withContext(Dispatchers.IO) {
    collection.find().map { document ->
      RoadmapNodeScheme.fromDocument(document)
    }.toList()
  }
}

