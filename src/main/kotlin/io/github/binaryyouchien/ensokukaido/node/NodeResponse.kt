package io.github.binaryyouchien.ensokukaido.node

import kotlinx.serialization.Serializable

@Serializable
data class NodeResponse (
    val id: String, // MongoDB の _id フィールドに対応
    val roadmapId: String,
    val description: String?,
    val condition: String?,
    val prevNodeId: String?,
    val nextNodeIds: List<String>,
)