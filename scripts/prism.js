/* PrismJS 1.28.0
https://prismjs.com/download.html#themes=prism-coy&languages=markup+css+clike+javascript+css-extras&plugins=line-highlight+line-numbers+show-language+jsonp-highlight+inline-color+normalize-whitespace+toolbar */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
	Prism = function (e) { var n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
			t = 0,
			r = {},
			a = { manual: e.Prism && e.Prism.manual, disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler, util: { encode: function e(n) { return n instanceof i ? new i(n.type, e(n.content), n.alias) : Array.isArray(n) ? n.map(e) : n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ") }, type: function (e) { return Object.prototype.toString.call(e).slice(8, -1) }, objId: function (e) { return e.__id || Object.defineProperty(e, "__id", { value: ++t }), e.__id }, clone: function e(n, t) { var r, i; switch (t = t || {}, a.util.type(n)) {
							case "Object":
								if (i = a.util.objId(n), t[i]) return t[i]; for (var l in r = {}, t[i] = r, n) n.hasOwnProperty(l) && (r[l] = e(n[l], t)); return r;
							case "Array":
								return i = a.util.objId(n), t[i] ? t[i] : (r = [], t[i] = r, n.forEach((function (n, a) { r[a] = e(n, t) })), r);
							default:
								return n } }, getLanguage: function (e) { for (; e;) { var t = n.exec(e.className); if (t) return t[1].toLowerCase();
							e = e.parentElement } return "none" }, setLanguage: function (e, t) { e.className = e.className.replace(RegExp(n, "gi"), ""), e.classList.add("language-" + t) }, currentScript: function () { if ("undefined" == typeof document) return null; if ("currentScript" in document) return document.currentScript; try { throw new Error } catch (r) { var e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack) || [])[1]; if (e) { var n = document.getElementsByTagName("script"); for (var t in n)
									if (n[t].src == e) return n[t] } return null } }, isActive: function (e, n, t) { for (var r = "no-" + n; e;) { var a = e.classList; if (a.contains(n)) return !0; if (a.contains(r)) return !1;
							e = e.parentElement } return !!t } }, languages: { plain: r, plaintext: r, text: r, txt: r, extend: function (e, n) { var t = a.util.clone(a.languages[e]); for (var r in n) t[r] = n[r]; return t }, insertBefore: function (e, n, t, r) { var i = (r = r || a.languages)[e],
							l = {}; for (var o in i)
							if (i.hasOwnProperty(o)) { if (o == n)
									for (var s in t) t.hasOwnProperty(s) && (l[s] = t[s]);
								t.hasOwnProperty(o) || (l[o] = i[o]) } var u = r[e]; return r[e] = l, a.languages.DFS(a.languages, (function (n, t) { t === u && n != e && (this[n] = l) })), l }, DFS: function e(n, t, r, i) { i = i || {}; var l = a.util.objId; for (var o in n)
							if (n.hasOwnProperty(o)) { t.call(n, o, n[o], r || o); var s = n[o],
									u = a.util.type(s); "Object" !== u || i[l(s)] ? "Array" !== u || i[l(s)] || (i[l(s)] = !0, e(s, t, o, i)) : (i[l(s)] = !0, e(s, t, null, i)) } } }, plugins: {}, highlightAll: function (e, n) { a.highlightAllUnder(document, e, n) }, highlightAllUnder: function (e, n, t) { var r = { callback: t, container: e, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' };
					a.hooks.run("before-highlightall", r), r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)), a.hooks.run("before-all-elements-highlight", r); for (var i, l = 0; i = r.elements[l++];) a.highlightElement(i, !0 === n, r.callback) }, highlightElement: function (n, t, r) { var i = a.util.getLanguage(n),
						l = a.languages[i];
					a.util.setLanguage(n, i); var o = n.parentElement;
					o && "pre" === o.nodeName.toLowerCase() && a.util.setLanguage(o, i); var s = { element: n, language: i, grammar: l, code: n.textContent };

					function u(e) { s.highlightedCode = e, a.hooks.run("before-insert", s), s.element.innerHTML = s.highlightedCode, a.hooks.run("after-highlight", s), a.hooks.run("complete", s), r && r.call(s.element) } if (a.hooks.run("before-sanity-check", s), (o = s.element.parentElement) && "pre" === o.nodeName.toLowerCase() && !o.hasAttribute("tabindex") && o.setAttribute("tabindex", "0"), !s.code) return a.hooks.run("complete", s), void(r && r.call(s.element)); if (a.hooks.run("before-highlight", s), s.grammar)
						if (t && e.Worker) { var c = new Worker(a.filename);
							c.onmessage = function (e) { u(e.data) }, c.postMessage(JSON.stringify({ language: s.language, code: s.code, immediateClose: !0 })) } else u(a.highlight(s.code, s.grammar, s.language));
					else u(a.util.encode(s.code)) }, highlight: function (e, n, t) { var r = { code: e, grammar: n, language: t }; if (a.hooks.run("before-tokenize", r), !r.grammar) throw new Error('The language "' + r.language + '" has no grammar.'); return r.tokens = a.tokenize(r.code, r.grammar), a.hooks.run("after-tokenize", r), i.stringify(a.util.encode(r.tokens), r.language) }, tokenize: function (e, n) { var t = n.rest; if (t) { for (var r in t) n[r] = t[r];
						delete n.rest } var a = new s; return u(a, a.head, e), o(e, a, n, a.head, 0),
						function (e) { for (var n = [], t = e.head.next; t !== e.tail;) n.push(t.value), t = t.next; return n }(a) }, hooks: { all: {}, add: function (e, n) { var t = a.hooks.all;
						t[e] = t[e] || [], t[e].push(n) }, run: function (e, n) { var t = a.hooks.all[e]; if (t && t.length)
							for (var r, i = 0; r = t[i++];) r(n) } }, Token: i };

		function i(e, n, t, r) { this.type = e, this.content = n, this.alias = t, this.length = 0 | (r || "").length }

		function l(e, n, t, r) { e.lastIndex = n; var a = e.exec(t); if (a && r && a[1]) { var i = a[1].length;
				a.index += i, a[0] = a[0].slice(i) } return a }

		function o(e, n, t, r, s, g) { for (var f in t)
				if (t.hasOwnProperty(f) && t[f]) { var h = t[f];
					h = Array.isArray(h) ? h : [h]; for (var d = 0; d < h.length; ++d) { if (g && g.cause == f + "," + d) return; var v = h[d],
							p = v.inside,
							m = !!v.lookbehind,
							y = !!v.greedy,
							k = v.alias; if (y && !v.pattern.global) { var x = v.pattern.toString().match(/[imsuy]*$/)[0];
							v.pattern = RegExp(v.pattern.source, x + "g") } for (var b = v.pattern || v, w = r.next, A = s; w !== n.tail && !(g && A >= g.reach); A += w.value.length, w = w.next) { var E = w.value; if (n.length > e.length) return; if (!(E instanceof i)) { var P, L = 1; if (y) { if (!(P = l(b, A, e, m)) || P.index >= e.length) break; var S = P.index,
										O = P.index + P[0].length,
										j = A; for (j += w.value.length; S >= j;) j += (w = w.next).value.length; if (A = j -= w.value.length, w.value instanceof i) continue; for (var C = w; C !== n.tail && (j < O || "string" == typeof C.value); C = C.next) L++, j += C.value.length;
									L--, E = e.slice(A, j), P.index -= A } else if (!(P = l(b, 0, E, m))) continue;
								S = P.index; var N = P[0],
									_ = E.slice(0, S),
									M = E.slice(S + N.length),
									W = A + E.length;
								g && W > g.reach && (g.reach = W); var z = w.prev; if (_ && (z = u(n, z, _), A += _.length), c(n, z, L), w = u(n, z, new i(f, p ? a.tokenize(N, p) : N, k, N)), M && u(n, w, M), L > 1) { var I = { cause: f + "," + d, reach: W };
									o(e, n, t, w.prev, A, I), g && I.reach > g.reach && (g.reach = I.reach) } } } } } }

		function s() { var e = { value: null, prev: null, next: null },
				n = { value: null, prev: e, next: null };
			e.next = n, this.head = e, this.tail = n, this.length = 0 }

		function u(e, n, t) { var r = n.next,
				a = { value: t, prev: n, next: r }; return n.next = a, r.prev = a, e.length++, a }

		function c(e, n, t) { for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
			n.next = r, r.prev = n, e.length -= a } if (e.Prism = a, i.stringify = function e(n, t) { if ("string" == typeof n) return n; if (Array.isArray(n)) { var r = ""; return n.forEach((function (n) { r += e(n, t) })), r } var i = { type: n.type, content: e(n.content, t), tag: "span", classes: ["token", n.type], attributes: {}, language: t },
					l = n.alias;
				l && (Array.isArray(l) ? Array.prototype.push.apply(i.classes, l) : i.classes.push(l)), a.hooks.run("wrap", i); var o = ""; for (var s in i.attributes) o += " " + s + '="' + (i.attributes[s] || "").replace(/"/g, "&quot;") + '"'; return "<" + i.tag + ' class="' + i.classes.join(" ") + '"' + o + ">" + i.content + "</" + i.tag + ">" }, !e.document) return e.addEventListener ? (a.disableWorkerMessageHandler || e.addEventListener("message", (function (n) { var t = JSON.parse(n.data),
				r = t.language,
				i = t.code,
				l = t.immediateClose;
			e.postMessage(a.highlight(i, a.languages[r], r)), l && e.close() }), !1), a) : a; var g = a.util.currentScript();

		function f() { a.manual || a.highlightAll() } if (g && (a.filename = g.src, g.hasAttribute("data-manual") && (a.manual = !0)), !a.manual) { var h = document.readyState; "loading" === h || "interactive" === h && g && g.defer ? document.addEventListener("DOMContentLoaded", f) : window.requestAnimationFrame ? window.requestAnimationFrame(f) : window.setTimeout(f, 16) } return a }(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = { comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 }, prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 }, doctype: { pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i, greedy: !0, inside: { "internal-subset": { pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/, lookbehind: !0, greedy: !0, inside: null }, string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 }, punctuation: /^<!|>$|[[\]]/, "doctype-tag": /^DOCTYPE/i, name: /[^\s<>'"]+/ } }, cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 }, tag: { pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/, greedy: !0, inside: { tag: { pattern: /^<\/?[^\s>\/]+/, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } }, "special-attr": [], "attr-value": { pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/, inside: { punctuation: [{ pattern: /^=/, alias: "attr-equals" }, { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }] } }, punctuation: /\/?>/, "attr-name": { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } } } }, entity: [{ pattern: /&[\da-z]{1,8};/i, alias: "named-entity" }, /&#x?[\da-f]{1,8};/i] }, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, Prism.hooks.add("wrap", (function (a) { "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&")) })), Object.defineProperty(Prism.languages.markup.tag, "addInlined", { value: function (a, e) { var s = {};
		s["language-" + e] = { pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i, lookbehind: !0, inside: Prism.languages[e] }, s.cdata = /^<!\[CDATA\[|\]\]>$/i; var t = { "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s } };
		t["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] }; var n = {};
		n[a] = { pattern: RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, (function () { return a })), "i"), lookbehind: !0, greedy: !0, inside: t }, Prism.languages.insertBefore("markup", "cdata", n) } }), Object.defineProperty(Prism.languages.markup.tag, "addAttribute", { value: function (a, e) { Prism.languages.markup.tag.inside["special-attr"].push({ pattern: RegExp("(^|[\"'\\s])(?:" + a + ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))", "i"), lookbehind: !0, inside: { "attr-name": /^[^\s=]+/, "attr-value": { pattern: /=[\s\S]+/, inside: { value: { pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/, lookbehind: !0, alias: [e, "language-" + e], inside: Prism.languages[e] }, punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/] } } } }) } }), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml;
! function (s) { var e = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
	s.languages.css = { comment: /\/\*[\s\S]*?\*\//, atrule: { pattern: RegExp("@[\\w-](?:[^;{\\s\"']|\\s+(?!\\s)|" + e.source + ")*?(?:;|(?=\\s*\\{))"), inside: { rule: /^@[\w-]+/, "selector-function-argument": { pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/, lookbehind: !0, alias: "selector" }, keyword: { pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: !0 } } }, url: { pattern: RegExp("\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)", "i"), greedy: !0, inside: { function: /^url/i, punctuation: /^\(|\)$/, string: { pattern: RegExp("^" + e.source + "$"), alias: "url" } } }, selector: { pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + e.source + ")*(?=\\s*\\{)"), lookbehind: !0 }, string: { pattern: e, greedy: !0 }, property: { pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i, lookbehind: !0 }, important: /!important\b/i, function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 }, punctuation: /[(){};:,]/ }, s.languages.css.atrule.inside.rest = s.languages.css; var t = s.languages.markup;
	t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css")) }(Prism);
Prism.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }], string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 }, "class-name": { pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i, lookbehind: !0, inside: { punctuation: /[.\\]/ } }, keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/, boolean: /\b(?:false|true)\b/, function: /\b\w+(?=\()/, number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i, operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/, punctuation: /[{}[\];(),.:]/ };
Prism.languages.javascript = Prism.languages.extend("clike", { "class-name": [Prism.languages.clike["class-name"], { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/, lookbehind: !0 }], keyword: [{ pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 }, { pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/, lookbehind: !0 }], function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/, number: { pattern: RegExp("(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"), lookbehind: !0 }, operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/ }), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", { regex: { pattern: RegExp("((?:^|[^$\\w\\xA0-\\uFFFF.\"'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))"), lookbehind: !0, greedy: !0, inside: { "regex-source": { pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/, lookbehind: !0, alias: "language-regex", inside: Prism.languages.regex }, "regex-delimiter": /^\/|\/$/, "regex-flags": /^[a-z]+$/ } }, "function-variable": { pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/, alias: "function" }, parameter: [{ pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/, lookbehind: !0, inside: Prism.languages.javascript }, { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i, lookbehind: !0, inside: Prism.languages.javascript }, { pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/, lookbehind: !0, inside: Prism.languages.javascript }, { pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/, lookbehind: !0, inside: Prism.languages.javascript }], constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/ }), Prism.languages.insertBefore("javascript", "string", { hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" }, "template-string": { pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/, greedy: !0, inside: { "template-punctuation": { pattern: /^`|`$/, alias: "string" }, interpolation: { pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/, lookbehind: !0, inside: { "interpolation-punctuation": { pattern: /^\$\{|\}$/, alias: "punctuation" }, rest: Prism.languages.javascript } }, string: /[\s\S]+/ } }, "string-property": { pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m, lookbehind: !0, greedy: !0, alias: "property" } }), Prism.languages.insertBefore("javascript", "operator", { "literal-property": { pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m, lookbehind: !0, alias: "property" } }), Prism.languages.markup && (Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)", "javascript")), Prism.languages.js = Prism.languages.javascript;
! function (e) { var a, n = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
	e.languages.css.selector = { pattern: e.languages.css.selector.pattern, lookbehind: !0, inside: a = { "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/, "pseudo-class": /:[-\w]+/, class: /\.[-\w]+/, id: /#[-\w]+/, attribute: { pattern: RegExp("\\[(?:[^[\\]\"']|" + n.source + ")*\\]"), greedy: !0, inside: { punctuation: /^\[|\]$/, "case-sensitivity": { pattern: /(\s)[si]$/i, lookbehind: !0, alias: "keyword" }, namespace: { pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/, lookbehind: !0, inside: { punctuation: /\|$/ } }, "attr-name": { pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/, lookbehind: !0 }, "attr-value": [n, { pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/, lookbehind: !0 }], operator: /[|~*^$]?=/ } }, "n-th": [{ pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/, lookbehind: !0, inside: { number: /[\dn]+/, operator: /[+-]/ } }, { pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 }], combinator: />|\+|~|\|\|/, punctuation: /[(),]/ } }, e.languages.css.atrule.inside["selector-function-argument"].inside = a, e.languages.insertBefore("css", "property", { variable: { pattern: /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i, lookbehind: !0 } }); var r = { pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/, lookbehind: !0 },
		i = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 };
	e.languages.insertBefore("css", "function", { operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 }, hexcode: { pattern: /\B#[\da-f]{3,8}\b/i, alias: "color" }, color: [{ pattern: /(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|RebeccaPurple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i, lookbehind: !0 }, { pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i, inside: { unit: r, number: i, function: /[\w-]+(?=\()/, punctuation: /[(),]/ } }], entity: /\\[\da-f]{1,8}/i, unit: r, number: i }) }(Prism);
! function () { if ("undefined" != typeof Prism && "undefined" != typeof document && document.querySelector) { var e, t = "line-numbers",
			i = "linkable-line-numbers",
			n = /\n(?!$)/g,
			r = !0;
		Prism.plugins.lineHighlight = { highlightLines: function (o, u, c) { var h = (u = "string" == typeof u ? u : o.getAttribute("data-line") || "").replace(/\s+/g, "").split(",").filter(Boolean),
					d = +o.getAttribute("data-line-offset") || 0,
					f = (function () { if (void 0 === e) { var t = document.createElement("div");
							t.style.fontSize = "13px", t.style.lineHeight = "1.5", t.style.padding = "0", t.style.border = "0", t.innerHTML = "&nbsp;<br />&nbsp;", document.body.appendChild(t), e = 38 === t.offsetHeight, document.body.removeChild(t) } return e }() ? parseInt : parseFloat)(getComputedStyle(o).lineHeight),
					p = Prism.util.isActive(o, t),
					g = o.querySelector("code"),
					m = p ? o : g || o,
					v = [],
					y = g.textContent.match(n),
					b = y ? y.length + 1 : 1,
					A = g && m != g ? function (e, t) { var i = getComputedStyle(e),
							n = getComputedStyle(t);

						function r(e) { return +e.substr(0, e.length - 2) } return t.offsetTop + r(n.borderTopWidth) + r(n.paddingTop) - r(i.paddingTop) }(o, g) : 0;
				h.forEach((function (e) { var t = e.split("-"),
						i = +t[0],
						n = +t[1] || i; if (!((n = Math.min(b, n)) < i)) { var r = o.querySelector('.line-highlight[data-range="' + e + '"]') || document.createElement("div"); if (v.push((function () { r.setAttribute("aria-hidden", "true"), r.setAttribute("data-range", e), r.className = (c || "") + " line-highlight" })), p && Prism.plugins.lineNumbers) { var s = Prism.plugins.lineNumbers.getLine(o, i),
								l = Prism.plugins.lineNumbers.getLine(o, n); if (s) { var a = s.offsetTop + A + "px";
								v.push((function () { r.style.top = a })) } if (l) { var u = l.offsetTop - s.offsetTop + l.offsetHeight + "px";
								v.push((function () { r.style.height = u })) } } else v.push((function () { r.setAttribute("data-start", String(i)), n > i && r.setAttribute("data-end", String(n)), r.style.top = (i - d - 1) * f + A + "px", r.textContent = new Array(n - i + 2).join(" \n") }));
						v.push((function () { r.style.width = o.scrollWidth + "px" })), v.push((function () { m.appendChild(r) })) } })); var P = o.id; if (p && Prism.util.isActive(o, i) && P) { l(o, i) || v.push((function () { o.classList.add(i) })); var E = parseInt(o.getAttribute("data-start") || "1");
					s(".line-numbers-rows > span", o).forEach((function (e, t) { var i = t + E;
						e.onclick = function () { var e = P + "." + i;
							r = !1, location.hash = e, setTimeout((function () { r = !0 }), 1) } })) } return function () { v.forEach(a) } } }; var o = 0;
		Prism.hooks.add("before-sanity-check", (function (e) { var t = e.element.parentElement; if (u(t)) { var i = 0;
				s(".line-highlight", t).forEach((function (e) { i += e.textContent.length, e.parentNode.removeChild(e) })), i && /^(?: \n)+$/.test(e.code.slice(-i)) && (e.code = e.code.slice(0, -i)) } })), Prism.hooks.add("complete", (function e(i) { var n = i.element.parentElement; if (u(n)) { clearTimeout(o); var r = Prism.plugins.lineNumbers,
					s = i.plugins && i.plugins.lineNumbers;
				l(n, t) && r && !s ? Prism.hooks.add("line-numbers", e) : (Prism.plugins.lineHighlight.highlightLines(n)(), o = setTimeout(c, 1)) } })), window.addEventListener("hashchange", c), window.addEventListener("resize", (function () { s("pre").filter(u).map((function (e) { return Prism.plugins.lineHighlight.highlightLines(e) })).forEach(a) })) }

	function s(e, t) { return Array.prototype.slice.call((t || document).querySelectorAll(e)) }

	function l(e, t) { return e.classList.contains(t) }

	function a(e) { e() }

	function u(e) { return !!(e && /pre/i.test(e.nodeName) && (e.hasAttribute("data-line") || e.id && Prism.util.isActive(e, i))) }

	function c() { var e = location.hash.slice(1);
		s(".temporary.line-highlight").forEach((function (e) { e.parentNode.removeChild(e) })); var t = (e.match(/\.([\d,-]+)$/) || [, ""])[1]; if (t && !document.getElementById(e)) { var i = e.slice(0, e.lastIndexOf(".")),
				n = document.getElementById(i);
			n && (n.hasAttribute("data-line") || n.setAttribute("data-line", ""), Prism.plugins.lineHighlight.highlightLines(n, t, "temporary ")(), r && document.querySelector(".temporary.line-highlight").scrollIntoView()) } } }();
! function () { if ("undefined" != typeof Prism && "undefined" != typeof document) { var e = "line-numbers",
			n = /\n(?!$)/g,
			t = Prism.plugins.lineNumbers = { getLine: function (n, t) { if ("PRE" === n.tagName && n.classList.contains(e)) { var i = n.querySelector(".line-numbers-rows"); if (i) { var r = parseInt(n.getAttribute("data-start"), 10) || 1,
								s = r + (i.children.length - 1);
							t < r && (t = r), t > s && (t = s); var l = t - r; return i.children[l] } } }, resize: function (e) { r([e]) }, assumeViewportIndependence: !0 },
			i = void 0;
		window.addEventListener("resize", (function () { t.assumeViewportIndependence && i === window.innerWidth || (i = window.innerWidth, r(Array.prototype.slice.call(document.querySelectorAll("pre.line-numbers")))) })), Prism.hooks.add("complete", (function (t) { if (t.code) { var i = t.element,
					s = i.parentNode; if (s && /pre/i.test(s.nodeName) && !i.querySelector(".line-numbers-rows") && Prism.util.isActive(i, e)) { i.classList.remove(e), s.classList.add(e); var l, o = t.code.match(n),
						a = o ? o.length + 1 : 1,
						u = new Array(a + 1).join("<span></span>");
					(l = document.createElement("span")).setAttribute("aria-hidden", "true"), l.className = "line-numbers-rows", l.innerHTML = u, s.hasAttribute("data-start") && (s.style.counterReset = "linenumber " + (parseInt(s.getAttribute("data-start"), 10) - 1)), t.element.appendChild(l), r([s]), Prism.hooks.run("line-numbers", t) } } })), Prism.hooks.add("line-numbers", (function (e) { e.plugins = e.plugins || {}, e.plugins.lineNumbers = !0 })) }

	function r(e) { if (0 != (e = e.filter((function (e) { var n, t = (n = e, n ? window.getComputedStyle ? getComputedStyle(n) : n.currentStyle || null : null)["white-space"]; return "pre-wrap" === t || "pre-line" === t }))).length) { var t = e.map((function (e) { var t = e.querySelector("code"),
					i = e.querySelector(".line-numbers-rows"); if (t && i) { var r = e.querySelector(".line-numbers-sizer"),
						s = t.textContent.split(n);
					r || ((r = document.createElement("span")).className = "line-numbers-sizer", t.appendChild(r)), r.innerHTML = "0", r.style.display = "block"; var l = r.getBoundingClientRect().height; return r.innerHTML = "", { element: e, lines: s, lineHeights: [], oneLinerHeight: l, sizer: r } } })).filter(Boolean);
			t.forEach((function (e) { var n = e.sizer,
					t = e.lines,
					i = e.lineHeights,
					r = e.oneLinerHeight;
				i[t.length - 1] = void 0, t.forEach((function (e, t) { if (e && e.length > 1) { var s = n.appendChild(document.createElement("span"));
						s.style.display = "block", s.textContent = e } else i[t] = r })) })), t.forEach((function (e) { for (var n = e.sizer, t = e.lineHeights, i = 0, r = 0; r < t.length; r++) void 0 === t[r] && (t[r] = n.children[i++].getBoundingClientRect().height) })), t.forEach((function (e) { var n = e.sizer,
					t = e.element.querySelector(".line-numbers-rows");
				n.style.display = "none", n.innerHTML = "", e.lineHeights.forEach((function (e, n) { t.children[n].style.height = e + "px" })) })) } } }();
! function () { if ("undefined" != typeof Prism && "undefined" != typeof document) { var e = [],
			t = {},
			n = function () {};
		Prism.plugins.toolbar = {}; var a = Prism.plugins.toolbar.registerButton = function (n, a) { var r;
				r = "function" == typeof a ? a : function (e) { var t; return "function" == typeof a.onClick ? ((t = document.createElement("button")).type = "button", t.addEventListener("click", (function () { a.onClick.call(this, e) }))) : "string" == typeof a.url ? (t = document.createElement("a")).href = a.url : t = document.createElement("span"), a.className && t.classList.add(a.className), t.textContent = a.text, t }, n in t ? console.warn('There is a button with the key "' + n + '" registered already.') : e.push(t[n] = r) },
			r = Prism.plugins.toolbar.hook = function (a) { var r = a.element.parentNode; if (r && /pre/i.test(r.nodeName) && !r.parentNode.classList.contains("code-toolbar")) { var o = document.createElement("div");
					o.classList.add("code-toolbar"), r.parentNode.insertBefore(o, r), o.appendChild(r); var i = document.createElement("div");
					i.classList.add("toolbar"); var l = e,
						d = function (e) { for (; e;) { var t = e.getAttribute("data-toolbar-order"); if (null != t) return (t = t.trim()).length ? t.split(/\s*,\s*/g) : [];
								e = e.parentElement } }(a.element);
					d && (l = d.map((function (e) { return t[e] || n }))), l.forEach((function (e) { var t = e(a); if (t) { var n = document.createElement("div");
							n.classList.add("toolbar-item"), n.appendChild(t), i.appendChild(n) } })), o.appendChild(i) } };
		a("label", (function (e) { var t = e.element.parentNode; if (t && /pre/i.test(t.nodeName) && t.hasAttribute("data-label")) { var n, a, r = t.getAttribute("data-label"); try { a = document.querySelector("template#" + r) } catch (e) {} return a ? n = a.content : (t.hasAttribute("data-url") ? (n = document.createElement("a")).href = t.getAttribute("data-url") : n = document.createElement("span"), n.textContent = r), n } })), Prism.hooks.add("complete", r) } }();
! function () { if ("undefined" != typeof Prism && "undefined" != typeof document)
		if (Prism.plugins.toolbar) { var e = { none: "Plain text", plain: "Plain text", plaintext: "Plain text", text: "Plain text", txt: "Plain text", html: "HTML", xml: "XML", svg: "SVG", mathml: "MathML", ssml: "SSML", rss: "RSS", css: "CSS", clike: "C-like", js: "JavaScript", abap: "ABAP", abnf: "ABNF", al: "AL", antlr4: "ANTLR4", g4: "ANTLR4", apacheconf: "Apache Configuration", apl: "APL", aql: "AQL", ino: "Arduino", arff: "ARFF", armasm: "ARM Assembly", "arm-asm": "ARM Assembly", art: "Arturo", asciidoc: "AsciiDoc", adoc: "AsciiDoc", aspnet: "ASP.NET (C#)", asm6502: "6502 Assembly", asmatmel: "Atmel AVR Assembly", autohotkey: "AutoHotkey", autoit: "AutoIt", avisynth: "AviSynth", avs: "AviSynth", "avro-idl": "Avro IDL", avdl: "Avro IDL", awk: "AWK", gawk: "GAWK", basic: "BASIC", bbcode: "BBcode", bnf: "BNF", rbnf: "RBNF", bsl: "BSL (1C:Enterprise)", oscript: "OneScript", csharp: "C#", cs: "C#", dotnet: "C#", cpp: "C++", cfscript: "CFScript", cfc: "CFScript", cil: "CIL", cmake: "CMake", cobol: "COBOL", coffee: "CoffeeScript", conc: "Concurnas", csp: "Content-Security-Policy", "css-extras": "CSS Extras", csv: "CSV", cue: "CUE", dataweave: "DataWeave", dax: "DAX", django: "Django/Jinja2", jinja2: "Django/Jinja2", "dns-zone-file": "DNS zone file", "dns-zone": "DNS zone file", dockerfile: "Docker", dot: "DOT (Graphviz)", gv: "DOT (Graphviz)", ebnf: "EBNF", editorconfig: "EditorConfig", ejs: "EJS", etlua: "Embedded Lua templating", erb: "ERB", "excel-formula": "Excel Formula", xlsx: "Excel Formula", xls: "Excel Formula", fsharp: "F#", "firestore-security-rules": "Firestore security rules", ftl: "FreeMarker Template Language", gml: "GameMaker Language", gamemakerlanguage: "GameMaker Language", gap: "GAP (CAS)", gcode: "G-code", gdscript: "GDScript", gedcom: "GEDCOM", gettext: "gettext", po: "gettext", glsl: "GLSL", gn: "GN", gni: "GN", "linker-script": "GNU Linker Script", ld: "GNU Linker Script", "go-module": "Go module", "go-mod": "Go module", graphql: "GraphQL", hbs: "Handlebars", hs: "Haskell", hcl: "HCL", hlsl: "HLSL", http: "HTTP", hpkp: "HTTP Public-Key-Pins", hsts: "HTTP Strict-Transport-Security", ichigojam: "IchigoJam", "icu-message-format": "ICU Message Format", idr: "Idris", ignore: ".ignore", gitignore: ".gitignore", hgignore: ".hgignore", npmignore: ".npmignore", inform7: "Inform 7", javadoc: "JavaDoc", javadoclike: "JavaDoc-like", javastacktrace: "Java stack trace", jq: "JQ", jsdoc: "JSDoc", "js-extras": "JS Extras", json: "JSON", webmanifest: "Web App Manifest", json5: "JSON5", jsonp: "JSONP", jsstacktrace: "JS stack trace", "js-templates": "JS Templates", keepalived: "Keepalived Configure", kts: "Kotlin Script", kt: "Kotlin", kumir: "KuMir (КуМир)", kum: "KuMir (КуМир)", latex: "LaTeX", tex: "TeX", context: "ConTeXt", lilypond: "LilyPond", ly: "LilyPond", emacs: "Lisp", elisp: "Lisp", "emacs-lisp": "Lisp", llvm: "LLVM IR", log: "Log file", lolcode: "LOLCODE", magma: "Magma (CAS)", md: "Markdown", "markup-templating": "Markup templating", matlab: "MATLAB", maxscript: "MAXScript", mel: "MEL", metafont: "METAFONT", mongodb: "MongoDB", moon: "MoonScript", n1ql: "N1QL", n4js: "N4JS", n4jsd: "N4JS", "nand2tetris-hdl": "Nand To Tetris HDL", naniscript: "Naninovel Script", nani: "Naninovel Script", nasm: "NASM", neon: "NEON", nginx: "nginx", nsis: "NSIS", objectivec: "Objective-C", objc: "Objective-C", ocaml: "OCaml", opencl: "OpenCL", openqasm: "OpenQasm", qasm: "OpenQasm", parigp: "PARI/GP", objectpascal: "Object Pascal", psl: "PATROL Scripting Language", pcaxis: "PC-Axis", px: "PC-Axis", peoplecode: "PeopleCode", pcode: "PeopleCode", php: "PHP", phpdoc: "PHPDoc", "php-extras": "PHP Extras", "plant-uml": "PlantUML", plantuml: "PlantUML", plsql: "PL/SQL", powerquery: "PowerQuery", pq: "PowerQuery", mscript: "PowerQuery", powershell: "PowerShell", promql: "PromQL", properties: ".properties", protobuf: "Protocol Buffers", purebasic: "PureBasic", pbfasm: "PureBasic", purs: "PureScript", py: "Python", qsharp: "Q#", qs: "Q#", q: "Q (kdb+ database)", qml: "QML", rkt: "Racket", cshtml: "Razor C#", razor: "Razor C#", jsx: "React JSX", tsx: "React TSX", renpy: "Ren'py", rpy: "Ren'py", res: "ReScript", rest: "reST (reStructuredText)", robotframework: "Robot Framework", robot: "Robot Framework", rb: "Ruby", sas: "SAS", sass: "Sass (Sass)", scss: "Sass (Scss)", "shell-session": "Shell session", "sh-session": "Shell session", shellsession: "Shell session", sml: "SML", smlnj: "SML/NJ", solidity: "Solidity (Ethereum)", sol: "Solidity (Ethereum)", "solution-file": "Solution file", sln: "Solution file", soy: "Soy (Closure Template)", sparql: "SPARQL", rq: "SPARQL", "splunk-spl": "Splunk SPL", sqf: "SQF: Status Quo Function (Arma 3)", sql: "SQL", stata: "Stata Ado", iecst: "Structured Text (IEC 61131-3)", supercollider: "SuperCollider", sclang: "SuperCollider", systemd: "Systemd configuration file", "t4-templating": "T4 templating", "t4-cs": "T4 Text Templates (C#)", t4: "T4 Text Templates (C#)", "t4-vb": "T4 Text Templates (VB)", tap: "TAP", tt2: "Template Toolkit 2", toml: "TOML", trickle: "trickle", troy: "troy", trig: "TriG", ts: "TypeScript", tsconfig: "TSConfig", uscript: "UnrealScript", uc: "UnrealScript", uorazor: "UO Razor Script", uri: "URI", url: "URL", vbnet: "VB.Net", vhdl: "VHDL", vim: "vim", "visual-basic": "Visual Basic", vba: "VBA", vb: "Visual Basic", wasm: "WebAssembly", "web-idl": "Web IDL", webidl: "Web IDL", wgsl: "WGSL", wiki: "Wiki markup", wolfram: "Wolfram language", nb: "Mathematica Notebook", wl: "Wolfram language", xeoracube: "XeoraCube", "xml-doc": "XML doc (.net)", xojo: "Xojo (REALbasic)", xquery: "XQuery", yaml: "YAML", yml: "YAML", yang: "YANG" };
			Prism.plugins.toolbar.registerButton("show-language", (function (a) { var t = a.element.parentNode; if (t && /pre/i.test(t.nodeName)) { var o, s = t.getAttribute("data-language") || e[a.language] || ((o = a.language) ? (o.substring(0, 1).toUpperCase() + o.substring(1)).replace(/s(?=cript)/, "S") : o); if (s) { var r = document.createElement("span"); return r.textContent = s, r } } })) } else console.warn("Show Languages plugin loaded before Toolbar plugin.") }();
! function () { if ("undefined" != typeof Prism && "undefined" != typeof document) { var t = [];
		o((function (t) { if (t && t.meta && t.data) { if (t.meta.status && t.meta.status >= 400) return "Error: " + (t.data.message || t.meta.status); if ("string" == typeof t.data.content) return "function" == typeof atob ? atob(t.data.content.replace(/\s/g, "")) : "Your browser cannot decode base64" } return null }), "github"), o((function (t, e) { if (t && t.meta && t.data && t.data.files) { if (t.meta.status && t.meta.status >= 400) return "Error: " + (t.data.message || t.meta.status); var n = t.data.files,
					a = e.getAttribute("data-filename"); if (null == a)
					for (var r in n)
						if (n.hasOwnProperty(r)) { a = r; break } return void 0 !== n[a] ? n[a].content : "Error: unknown or missing gist file " + a } return null }), "gist"), o((function (t) { return t && t.node && "string" == typeof t.data ? t.data : null }), "bitbucket"); var e = 0,
			n = "data-jsonp-status",
			a = "failed",
			r = 'pre[data-jsonp]:not([data-jsonp-status="loaded"]):not([data-jsonp-status="loading"])';
		Prism.hooks.add("before-highlightall", (function (t) { t.selector += ", " + r })), Prism.hooks.add("before-sanity-check", (function (o) { var i, u = o.element; if (u.matches(r)) { o.code = "", u.setAttribute(n, "loading"); var s = u.appendChild(document.createElement("CODE"));
				s.textContent = "Loading…"; var d = o.language;
				s.className = "language-" + d; var f = Prism.plugins.autoloader;
				f && f.loadLanguages(d); var l = u.getAttribute("data-adapter"),
					c = null; if (l) { if ("function" != typeof window[l]) return u.setAttribute(n, a), void(s.textContent = (i = l, '✖ Error: JSONP adapter function "' + i + "\" doesn't exist"));
					c = window[l] } var p = u.getAttribute("data-jsonp");! function (r, o, i, d) { var f = "prismjsonp" + e++,
						l = document.createElement("a");
					l.href = r, l.href += (l.search ? "&" : "?") + (o || "callback") + "=" + f; var p = document.createElement("script");
					p.src = l.href, p.onerror = function () { g(), d() }; var m = setTimeout((function () { g(), d() }), Prism.plugins.jsonphighlight.timeout);

					function g() { clearTimeout(m), document.head.removeChild(p), delete window[f] } window[f] = function (e) { g(),
							function (e) { var r = null; if (c) r = c(e, u);
								else
									for (var o = 0, i = t.length; o < i && null === (r = t[o].adapter(e, u)); o++);
								null === r ? (u.setAttribute(n, a), s.textContent = "✖ Error: Cannot parse response (perhaps you need an adapter function?)") : (u.setAttribute(n, "loaded"), s.textContent = r, Prism.highlightElement(s)) }(e) }, document.head.appendChild(p) }(p, u.getAttribute("data-callback"), 0, (function () { u.setAttribute(n, a), s.textContent = "✖ Error: Timeout loading " + p })) } })), Prism.plugins.jsonphighlight = { timeout: 5e3, registerAdapter: o, removeAdapter: function (e) { if ("string" == typeof e && (e = i(e)), "function" == typeof e) { var n = t.findIndex((function (t) { return t.adapter === e }));
					n >= 0 && t.splice(n, 1) } }, highlight: function (t) { for (var e, n = (t || document).querySelectorAll(r), a = 0; e = n[a++];) Prism.highlightElement(e) } } }

	function o(e, n) { n = n || e.name, "function" != typeof e || i(e) || i(n) || t.push({ adapter: e, name: n }) }

	function i(e) { if ("function" == typeof e) { for (var n = 0; a = t[n++];)
				if (a.adapter.valueOf() === e.valueOf()) return a.adapter } else if ("string" == typeof e) { var a; for (n = 0; a = t[n++];)
				if (a.name === e) return a.adapter } return null } }();
! function () { if ("undefined" != typeof Prism && "undefined" != typeof document) { var n = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g,
			r = /^#?((?:[\da-f]){3,4}|(?:[\da-f]{2}){3,4})$/i,
			o = [function (n) { var o = r.exec(n); if (o) { for (var s = (n = o[1]).length >= 6 ? 2 : 1, e = n.length / s, t = 1 == s ? 1 / 15 : 1 / 255, i = [], a = 0; a < e; a++) { var c = parseInt(n.substr(a * s, s), 16);
						i.push(c * t) } return 3 == e && i.push(1), "rgba(" + i.slice(0, 3).map((function (n) { return String(Math.round(255 * n)) })).join(",") + "," + String(Number(i[3].toFixed(3))) + ")" } }, function (n) { var r = (new Option).style; return r.color = n, r.color ? n : void 0 }];
		Prism.hooks.add("wrap", (function (r) { if ("color" === r.type || r.classes.indexOf("color") >= 0) { for (var s, e = r.content, t = e.split(n).join(""), i = 0, a = o.length; i < a && !s; i++) s = o[i](t); if (!s) return; var c = '<span class="inline-color-wrapper"><span class="inline-color" style="background-color:' + s + ';"></span></span>';
				r.content = c + e } })) } }();
! function () { if ("undefined" != typeof Prism) { var e = Object.assign || function (e, t) { for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]); return e },
			t = { "remove-trailing": "boolean", "remove-indent": "boolean", "left-trim": "boolean", "right-trim": "boolean", "break-lines": "number", indent: "number", "remove-initial-line-feed": "boolean", "tabs-to-spaces": "number", "spaces-to-tabs": "number" };
		n.prototype = { setDefaults: function (t) { this.defaults = e(this.defaults, t) }, normalize: function (t, n) { for (var r in n = e(this.defaults, n)) { var i = r.replace(/-(\w)/g, (function (e, t) { return t.toUpperCase() })); "normalize" !== r && "setDefaults" !== i && n[r] && this[i] && (t = this[i].call(this, t, n[r])) } return t }, leftTrim: function (e) { return e.replace(/^\s+/, "") }, rightTrim: function (e) { return e.replace(/\s+$/, "") }, tabsToSpaces: function (e, t) { return t = 0 | t || 4, e.replace(/\t/g, new Array(++t).join(" ")) }, spacesToTabs: function (e, t) { return t = 0 | t || 4, e.replace(RegExp(" {" + t + "}", "g"), "\t") }, removeTrailing: function (e) { return e.replace(/\s*?$/gm, "") }, removeInitialLineFeed: function (e) { return e.replace(/^(?:\r?\n|\r)/, "") }, removeIndent: function (e) { var t = e.match(/^[^\S\n\r]*(?=\S)/gm); return t && t[0].length ? (t.sort((function (e, t) { return e.length - t.length })), t[0].length ? e.replace(RegExp("^" + t[0], "gm"), "") : e) : e }, indent: function (e, t) { return e.replace(/^[^\S\n\r]*(?=\S)/gm, new Array(++t).join("\t") + "$&") }, breakLines: function (e, t) { t = !0 === t ? 80 : 0 | t || 80; for (var n = e.split("\n"), i = 0; i < n.length; ++i)
					if (!(r(n[i]) <= t)) { for (var o = n[i].split(/(\s+)/g), a = 0, l = 0; l < o.length; ++l) { var s = r(o[l]);
							(a += s) > t && (o[l] = "\n" + o[l], a = s) } n[i] = o.join("") } return n.join("\n") } }, "undefined" != typeof module && module.exports && (module.exports = n), Prism.plugins.NormalizeWhitespace = new n({ "remove-trailing": !0, "remove-indent": !0, "left-trim": !0, "right-trim": !0 }), Prism.hooks.add("before-sanity-check", (function (e) { var n = Prism.plugins.NormalizeWhitespace; if ((!e.settings || !1 !== e.settings["whitespace-normalization"]) && Prism.util.isActive(e.element, "whitespace-normalization", !0))
				if (e.element && e.element.parentNode || !e.code) { var r = e.element.parentNode; if (e.code && r && "pre" === r.nodeName.toLowerCase()) { for (var i in null == e.settings && (e.settings = {}), t)
							if (Object.hasOwnProperty.call(t, i)) { var o = t[i]; if (r.hasAttribute("data-" + i)) try { var a = JSON.parse(r.getAttribute("data-" + i) || "true");
									typeof a === o && (e.settings[i] = a) } catch (e) {} } for (var l = r.childNodes, s = "", c = "", u = !1, m = 0; m < l.length; ++m) { var f = l[m];
							f == e.element ? u = !0 : "#text" === f.nodeName && (u ? c += f.nodeValue : s += f.nodeValue, r.removeChild(f), --m) } if (e.element.children.length && Prism.plugins.KeepMarkup) { var d = s + e.element.innerHTML + c;
							e.element.innerHTML = n.normalize(d, e.settings), e.code = e.element.textContent } else e.code = s + e.code + c, e.code = n.normalize(e.code, e.settings) } } else e.code = n.normalize(e.code, e.settings) })) }

	function n(t) { this.defaults = e({}, t) }

	function r(e) { for (var t = 0, n = 0; n < e.length; ++n) e.charCodeAt(n) == "\t".charCodeAt(0) && (t += 3); return e.length + t } }();
	
	(function () {

	if (typeof Prism === 'undefined' || typeof document === 'undefined') {
		return;
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	var LOADING_MESSAGE = 'Loading…';
	var FAILURE_MESSAGE = function (status, message) {
		return '✖ Error ' + status + ' while fetching file: ' + message;
	};
	var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';

	var EXTENSIONS = {
		'js': 'javascript',
		'py': 'python',
		'rb': 'ruby',
		'ps1': 'powershell',
		'psm1': 'powershell',
		'sh': 'bash',
		'bat': 'batch',
		'h': 'c',
		'tex': 'latex'
	};

	var STATUS_ATTR = 'data-src-status';
	var STATUS_LOADING = 'loading';
	var STATUS_LOADED = 'loaded';
	var STATUS_FAILED = 'failed';

	var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])'
		+ ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';

	/**
	 * Loads the given file.
	 *
	 * @param {string} src The URL or path of the source file to load.
	 * @param {(result: string) => void} success
	 * @param {(reason: string) => void} error
	 */
	function loadFile(src, success, error) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', src, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status < 400 && xhr.responseText) {
					success(xhr.responseText);
				} else {
					if (xhr.status >= 400) {
						error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
					} else {
						error(FAILURE_EMPTY_MESSAGE);
					}
				}
			}
		};
		xhr.send(null);
	}

	/**
	 * Parses the given range.
	 *
	 * This returns a range with inclusive ends.
	 *
	 * @param {string | null | undefined} range
	 * @returns {[number, number | undefined] | undefined}
	 */
	function parseRange(range) {
		var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '');
		if (m) {
			var start = Number(m[1]);
			var comma = m[2];
			var end = m[3];

			if (!comma) {
				return [start, start];
			}
			if (!end) {
				return [start, undefined];
			}
			return [start, Number(end)];
		}
		return undefined;
	}

	Prism.hooks.add('before-highlightall', function (env) {
		env.selector += ', ' + SELECTOR;
	});

	Prism.hooks.add('before-sanity-check', function (env) {
		var pre = /** @type {HTMLPreElement} */ (env.element);
		if (pre.matches(SELECTOR)) {
			env.code = ''; // fast-path the whole thing and go to complete

			pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading

			// add code element with loading message
			var code = pre.appendChild(document.createElement('CODE'));
			code.textContent = LOADING_MESSAGE;

			var src = pre.getAttribute('data-src');

			var language = env.language;
			if (language === 'none') {
				// the language might be 'none' because there is no language set;
				// in this case, we want to use the extension as the language
				var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
				language = EXTENSIONS[extension] || extension;
			}

			// set language classes
			Prism.util.setLanguage(code, language);
			Prism.util.setLanguage(pre, language);

			// preload the language
			var autoloader = Prism.plugins.autoloader;
			if (autoloader) {
				autoloader.loadLanguages(language);
			}

			// load file
			loadFile(
				src,
				function (text) {
					// mark as loaded
					pre.setAttribute(STATUS_ATTR, STATUS_LOADED);

					// handle data-range
					var range = parseRange(pre.getAttribute('data-range'));
					if (range) {
						var lines = text.split(/\r\n?|\n/g);

						// the range is one-based and inclusive on both ends
						var start = range[0];
						var end = range[1] == null ? lines.length : range[1];

						if (start < 0) { start += lines.length; }
						start = Math.max(0, Math.min(start - 1, lines.length));
						if (end < 0) { end += lines.length; }
						end = Math.max(0, Math.min(end, lines.length));

						text = lines.slice(start, end).join('\n');

						// add data-start for line numbers
						if (!pre.hasAttribute('data-start')) {
							pre.setAttribute('data-start', String(start + 1));
						}
					}

					// highlight code
					code.textContent = text;
					Prism.highlightElement(code);
				},
				function (error) {
					// mark as failed
					pre.setAttribute(STATUS_ATTR, STATUS_FAILED);

					code.textContent = error;
				}
			);
		}
	});

	Prism.plugins.fileHighlight = {
		/**
		 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
		 *
		 * Note: Elements which are already loaded or currently loading will not be touched by this method.
		 *
		 * @param {ParentNode} [container=document]
		 */
		highlight: function highlight(container) {
			var elements = (container || document).querySelectorAll(SELECTOR);

			for (var i = 0, element; (element = elements[i++]);) {
				Prism.highlightElement(element);
			}
		}
	};

	var logged = false;
	/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
	Prism.fileHighlight = function () {
		if (!logged) {
			console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
			logged = true;
		}
		Prism.plugins.fileHighlight.highlight.apply(this, arguments);
	};

}());
