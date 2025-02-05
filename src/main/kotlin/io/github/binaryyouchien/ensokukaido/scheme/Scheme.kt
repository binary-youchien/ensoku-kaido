package io.github.binaryyouchien.ensokukaido.scheme

import kotlinx.serialization.Serializable
import kotlinx.serialization.Transient
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.bson.Document

@Serializable
sealed class Scheme {
  @Transient
  lateinit var id: String
    internal set

  fun toDocument(): Document = Document.parse(Json.encodeToString(this))
}