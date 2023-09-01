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
            def scannerHome = tool name: 'sonar_scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation';
        }
        steps {
            withSonarQubeEnv('MySonarQube') {
                sh '''
                ${scannerHome}/bin/sonar-scanner \
                -D sonar.java.jdkHome=/usr/lib/jvm/java-17-openjdk-amd64/ \
                -D sonar.projectKey=myproject \
                -D sonar.projectName=myproject \
                -D sonar.projectVersion=1.0 \
                -D sonar.sources=./backend/src,./frontend/src \
                -D sonar.test.inclusions=**/*.test.tsx,**/*.test.ts,**/*.js \
                -D sonar.exclusions=*/node_modules/**,**/dist/**,**/*.d.ts
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
          withCredentials([string(credentialsId: 'cluster-credentials-file', variable: 'KUBECONFIG')]) {
            sh 'kubectl apply -f frontend/deployment.yaml --context minikube'
            sh 'kubectl apply -f frontend/service.yaml --context minikube'
            sh 'kubectl apply -f backend/deployment.yaml --context minikube'
            sh 'kubectl apply -f backend/service.yaml --context minikube'
          }
        }
      }
    }

  }

}
