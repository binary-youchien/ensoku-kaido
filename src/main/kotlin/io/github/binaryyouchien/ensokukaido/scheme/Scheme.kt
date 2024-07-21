package io.github.binaryyouchien.ensokukaido.scheme

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.bson.Document

@Serializable
open class Scheme {
  fun toDocument(): Document = Document.parse(Json.encodeToString(this))
}