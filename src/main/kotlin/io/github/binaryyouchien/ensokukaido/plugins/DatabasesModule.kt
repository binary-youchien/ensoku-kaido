package io.github.binaryyouchien.ensokukaido.plugins

import com.mongodb.client.MongoDatabase
import io.github.binaryyouchien.ensokukaido.Database
import io.ktor.server.application.*
import io.ktor.server.config.*


/**
 * Establishes connection with a MongoDB database.
 *
 * The following configuration properties (in application.yaml/application.conf) can be specified:
 * * `db.mongo.user` username for your database
 * * `db.mongo.password` password for the user
 * * `db.mongo.host` host that will be used for the database connection
 * * `db.mongo.port` port that will be used for the database connection
 * * `db.mongo.maxPoolSize` maximum number of connections to a MongoDB server
 * * `db.mongo.database.name` name of the database
 *
 * IMPORTANT NOTE: in order to make MongoDB connection working, you have to start a MongoDB server first.
 * See the instructions here: https://www.mongodb.com/docs/manual/administration/install-community/
 * all the paramaters above
 *
 * @returns [MongoDatabase] instance
 * */
class DatabasesModule(
  application: Application,
) {
  val database: Database

  init {
    application.run {
      val user = environment.config.tryGetString("db.mongo.user")
      val password = environment.config.tryGetString("db.mongo.password")
      val host = environment.config.tryGetString("db.mongo.host") ?: "127.0.0.1"
      val port = environment.config.tryGetString("db.mongo.port") ?: "27017"
      val maxPoolSize = environment.config.tryGetString("db.mongo.maxPoolSize")?.toInt() ?: 20
      val databaseName = environment.config.tryGetString("db.mongo.database_name") ?: "myDatabase"
      database = Database(
        user, password, host, port, maxPoolSize, databaseName
      )

      environment.monitor.subscribe(ApplicationStopped) {
        database.close()
      }
    }
  }
}
