package io.github.binaryyouchien.ensokukaido

import io.github.binaryyouchien.ensokukaido.roadmap.NodeResponse
import io.github.binaryyouchien.ensokukaido.roadmap.PostNodeBody
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapScheme
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull

class NodeTest {
  @Test
  fun testRoot() = test {
    val roadmapDummy = dummies.roadmapDummies.aRoadmap

    client.post("/roadmap/${roadmapDummy.id}/node") {
      contentType(ContentType.Application.Json)
      setBody(
        PostNodeBody(
          title = "test",
          description = null,
          condition = null,
          prevNodeId = null,
          nextNodeIds = listOf()
        )
      )
    }.apply {
      assertEquals(HttpStatusCode.Created, status, this.toString())
      assertNotNull(bodyAsText())
    }
  }

  @Test
  fun testFindNode() = test {
    val roadmapDummy = dummies.roadmapDummies.aRoadmap
    val nodeDummies = dummies.roadmapNodeDummies.getAllNodes(roadmapDummy.id)

    client.get("/roadmap/${roadmapDummy.id}/node") {
      contentType(ContentType.Application.Json)
    }.apply {
      assertEquals(HttpStatusCode.OK, status, this.toString())
      val nodeResponses: List<NodeResponse> = this.body<List<NodeResponse>>()
      assertEquals(nodeDummies.size, nodeResponses.size)
    }
  }



}

// RoadMapTestのget通信より

//@Test
//fun testFindRoadmap() = test {
//  val roadmapDummies = dummies.roadmapDummies.readAllRoadmaps()
//  client.get("/roadmap") {
//    contentType(ContentType.Application.Json)
//  }.apply {
//    assertEquals(HttpStatusCode.OK, status, this.toString())
//    val roadmapList : List<RoadmapScheme> = this.body<List<RoadmapScheme>>()
//    assertEquals(roadmapDummies.size,roadmapList.size)
//  }
//}