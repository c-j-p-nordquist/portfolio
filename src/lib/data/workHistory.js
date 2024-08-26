import IconCloud from '~icons/lucide/cloud';
import IconLock from '~icons/lucide/lock';
import IconMusic from '~icons/lucide/music';
import IconGlobe from '~icons/lucide/globe';
import IconUserSearch from '~icons/lucide/user-search';
import IconCode from '~icons/lucide/code';


export const workHistory = [
    {
        company: 'STIM',
        logo: '/images/logos/stim.svg',
        industry: IconMusic,
        color: '#5952A5',
        position: 'DevSecOps Engineer',
        location: 'Stockholm, Sweden',
        start: 2023,
        end: 'Present',
        description: 'Spearheading the design and implementation of advanced observability and security solutions, enhancing incident response times and driving strategic automation initiatives.',
        skills: ['Observability', 'SIEM', 'Incident Response', 'CIS CSC', 'Automation', 'Infrastructure as Code', 'GitOps', 'Cloud Security'],
        techstack: ['Kubernetes', 'ArgoCD', 'Helm', 'Microsoft Sentinel', 'Grafana', 'GCP', 'VMware', 'Prometheus', 'Loki', 'Ansible', 'Terraform']
    },
    {
        company: 'ExpressVPN',
        industry: IconLock,
        logo: '/images/logos/expressvpn.svg',
        color: '#DA3940',
        position: 'Staff Operations Engineer',
        location: 'Hong Kong',
        start: 2021,
        end: 2023,
        description: 'Led the execution of multiple server releases, managing a global infrastructure of 3,000+ servers across 100+ countries. Architected high-resilience observability and security systems to mitigate complex service disruptions, significantly improving service reliability.',
        skills: ['Infrastructure Management', 'Observability', 'Service Reliability', 'Disaster Recovery', 'Performance Optimization', 'Security Enhancement', 'Team Leadership', 'Mentoring'],
        techstack: ['AWS', 'Python', 'Terraform', 'PostgreSQL', 'Debian', 'Prometheus', 'Grafana']
    },
    {
        company: 'ExpressVPN',
        industry: IconLock,
        logo: '/images/logos/expressvpn.svg',
        color: '#DA3940',
        position: 'Senior IT Cloud/Infrastructure Engineer',
        location: 'Hong Kong',
        start: 2019,
        end: 2021,
        description: 'Drove a global network overhaul, implementing a new, resilient architecture. Managed IT operations across multiple regions, optimizing network performance and eliminating outages while setting standards for identity and access management.',
        skills: ['Network Architecture', 'Global IT Management', 'Identity and Access Management', 'Security Implementation', 'Process Automation'],
        techstack: ['Terraform', 'Palo Alto Networks', 'AWS', 'Python', 'Google Workspace', 'Okta']
    },
    {
        company: 'Universum Global',
        industry: IconUserSearch,
        logo: '/images/logos/universum.svg',
        color: '#092431',
        position: 'IT Infrastructure & Operations Manager',
        location: 'Stockholm, Sweden',
        start: 2017,
        end: 2019,
        description: 'Orchestrated and maintained IT infrastructure across multiple international offices. Played a pivotal role during Universums acquisition by Stepstone, managing IT integration and migration processes.',
        skills: ['IT Infrastructure Management', 'Cross-functional Collaboration', 'Acquisition IT Integration', 'Project Management', 'Systems Migration'],
        techstack: ['Office 365', 'AWS', 'Google Workspace', 'Windows Server', 'VMware']
    },
    {
        company: 'Binero IT (formerly ExternIT)',
        industry: IconCloud,
        logo: '/images/logos/binero.svg',
        color: '#f0eeee',
        position: 'IT Engineer',
        location: 'Stockholm, Sweden',
        start: 2015,
        end: 2017,
        description: 'Delivered end-to-end technical solutions for SMBs, from network equipment procurement to server infrastructure setup. Conducted numerous email migrations from on-premises servers to cloud platforms like Office365 and Gmail.',
        skills: ['SMB IT Solutions', 'Server Infrastructure', 'Cloud Migration', 'Network Setup', 'Technical Support'],
        techstack: ['Windows Server', 'Office 365', 'Google Workspace', 'Exchange Server', 'Active Directory']
    },
    {
        company: 'Websupport (formerly Binero)',
        industry: IconGlobe,
        logo: '/images/logos/websupport.svg',
        color: '#2c3843',
        position: 'Support Engineer',
        location: 'Stockholm, Sweden',
        start: 2014,
        end: 2015,
        description: 'Offered product guidance, resolved complex domain and DNS challenges, and ensured smooth website operations for customers. Assisted customers with issues related to popular content management systems like Wordpress and Drupal.',
        skills: ['Technical Support', 'DNS Management', 'Web Hosting', 'Customer Service', 'Troubleshooting'],
        techstack: ['Linux', 'Apache', 'MySQL', 'PHP', 'WordPress', 'Drupal', 'cPanel']
    }
];