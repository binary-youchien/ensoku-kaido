package io.github.binaryyouchien.ensokukaido.node

import io.github.binaryyouchien.ensokukaido.plugins.Database
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapNodeScheme
import io.github.binaryyouchien.ensokukaido.service.NodeService
import io.github.binaryyouchien.ensokukaido.service.RoadmapService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

class NodeRoute(
  database: Database,
  private val nodeService: NodeService
) {
  private val roadmapService = RoadmapService(database)

  fun route(route: Route) {
    route.route("/node") {
      get {
        val roadmapId =
          call.parameters["roadmapId"] ?: throw IllegalArgumentException("No roadmap ID found")
        roadmapService.read(roadmapId) ?: throw IllegalArgumentException("No roadmap scheme found")
        val roadmapIdNodes = nodeService.getRoadmapAllNodes(roadmapId)
        // roadmapIdNodesの各要素をNodeResponseブジェクトに変換
        // 辿ると分かるし、１つ上のコードみたら分かるが、
        // RoadmapIdNodesはRoadmapNodeSchemeのインスタンスのリスト(リストはmap関数によって)
        // node は RoadmapNodeSchemeのインスタンス
        val nodeResponses = roadmapIdNodes.map { node ->
          node.toNodeResponse()
        }
        call.respond(HttpStatusCode.OK, nodeResponses)
      }
      post {
        val roadmapId =
          call.parameters["roadmapId"] ?: throw IllegalArgumentException("No roadmap ID found")
        roadmapService.read(roadmapId) ?: throw IllegalArgumentException("No roadmap scheme found")
        val nodeBody: PostNodeBody = call.receive<PostNodeBody>()
        val nodeScheme = nodeService.create(nodeBody.toNodeScheme(roadmapId))
        call.respond(HttpStatusCode.Created, nodeScheme.toNodeResponse())
      }
      route("/{nodeId}") {
        get {
          val roadmapId = call.parameters["roadmapId"] ?: throw IllegalArgumentException("No roadmap ID found")
          roadmapService.read(roadmapId) ?: throw IllegalArgumentException("No roadmap scheme found")
          val nodeId = call.parameters["nodeId"] ?: throw IllegalArgumentException("No node ID found")
          val nodeScheme = nodeService.read(nodeId) ?: throw IllegalArgumentException("No node scheme found")
          call.respond(HttpStatusCode.OK, nodeScheme.toNodeResponse())
        }
        put {
          val roadmapId: String = call.parameters["roadmapId"] ?: throw IllegalArgumentException("No roadmap ID found")
          roadmapService.read(roadmapId) ?: throw IllegalArgumentException("No roadmap scheme found")
          val nodeId: String = call.parameters["nodeId"] ?: throw IllegalArgumentException("No node ID found")
          val nodeBody: PutNodeBody = call.receive<PutNodeBody>()
          val nodeScheme: RoadmapNodeScheme = nodeService.read(nodeId) ?: throw IllegalArgumentException(
            "No node scheme found"
          )
          val updatedNodeScheme = nodeService.update(nodeId, nodeBody.toNodeScheme(nodeId, nodeScheme.roadmapId))
            ?: throw IllegalArgumentException("No node scheme found")
          call.respond(HttpStatusCode.OK, updatedNodeScheme.toNodeResponse())
        }
      }
    }
  }
}

