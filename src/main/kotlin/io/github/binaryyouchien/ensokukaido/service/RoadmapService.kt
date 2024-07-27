package io.github.binaryyouchien.ensokukaido.service
import io.github.binaryyouchien.ensokukaido.plugins.Database
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapScheme
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json
import org.bson.Document


class RoadmapService(database: Database) : AbstractService<RoadmapScheme>("roadmap", database) {

  suspend fun readRoadmaps(titleFilter: String? = null): List<RoadmapScheme> = withContext(Dispatchers.IO) {
    val query = if (titleFilter.isNullOrBlank()) {
      collection.find()
    } else {
      collection.find(Document("title", Document("\$regex", titleFilter).append("\$options", "i")))
    }

    query.toList().map { document ->
      createInstance(document)
    }
  }
  override fun Json.decoder(json: String): RoadmapScheme = decodeFromString<RoadmapScheme>(json)
}


