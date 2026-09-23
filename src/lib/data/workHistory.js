// Personal content is based on cv/dist/base.pdf, supplied on 2026-09-17.
export const profile = {
	title: 'Platform & security engineer',
	description:
		'Philip Nordquist, platform and security engineer in Mantorp, Sweden. Previously Staff Operations Engineer at ExpressVPN.',
	summary:
		'I set the technical direction and built the platform hosting all of STIM’s production applications. Previously, as Staff Operations Engineer at ExpressVPN, I led releases across 3,000+ VPN servers and shipped countermeasures to keep services reachable in censored regions. I use AI agents and automation throughout my daily work.'
};

export const workHistory = [
	{
		company: 'STIM',
		position: 'DevSecOps Engineer',
		location: 'Stockholm',
		period: 'Nov 2023 – Present',
		description:
			'Designed and built the Kubernetes platform on VMware that now hosts all production applications. Responsible for platform automation, security monitoring, and incident response.',
		highlights: [
			'Architected and built STIM’s Kubernetes platform on VMware, now hosting all production applications. Automated provisioning with Terraform and Ansible, cutting new-cluster setup from days to about 15 minutes.',
			'Established GitOps with Argo CD across the platform’s clusters, standardising deployment and configuration management for shared platform services.',
			'Designed the platform so nodes and clusters can be rebuilt from code, with persistent application data backed up separately.',
			'Established security monitoring and incident response in Microsoft Sentinel across Entra ID, Intune and Microsoft 365. Carry out forensic investigations and contain incidents as part of the security on-call rotation.',
			'Automated server patching with Azure Arc, cutting about 100 hours a year of after-hours maintenance.',
			'Expanded 1Password from IT credential storage to application secrets management across the organisation.'
		]
	},
	{
		company: 'ExpressVPN',
		position: 'Staff Operations Engineer',
		location: 'Hong Kong / Remote',
		period: 'Apr 2021 – Jul 2023',
		description:
			'Led operational readiness for the ExpressVPN Keys launch and weekly releases across 3,000+ VPN servers. Built monitoring and protocol-level countermeasures for the global VPN and proxy fleet.',
		highlights: [
			'Led operational readiness for the global ExpressVPN Keys launch, defining the support model and a cross-region failover design with a recovery target under 15 minutes.',
			'Reverse-engineered how adversarial networks fingerprinted and blocked VPN traffic, then shipped protocol-level countermeasures (proxy protocols, packet obfuscation) keeping the service reachable in heavily censored regions.',
			'Built the Prometheus/Grafana monitoring stack for 3,000+ servers and the global proxy fleet.',
			'Enabled the global service desk to resolve more VPN connectivity issues through playbooks and technical training, reducing engineering escalations.',
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
			'Led corporate network design and rollout across global offices, automated identity management, and delivered secure remote-work infrastructure for 1,000+ staff during COVID.',
		highlights: [
			'Led corporate network design and rollout across global offices, using Palo Alto firewalls and zero-trust controls to reduce lateral-movement risk.',
			'Automated IAM via Okta across 200+ SaaS apps, cutting user provisioning from 3 hours to 15 minutes.',
			'Delivered secure remote-work infrastructure for 1,000+ staff during COVID with zero downtime.'
		]
	},
	{
		company: 'Universum Communications AB',
		position: 'IT Infrastructure & Operations Manager',
		location: 'Stockholm',
		period: 'Sep 2017 – Apr 2019',
		description:
			'Led IT operations for the Stockholm headquarters and offices across Europe, Asia and North America, including migration and governance work during M&A.',
		highlights: [
			'Led IT operations for the Stockholm headquarters (100–200 staff) and offices across Europe, Asia and North America.',
			'Led technical due diligence and a G Suite to Office 365 migration during M&A; implemented technical and data governance controls to support GDPR readiness.'
		]
	},
	{
		company: 'ExternIT',
		position: 'IT Engineer',
		location: 'Stockholm',
		period: 'Sep 2015 – Sep 2017',
		description:
			'Promoted internally from Binero (same group). Managed Windows/Linux servers and Cisco/HP networks for MSP clients; improved reliability through monitoring and automation.',
		highlights: []
	},
	{
		company: 'Binero AB',
		position: 'Support Engineer',
		location: 'Stockholm',
		period: 'Oct 2014 – Sep 2015',
		description:
			'Provided L1/L2 support for Linux web hosting, DNS, and email, including escalations.',
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
