package io.github.binaryyouchien.ensokukaido.scheme

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.bson.Document
import kotlin.reflect.full.memberProperties

@Serializable
sealed interface Scheme {
  fun toDocument(): Document = Document.parse(Json.encodeToString(this))
  fun toUpdateDocument(): Document {
      val updateFields = this::class.memberProperties
          .associate { it.name to it.getter.call(this) }
          .filterValues { it != null }

      val updateDocJson = Json.encodeToString(updateFields)
      return Document("\$set", Document.parse(updateDocJson))
  }
}