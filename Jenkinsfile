pipeline {

  environment {
    dockerimagename1 = "mohamedaminetaieb/client"
    dockerImage1 = ""
    dockerimagename2 = "mohamedaminetaieb/server"
    dockerImage2 = ""
  }

  agent any

  stages {

    stage('Checkout Source') {
      steps {
        git 'https://github.com/maminetaieb/k8s-cicd-example.git'
      }
    }

    stage('Build image') {
      steps{
        script {
          dockerImage1 = docker.build(dockerimagename1, 'frontend')
          dockerImage2 = docker.build(dockerimagename2, 'backend')
        }
      }
    }

    stage('Pushing Image') {
      environment {
               registryCredential = 'dockerhub-credentials'
           }
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            dockerImage1.push("latest")
            dockerImage2.push("latest")
          }
        }
      }
    }

    stage('Deploying container to Kubernetes') {
      steps {
        script {
          sh 'kubectl apply -f frontend/deployment.yaml'
          sh 'kubectl apply -f frontend/service.yaml'
          sh 'kubectl apply -f backend/deployment.yaml'
          sh 'kubectl apply -f backend/service.yaml'
        }
      }
    }

  }

}
