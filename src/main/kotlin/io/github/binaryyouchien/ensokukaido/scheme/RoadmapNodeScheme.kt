package io.github.binaryyouchien.ensokukaido.scheme

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
  val downNodeId: String?,
  val rightNodeId: String?,
) : Scheme() {

  companion object {
    fun create(
      id: String?,
      roadmapId: String,
      title: String,
      description: String?,
      condition: String?,
      prevNodeId: String?,
      downNodeId: String?,
      rightNodeId: String?,
    ) = RoadmapNodeScheme(
      roadmapId,
      title,
      description,
      condition,
      prevNodeId,
      downNodeId = downNodeId,
      rightNodeId = rightNodeId,
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
      downNodeId = downNodeId,
      rightNodeId = rightNodeId,
      title=title,
    )
  }
}
