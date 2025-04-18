pipeline {
    agent any

    tools {
        maven 'jenkins-maven' 
        nodejs 'nodejs' 
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
                    bat 'npm install'
                }
            }
        }

        stage('Frontend - Build') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'npm run build'
                }
            }
        }

        stage('Frontend - Cypress Tests') {
            steps {
                dir("${FRONTEND_DIR}") {
                    powershell 'npm run test:e2e'
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
