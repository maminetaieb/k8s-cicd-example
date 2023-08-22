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
          dockerImage1 = docker.build dockerimagename1
          //dockerImage2 = docker.build dockerimagename2
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
            //dockerImage2.push("latest")
          }
        }
      }
    }

    stage('Deploying container to Kubernetes') {
      steps {
        script {
          kubernetesDeploy(configs: "frontend/deployment.yaml", "frontend/service.yaml")
          //kubernetesDeploy(configs: "backend/deployment.yaml", "backend/service.yaml")
        }
      }
    }

  }

}
