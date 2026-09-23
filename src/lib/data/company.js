// Single source for everything CJP IT Consulting AB shows on the company page.
// CONTACT_EMAIL is the one place to change when a dedicated company address
// (e.g. hello@…) exists.
export const COMPANY_NAME = 'CJP IT Consulting AB';
export const COMPANY_SHORT = 'CJP IT Consulting';
export const CONTACT_EMAIL = 'hello@nordquist.me';
export const ORG_NUMBER = '559387-5247';

export const services = [
	{
		id: 'engineering',
		title: 'Platform & Security Engineering',
		summary: 'Design, implementation, and operation of cloud infrastructure and security systems.',
		items: [
			'Cloud platforms, Kubernetes, and infrastructure as code',
			'CI/CD pipelines, automation, and observability',
			'Networking, security operations, and hardening'
		]
	},
	{
		id: 'qa-localisation',
		title: 'QA & Localisation Testing',
		summary:
			'Functional, usability, and localisation testing across web, mobile, desktop, and connected devices.',
		items: [
			'Structured and exploratory test cycles on real devices',
			'Localisation QA in Swedish, English, Mandarin, and Cantonese',
			'Managed testing platforms and NDA-bound test programs'
		]
	},
	{
		id: 'product-data',
		title: 'Product Data Services',
		summary: 'Product and master data management in GS1 systems, including Validoo.',
		items: [
			'Product data entry and validation in GS1 Validoo',
			'Catalogue and master data quality maintenance',
			'Ongoing product record updates'
		]
	}
];

export const workingPoints = [
	{
		title: 'Project work',
		text: 'Fixed-scope projects and individual tasks, with direct contact with the people carrying out the work.'
	},
	{
		title: 'Ongoing assignments',
		text: 'Recurring retainers for engineering, testing, or catalogue maintenance.'
	},
	{
		title: 'Remote delivery',
		text: 'Based in Mantorp, Sweden, working remotely with clients internationally.'
	},
	{
		title: 'Confidentiality',
		text: 'Experienced in NDA-bound testing programs and confidential client work.'
	}
];
