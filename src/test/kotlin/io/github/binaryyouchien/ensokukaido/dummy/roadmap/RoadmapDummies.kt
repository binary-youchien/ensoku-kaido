package io.github.binaryyouchien.ensokukaido.dummy.roadmap

import io.github.binaryyouchien.ensokukaido.plugins.Database
import io.github.binaryyouchien.ensokukaido.dummy.AbstractDummies
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapScheme
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.bson.Document

class RoadmapDummies(database: Database) :
    AbstractDummies<RoadmapScheme>("roadmap", database) {
    val aRoadmap = RoadmapDummy(RoadmapScheme(null, "roadmap dummy a"), this)
    override fun createInstance(document: Document): RoadmapScheme = RoadmapScheme.fromDocument(document)

    suspend fun readAllRoadmaps(): List<RoadmapScheme> = withContext(Dispatchers.IO) {
        collection.find().map { document ->
            RoadmapScheme.fromDocument(document)
        }.toList()
    }
}