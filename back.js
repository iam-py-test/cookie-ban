chrome.cookies.onChanged.addListener(function(data){
	console.log(data)
	try{
		var blockeddomains = JSON.parse((localStorage.getItem("blockeddomains")||"[]"))
	}
	catch(err){
		var blockeddomains = []
	}
	if(blockeddomains.includes(data.cookie.domain) === true){
		var url = (data.cookie.secure)?"https://":"http://" 
		url += data.cookie.domain + data.cookie.path
		chrome.cookies.remove({url:url,name:data.cookie.name},function(){
			console.log(chrome.runtime.lastError,url,data,data.cookie.domain)
		})
	}
	chrome.tabs.query({},function(tabs){
		
	})
})
chrome.contextMenus.create({title:"Block domain",id:"bd",contexts:["all"]})
chrome.contextMenus.onClicked.addListener(function(data,tab){
	if(data.menuItemId !== 'bd'){return;}
	console.log(data,tab)
		try{
		var blockeddomains = JSON.parse((localStorage.getItem("blockeddomains")||"[]"))
	}
	catch(err){
		var blockeddomains = []
	}
	var domain = new URL(tab.url).hostname
	blockeddomains.push(domain)
	localStorage.setItem("blockeddomains",JSON.stringify(blockeddomains))
})
chrome.contextMenus.create({title:"Allow domain",'id':"ad",contexts:["all"]})
chrome.contextMenus.onClicked.addListener(function(data,tab){
	if(data.menuItemId !== 'ad'){return;}
		try{
		var blockeddomains = JSON.parse((localStorage.getItem("blockeddomains")||"[]"))
	}
	catch(err){
		var blockeddomains = []
	}
	for(var t = 0;t < blockeddomains.length;t++){
		if(blockeddomains[t] === new URL(tab.url).hostname){
			blockeddomains.shift(t)
		}
	}
	localStorage.setItem('blockeddomains',JSON.stringify(blockeddomains))
})