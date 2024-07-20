package io.github.binaryyouchien.ensokukaido

import io.github.binaryyouchien.ensokukaido.roadmap.PostRoadmapBody
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
}
