package io.github.binaryyouchien.ensokukaido

import io.ktor.client.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.config.*
import io.ktor.server.testing.*

fun test(block: suspend ApplicationTestBuilder.() -> Unit) = testApplication {
  environment {
    config = ApplicationConfig("application.local.yaml").mergeWith(config)
  }
  block()
}

fun ApplicationTestBuilder.client(): HttpClient {
  return createClient {
    install(ContentNegotiation) {
      json()
    }
  }
}