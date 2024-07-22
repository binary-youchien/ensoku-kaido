package io.github.binaryyouchien.ensokukaido

import io.github.binaryyouchien.ensokukaido.roadmap.PostRoadmapBody
import io.github.binaryyouchien.ensokukaido.scheme.RoadmapScheme
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull

class RoadmapTest {
  @Test
  fun testRoot() = test {
    client().post("/roadmap") {
      contentType(ContentType.Application.Json)
      setBody(
        PostRoadmapBody(
          title = "test"
        )
      )
    }.apply {
      assertEquals(HttpStatusCode.Created, status, this.toString())
      assertNotNull(bodyAsText())
    }
  }
  @Test
  fun testFindRoadmap() = test {
    val roadmapDummies = dummies.roadmapDummies.readAllRoadmaps()
    client.get("/roadmap") {
      contentType(ContentType.Application.Json)
    }.apply {
      assertEquals(HttpStatusCode.OK, status, this.toString())
      val roadmapList : List<RoadmapScheme> = this.body<List<RoadmapScheme>>()
      assertEquals(roadmapDummies.size,roadmapList.size)
    }
  }
}
