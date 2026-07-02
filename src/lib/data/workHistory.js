export const workHistory = [
	{
		company: 'STIM',
		position: 'DevSecOps Engineer',
		location: 'Stockholm',
		period: 'Nov 2023 – Present',
		description:
			'Building the internal Kubernetes platform, security detections on Sentinel, and an LLM agent that helps triage incidents, plus day-to-day SOC engineering, incident investigation, and certificate management.',
		highlights: [
			'Built the internal Kubernetes platform end-to-end with Terraform, Ansible, and custom Python automation, with ArgoCD/GitOps for cluster addons. Cut new-cluster provisioning from days to under 20 minutes',
			'Implemented enterprise SIEM and detection workflows on Microsoft Sentinel, reducing security alert MTTD from days to minutes',
			'Added an LLM agent to the Sentinel incident workflow that summarises and contextualises alerts, so routine incidents can be triaged at a glance',
			'Automated server patching with Azure Arc, cutting around 100 hours/year of after-hours work',
			'Hardened CI/CD pipelines to CIS benchmarks and rolled out 1Password as the org-wide secrets store'
		]
	},
	{
		company: 'ExpressVPN',
		position: 'Staff Operations Engineer',
		location: 'Hong Kong / Remote',
		period: 'Apr 2021 – Jul 2023',
		description:
			'Operations tech lead for the Keys launch and weekly releases across 3,000+ VPN servers, with hands-on VPN traffic engineering (packet capture, proxy/obfuscation configs, traffic analysis, and IP/route management including BGP) as part of a larger engineering team.',
		highlights: [
			'Technical owner for the global launch of ExpressVPN Keys; defined operational readiness, support model, and sub-15-minute cross-region failover design',
			'Reverse-engineered how adversarial networks fingerprinted and blocked VPN traffic, then shipped continuous protocol-level countermeasures (proxy protocols, packet obfuscation) that kept the service reachable in heavily censored regions',
			'Built and ran the Prometheus/Grafana observability stack (dashboards, metrics, and log collection) that the operations team used to monitor 3,000+ servers and the global proxy fleet',
			'Operationalised regional accessibility work into documented playbooks and training for the global service desk, reducing escalations',
			'Led weekly releases across 3,000+ VPN servers with canary deploys, sustaining 99.9% uptime',
			'Co-designed the Operations technical interview loop and conducted 50+ technical interviews'
		]
	},
	{
		company: 'ExpressVPN',
		position: 'Senior Cloud & Infrastructure Engineer',
		location: 'Hong Kong',
		period: 'Apr 2019 – Apr 2021',
		description:
			'Designed and deployed the corporate network across offices, built out Zero-Trust controls, automated identity management, and set up secure remote work for 1,000+ staff when COVID hit.',
		highlights: [
			'Designed and led the deployment of the corporate network across offices (firewalls, switching, and routing) with Zero-Trust controls on Palo Alto firewalls',
			'Automated IAM for 200+ SaaS apps through Okta, cutting provisioning time by 90%',
			'Got secure remote work infrastructure up for 1,000+ staff with zero downtime'
		]
	},
	{
		company: 'Universum',
		position: 'IT Infrastructure & Operations Manager',
		location: 'Stockholm',
		period: 'Sep 2017 – Apr 2019',
		description:
			'Led IT operations and reliability for the Stockholm HQ and satellite offices in New York, London, Singapore, Shanghai, Germany, and Switzerland.',
		highlights: [
			'Owned technical due diligence and the G Suite to O365 migration during M&A',
			'Drove GDPR readiness through technical controls and data governance'
		]
	},
	{
		company: 'ExternIT',
		position: 'IT Engineer',
		location: 'Stockholm',
		period: 'Sep 2015 – Sep 2017',
		description: 'Server infrastructure and network configuration for various client environments.',
		highlights: []
	},
	{
		company: 'Binero',
		position: 'Support Engineer',
		location: 'Stockholm',
		period: 'Oct 2014 – Sep 2015',
		description: 'Technical support for web hosting, DNS, and email.',
		highlights: []
	}
];

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
