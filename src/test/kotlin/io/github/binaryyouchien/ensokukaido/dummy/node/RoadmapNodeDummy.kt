package io.github.binaryyouchien.ensokukaido.dummy.node

import io.github.binaryyouchien.ensokukaido.dummy.AbstractDummies
import io.github.binaryyouchien.ensokukaido.dummy.AbstractDummy
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapNodeScheme
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapScheme

class RoadmapNodeDummy(defaultValue: RoadmapNodeScheme, dummies: AbstractDummies<RoadmapNodeScheme>) :
  AbstractDummy<RoadmapNodeScheme>(defaultValue, dummies) {
}