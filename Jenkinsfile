pipeline {
    agent any

    tools {
        maven 'jenkins-maven' // Maven configured in Jenkins
        nodejs 'nodejs' // NodeJS configured in Jenkins
    }

    environment {
        BACKEND_DIR = "user-management-system"
        FRONTEND_DIR = "users-managment-app"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/OmarAlHamawi/UsermanagementApp'
            }
        }

        stage('Backend - Unit Tests') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'mvn clean test'
                }
            }
        }

        stage('Frontend - Install Dependencies') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm install'
                }
            }
        }

        stage('Frontend - Cypress Tests') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm run test:e2e'
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline completed."
        }
        success {
            echo "Build was successful!"
        }
        failure {
            echo "Build failed."
        }
    }
}
