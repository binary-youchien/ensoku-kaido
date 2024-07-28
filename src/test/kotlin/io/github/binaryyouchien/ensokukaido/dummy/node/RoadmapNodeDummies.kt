package io.github.binaryyouchien.ensokukaido.dummy.node

import com.mongodb.client.model.Filters
import io.github.binaryyouchien.ensokukaido.dummy.AbstractDummies
import io.github.binaryyouchien.ensokukaido.dummy.roadmap.RoadmapDummies
import io.github.binaryyouchien.ensokukaido.node.NodePosition
import io.github.binaryyouchien.ensokukaido.plugins.Database
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapNodeScheme
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json

class RoadmapNodeDummies(
  database: Database,
  roadmapDummies: RoadmapDummies,
) :
  AbstractDummies<RoadmapNodeScheme>("node", database) {
  val nodeA = RoadmapNodeDummy(
    RoadmapNodeScheme.create(
      null, roadmapDummies.roadmapA.id, "roadmap node dummy a",
      null, null, null, listOf(), position = NodePosition.DOWN
    ), this
  )

  override fun Json.decoder(json: String): RoadmapNodeScheme = decodeFromString<RoadmapNodeScheme>(json)

  // testするため
  suspend fun getAllNodes(roadmapId: String): List<RoadmapNodeScheme> = withContext(Dispatchers.IO) {
    collection.find(Filters.eq(RoadmapNodeScheme::roadmapId.name, roadmapId)).map { document ->
      createInstance(document)
    }.toList()
  }

}