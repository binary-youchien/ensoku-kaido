package io.github.binaryyouchien.ensokukaido.roadmap

import io.github.binaryyouchien.ensokukaido.node.NodeRoute
import io.github.binaryyouchien.ensokukaido.plugins.Database
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapNodeScheme
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapScheme
import io.github.binaryyouchien.ensokukaido.service.NodeService
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
  private val nodeService = NodeService(database)
  private val nodeRoute = NodeRoute(database, nodeService)

  fun route(route: Route) {
    route.route("/roadmap") {
      post {
        val postRoadmapBody = call.receive<PostRoadmapBody>()
        val roadmapScheme = roadmapService.create(postRoadmapBody.toRoadmapScheme())
        val nodeScheme = nodeService.create(
          RoadmapNodeScheme.create(
            null, roadmapScheme.id, "", null, null, null, null, null
          )
        )
        roadmapScheme.firstNodeId = nodeScheme.id
        roadmapService.update(roadmapScheme.id, roadmapScheme)?.let {
          call.respond(HttpStatusCode.Created, it.toRoadmapRes())
        }!!
      }

      get {
        val titleFilter = call.request.queryParameters["title"]
        val roadmaps = roadmapService.readRoadmaps(titleFilter)
        call.respond(HttpStatusCode.OK, roadmaps.map { it.toRoadmapRes() })
      }

      route("/{roadmapId}") {
        get {
          val id = call.parameters["roadmapId"] ?: throw IllegalArgumentException("No ID found")
          roadmapService
            .read(id)
            ?.toRoadmapRes()
            ?.let { call.respond(it) }
            ?: call.respond(HttpStatusCode.NotFound)
        }
        put {
          val id = call.parameters["roadmapId"] ?: throw IllegalArgumentException("No ID found")
          val updates = call.receive<RoadmapScheme>()

          roadmapService.update(id, updates)?.let {
            call.respond(HttpStatusCode.OK)
          } ?: call.respond(HttpStatusCode.NotFound)
        }
        nodeRoute.route(this)
      }
    }
  }
}

