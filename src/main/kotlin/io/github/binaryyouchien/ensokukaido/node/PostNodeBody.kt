package io.github.binaryyouchien.ensokukaido.node

import io.github.binaryyouchien.ensokukaido.scheme.RoadmapNodeScheme
import kotlinx.serialization.Serializable

@Serializable
data class PostNodeBody(
  val title: String,
  val description: String? = null,
  val condition: String? = null,
  val prevNodeId: String? = null,
  val downNodeId: String? = null,
  val rightNodeId: String? = null,
) {
  fun toNodeScheme(roadmapId: String) = RoadmapNodeScheme.create(
    null,
    roadmapId,
    title,
    description,
    condition,
    prevNodeId,
    downNodeId = downNodeId,
    rightNodeId = rightNodeId
  )
}