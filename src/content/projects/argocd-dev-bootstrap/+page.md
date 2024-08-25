---
title: "ArgoCD Dev Bootstrap - Local Kubernetes Environment Setup"
description: "A project for setting up a local Kubernetes environment with ArgoCD using K3d and Helm."
highlight: "Local Kubernetes and ArgoCD setup"
date: "2024-08-14"
layout: project
topics:
  - Kubernetes
  - ArgoCD
  - K3d
  - Helm
  - DevOps
  - GitOps
featured: true
published: true
summary: "A collection of scripts to set up a local Kubernetes cluster with ArgoCD installed, using K3d and Helm."
hasImages: true
githubUrl: "https://github.com/c-j-p-nordquist/argocd-dev-bootstrap"
liveUrl: ""
---

The ArgoCD Dev Bootstrap project provides a set of scripts to create a local Kubernetes development environment with ArgoCD pre-installed. It leverages K3d to create a lightweight Kubernetes cluster and Helm to deploy ArgoCD.

## Project Components

The project contains three main scripts:

1. `setup_cluster.sh`: Creates a K3d cluster and installs Helm.
2. `install_argocd.sh`: Deploys ArgoCD in the cluster using Helm.
3. `cleanup.sh`: Removes the K3d cluster and associated kubeconfig entries.

## Tool Choices

I selected specific tools for creating this local environment:

1. **K3d**: I chose K3d for its ability to quickly create lightweight Kubernetes clusters using Docker. It outperforms alternatives like Minikube in speed and resource usage, making it ideal for local development and CI environments.

2. **ArgoCD**: I integrated ArgoCD as the GitOps continuous delivery tool. Its robust features, active community, and ease of use make it an excellent choice for developers implementing GitOps workflows. ArgoCD enables declarative management of Kubernetes applications.

3. **Helm**: I use Helm to deploy ArgoCD because it simplifies the installation process and enables easy customization. Helm's templating and packaging capabilities streamline the management of complex Kubernetes applications like ArgoCD.

## Usage

To use this project:

1. Run `setup_cluster.sh` to create the K3d cluster and install Helm.
2. Execute `install_argocd.sh` to deploy ArgoCD using Helm.
3. Access the ArgoCD UI and retrieve the initial admin password using the instructions provided in the Helm output.

When finished, run `cleanup.sh` to tear down the environment.

## Potential Use Cases

This project supports various scenarios:

1. Learning Kubernetes and ArgoCD for developers.
2. Testing GitOps workflows in a local environment.
3. Rapid prototyping of Kubernetes-based applications.
4. Creating disposable Kubernetes environments for Continuous Integration pipelines.

## Customization

Users can customize the scripts to adjust cluster settings, modify ArgoCD configuration, or add deployment of additional tools or applications to suit their specific needs.