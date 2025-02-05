package io.github.binaryyouchien.ensokukaido.plugins

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.routing.*

fun Application.configureHTTP() {
  install(CORS) {
    allowMethod(HttpMethod.Options)
    allowMethod(HttpMethod.Put)
    allowMethod(HttpMethod.Delete)
    allowMethod(HttpMethod.Patch)
    allowHeader(HttpHeaders.Authorization)
    allowHeader("MyCustomHeader")
    allowHeader(HttpHeaders.ContentType)
    anyHost() // @TODO: Don't do this in production if possible. Try to limit it.
  }
}
