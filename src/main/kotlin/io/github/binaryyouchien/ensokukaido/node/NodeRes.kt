package io.github.binaryyouchien.ensokukaido.node

import kotlinx.serialization.Serializable

@Serializable
data class NodeRes(
  val id: String, // MongoDB の _id フィールドに対応
  val roadmapId: String,
  val description: String?,
  val condition: String?,
  val prevNodeId: String?,
  val downNodeId: String?,
  val rightNodeId: String?,
  val title: String?,
)