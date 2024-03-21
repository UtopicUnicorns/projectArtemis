function page(dec) {
	let bg_grab = document.getElementById('background').style;

	let content_grab = document.getElementById('content');

	let content_box = document.getElementById('content_box');

	content_grab.style.animation = 'dissapear 2s';

	content_box.style.background = `url("./images/${Math.floor(Math.random() * 5 + 1)}.png")`;

	content_grab.scrollTop = 0;

	setTimeout(function () {
		content_grab.style.animation = '';
	}, 2000);

	let page1 = `<div id="git" style="width: 100%; height: 100%; overflow: auto; text-align: left;"></div>`;

	let page2 = `<h1>Features</h1>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu elementum tellus. Aenean venenatis pretium ante. Donec porttitor augue metus, vel suscipit elit faucibus ac. Etiam condimentum felis id eros porttitor, a congue lacus venenatis. Aenean ac mi rutrum augue fermentum tempus eget
	ac est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec ac ligula eu felis congue bibendum id eu odio. Fusce dignissim magna sit amet erat porta, at porta mauris elementum. In nec pellentesque nulla. Sed blandit mauris augue, et rhoncus turpis
	suscipit vitae. Sed blandit ex id placerat porttitor. Cras sed ornare tortor. Etiam nec arcu a magna condimentum ultrices. Curabitur diam diam, auctor quis facilisis nec, sollicitudin sed lorem. Nullam vitae libero vel quam viverra tempus. Donec orci dolor, sollicitudin eget nulla non,
	malesuada laoreet enim. Etiam porttitor maximus lacinia. Fusce rhoncus commodo dictum. Integer condimentum lacinia neque vitae mattis. Quisque sapien neque, elementum ut augue id, fermentum sollicitudin mauris. Aenean mattis, velit feugiat ullamcorper tincidunt, mauris orci gravida neque, quis
	gravida eros justo ac dolor. Vestibulum mattis ante vestibulum nulla ultricies sollicitudin. Cras ex massa, iaculis et dui eu, luctus molestie nulla. Maecenas eu tincidunt est. Nulla quis justo et quam condimentum hendrerit vel ut sem. Fusce auctor id nulla id eleifend. Morbi viverra quis orci
	eu iaculis. Donec vitae dignissim massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In feugiat consequat lorem, nec hendrerit lorem iaculis vitae. Sed eget erat condimentum, sollicitudin dolor quis, placerat libero. Praesent accumsan, dui sed
	condimentum tincidunt, arcu nisi blandit enim, ac luctus lectus mi sed orci. Mauris egestas egestas elit sit amet condimentum. Praesent vitae varius mi. Donec non leo posuere, dapibus sapien vel, scelerisque mauris. In finibus est sapien, eu porta est lobortis quis. Quisque viverra ultricies
	purus, eu pretium tellus tristique in. Nunc varius urna sed odio fermentum feugiat ut ac nisl. Vivamus placerat purus sed dui tincidunt porta. Proin porta efficitur urna, et laoreet lorem euismod quis. Maecenas maximus at justo consequat dignissim. Sed porttitor mauris posuere augue laoreet, in
	viverra sapien ornare. Suspendisse potenti. Curabitur venenatis imperdiet lacus, vitae rhoncus sem euismod et. Ut egestas nisi libero, vitae molestie enim pharetra ut. Sed condimentum, leo sed faucibus viverra, nibh eros fermentum libero, vitae ultrices metus lorem ut sapien. In finibus lectus
	purus, eu hendrerit diam ultricies volutpat. Sed maximus, tellus non fringilla pretium, leo libero rutrum lorem, sit amet euismod sapien justo et eros. Ut accumsan vehicula lobortis. Sed sit amet urna magna. Nulla luctus dui ut nisl viverra suscipit. Nulla lobortis dolor vel lectus porttitor,
	ac condimentum felis sodales. Praesent consequat consectetur magna, eget sollicitudin libero. Ut vitae orci in metus blandit aliquam. Mauris eget ipsum augue. Duis vitae justo interdum, ullamcorper mi in, sollicitudin sapien. Nulla interdum vulputate odio, pretium posuere arcu iaculis sed.
	Aenean ornare nunc iaculis lacus condimentum pellentesque ac ut sem.</p>
	<br />
	<br />`;

	let page3 = `<h1>Frequently Asked Questions</h1>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu elementum tellus. Aenean venenatis pretium ante. Donec porttitor augue metus, vel suscipit elit faucibus ac. Etiam condimentum felis id eros porttitor, a congue lacus venenatis. Aenean ac mi rutrum augue fermentum tempus eget
	ac est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec ac ligula eu felis congue bibendum id eu odio. Fusce dignissim magna sit amet erat porta, at porta mauris elementum. In nec pellentesque nulla. Sed blandit mauris augue, et rhoncus turpis
	suscipit vitae. Sed blandit ex id placerat porttitor. Cras sed ornare tortor. Etiam nec arcu a magna condimentum ultrices. Curabitur diam diam, auctor quis facilisis nec, sollicitudin sed lorem. Nullam vitae libero vel quam viverra tempus. Donec orci dolor, sollicitudin eget nulla non,
	malesuada laoreet enim. Etiam porttitor maximus lacinia. Fusce rhoncus commodo dictum. Integer condimentum lacinia neque vitae mattis. Quisque sapien neque, elementum ut augue id, fermentum sollicitudin mauris. Aenean mattis, velit feugiat ullamcorper tincidunt, mauris orci gravida neque, quis
	gravida eros justo ac dolor. Vestibulum mattis ante vestibulum nulla ultricies sollicitudin. Cras ex massa, iaculis et dui eu, luctus molestie nulla. Maecenas eu tincidunt est. Nulla quis justo et quam condimentum hendrerit vel ut sem. Fusce auctor id nulla id eleifend. Morbi viverra quis orci
	eu iaculis. Donec vitae dignissim massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In feugiat consequat lorem, nec hendrerit lorem iaculis vitae. Sed eget erat condimentum, sollicitudin dolor quis, placerat libero. Praesent accumsan, dui sed
	condimentum tincidunt, arcu nisi blandit enim, ac luctus lectus mi sed orci. Mauris egestas egestas elit sit amet condimentum. Praesent vitae varius mi. Donec non leo posuere, dapibus sapien vel, scelerisque mauris. In finibus est sapien, eu porta est lobortis quis. Quisque viverra ultricies
	purus, eu pretium tellus tristique in. Nunc varius urna sed odio fermentum feugiat ut ac nisl. Vivamus placerat purus sed dui tincidunt porta. Proin porta efficitur urna, et laoreet lorem euismod quis. Maecenas maximus at justo consequat dignissim. Sed porttitor mauris posuere augue laoreet, in
	viverra sapien ornare. Suspendisse potenti. Curabitur venenatis imperdiet lacus, vitae rhoncus sem euismod et. Ut egestas nisi libero, vitae molestie enim pharetra ut. Sed condimentum, leo sed faucibus viverra, nibh eros fermentum libero, vitae ultrices metus lorem ut sapien. In finibus lectus
	purus, eu hendrerit diam ultricies volutpat. Sed maximus, tellus non fringilla pretium, leo libero rutrum lorem, sit amet euismod sapien justo et eros. Ut accumsan vehicula lobortis. Sed sit amet urna magna. Nulla luctus dui ut nisl viverra suscipit. Nulla lobortis dolor vel lectus porttitor,
	ac condimentum felis sodales. Praesent consequat consectetur magna, eget sollicitudin libero. Ut vitae orci in metus blandit aliquam. Mauris eget ipsum augue. Duis vitae justo interdum, ullamcorper mi in, sollicitudin sapien. Nulla interdum vulputate odio, pretium posuere arcu iaculis sed.
	Aenean ornare nunc iaculis lacus condimentum pellentesque ac ut sem.</p>
	<br />
	<br />`;

	let page4 = `<h1>Github</h1>
	Project Artemis is currently a collection of 2 projects<hr />
	<ul><li>Artemis Discord bot</li></ul>
	<p><a href="https://github.com/UtopicUnicorns/ArtemisV3" target="_blank" class="pulse">Artemis</a> is a homegrown bot which was created as an answer for Dynobot's downtimes.
	So far the bot has been in 100's of servers and serving over 100.000 users, with mixed signals of course.
	Artemis is in no way a perfect bot nor is it a bot that has an actual end to its evolution, instead it is a rolling-release style of bot where minor changes get applied whenever I feel like it.
	The bot is written in JavaScript and gave me major insights of how JavaScript and Node work.</p>
	<br />
	<br />
	<ul><li>DJBSF - Discord JavaScript Bot Skeletal Framework</li></ul>
	<p><a href="https://github.com/UtopicUnicorns/DJBSF" target="_blank" class="pulse">DJBSF</a> is an attempt to create a lightweight Discord API JavaScript library from scratch.
	Current libraries including Discord.js seem to limit what I actually want to do with the API, so instead of forking a project I decided to just pick up WS and hack away.
	Progress seems to be coming along nicely, but a lot needs to be done before I can even consider the project to be in BETA stage.</p>
	<br />
	<br />`;

	let page5 = `<h1>Donate</h1>
	Project Artemis is free to use, sadly VPS, server, domain and hosting costs are not free, please consider one of the below options to donate.<hr />
	<ul><li>Paypal</li></ul>
	<p><button class="pulse" onClick="javascript:window.open('https://www.paypal.com/donate/?hosted_button_id=ULQ8N32CLXK4L', '_blank');">Donate trough PayPal</button></p>

	<ul><li>Patreon</li></ul>
	<p><button class="pulse" onClick="javascript:window.open('https://www.patreon.com/initrd', '_blank');">Become a Patron</button></p>
	<br />
	<br />`;

	let page6 = `<h1>Invite Bot</h1>
	Adding Artemis requires since Version 4 a special oAuth URL, this gives the bot access to slash commands as well as the apps functions. <hr />
	<ul><li>Permissions</li></ul>
	<p>Check if you are capable of adding bots to your server, not all members are equal within a Discord server, some have more permissions than others; Bot inviting is no difference in this sense.<br />
	If you are capable of inviting bots, then proceed to the next step.</p>
	<br />
	<br />
	<ul><li>Invitation</li></ul>
	<p>Now that you know you can invite Discord bots let's proceed
	<br /> by inviting the bot trough this <a href="https://discord.com/api/oauth2/authorize?client_id=654361253413781537&permissions=8&scope=applications.commands%20bot" target="_blank" class="pulse">Bot Invitation Link</a>.</p>
	<br />
	<br />
	<ul><li>Issues</li></ul>
	<p>If you happen to stumble on bugs or experience trouble feel free to reach out by joining the project's <a href="https://discord.gg/Y6f3XQyuTQ" target="_blank" class="pulse">Discord server</a></p>
	<br />
	<br />

	`;

	let page7 = `<h1>Contact</h1>
	There are several ways to contact me<hr />
	<ul><li>Discord</li></ul>
	<p>.initrd#0383 <br /><button class="pulse" onClick="javascript:window.open('https://discord.gg/Y6f3XQyuTQ', '_blank');">Project Artemis</button></p>

	<ul><li>GitHub</li></ul>
	<p><button class="pulse" onClick="javascript:window.open('https://github.com/UtopicUnicorns', '_blank');">My GitHub</button></p>

	<ul><li>Email</li></ul>
	<p><button class="pulse" onClick="javascript:window.open('mailto:main@artemis.rest', '_blank');">Email Project Artemis</button> <button class="pulse" onClick="javascript:window.open('mailto:dorrestijn.r@gmail.com', '_blank');">Email Personal</button></p>
	<br />
	<br />`;

	let page8 = `<h1>Terms and Conditions</h1>

<h2>1. Terms</h2>

<p>By accessing this Website, accessible from https://artemis.rest, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.</p>

<h2>2. Use License</h2>

<p>Permission is granted to temporarily download one copy of the materials on Project Artemis's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>

<ul>
    <li>modify or copy the materials;</li>
    <li>use the materials for any commercial purpose or for any public display;</li>
    <li>attempt to reverse engineer any software contained on Project Artemis's Website;</li>
    <li>remove any copyright or other proprietary notations from the materials; or</li>
    <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
</ul>

<p>This will let Project Artemis to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format.</p>

<h2>3. Disclaimer</h2>

<p>All the materials on Project Artemis’s Website are provided "as is". Project Artemis makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Project Artemis does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>

<h2>4. Limitations</h2>

<p>Project Artemis or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Project Artemis’s Website, even if Project Artemis or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.</p>

<h2>5. Revisions and Errata</h2>

<p>The materials appearing on Project Artemis’s Website may include technical, typographical, or photographic errors. Project Artemis will not promise that any of the materials in this Website are accurate, complete, or current. Project Artemis may change the materials contained on its Website at any time without notice. Project Artemis does not make any commitment to update the materials.</p>

<h2>6. Links</h2>

<p>Project Artemis has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by Project Artemis of the site. The use of any linked website is at the user’s own risk.</p>

<h2>7. Site Terms of Use Modifications</h2>

<p>Project Artemis may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.</p>

<h2>8. Your Privacy</h2>

<p>Please read our Privacy Policy.</p>

<h2>9. Governing Law</h2>

<p>Any claim related to Project Artemis's Website shall be governed by the laws of nl without regards to its conflict of law provisions.</p>
	<br />
	<br />`;

	let page9 = `<h1>Privacy Policy</h1>

<p>At Project Artemis, accessible from https://artemis.rest, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Project Artemis and how we use it.</p>

<p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>

<p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Project Artemis. This policy is not applicable to any information collected offline or via channels other than this website.</p>

<h2>Consent</h2>

<p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

<h2>Information we collect</h2>

<p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
<p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
<p>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>

<h2>How we use your information</h2>

<p>We use the information we collect in various ways, including to:</p>

<ul>
<li>Provide, operate, and maintain our website</li>
<li>Improve, personalize, and expand our website</li>
<li>Understand and analyze how you use our website</li>
<li>Develop new products, services, features, and functionality</li>
<li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
<li>Send you emails</li>
<li>Find and prevent fraud</li>
</ul>

<h2>Log Files</h2>

<p>Project Artemis follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>




<h2>Advertising Partners Privacy Policies</h2>

<P>You may consult this list to find the Privacy Policy for each of the advertising partners of Project Artemis.</p>

<p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Project Artemis, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>

<p>Note that Project Artemis has no access to or control over these cookies that are used by third-party advertisers.</p>

<h2>Third Party Privacy Policies</h2>

<p>Project Artemis's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p>

<p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>

<h2>CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>

<p>Under the CCPA, among other rights, California consumers have the right to:</p>
<p>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>
<p>Request that a business delete any personal data about the consumer that a business has collected.</p>
<p>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</p>
<p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

<h2>GDPR Data Protection Rights</h2>

<p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
<p>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</p>
<p>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</p>
<p>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</p>
<p>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</p>
<p>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</p>
<p>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</p>
<p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

<h2>Children's Information</h2>

<p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>

<p>Project Artemis does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
	<br />
	<br />`;

	switch (dec) {
		case 1:
			bg_grab.filter = `hue-rotate(20deg)`;

			document.title = 'INDEX - Project Artemis';

			setTimeout(function () {
				content_grab.innerHTML = page1;
				call_git();
			}, 1000);

			break;

		case 2:
			bg_grab.filter = `hue-rotate(40deg)`;

			document.title = 'FEATURES - Project Artemis';

			setTimeout(function () {
				content_grab.innerHTML = page2;
			}, 1000);

			break;

		case 3:
			bg_grab.filter = `hue-rotate(60deg)`;

			document.title = 'F.A.Q. - Project Artemis';

			setTimeout(function () {
				content_grab.innerHTML = page3;
			}, 1000);

			break;

		case 4:
			bg_grab.filter = `hue-rotate(80deg)`;

			document.title = 'GITHUB - Project Artemis';

			setTimeout(function () {
				content_grab.innerHTML = page4;
			}, 1000);

			break;

		case 5:
			bg_grab.filter = `hue-rotate(100deg)`;

			document.title = 'DONATE - Project Artemis';

			setTimeout(function () {
				content_grab.innerHTML = page5;
			}, 1000);

			break;

		case 6:
			bg_grab.filter = `hue-rotate(120deg)`;

			document.title = 'INVITE BOT - Project Artemis';

			setTimeout(function () {
				content_grab.innerHTML = page6;
			}, 1000);

			break;

		case 7:
			bg_grab.filter = `hue-rotate(140deg)`;

			document.title = 'CONTACT - Project Artemis';

			setTimeout(function () {
				content_grab.innerHTML = page7;
			}, 1000);

			break;

		case 8:
			bg_grab.filter = `hue-rotate(160deg)`;

			document.title = 'TERMS OF SERVICE - Project Artemis';

			setTimeout(function () {
				content_grab.innerHTML = page8;
			}, 1000);

			break;

		case 9:
			bg_grab.filter = `hue-rotate(180deg)`;

			document.title = 'PRIVACY POLICY - Project Artemis';

			setTimeout(function () {
				content_grab.innerHTML = page9;
			}, 1000);

			break;

		default:
			bg_grab.filter = `hue-rotate(250deg)`; //red

			document.title = '404 - Project Artemis';

			content_grab.innerHTML = '<div class ="logo"><h1>404 - Page not found!</h1></div>';

			break;
	}
}
