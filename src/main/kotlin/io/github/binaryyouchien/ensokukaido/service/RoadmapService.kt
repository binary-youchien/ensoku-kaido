package io.github.binaryyouchien.ensokukaido.service

import io.github.binaryyouchien.ensokukaido.Database
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapScheme
import org.bson.Document

class RoadmapService(database: Database) : AbstractService<RoadmapScheme>("roadmap", database) {
  override fun createInstance(document: Document): RoadmapScheme = RoadmapScheme.fromDocument(document)
}

