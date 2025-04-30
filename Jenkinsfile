pipeline {
  agent any

  environment {
    IMAGE_NAME = 'vairagitech/devops-project'
    CONTAINER_NAME = 'devops-project'
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/vairagi-tech/clone.git', branch: 'main'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          docker.build("${IMAGE_NAME}")
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
            docker push $IMAGE_NAME
          '''
        }
      }
    }

    stage('Run Container') {
      steps {
        script {
          sh """
            docker stop ${CONTAINER_NAME} || true
            docker rm ${CONTAINER_NAME} || true
            docker run -d -p 3001:80 --name ${CONTAINER_NAME} ${IMAGE_NAME}
          """
        }
      }
    }
  }

  post {
    success {
      echo '🚀 Deployed successfully on the same EC2 instance!'
    }
    failure {
      echo '❌ Deployment failed. Check logs.'
    }
  }
}
