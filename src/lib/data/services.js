// Import icons from Iconify
import IconMonitoring from '~icons/lucide/activity';
import IconSecurity from '~icons/lucide/shield';
import IconAutomation from '~icons/lucide/terminal';
import IconGitOps from '~icons/lucide/git-branch';
import IconRecovery from '~icons/lucide/refresh-cw';

// Example visual component for a graph
import GrafanaGraph from '$lib/components/GrafanaGraph.svelte';

export const services = [
    {
        title: 'Implementing Observability',
        description:
            'Deploy and enhance observability tools to monitor, trace, and log across distributed systems, ensuring proactive insights into system performance and reliability.',
        icon: IconMonitoring,
        visual: GrafanaGraph
    },
    {
        title: 'Improving Security Posture',
        description:
            'Integrate security best practices into every stage of development, from design to deployment, to ensure a proactive security posture and reduce risks.',
        icon: IconSecurity
    },
    {
        title: 'GitOps & CI/CD Automation',
        description:
            'Implement GitOps methodologies to streamline CI/CD pipelines, reducing deployment times and ensuring consistency and reliability in software delivery.',
        icon: IconGitOps
    },
    {
        title: 'Disaster Recovery Planning',
        description:
            'Design and implement robust disaster recovery strategies to minimize downtime and data loss, ensuring business continuity in the face of unexpected events.',
        icon: IconRecovery
    },
    {
        title: 'Infrastructure Automation',
        description:
            'Automate infrastructure provisioning and management using tools like Terraform and Ansible, reducing manual effort and human error while improving scalability.',
        icon: IconAutomation
    }
]