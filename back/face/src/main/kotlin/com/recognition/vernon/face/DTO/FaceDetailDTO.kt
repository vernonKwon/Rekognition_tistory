package com.recognition.vernon.face.DTO

import com.amazonaws.services.rekognition.model.FaceDetail

data class FaceDetailDTO(val FaceDetails: List<FaceDetail>)