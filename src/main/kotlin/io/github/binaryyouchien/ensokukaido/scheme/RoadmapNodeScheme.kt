package io.github.binaryyouchien.ensokukaido.scheme

import io.github.binaryyouchien.ensokukaido.node.NodeResponse
import kotlinx.serialization.Serializable

@Suppress("DataClassPrivateConstructor")
@Serializable
data class  RoadmapNodeScheme private constructor(
  val roadmapId: String,
  val title: String,
  val description: String?,
  val condition: String?,
  val prevNodeId: String?,
  val nextNodeIds: List<String>,
) : Scheme() {

  companion object {
    fun create(
      id: String?,
      roadmapId: String,
      title: String,
      description: String?,
      condition: String?,
      prevNodeId: String?,
      nextNodeIds: List<String>,
    ) = RoadmapNodeScheme(
      roadmapId,
      title,
      description,
      condition,
      prevNodeId,
      nextNodeIds,
    ).also {
      if (id != null) {
        it.id = id
      }
    }
  }

  fun toNodeResponse(): NodeResponse {
    return NodeResponse(
      id = this.id,
      roadmapId = this.roadmapId,
      description = this.description,
      condition = this.condition,
      prevNodeId = this.prevNodeId,
      nextNodeIds = this.nextNodeIds,
    )
  }
}
