package io.github.binaryyouchien.ensokukaido.dummy

import io.github.binaryyouchien.ensokukaido.plugins.Database
import io.github.binaryyouchien.ensokukaido.dummy.node.RoadmapNodeDummies
import io.github.binaryyouchien.ensokukaido.dummy.roadmap.RoadmapDummies

class Dummies(database: Database) {
  val roadmapDummies by lazy { RoadmapDummies(database) }
  val roadmapNodeDummies by lazy { RoadmapNodeDummies(database, roadmapDummies) }
}