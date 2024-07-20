package io.github.binaryyouchien.ensokukaido.scheme

import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.bson.Document

interface Scheme {
  fun toDocument(): Document = Document.parse(Json.encodeToString(this))
}