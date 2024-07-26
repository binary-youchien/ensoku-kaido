package io.github.binaryyouchien.ensokukaido.roadmap

import io.github.binaryyouchien.ensokukaido.node.NodeRoute
import io.github.binaryyouchien.ensokukaido.plugins.Database
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
  private val nodeRoute = NodeRoute(database)

  fun route(route: Route) {
    route.route("/roadmap") {
      post {
        val roadmapScheme = call.receive<PostRoadmapBody>()
        val id = roadmapService.create(roadmapScheme.toRoadmapScheme())
        call.respond(HttpStatusCode.Created, id)
      }

      get {
        val roadmaps = roadmapService.readAllRoadmaps()
          .map { it.toRoadmapRes() }
        call.respond(HttpStatusCode.OK, roadmaps)
      }
      route("/{roadmapId}") {
        get {
          val id = call.parameters["id"] ?: throw IllegalArgumentException("No ID found")
          roadmapService
            .read(id)
            ?.toRoadmapRes()
            ?.let { call.respond(it) }
            ?: call.respond(HttpStatusCode.NotFound)
        }
        nodeRoute.route(this)
      }
    }
  }
}

