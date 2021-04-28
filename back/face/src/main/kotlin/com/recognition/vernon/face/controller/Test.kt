package com.recognition.vernon.face.controller

import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.regions.Regions
import com.amazonaws.services.rekognition.AmazonRekognitionClientBuilder
import com.amazonaws.services.rekognition.model.Attribute
import com.amazonaws.services.rekognition.model.DetectFacesRequest
import com.amazonaws.services.rekognition.model.Image
import com.recognition.vernon.face.DTO.FaceDetailDTO
import org.apache.tika.Tika
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.PropertySource
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import java.nio.ByteBuffer

@RestController
@RequestMapping("test")
@PropertySource("classpath:./app.properties")
class Test(
    @Value("\${aws.accessKey}") val awsAccessKey: String,
    @Value("\${aws.secretKey}") val awsSecretKey: String,
) {
    val success = "success"
    val fail = "fail"

    private val awsCredentials = BasicAWSCredentials(awsAccessKey, awsSecretKey)
    private val rekognitionClient = AmazonRekognitionClientBuilder
        .standard()
        .withRegion(Regions.AP_NORTHEAST_2)
        .withCredentials(AWSStaticCredentialsProvider(awsCredentials))
        .build()
    val imgSet : HashSet<String> = hashSetOf("image/jpeg", "image/jpg", "image/png")

    @PostMapping("img")
    fun img(@RequestParam("file") file : MultipartFile?) : ResponseEntity<JSend>? {
        try {
            if(file==null){
                throw Exception("no file")
            }else if(!file.isEmpty){
                val type = Tika().detect(file.bytes)
                if(!imgSet.contains(type)) throw Exception("wrong file")
            }

            val imageBytes: ByteArray = file.bytes
            val request = DetectFacesRequest()
                .withImage(Image().withBytes(ByteBuffer.wrap(imageBytes)))
                .withAttributes(Attribute.ALL)
            val result = FaceDetailDTO(rekognitionClient.detectFaces(request).faceDetails)

            return ResponseEntity.status(200).body(JSend(success, result))
        } catch (e: Exception) {
            /** AmazonRekognitionException,
             * NullPointerException,
             * FileNotFoundException */
            e.printStackTrace()
            return ResponseEntity.status(500).body(JSend(fail))
        }
    }
}