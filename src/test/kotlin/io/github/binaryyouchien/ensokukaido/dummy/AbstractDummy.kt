package io.github.binaryyouchien.ensokukaido.dummy

import io.github.binaryyouchien.ensokukaido.scheme.Scheme
import org.bson.Document

abstract class AbstractDummy<T : Scheme>(
  defaultValue: T,
  private val dummies: AbstractDummies<T>,
) {
  val id = dummies.create(defaultValue)

  suspend fun read(): T? = dummies.read(id)

  suspend fun update(scheme: Scheme): Document? = dummies.update(id, scheme)

  suspend fun delete(): Document? = dummies.delete(id)
}