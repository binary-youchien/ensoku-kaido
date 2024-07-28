package io.github.binaryyouchien.ensokukaido.plugins

import io.github.binaryyouchien.ensokukaido.roadmap.RoadmapRoute
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

class Routing(
    database: Database,
) {
    private val roadmapRoute = RoadmapRoute(database)
    fun Application.configureRouting() {
        routing {
            get("/") {
                call.respondText("Hello World!")
            }
            roadmapRoute.route(this)
        }
    }
}
