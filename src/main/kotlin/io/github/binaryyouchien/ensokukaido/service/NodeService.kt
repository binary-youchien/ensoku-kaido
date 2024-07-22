package io.github.binaryyouchien.ensokukaido.service

import io.github.binaryyouchien.ensokukaido.plugins.Database
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapNodeScheme
import org.bson.Document

class NodeService(database: Database) : AbstractService<RoadmapNodeScheme>("node", database) {
  override fun createInstance(document: Document): RoadmapNodeScheme = RoadmapNodeScheme.fromDocument(document)
}

