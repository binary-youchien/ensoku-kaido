package io.github.binaryyouchien.ensokukaido.dummy.roadmap

import io.github.binaryyouchien.ensokukaido.Database
import io.github.binaryyouchien.ensokukaido.dummy.AbstractDummies
import io.github.binaryyouchien.ensokukaido.dummy.node.RoadmapNodeDummy
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapScheme
import org.bson.Document

class RoadmapDummies(database: Database) :
  AbstractDummies<RoadmapScheme>("roadmap", database) {
  val aRoadmap = RoadmapDummy(RoadmapScheme(null, "roadmap dummy a"), this)
  override fun createInstance(document: Document): RoadmapScheme = RoadmapScheme.fromDocument(document)
}