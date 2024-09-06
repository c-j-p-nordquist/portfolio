// Import icons from Iconify
import IconMonitoring from '~icons/lucide/activity';
import IconSecurity from '~icons/lucide/shield';
import IconAutomation from '~icons/lucide/terminal';
import IconDeployment from '~icons/lucide/package';
import IconRecovery from '~icons/lucide/refresh-cw';
import IconCostEfficiency from '~icons/lucide/dollar-sign';
import IconPerformance from '~icons/lucide/trending-up';
import IconCompliance from '~icons/lucide/check-circle';
import IconResilience from '~icons/lucide/life-buoy';
import IconMigration from '~icons/lucide/cloud';

// Updated Services List
export const services = [
    {
        title: 'Deploy with Confidence',
        description: 'Automate your deployments to release new features faster and safer.',
        icon: IconDeployment,
        extra: [
            'Consistent, reliable deployments across all environments.',
            'Faster time to market with reduced risk of errors.',
            'Automated processes that minimize downtime.'
        ]
    },
    {
        title: 'See Everything, Fix Anything',
        description: 'Get real-time insights into your systems to catch and fix issues before they impact users.',
        icon: IconMonitoring,
        extra: [
            'Proactive issue detection with real-time monitoring.',
            'Data-driven decisions with detailed metrics.',
            'Quick troubleshooting to minimize service disruptions.'
        ]
    },
    {
        title: 'Keep Your Code Secure, Always',
        description: 'Secure your software at every stage, reducing risks and ensuring compliance.',
        icon: IconSecurity,
        extra: [
            'Stay ahead of threats with continuous security monitoring.',
            'Implement best-in-class security practices throughout development.',
            'Ensure compliance with automated security checks.'
        ]
    },
    {
        title: 'Automate, Scale, and Simplify',
        description: 'Streamline your infrastructure management with automation, reducing manual effort and errors.',
        icon: IconAutomation,
        extra: [
            'Efficiently manage resources to meet demand.',
            'Empower teams with easy-to-use infrastructure tools.',
            'Design scalable systems that grow with your needs.'
        ]
    },
    {
        title: 'Resilient Systems, Ready for Anything',
        description: 'Prepare for the unexpected with systems designed to recover quickly and keep your business running.',
        icon: IconRecovery,
        extra: [
            'Automatic failover for continuous operation.',
            'Multi-layered backups to protect your data.',
            'Fast recovery plans to restore services quickly.'
        ]
    },
    {
        title: 'Get More from Your Infrastructure',
        description: 'Optimize your infrastructure to maximize performance while minimizing costs.',
        icon: IconCostEfficiency,
        extra: [
            'Scale systems efficiently to avoid unnecessary expenses.',
            'Continuously optimize workloads to reduce waste.',
            'Automate routine tasks to cut operational overhead.'
        ]
    },
    {
        title: 'Peak Performance, Always',
        description: 'Ensure your systems run at their best with continuous monitoring and smart load management.',
        icon: IconPerformance,
        extra: [
            'Real-time performance tracking to spot bottlenecks.',
            'Balance traffic to maintain optimal performance.',
            'Improve user experience with fast, responsive systems.'
        ]
    },
    {
        title: 'Compliance Without Compromise',
        description: 'Meet industry standards effortlessly with automated governance and audit-ready systems.',
        icon: IconCompliance,
        extra: [
            'Consistently apply policies to ensure compliance.',
            'Maintain adherence to regulations with minimal effort.',
            'Keep detailed records to simplify audits.'
        ]
    },
    {
        title: 'Systems Built for Resilience',
        description: 'Design systems that can withstand disruptions and recover quickly, ensuring reliability for your customers.',
        icon: IconResilience,
        extra: [
            'Use containers for easy scalability and quick recovery.',
            'Implement Infrastructure as Code for consistency.',
            'Monitor and maintain system health from the start.'
        ]
    },
    {
        title: 'Seamless Cloud Migration',
        description: 'Migrate to the cloud smoothly, optimizing for performance and minimizing disruption.',
        icon: IconMigration,
        extra: [
            'Transition with minimal downtime.',
            'Optimize cloud architecture for your business.',
            'Ensure security and compliance throughout the migration.'
        ]
    }
];
