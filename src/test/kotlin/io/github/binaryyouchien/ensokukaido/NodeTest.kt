package io.github.binaryyouchien.ensokukaido

import io.github.binaryyouchien.ensokukaido.node.NodePosition
import io.github.binaryyouchien.ensokukaido.node.NodeRes
import io.github.binaryyouchien.ensokukaido.node.PostNodeBody
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull

class NodeTest {
  @Test
  fun testPost() = test {
    val roadmapDummy = dummies.roadmapDummies.roadmapA
    dummies.roadmapNodeDummies

    client.post("/roadmap/${roadmapDummy.id}/node") {
      contentType(ContentType.Application.Json)
      setBody(
        PostNodeBody(
          title = "test",
          description = null,
          condition = null,
          prevNodeId = null,
          position = NodePosition.DOWN,
          downNodeId = null,
          rightNodeId = null,
        )
      )
    }.apply {
      assertEquals(HttpStatusCode.Created, status, this.toString())
      assertNotNull(bodyAsText())
    }
  }

  @Test
  fun testGet() = test {
    val roadmapDummy = dummies.roadmapDummies.roadmapA
    val nodeDummy = dummies.roadmapNodeDummies.nodeA

    client.get("/roadmap/${roadmapDummy.id}/node/${nodeDummy.id}") {
      contentType(ContentType.Application.Json)
    }.apply {
      assertEquals(HttpStatusCode.OK, status, this.toString())
      assertEquals(nodeDummy.read().toNodeResponse(), body<NodeRes>())
    }
  }

  @Test
  fun testFindNode() = test {
    val roadmapDummy = dummies.roadmapDummies.roadmapA
    val nodeDummies = dummies.roadmapNodeDummies.getAllNodes(roadmapDummy.id)

    client.get("/roadmap/${roadmapDummy.id}/node") {
      contentType(ContentType.Application.Json)
    }.apply {
      assertEquals(HttpStatusCode.OK, status, this.toString())
      val nodeRespons: List<NodeRes> = this.body<List<NodeRes>>()
      assertEquals(nodeDummies.size, nodeRespons.size)
    }
  }


}
