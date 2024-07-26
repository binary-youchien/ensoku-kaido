package io.github.binaryyouchien.ensokukaido.node

import io.github.binaryyouchien.ensokukaido.plugins.Database
import io.github.binaryyouchien.ensokukaido.service.NodeService
import io.github.binaryyouchien.ensokukaido.service.RoadmapService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

class NodeRoute(
  database: Database,
) {
  private val roadmapService = RoadmapService(database)
  private val nodeService = NodeService(database)

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
        val nodeId: String = nodeService.create(nodeBody.toNodeScheme(roadmapId))
        call.respond(HttpStatusCode.Created, nodeId)
      }
    }
  }
}

