fetch('https://api.github.com/users/UtopicUnicorns/events')
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		let array = [];
		let array2 = [];
		let count = 0;

		function isEven(value) {
			return (value % 2 == 0);
		}

		for (let i of data) {
			if (i.type == 'PushEvent') {
				count++;
				let date = new Date(i.created_at);
				let year = date.getFullYear();
				let month = ('0' + (date.getMonth() + 1)).substr(-2);
				let day = ('0' + date.getDate()).substr(-2);
				let hour = ('0' + date.getHours()).substr(-2);
				let minutes = ('0' + date.getMinutes()).substr(-2);
				let seconds = ('0' + date.getSeconds()).substr(-2);

				let time = `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`;

				let author = { name: i.actor.login, pic: i.actor.avatar_url, link: `https://github.com/${i.actor.login}` };

				let repo = { name: i.repo.name, url: i.repo.url.replace('api.', '').replace('/repos', ''), head: i.payload.ref };

				if (i.payload.commits) {
					var title = {
						name: i.payload.commits[0].message.split('\n\n')[0],
						comment: i.payload.commits[0].message.split('\n\n')[1],
						commit: i.payload.commits[0].url.replace('api.', '').replace('/repos', '').replace('commits', 'commit'),
					};
				} else {
					var title = {
						name: '=!',
						comment: '=!',
						//commit '=!'
					};
				}

				let target_name = '';

				if (repo.name.includes('DJBSF')) target_name += './images/assets/project_bow_background.png';
				if (repo.name.includes('Artemis')) target_name += './images/assets/project_arrow_background.png';
				if (repo.name.includes('mint')) target_name += './images/assets/Server_Invite.png';
				if (repo.head.includes('site')) target_name = './images/assets/project_artemis_background.png';

				let combine_info = `
				<table style="width: 100%; height: 30%; overflow: hidden; background-color: rgba(255, 255, 255, 0.8); border-radius: 5px; box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);">
					<tbody>
						<tr>
							<td style="height: 80px;text-align: center; background-image: url('${target_name}'); background-position: center; background-size: cover; background-repeat: no-repeat">
								<table style="width: 100%; height: 50%;">
									<tbody>
										<tr>
											<td style="width: 50%; height: 100%; text-align: left; padding-left: 5%;">
												${title.name}<br />
												${time}
											</td>
											<td style="text-align: right; padding-right: 5%; width: 50%; height: 100%; background-image: url('${author.pic}');background-position: right; background-size: contain; background-repeat: no-repeat;">	
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
						<tr>
							<td style="padding-left: 5%;">
								${title.comment}
							</td>
						</tr>
						<tr>
							<td style="text-align: center;">
								<button class="menu_button pulse" onclick="window.open('${repo.url}/tree/${repo.head.split("/")[2]}','_blank')" target="_blank">${repo.name}/${repo.head.split("/")[2]}</button>
								<button class="menu_button pulse" onclick="window.open('${title.commit}','_blank')" target="_blank">View Commit</button>
								<button class="menu_button pulse" onclick="window.open('${author.link}','_blank')" target="_blank">${author.name}</button>
							</td>
						</tr>
					</tbody>
				</table><br />
				`;

				let check = isEven(count);

				if (check) {
					array.push(combine_info);
				} else {
					array2.push(combine_info);
				}
			}
		}

		let content_grab = document.getElementById('C');

		let table_gen = `
		<table style="width: 90%; height: 90%; overflow: hidden;">
			<tbody>
				<tr>
					<td style="width: 42%; height: 100%; overflow: hidden;">${array.slice(0,3).join(' ')}</td>
					<td style="width: 6%;"></td>
					<td style="width: 42%; height: 100%; overflow: hidden;">${array2.slice(0,3).join(' ')}</td>
				</tr>
			</tbody>
		</table>
			`;

		content_grab.innerHTML = table_gen;
	});
