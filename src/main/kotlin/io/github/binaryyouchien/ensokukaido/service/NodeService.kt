package io.github.binaryyouchien.ensokukaido.service

import com.mongodb.client.model.Filters.eq
import io.github.binaryyouchien.ensokukaido.plugins.Database
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapNodeScheme
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json

class NodeService(database: Database) : AbstractService<RoadmapNodeScheme>("node", database) {
  override fun Json.decoder(json: String): RoadmapNodeScheme = decodeFromString<RoadmapNodeScheme>(json)

  suspend fun getRoadmapAllNodes(roadmapId: String): List<RoadmapNodeScheme> = withContext(Dispatchers.IO) {
    collection.find(eq(RoadmapNodeScheme::roadmapId.name, roadmapId)).map { document ->
      createInstance(document)
    }.toList()
  }
}

