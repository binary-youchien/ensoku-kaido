package io.github.binaryyouchien.ensokukaido.dummy.roadmap

import io.github.binaryyouchien.ensokukaido.dummy.AbstractDummies
import io.github.binaryyouchien.ensokukaido.plugins.Database
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapScheme
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json

class RoadmapDummies(database: Database) :
  AbstractDummies<RoadmapScheme>("roadmap", database) {
  val roadmapA = RoadmapDummy(RoadmapScheme.create(null, null, "roadmap dummy a"), this)
  override fun Json.decoder(json: String): RoadmapScheme = decodeFromString<RoadmapScheme>(json)
  suspend fun readAllRoadmaps(): List<RoadmapScheme> = withContext(Dispatchers.IO) {
    collection.find().map { document ->
      createInstance(document)
    }.toList()
  }
}