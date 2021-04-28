package com.recognition.vernon.face

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.PropertySource

@SpringBootApplication
class FaceApplication

fun main(args: Array<String>) {
	runApplication<FaceApplication>(*args)

}
