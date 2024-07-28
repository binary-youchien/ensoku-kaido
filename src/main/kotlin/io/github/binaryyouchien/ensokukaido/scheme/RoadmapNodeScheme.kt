package io.github.binaryyouchien.ensokukaido.scheme

import io.github.binaryyouchien.ensokukaido.node.NodePosition
import io.github.binaryyouchien.ensokukaido.node.NodeRes
import kotlinx.serialization.Serializable

@Suppress("DataClassPrivateConstructor")
@Serializable
data class RoadmapNodeScheme private constructor(
  val roadmapId: String,
  val title: String,
  val description: String?,
  val condition: String?,
  val prevNodeId: String?,
  val nextNodeIds: List<String>,
  val position: NodePosition,
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
      position: NodePosition,
    ) = RoadmapNodeScheme(
      roadmapId,
      title,
      description,
      condition,
      prevNodeId,
      nextNodeIds,
      position
    ).also {
      if (id != null) {
        it.id = id
      }
    }
  }

  fun toNodeResponse(): NodeRes {
    return NodeRes(
      id = this.id,
      roadmapId = this.roadmapId,
      description = this.description,
      condition = this.condition,
      prevNodeId = this.prevNodeId,
      nextNodeIds = this.nextNodeIds,
      position = position,
    )
  }
}
