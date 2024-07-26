package io.github.binaryyouchien.ensokukaido.scheme

import io.github.binaryyouchien.ensokukaido.roadmap.RoadmapRes
import kotlinx.serialization.Serializable

@Suppress("DataClassPrivateConstructor")
@Serializable
data class RoadmapScheme private constructor(
  val firstNodeId: String?,
  val title: String,
) : Scheme() {
  companion object {
    fun create(
      id: String?,
      firstNodeId: String?,
      title: String,
    ) = RoadmapScheme(
      firstNodeId,
      title,
    ).also {
      if (id != null) {
        it.id = id
      }
    }
  }

  fun toRoadmapRes() = RoadmapRes(
    id, title, firstNodeId
  )
}
