package io.github.binaryyouchien.ensokukaido.scheme

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.bson.Document

@Serializable
data class RoadmapNodeScheme(
  val roadmapId: String,
  val title: String,
  val description: String,
  val prevNodeId: String?,
  val condition: String?,
  val nextNodeIds: List<String>,
) {
  fun toDocument(): Document = Document.parse(Json.encodeToString(this))

  companion object {
    private val json = Json { ignoreUnknownKeys = true }

    fun fromDocument(document: Document): RoadmapNodeScheme = json.decodeFromString(document.toJson())
  }
}
