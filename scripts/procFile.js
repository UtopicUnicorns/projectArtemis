function procFile(file, mode) {
				fetch(file)
				.then(response => response.text())
				.then(data => {
					document.getElementById("highLight").innerHTML = `<pre><code class="language-js">${data}</code></pre>`;
				});
			}
