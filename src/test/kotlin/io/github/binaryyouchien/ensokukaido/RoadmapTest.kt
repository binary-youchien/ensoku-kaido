package io.github.binaryyouchien.ensokukaido

import io.github.binaryyouchien.ensokukaido.roadmap.PostRoadmapBody
import io.github.binaryyouchien.ensokukaido.roadmap.RoadmapRes
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapScheme
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.http.*
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals
import kotlin.test.assertNotNull

class RoadmapTest {
  @Test
  fun testPostRoadmap() = test {
    client().post("/roadmap") {
      contentType(ContentType.Application.Json)
      setBody(
        PostRoadmapBody(
          title = "test"
        )
      )
    }.apply {
      assertEquals(HttpStatusCode.Created, status, this.toString())
      assertNotNull(body<RoadmapRes>())
    }
  }

  @Test
  fun testFindRoadmap() = test {
    val roadmapDummies = dummies.roadmapDummies.readAllRoadmaps()
    client.get("/roadmap") {
      contentType(ContentType.Application.Json)
    }.apply {
      assertEquals(HttpStatusCode.OK, status, this.toString())
      val roadmapList = this.body<List<RoadmapRes>>()
      assertEquals(roadmapDummies.size, roadmapList.size)
    }
  }

  @Test
  fun testGetRoadmap() = test {
    val roadmapA = dummies.roadmapDummies.roadmapA
    client.get("/roadmap/${roadmapA.id}") {
      contentType(ContentType.Application.Json)
    }.apply {
      assertEquals(HttpStatusCode.OK, status, this.toString())
      val res = this.body<RoadmapRes>()
      assertEquals(roadmapA.read().toRoadmapRes(), res)
    }
  }

  @Test
  fun testPartialUpdateRoadmap() = test {
    val roadmapDummy = dummies.roadmapDummies.roadmapA
    val prev = roadmapDummy.read()
    // タイトルのみを更新
    client.put("/roadmap/${roadmapDummy.id}") {
      contentType(ContentType.Application.Json)
      setBody(
        RoadmapScheme.create(
          id = prev.id,
          title = prev.title + " appended",
          firstNodeId = prev.firstNodeId
        )
      )
    }.apply {
      assertEquals(HttpStatusCode.OK, status, toString())
      assertNotEquals(prev, roadmapDummy.read())
    }
  }
}
