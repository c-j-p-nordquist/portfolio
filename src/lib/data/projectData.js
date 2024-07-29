export const projects = [
    {
        id: 1,
        slug: "macos-dev-environment-setup",
        title: "MacOS Development Environment Setup Scripts",
        summary: "Automate your MacOS dev environment setup with customizable bash scripts.",
        description: "A collection of bash scripts automating the setup of various development environments on MacOS. It includes scripts for DevOps, Golang, GPG, and terminal customization, streamlining the process of setting up a new development machine.",
        imageUrl: "/images/projects/mac-terminal-bootstrap.png",
        tags: ["DevOps", "Automation", "Bash", "MacOS"],
        githubUrl: "https://github.com/c-j-p-nordquist/mac-terminal-bootstrap",
        liveUrl: null,
        featured: true
    },
    {
        id: 2,
        slug: "insikt-network-sniffer",
        title: "Insikt - Network Sniffer",
        summary: "Lightweight Go-based network sniffer for packet capture and analytics.",
        description: "A lightweight network sniffer written in Go, designed to capture and process network packets for analytics. It features a Data Capture Module for raw packet capture and traffic monitoring, with plans for expansion into data processing and integration with Prometheus.",
        imageUrl: "/images/projects/insikt-network-sniffer.png",
        tags: ["Go", "Networking", "Security", "Analytics"],
        githubUrl: "https://github.com/c-j-p-nordquist/insikt",
        liveUrl: null,
        featured: true
    },
    {
        id: 3,
        slug: "argocd-on-aws-ec2-automation",
        title: "Argo CD on AWS EC2 Automation",
        summary: "Deploy Argo CD control cluster on AWS EC2 using Packer, Terraform, and Helm.",
        description: "An automation project that deploys an Argo CD control cluster on AWS EC2. It leverages Packer for image building, Terraform for infrastructure provisioning, and Helm for Kubernetes deployments, creating a robust and scalable GitOps pipeline for managing Kubernetes applications.",
        imageUrl: "/images/projects/argocd-on-ec2.png",
        tags: ["DevOps", "AWS", "Kubernetes", "GitOps", "Terraform", "Packer", "Helm"],
        githubUrl: "https://github.com/c-j-p-nordquist/argocd-on-ec2",
        liveUrl: null,
        featured: true
    },
    {
        id: 4,
        slug: "ekolod-http-status-probe",
        title: "Ekolod - Lightweight HTTP Status Probe",
        summary: "Versatile HTTP probe for quick web service status checks with SvelteKit UI.",
        description: "Ekolod is a versatile, lightweight HTTP probe designed for quick setup of status checks for web services. It features a built-in SvelteKit UI for easy visualization, supports deployment via Docker or Kubernetes, and offers Prometheus metrics export. While simple to set up for basic checks, Ekolod also allows for complex, customizable status checks with multiple operators and thresholds. Ideal for teams needing rapid deployment of comprehensive service monitoring, from simple endpoint checks to sophisticated API health monitoring.",
        imageUrl: "/images/projects/ekolod-http-probe.png",
        tags: ["Go", "SvelteKit", "Monitoring", "Docker", "Kubernetes", "DevOps"],
        githubUrl: "https://github.com/c-j-p-nordquist/ekolod",
        liveUrl: "https://status.nordquist.me",
        featured: false
    },
    {
        id: 5,
        slug: "personal-portfolio-website",
        title: "Personal Portfolio Website",
        summary: "Modern, responsive portfolio site built with SvelteKit, TailwindCSS, and DaisyUI.",
        description: "A modern, responsive personal website showcasing projects, blog posts, and professional information in the field of DevOps and Software Engineering. Built with SvelteKit 5, TailwindCSS, and DaisyUI, it features a project showcase, a searchable blog system, and a universal search functionality. The site demonstrates proficiency in frontend development, SEO optimization through server-side rendering, and efficient search implementation using FlexSearch and web workers.",
        imageUrl: "/images/projects/personal-portfolio.png",
        tags: ["SvelteKit", "TailwindCSS", "DaisyUI", "Full-Stack", "SEO", "Web Development"],
        githubUrl: "https://github.com/c-j-p-nordquist/portfolio",
        liveUrl: "https://philip.nordquist.me",
        featured: false
    }
];