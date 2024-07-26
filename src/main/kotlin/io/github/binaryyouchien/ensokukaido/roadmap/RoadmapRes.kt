package io.github.binaryyouchien.ensokukaido.roadmap

import kotlinx.serialization.Serializable

@Serializable
data class RoadmapRes(
  val id: String,
  val title: String,
  val firstNodeId: String?,
)