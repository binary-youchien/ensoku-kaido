package io.github.binaryyouchien.ensokukaido.scheme

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import org.bson.Document

@Serializable
data class RoadmapScheme(
  val firstNodeId: String?,
  val title: String,
) : Scheme {
  companion object {
    private val json = Json { ignoreUnknownKeys = true }

    fun fromDocument(document: Document): RoadmapScheme = json.decodeFromString(document.toJson())
  }

}
