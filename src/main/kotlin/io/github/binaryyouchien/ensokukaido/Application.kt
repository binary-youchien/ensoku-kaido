package io.github.binaryyouchien.ensokukaido

import io.github.binaryyouchien.ensokukaido.plugins.*
import io.ktor.server.application.*

fun main(args: Array<String>) {
  io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
  configureSerialization()
  val databasesModule = DatabasesModule(this)
  configureHTTP()
  configureSecurity()
  Routing(databasesModule.database).apply {
    configureRouting()
  }
}
