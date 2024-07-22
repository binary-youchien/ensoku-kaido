package io.github.binaryyouchien.ensokukaido.scheme

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import org.bson.Document

@Serializable
data class RoadmapNodeScheme(
  val roadmapId: String,
  val title: String,
  val description: String?,
  val condition: String?,
  val prevNodeId: String?,
  val nextNodeIds: List<String>,
) : Scheme {
  companion object {
    private val json = Json { ignoreUnknownKeys = true }

    fun fromDocument(document: Document): RoadmapNodeScheme = json.decodeFromString(document.toJson())
  }
}
