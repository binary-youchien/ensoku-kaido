package io.github.binaryyouchien.ensokukaido.dummy.node

import io.github.binaryyouchien.ensokukaido.Database
import io.github.binaryyouchien.ensokukaido.dummy.AbstractDummies
import io.github.binaryyouchien.ensokukaido.dummy.roadmap.RoadmapDummies
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapNodeScheme
import org.bson.Document

class RoadmapNodeDummies(
  database: Database,
  roadmapDummies: RoadmapDummies,
) :
  AbstractDummies<RoadmapNodeScheme>("node", database) {
  val aRoadmap = RoadmapNodeDummy(
    RoadmapNodeScheme(
      roadmapDummies.aRoadmap.id, "roadmap node dummy a", null, null, null, listOf()
    ), this
  )

  override fun createInstance(document: Document): RoadmapNodeScheme = RoadmapNodeScheme.fromDocument(document)
}