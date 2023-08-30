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

    stage('SonarQube analysis') {
        environment {
            def scannerHome = tool name: 'sonar-scanner-5.0.1.3006-linux', type: 'hudson.plugins.sonar.SonarRunnerInstallation';
        }
        steps {
            withSonarQubeEnv('MySonarQube') {
                sh '''
                ${scannerHome}/bin/sonar-scanner \
                -D sonar.projectKey=YOUR_PROJECT_KEY_HERE \
                -D sonar.projectName=YOUR_PROJECT_NAME_HERE \
                -D sonar.projectVersion=YOUR_PROJECT_VERSION_HERE \
                -D sonar.sources=./src \
                -D sonar.test.inclusions=YOUR_INCLUSIONS_HERE \
                -D sonar.exclusions=YOUR_EXCLUSIONS_HERE
                '''
            }
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
