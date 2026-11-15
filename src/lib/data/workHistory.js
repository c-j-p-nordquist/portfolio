// Personal content is based on cv/dist/base.pdf, supplied on 2026-09-17.
export const profile = {
	title: 'Platform & security engineer',
	description:
		'Philip Nordquist, platform and security engineer in Mantorp, Sweden. Previously Staff Operations Engineer at ExpressVPN.',
	summary:
		'Over the last ten years I’ve worked with infrastructure, networks, Kubernetes and security. Most of my work is finding weak spots in how systems are built or run and fixing them. Today I’m at STIM, and before that I was Staff Operations Engineer at ExpressVPN.'
};

export const workHistory = [
	{
		company: 'STIM',
		position: 'DevSecOps Engineer',
		location: 'Stockholm',
		period: 'Nov 2023 – Present',
		description:
			'Built and now run the Kubernetes platform that hosts STIM’s production applications. My current focus is GitOps with Argo CD and tightening security inside the clusters, alongside security monitoring and incident response.',
		highlights: [
			'Introduced GitOps with Argo CD across every cluster so shared platform services are deployed and configured the same way everywhere. Now designing how application releases are promoted between environments safely and with little manual work.',
			'Locking down the clusters with RBAC, admission policies and policy controls so containers get no more access than they need. The aim is zero trust down to the individual workload, so anything that gets into the network has little room to move sideways.',
			'Built security monitoring and incident response workflows in Microsoft Sentinel across Entra ID, Intune and Microsoft 365, and handle forensic investigations on the security on-call rotation.',
			'Automated cluster provisioning on VMware with Terraform and Ansible, cutting new-cluster setup from days to about 15 minutes.',
			'Set up the platform so nodes and clusters can be rebuilt from code, with persistent application data backed up separately.',
			'Automated server patching with Azure Arc, saving around 100 hours a year of after-hours maintenance.',
			'Rolled out 1Password for application secrets management across the organisation, beyond its original use for IT credentials.'
		]
	},
	{
		company: 'ExpressVPN',
		position: 'Staff Operations Engineer',
		location: 'Hong Kong / Remote',
		period: 'Apr 2021 – Jul 2023',
		description:
			'Worked on release engineering, observability and anti-censorship across 3,000+ VPN servers and the global proxy fleet, and led operational readiness for the launch of ExpressVPN Keys.',
		highlights: [
			'Defined the support model and cross-region failover design (under 15-minute recovery target) for the global launch of ExpressVPN Keys.',
			'Reverse-engineered how censoring networks fingerprinted and blocked VPN traffic, then shipped protocol-level countermeasures (proxy protocols, packet obfuscation) that kept the service reachable in heavily censored regions.',
			'Built the Prometheus and Grafana monitoring stack for 3,000+ servers and the global proxy fleet.',
			'Wrote playbooks and ran technical training so the service desk could resolve more VPN connectivity issues itself, reducing escalations to engineering.',
			'Led weekly releases across 3,000+ VPN servers with canary deploys, sustaining 99.9% uptime.',
			'Co-designed the Operations interview loop and conducted 50+ technical interviews on production engineering scenarios.'
		]
	},
	{
		company: 'ExpressVPN',
		position: 'Senior Cloud & Infrastructure Engineer',
		location: 'Hong Kong',
		period: 'Apr 2019 – Apr 2021',
		description:
			'Responsible for corporate network architecture, identity management and remote-work infrastructure across global offices.',
		highlights: [
			'Designed the corporate network and led its rollout across global offices, using Palo Alto firewalls and zero-trust controls to limit lateral movement.',
			'Automated identity management with Okta across 200+ SaaS apps, cutting user provisioning from 3 hours to 15 minutes.',
			'Rolled out secure remote-work infrastructure for 1,000+ staff during COVID with no downtime.'
		]
	},
	{
		company: 'Universum Communications AB',
		position: 'IT Infrastructure & Operations Manager',
		location: 'Stockholm',
		period: 'Sep 2017 – Apr 2019',
		description:
			'Ran IT infrastructure and operations for the Stockholm headquarters (100–200 staff) and offices across Europe, Asia and North America.',
		highlights: [
			'Led technical due diligence and migrated the company from G Suite to Office 365 during M&A.',
			'Put technical and data governance controls in place for GDPR readiness across all offices.'
		]
	},
	{
		company: 'ExternIT',
		position: 'IT Engineer',
		location: 'Stockholm',
		period: 'Sep 2015 – Sep 2017',
		description:
			'Promoted internally from Binero (same group). Managed Windows and Linux servers and Cisco and HP networks for MSP clients, improving reliability through monitoring and automation.',
		highlights: []
	},
	{
		company: 'Binero AB',
		position: 'Support Engineer',
		location: 'Stockholm',
		period: 'Oct 2014 – Sep 2015',
		description:
			'Provided L1/L2 support for Linux web hosting, DNS and email, including escalations.',
		highlights: []
	}
];

export const technicalSkills = [
	{
		category: 'Cloud & platform',
		skills:
			'AWS, GCP, Azure, VMware vSphere; Kubernetes (K3s, EKS, GKE); Terraform, Ansible, Argo CD/GitOps, Helm.'
	},
	{
		category: 'Security',
		skills:
			'Microsoft Sentinel, detection engineering, incident response; zero trust, OIDC/SAML/RBAC, CIS/NIST hardening, PKI.'
	},
	{
		category: 'Networking',
		skills: 'VLANs, routing, firewall policy, DNS, BGP; VPN/proxy architectures, traffic analysis.'
	},
	{ category: 'Observability', skills: 'Datadog, OpenTelemetry, Prometheus, Grafana, SLOs.' },
	{
		category: 'Code & automation',
		skills: 'Python, Go, Bash, GitHub Actions; Azure Arc, cert-manager, 1Password.'
	},
	{
		category: 'AI & agents',
		skills:
			'Agent workflows, MCP tool integrations, prompt design, human-in-the-loop automation; OpenAI, Anthropic and Gemini APIs.'
	}
];

export const languages = 'Swedish (native), English (fluent)';

export const education = [
	{
		institution: 'Högskolan i Skövde',
		program: 'Computer Game Development, coursework',
		period: '2011 – 2014'
	},
	{
		institution: 'Linköpings Universitet',
		program: 'Communication, Media & Society, coursework',
		period: '2008 – 2011'
	}
];
