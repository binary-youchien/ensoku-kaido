package io.github.binaryyouchien.ensokukaido.roadmap


import io.github.binaryyouchien.ensokukaido.scheme.RoadmapScheme
import io.github.binaryyouchien.ensokukaido.test
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlin.test.Test
import kotlin.test.assertEquals

class RoadmapUpdateTest {
    @Test
    fun testPartialUpdateRoadmap() = test {
        // 最初にroadmapを作成
        val createResponse = client.post("/roadmap") {
            contentType(ContentType.Application.Json)
            setBody(PostRoadmapBody(title = "Original Roadmap"))
        }
        assertEquals(HttpStatusCode.Created, createResponse.status)
        val createdId = createResponse.bodyAsText()

        // タイトルのみを更新
        client.put("/roadmap/$createdId") {
            contentType(ContentType.Application.Json)
            setBody(
                RoadmapScheme(
                    firstNodeId = null,
                    title = "Updated Roadmap"
                )
            )
        }.apply {
            assertEquals(HttpStatusCode.OK, status, toString())
        }

        // 更新されたことを確認
        client.get("/roadmap/$createdId").apply {
            assertEquals(HttpStatusCode.OK, status)
            val responseBody = bodyAsText()
            assert(responseBody.contains("Updated Roadmap"))
        }
    }
}