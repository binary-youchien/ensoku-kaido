val kotlinVersion: String by project
val logbackVersion: String by project
val mongoVersion: String by project
val ktorVersion: String by project

plugins {
    kotlin("jvm") version "2.0.0"
    id("io.ktor.plugin") version "2.3.12"
    id("org.jetbrains.kotlin.plugin.serialization") version "2.0.0"
}

group = "io.github.binary-youchien.notepad"
version = "0.0.1"

application {
  mainClass.set("io.ktor.server.netty.EngineMain")

  val isDevelopment: Boolean = project.ext.has("development")
  applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
  mavenCentral()
}

dependencies {
  implementation("io.ktor:ktor-server-core-jvm")
  implementation("io.ktor:ktor-serialization-kotlinx-json-jvm")
  implementation("io.ktor:ktor-server-content-negotiation-jvm")
  implementation("org.mongodb:mongodb-driver-core:$mongoVersion")
  implementation("org.mongodb:mongodb-driver-sync:$mongoVersion")
  implementation("org.mongodb:bson:$mongoVersion")
  implementation("io.ktor:ktor-server-cors-jvm")
  implementation("io.ktor:ktor-server-auth-jvm")
  implementation("io.ktor:ktor-server-auth-jwt-jvm")
  implementation("io.ktor:ktor-server-netty-jvm")
  implementation("ch.qos.logback:logback-classic:$logbackVersion")
  implementation("io.ktor:ktor-server-config-yaml")
  implementation("io.ktor:ktor-client-core-jvm")
  implementation("io.ktor:ktor-client-apache-jvm")

  testImplementation("io.ktor:ktor-client-cio")
  testImplementation("io.ktor:ktor-server-test-host")
  testImplementation("io.ktor:ktor-serialization-kotlinx-json")
  testImplementation("io.ktor:ktor-client-content-negotiation")
  testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlinVersion")
}
