chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create({ id: "DesmosDashboardDownloader", title: "Download Desmos Dashboard as CSV", type: "normal", contexts: ["page"]});	
});
chrome.contextMenus.onClicked.addListener(function(item, tab) {
		"use strict";
		if(item.menuItemId == "DesmosDashboardDownloader"){	
			chrome.tabs.executeScript(tab.id, {code: "dltcsvRightClick = true;", allFrames:true}, function() { chrome.tabs.executeScript(tab.id, {file: "downloadcsv.js", allFrames:true});});			
		}	
});
