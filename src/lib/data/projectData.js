// $lib/data/projectData.js

export const projects = [
    {
        id: 1,
        title: "Cloud-Native Monitoring Solution",
        description: "Developed a scalable monitoring system using Prometheus and Grafana for large-scale Kubernetes clusters.",
        imageUrl: "/images/projects/monitoring-solution.jpg",
        tags: ["DevOps", "Kubernetes", "Monitoring"],
        githubUrl: "https://github.com/yourusername/cloud-native-monitoring",
        liveUrl: "https://monitor.example.com"
    },
    {
        id: 2,
        title: "Infrastructure as Code Framework",
        description: "Created a custom IaC framework using Terraform and Ansible to manage multi-cloud environments.",
        imageUrl: "/images/projects/iac-framework.jpg",
        tags: ["IaC", "Terraform", "Ansible"],
        githubUrl: "https://github.com/yourusername/iac-framework",
        liveUrl: null
    },
    {
        id: 3,
        title: "Automated CI/CD Pipeline",
        description: "Implemented a robust CI/CD pipeline using GitLab CI and ArgoCD for seamless deployments to Kubernetes.",
        imageUrl: "/images/projects/cicd-pipeline.jpg",
        tags: ["CI/CD", "GitLab", "ArgoCD"],
        githubUrl: "https://github.com/yourusername/automated-cicd",
        liveUrl: "https://cicd-demo.example.com"
    },
    {
        id: 4,
        title: "Serverless ETL Data Pipeline",
        description: "Designed and implemented a serverless ETL pipeline using AWS Lambda, S3, and Redshift for real-time data processing.",
        imageUrl: "/images/projects/serverless-etl.jpg",
        tags: ["AWS", "Serverless", "Data Engineering"],
        githubUrl: "https://github.com/yourusername/serverless-etl",
        liveUrl: null
    },
    {
        id: 5,
        title: "Chaos Engineering Platform",
        description: "Developed a chaos engineering platform to improve system resilience by simulating various failure scenarios.",
        imageUrl: "/images/projects/chaos-engineering.jpg",
        tags: ["SRE", "Chaos Engineering", "Resilience"],
        githubUrl: "https://github.com/yourusername/chaos-platform",
        liveUrl: "https://chaos.example.com"
    }
];