package io.github.binaryyouchien.ensokukaido

import io.github.binaryyouchien.ensokukaido.roadmap.PostNodeBody
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
}
