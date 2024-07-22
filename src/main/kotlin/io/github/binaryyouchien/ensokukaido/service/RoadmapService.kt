package io.github.binaryyouchien.ensokukaido.service

import io.github.binaryyouchien.ensokukaido.plugins.Database
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapScheme
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.bson.Document


class RoadmapService(database: Database) : AbstractService<RoadmapScheme>("roadmap", database) {
  override fun createInstance(document: Document): RoadmapScheme = RoadmapScheme.fromDocument(document)

    suspend fun readAllRoadmaps(): List<RoadmapScheme> = withContext(Dispatchers.IO) {
        collection.find().map { document ->
            RoadmapScheme.fromDocument(document)
        }.toList()
    }
}


