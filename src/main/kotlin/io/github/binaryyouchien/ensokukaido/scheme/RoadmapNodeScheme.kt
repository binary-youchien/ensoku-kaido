package io.github.binaryyouchien.ensokukaido.scheme

import io.github.binaryyouchien.ensokukaido.roadmap.NodeResponse
import kotlinx.serialization.Serializable
import kotlinx.serialization.Transient
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
  @Transient
  lateinit var id: String

  companion object {
    private val json = Json { ignoreUnknownKeys = true }

    // そのままなんだけど、理解する為に書かせて
    // ()の中は受け取る引数、右辺？はdocument型をJson文字列型→RoadmapNodeScheme型に変換した
    fun fromDocument(document: Document): RoadmapNodeScheme = json.decodeFromString<RoadmapNodeScheme>(document.toJson()).apply {
      // idフィールドの型変換手順：documentから_idフィールドを取得→String型→idプロパティに代入
      id = document.getObjectId("_id").toString()
      }
    }

    fun toNodeResponse(): NodeResponse {
      return NodeResponse(
        id = this.id,
        roadmapId = this.roadmapId,
        description = this.description,
        condition = this.condition,
        prevNodeId = this.prevNodeId,
        nextNodeIds = this.nextNodeIds,
      )
    }
}
