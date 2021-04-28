import axios, { AxiosInstance } from "axios"

class AxiosInstanceClass {
  private static instance: AxiosInstance

  // new 클래스 구문 사용 제한을 목적으로
  // constructor() 함수 앞에 private 접근 제어자 추가
  private constructor() {}

  // 오직 getInstance() 스태틱 메서드를 통해서만
  // 단 하나의 객체를 생성할 수 있습니다.
  public static getInstance(): AxiosInstance {
    if (!AxiosInstanceClass.instance) {
      AxiosInstanceClass.instance = axios.create({
        baseURL: "http://localhost:8080",
        timeout: 5000,
      })
    }
    return AxiosInstanceClass.instance
  }
}

const axiosInstance: AxiosInstance = AxiosInstanceClass.getInstance()

export const callFaceInfo = (formData: FormData) =>
  axiosInstance.post("/test/img", formData)
