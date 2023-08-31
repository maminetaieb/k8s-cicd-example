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
          withCredentials([string(credentialsId: 'eyJhbGciOiJSUzI1NiIsImtpZCI6InNiVC1rcWxqVU9kVnVERDFzUDhPVkhqTm1yVUlueXpXS1YzcjJTbXlqaDgifQ.eyJhdWQiOlsiaHR0cHM6Ly9rdWJlcm5ldGVzLmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiXSwiZXhwIjoxNjkzNTA3NzYyLCJpYXQiOjE2OTM1MDQxNjIsImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2Yy5jbHVzdGVyLmxvY2FsIiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJkZXZvcHMtdG9vbHMiLCJzZXJ2aWNlYWNjb3VudCI6eyJuYW1lIjoiamVua2lucyIsInVpZCI6IjBhYWMyMDM1LWE5ODEtNDk5Mi04ZGI0LTQ4ZjVkMDUyMWQ0MSJ9fSwibmJmIjoxNjkzNTA0MTYyLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6ZGV2b3BzLXRvb2xzOmplbmtpbnMifQ.cuVuZ_7VDXYpWqUURksiE0vFP9UVf4e7c1DmnqNTjA3bUH7l1kagBq_hGOGZ_mWxMhA3CNhuYEvCPsfYWQ75AUhcQLE9BdC3Ck7fAkmb4NWHXFDsdvrULJKse6OL8G0Bpy24iSBk6BXfWpLyGCrJoISE7M1n1coNRclidnCZ_R3F6TRONkyO-KeWROlxYvlBLEZUz6MkbpNm8rzD331XJusuFvfeRXyAMveW8wevGRSnUVbQbaoPxbIx5_Qxvj9rLBlTBipRhHJmKNsqqgYuwk7DfwiNnbl9li6mLLHg5EQS4xRldoY7KTTfQIGnQvs4STn_29LcYkeYQ_8nP2zQeg', variable: 'TOKEN')]) {
            sh "kubectl config set-credentials jenkins --token=${TOKEN}"
          }
          sh 'kubectl apply -f frontend/deployment.yaml'
          sh 'kubectl apply -f frontend/service.yaml'
          sh 'kubectl apply -f backend/deployment.yaml'
          sh 'kubectl apply -f backend/service.yaml'
        }
      }
    }

  }

}
