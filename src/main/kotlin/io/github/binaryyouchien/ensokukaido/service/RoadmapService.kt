package io.github.binaryyouchien.ensokukaido.service

import io.github.binaryyouchien.ensokukaido.plugins.Database
import io.github.binaryyouchien.ensokukaido.scheme.AbstractService
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapScheme
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json


class RoadmapService(database: Database) : AbstractService<RoadmapScheme>("roadmap", database) {

  suspend fun readAllRoadmaps(): List<RoadmapScheme> = withContext(Dispatchers.IO) {
    collection.find().map { document ->
      createInstance(document)
    }.toList()
  }

  override fun Json.decoder(json: String): RoadmapScheme = decodeFromString<RoadmapScheme>(json)
}


