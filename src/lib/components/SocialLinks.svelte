<script>
	import IconGithub from '~icons/lucide/github';
	import IconLinkedin from '~icons/lucide/linkedin';
	import IconMail from '~icons/lucide/mail';
</script>

<div class="dropdown dropdown-end">
	<button class="relative py-2 px-3 text-base hover:text-primary transition-colors duration-200">
		<IconMail class="h-5 w-5" />
	</button>
	<ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
		<li>
			<a href="https://github.com/c-j-p-nordquist" target="_blank" rel="noopener noreferrer"
				><IconGithub class="h-4 w-4 mr-2" /> GitHub</a
			>
		</li>
		<li>
			<a href="https://linkedin.com/in/philipnordquist" target="_blank" rel="noopener noreferrer"
				><IconLinkedin class="h-4 w-4 mr-2" /> LinkedIn</a
			>
		</li>
		<li>
			<a href="mailto:philip@nordquist.me"><IconMail class="h-4 w-4 mr-2" /> Email</a>
		</li>
	</ul>
</div>
