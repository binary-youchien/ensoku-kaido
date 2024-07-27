package io.github.binaryyouchien.ensokukaido.node

import io.github.binaryyouchien.ensokukaido.scheme.RoadmapNodeScheme
import kotlinx.serialization.Serializable

@Serializable
data class PostNodeBody(
  val title: String,
  val description: String?,
  val condition: String?,
  val prevNodeId: String?,
  val downNodeId: String?,
  val rightNodeId: String?,
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