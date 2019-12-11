let mission = document.getElementsByClassName("input-mission")[0];
let box = document.getElementsByClassName("to-do-list")[0];
let count = document.getElementsByClassName("count")[0];
let count1 = document.getElementsByClassName("count")[1];
let content = document.getElementsByClassName("content");
let content1 = document.getElementsByClassName("content1");

class List {
	constructor() {
		this.render();
	}
	render() {
		let strcookie = document.cookie;
		let arrcookie = strcookie.split("; ");
		// console.log(document.cookie);
		for (let t in arrcookie) {
			let item = arrcookie[t].split("=");
			if (item[0] == "content") {
				let json = JSON.parse(item[1]);
				for (let z in json) {
					let itemtext = json[z].text;
					box.innerHTML +=
						`<p class="waite-to-do-list"><span class="color"></span><input type="checkbox" class="check"><span class="content">${itemtext}</span><i class="button">-</i></p>`
				}
			}
			if (item[0] == "content1") {
				let json = JSON.parse(item[1]);
				for (let z in json) {
					let itemtext = json[z].text1;
					$(".compelete-list")[0].innerHTML +=
						`<p class="waite-to-do-list waite-to-do-list-complete"><span class="color color-complete"></span><input type="checkbox" placeholder="√" class="check"><span class="content1">${itemtext}</span><i class="button">-</i></p>`

				}
			}
		}
		this.input();
		this.del();
		this.check();
		this.getnum();
	}
	input() {
		let that = this;
		document.onkeydown = function(evt) {
			let e = evt || event;
			if (e.keyCode == 13) {
				let text = mission.value;
				if (text == "") {
					alert("内容为空，不能发送");
				} else {
					box.innerHTML +=
						`<p class="waite-to-do-list"><span class="color"></span><input type="checkbox" class="check"><span class="content">${text}</span><i class="button">-</i></p>`
					
					mission.value = "";
					that.del();
					that.check();
					that.save();
					that.getnum();
				}
			}
		}
	}
	getnum() {
		$(".count").html(content.length);
		$(".count1").html(content1.length);
	}
	del() {
		let that = this;
		$(".button").click(function() {
			$(this).parent().remove();
			that.save();
			that.getnum();
		})

	}
	check() {
		let that = this;
		$(".check").click(function() {
			let c1 = $(this).next().html();
			$(".compelete-list")[0].innerHTML +=
				`<p class="waite-to-do-list waite-to-do-list-complete"><span class="color color-complete"></span><input type="checkbox" placeholder="√" class="check"><span class="content1">${c1}</span><i class="button">-</i></p>`
			
			$(this).parent().remove();
			that.del();
			that.save();
			that.getnum();
		})

	}

	save() {
		<!-- 存 -->
		let dd1 = []
		let dd2 = []
		
		let date = new Date();
		date.setDate(date.getDate()+11);


		<!-- 已完成部分 -->
		for (let i = 0; i < content1.length; i++) {
			let e1 = content1[i].innerHTML;
			let obj1 = {
				"text1": e1
			};
			dd2.push(obj1);
		}
		<!-- 将里面有json对象数组转为数组字符串形式形式 -->
		let ddd2 = JSON.stringify(dd2);
		document.cookie = "content1=" + ddd2+";expires="+date;
		// document.cookie = "content1=1;expires="+date;
		
		<!-- 正在进行部分 -->
		for (let i = 0; i < content.length; i++) {
			let e = content[i].innerHTML
			let obj = {
				"text": e
			};
			dd1.push(obj);
		}
		let ddd1 = JSON.stringify(dd1);
		document.cookie = "content=" + ddd1+";expires="+date;
		// document.cookie = "content=1;expires="+date;
	}
}
let l = new List();
