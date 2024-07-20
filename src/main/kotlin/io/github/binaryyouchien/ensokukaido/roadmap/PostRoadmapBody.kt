package io.github.binaryyouchien.ensokukaido.roadmap

import io.github.binaryyouchien.ensokukaido.scheme.RoadmapScheme
import kotlinx.serialization.Serializable

@Serializable
data class PostRoadmapBody(
  val title: String,
) {
  fun toRoadmapScheme() = RoadmapScheme(null, title)
}