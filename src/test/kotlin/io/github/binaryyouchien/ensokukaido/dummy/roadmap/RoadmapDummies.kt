package io.github.binaryyouchien.ensokukaido.dummy.roadmap

import com.mongodb.client.model.Filters
import io.github.binaryyouchien.ensokukaido.dummy.AbstractDummies
import io.github.binaryyouchien.ensokukaido.plugins.Database
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapScheme
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json
import org.bson.types.ObjectId

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