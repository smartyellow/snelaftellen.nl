<script context="module">
	export const prerender = true;
</script>

<h2>Contact</h2>

<p>
	Heb je suggesties voor SnelAftellen.nl? Werkt iets niet goed? Of heb je andere opmerkingen? Laat
	het ons weten via dit contactformulier of via
	<a href="mailto:mail@snelaftellen.nl">mail@snelaftellen.nl</a>. Dank je wel!
</p>

<form name="contact" method="post" data-netlify="true" action="/contact/dankje/">
	<input type="hidden" name="form-name" value="contact" />
	<div class="group">
		<input type="text" name="name" placeholder="bv. Jan" required />
		<label for="name">Je naam *</label>
	</div>
	<div class="group">
		<input type="email" name="email" placeholder="bv. mijnemail@home.nl" />
		<label for="name">Je e-mailadres</label>
	</div>
	<div class="group">
		<input type="text" name="subject" placeholder="bv. Suggestie voor SnelAftellen.nl" />
		<label for="name">Onderwerp</label>
	</div>
	<div class="group">
		<textarea
			name="body"
			rows="10"
			required
			placeholder="bv. Ik heb een suggestie voor je en die deel ik graag. Ik stel voor ..."
		/>
		<label for="body">Je bericht *</label>
	</div>
	<button type="submit">Verzenden</button>
</form>
