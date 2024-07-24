package io.github.binaryyouchien.ensokukaido.roadmap

import io.github.binaryyouchien.ensokukaido.plugins.Database
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

    fun route(route: Route) {
        route.route("/roadmap") {
            post {
                val roadmapScheme = call.receive<PostRoadmapBody>()
                val id = roadmapService.create(roadmapScheme.toRoadmapScheme())
                call.respond(HttpStatusCode.Created, id)
            }

            get {
                val roadmaps = roadmapService.readAllRoadmaps()
                call.respond(HttpStatusCode.OK, roadmaps)
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
            route("/{roadmapId}/node") {
                post {
                    val roadmapId =
                        call.parameters["roadmapId"] ?: throw IllegalArgumentException("No roadmap ID found")
                    roadmapService.read(roadmapId) ?: throw IllegalArgumentException("No roadmap scheme found")
                    val nodeBody: PostNodeBody = call.receive<PostNodeBody>()
                    val nodeId: String = nodeService.create(nodeBody.toNodeScheme(roadmapId))
                    call.respond(HttpStatusCode.Created, nodeId)
                }
                get {
                    val roadmapId =
                        call.parameters["roadmapId"] ?: throw IllegalArgumentException("No roadmap ID found")
                    roadmapService.read(roadmapId) ?: throw IllegalArgumentException("No roadmap scheme found")
                    val roadmapIdNodes = nodeService.getAllNodes(roadmapId)
                    // roadmapIdNodesの各要素をNodeResponseブジェクトに変換
                    // 辿ると分かるし、１つ上のコードみたら分かるが、
                    // RoadmapIdNodesはRoadmapNodeSchemeのインスタンスのリスト(リストはmap関数によって)
                    // node は RoadmapNodeSchemeのインスタンス
                    val nodeResponses = roadmapIdNodes.map { node ->
                        node.toNodeResponse()
                    }
                    call.respond(HttpStatusCode.OK, nodeResponses)
                }
            }


        }
    }
}

