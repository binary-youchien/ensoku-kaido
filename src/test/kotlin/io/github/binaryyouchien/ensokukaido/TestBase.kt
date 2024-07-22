package io.github.binaryyouchien.ensokukaido

import io.github.binaryyouchien.ensokukaido.dummy.Dummies
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.config.*
import io.ktor.server.testing.*

class TestBase(
  private val applicationTestBuilder: ApplicationTestBuilder,
) : AutoCloseable {
  private val config: ApplicationConfig
  val client by lazy {
    applicationTestBuilder.createClient {
      install(ContentNegotiation) {
        json()
      }
    }
  }
  init {
    applicationTestBuilder.run {
      var config = ApplicationConfig("application.local.yaml")
      environment {
        this.config = config.mergeWith(this.config).also { config = it }
      }
      this@TestBase.config = config
    }
  }

  private val database by lazy {
    applicationTestBuilder.run {
      val user = config.tryGetString("db.mongo.user")
      val password = config.tryGetString("db.mongo.password")
      val host = config.tryGetString("db.mongo.host") ?: "127.0.0.1"
      val port = config.tryGetString("db.mongo.port") ?: "27017"
      val maxPoolSize = config.tryGetString("db.mongo.maxPoolSize")?.toInt() ?: 20
      val databaseName = config.tryGetString("db.mongo.database_name") ?: "myDatabase"
      Database(
        user, password, host, port, maxPoolSize, databaseName
      )
    }
  }
  val dummies by lazy {
    Dummies(database)
  }

  override fun close() {
    database.close()
  }
  fun client() = client
}

fun test(block: suspend TestBase.() -> Unit) = testApplication {
  TestBase(this).apply {
    block()
    close()
  }
}

