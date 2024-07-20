package io.github.binaryyouchien.ensokukaido.roadmap

import io.github.binaryyouchien.ensokukaido.Database
import io.github.binaryyouchien.ensokukaido.service.RoadmapService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

class RoadmapRoute(
  database: Database,
) {
  private val roadmapService = RoadmapService(database)

  fun route(route: Route) {
    route.route("/roadmap") {
      post {
        val roadmapScheme = call.receive<PostRoadmapBody>()
        val id = roadmapService.create(roadmapScheme.toRoadmapScheme())
        call.respond(HttpStatusCode.Created, id)
      }
//      get("/{id}") {
//        val id = call.parameters["id"] ?: throw IllegalArgumentException("No ID found")
//        roadmapService.read(id)?.let { roadmap ->
//          call.respond(roadmap)
//        } ?: call.respond(HttpStatusCode.NotFound)
//      }
//      put("/{id}") {
//        val id = call.parameters["id"] ?: throw IllegalArgumentException("No ID found")
//        val roadmap = call.receive<Roadmap>()
//        roadmapService.update(id, roadmap)?.let {
//          call.respond(HttpStatusCode.OK)
//        } ?: call.respond(HttpStatusCode.NotFound)
//      }
//      delete("/{id}") {
//        val id = call.parameters["id"] ?: throw IllegalArgumentException("No ID found")
//        roadmapService.delete(id)?.let {
//          call.respond(HttpStatusCode.OK)
//        } ?: call.respond(HttpStatusCode.NotFound)
//      }
    }
  }
}

