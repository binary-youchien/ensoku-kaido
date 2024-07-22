package io.github.binaryyouchien.ensokukaido.roadmap

import io.github.binaryyouchien.ensokukaido.scheme.RoadmapNodeScheme
import kotlinx.serialization.Serializable

@Serializable
data class PostNodeBody(
  val title: String,
  val description: String?,
  val condition: String?,
  val prevNodeId: String?,
  val nextNodeIds: List<String>,
) {
  fun toNodeScheme(roadmapId: String) = RoadmapNodeScheme(
    roadmapId,
    title,
    description,
    condition,
    prevNodeId,
    nextNodeIds
  )
}